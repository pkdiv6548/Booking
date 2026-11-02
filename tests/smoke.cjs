const { chromium } = require("playwright");

const pages = [
  "index.html", "stays.html", "property.html", "rooms.html", "booking.html",
  "guest-details.html", "payment.html", "confirmation.html", "voucher.html", "invoice.html",
  "login.html", "register.html", "profile.html", "trips.html", "wishlist.html",
  "flights.html", "flight-results.html", "flight-passengers.html", "flight-payment.html",
  "flight-confirmation.html", "flight-ticket.html", "manage-flight.html",
  "cars.html", "car-results.html", "car-driver.html", "car-payment.html",
  "car-confirmation.html", "car-voucher.html", "car-manage.html",
  "experiences.html", "airport-transfers.html", "offers.html", "help.html",
  "support.html", "privacy.html", "refunds.html", "rewards.html", "membership.html",
  "saved-searches.html",
  "localization.html",
  "localization-languages.html",
  "localization-currencies.html",
  "localization-translations.html",
  "localization-editor.html",
  "localization-regions.html",
  "localization-date-formats.html",
  "localization-number-formats.html",
  "localization-timezones.html",
  "localization-content-preview.html",
  "localization-translation-review.html",
  "localization-import-export.html",
  "localization-fallbacks.html",
  "localization-language-settings.html",
  "localization-currency-rules.html",
  "localization-publish.html",
  "channel-manager.html",
  "channel-connect.html",
  "channel-bookingcom-setup.html",
  "channel-connections.html",
  "channel-room-mapping.html",
  "channel-rate-sync.html",
  "channel-inventory-sync.html",
  "channel-sync-logs.html",
  "channel-sync-conflicts.html",
  "channel-performance.html",
  "channel-commissions.html",
  "channel-policy-mapping.html",
  "channel-bookings.html",
  "channel-settings.html",
  "channel-health.html",
  "channel-success.html",
  "api-developer.html",
  "api-keys.html",
  "api-key-create.html",
  "api-key-permissions.html",
  "api-documentation.html",
  "api-explorer.html",
  "api-authentication.html",
  "api-webhooks.html",
  "api-webhook-create.html",
  "api-webhook-logs.html",
  "api-usage.html",
  "api-quotas.html",
  "api-error-logs.html",
  "api-integration-testing.html",
  "api-versioning.html",
  "api-success.html",
  "admin.html", "admin-users.html", "admin-roles.html", "admin-role-editor.html",
  "admin-user-editor.html", "admin-access-control.html", "admin-login-history.html",
  "admin-audit-logs.html", "admin-security-alerts.html", "admin-alert-details.html",
  "admin-confirm-action.html", "admin-unblock-success.html", "admin-settings.html",
  "admin-password-policy.html", "admin-2fa.html", "admin-logout.html"
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
    page.on("pageerror", error => failures.push("Browser JS error: " + error.message));

    for (const file of pages) {
      try {
        const response = await page.goto("http://127.0.0.1:4173/" + file, {
          waitUntil: "domcontentloaded",
          timeout: 15000
        });
        if (!response || response.status() >= 400) {
          failures.push(file + ": HTTP " + (response ? response.status() : "no response"));
          continue;
        }
        const title = await page.title();
        const bodyText = await page.locator("body").innerText().catch(() => "");
        if (!title.trim()) failures.push(file + ": missing document title");
        if (!bodyText.trim()) failures.push(file + ": empty body");
      } catch (error) {
        failures.push(file + ": " + error.message);
      }
    }

    // Responsive layout sanity checks on representative public and admin screens.
    for (const [file, width] of [
      ["index.html", 390], ["stays.html", 390], ["flight-results.html", 390],
      ["car-results.html", 390], ["admin.html", 390], ["admin-users.html", 768]
    ]) {
      try {
        await page.setViewportSize({ width, height: 844 });
        await page.goto("http://127.0.0.1:4173/" + file, { waitUntil: "domcontentloaded" });
        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          const offenders = [...document.querySelectorAll("body *")]
            .filter(el => !el.closest(".subnav, .navlinks, .admin-side, .admin-table"))
            .map(el => ({ tag: el.tagName.toLowerCase(), cls: String(el.className || "").slice(0, 70),
              right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width) }))
            .filter(el => el.right > root.clientWidth + 2)
            .sort((a, b) => b.right - a.right).slice(0, 5);
          return offenders.length ? offenders : null;
        });
        if (overflow) failures.push(file + " at " + width + "px: horizontal overflow; elements=" + JSON.stringify(overflow));
      } catch (error) {
        failures.push(file + " responsive check: " + error.message);
      }
    }

    // Cross-page navigation and modal keyboard interactions.
    try {
      await page.setViewportSize({ width: 1365, height: 900 });
      await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "domcontentloaded" });
      await page.locator('.navlinks a[href="stays.html"]').first().click();
      if (!page.url().endsWith("/stays.html")) failures.push("Navigation: Stays link did not open stays.html");

      await page.locator('[data-open="map-modal"]').click();
      if (!(await page.locator("#map-modal").evaluate(el => el.classList.contains("open")))) {
        failures.push("Stays map popup did not open");
      }
      await page.keyboard.press("Escape");
      if (await page.locator("#map-modal").evaluate(el => el.classList.contains("open"))) {
        failures.push("Stays map popup did not close with Escape");
      }

      await page.goto("http://127.0.0.1:4173/admin.html", { waitUntil: "domcontentloaded" });
      const logoutTrigger = page.locator('[data-confirm-action="logout"]').first();
      await logoutTrigger.click();
      if (!(await page.locator("[data-confirm-backdrop]").evaluate(el => el.classList.contains("open")))) {
        failures.push("Admin confirmation dialog did not open");
      }
      await page.keyboard.press("Escape");
      if (await page.locator("[data-confirm-backdrop]").evaluate(el => el.classList.contains("open"))) {
        failures.push("Admin confirmation dialog did not close with Escape");
      }
      if (!(await logoutTrigger.evaluate(el => el === document.activeElement))) {
        failures.push("Admin confirmation dialog did not restore focus to trigger");
      }
    } catch (error) {
      failures.push("Navigation/modal interaction check: " + error.message);
    }

    // Functional checks: wishlist persistence, admin table search, cookie preferences.
    try {
      await page.goto("http://127.0.0.1:4173/stays.html", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        localStorage.removeItem("tripnest-favorites");
        localStorage.removeItem("tripnest-cookies");
        localStorage.removeItem("tripnest-cookie-preferences");
        sessionStorage.removeItem("tripnest-cookie-dismissed");
      });
      await page.reload({ waitUntil: "domcontentloaded" });
      const favorite = page.locator("[data-favorite]").first();
      const favoriteName = await favorite.getAttribute("data-favorite");
      await favorite.click();
      const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-favorites") || "[]"));
      if (!saved.includes(favoriteName)) failures.push("Wishlist: saved property was not persisted in localStorage");
      await page.goto("http://127.0.0.1:4173/wishlist.html", { waitUntil: "domcontentloaded" });
      if (!(await page.locator("#wishlist-list").innerText()).includes(favoriteName)) {
        failures.push("Wishlist: saved property was not shown on wishlist page");
      }

      await page.goto("http://127.0.0.1:4173/admin-users.html", { waitUntil: "domcontentloaded" });
      await page.locator("[data-table-search]").fill("Priya Sharma");
      if (await page.locator('[data-search-row]:visible').count() !== 1) {
        failures.push("Admin user search: expected exactly one matching row for Priya Sharma");
      }
      await page.locator("[data-table-search]").fill("no-such-user-xyz");
      if (await page.locator('[data-search-row]:visible').count() !== 0) {
        failures.push("Admin user search: unmatched rows were not filtered out");
      }

      await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        localStorage.removeItem("tripnest-cookies");
        localStorage.removeItem("tripnest-cookie-preferences");
        sessionStorage.removeItem("tripnest-cookie-dismissed");
      });
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.locator('[data-cookie-action="reject"]').click({ timeout: 5000 });
      const cookiePrefs = await page.evaluate(() => ({
        state: localStorage.getItem("tripnest-cookies"),
        prefs: JSON.parse(localStorage.getItem("tripnest-cookie-preferences") || "{}"),
        closed: !document.querySelector("#cookie-modal").classList.contains("open")
      }));
      if (cookiePrefs.state !== "rejected-non-essential" || cookiePrefs.prefs.marketing !== false || !cookiePrefs.closed) {
        failures.push("Cookie preferences: reject non-essential choice did not persist correctly");
      }
    } catch (error) {
      failures.push("Functional interaction check: " + error.message);
    }

    // End-to-end demo hotel booking funnel; all state remains browser-local.
    try {
      await page.evaluate(() => {
        localStorage.removeItem("tripnest-bookings");
        localStorage.removeItem("tripnest-last-booking");
        localStorage.removeItem("tripnest-selected-property");
        localStorage.removeItem("tripnest-room");
      });
      await page.goto("http://127.0.0.1:4173/property.html", { waitUntil: "domcontentloaded" });
      await page.locator("#rooms").click();
      await page.locator('[data-select-room="Deluxe Room"]').click();
      if (!page.url().endsWith("/guest-details.html")) {
        failures.push("Booking funnel: room selection did not open guest details");
      }
      await page.locator("#first").fill("Test");
      await page.locator("#last").fill("Guest");
      await page.locator("#email").fill("test.guest@example.com");
      await page.locator("#phone").fill("9876543210");
      await page.locator("[data-continue-payment]").click();
      if (!page.url().endsWith("/payment.html")) {
        failures.push("Booking funnel: valid guest details did not open payment");
      }
      await page.locator("#agree-terms").check();
      await page.locator("[data-pay-demo]").click();
      if (!page.url().endsWith("/confirmation.html")) {
        failures.push("Booking funnel: demo confirmation did not open confirmation page");
      }
      const booking = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-last-booking") || "null"));
      if (!booking || booking.status !== "Confirmed" || booking.room !== "Deluxe Room") {
        failures.push("Booking funnel: confirmed demo booking was not persisted correctly");
      }
    } catch (error) {
      failures.push("Hotel booking funnel check: " + error.message);
    }

    // End-to-end demo flight funnel: search -> traveller -> simulated payment -> confirmation.
    try {
      await page.evaluate(() => {
        ["tripnest-flight-search", "tripnest-selected-flight", "tripnest-flight-passenger", "tripnest-flight-booking"]
          .forEach(key => localStorage.removeItem(key));
      });
      await page.goto("http://127.0.0.1:4173/flights.html", { waitUntil: "domcontentloaded" });
      const flightDates = await page.evaluate(() => {
        const d = new Date(); d.setDate(d.getDate() + 7);
        const depart = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() + 4);
        return { depart, ret: d.toISOString().slice(0, 10) };
      });
      await page.locator("#from").fill("Delhi");
      await page.locator("#to").fill("Mumbai");
      await page.locator("#depart").fill(flightDates.depart);
      await page.locator("#return").fill(flightDates.ret);
      await page.locator('[data-flight-search] button[type="submit"]').click();
      if (!page.url().includes("/flight-results.html?")) failures.push("Flight funnel: valid search did not open results");
      await page.locator('a[href^="flight-passengers.html"]').first().click();
      await page.locator("#first-name").fill("Test");
      await page.locator("#last-name").fill("Traveller");
      await page.locator("#dob").fill("1990-01-01");
      await page.locator("#gender").selectOption("Other");
      await page.locator("#traveller-email").fill("flight.test@example.com");
      await page.locator("#traveller-phone").fill("9876543210");
      await page.locator('[data-flight-passenger-form]').locator('button[type="submit"]').click();
      if (!page.url().endsWith("/flight-payment.html")) failures.push("Flight funnel: valid traveller details did not open payment");
      await page.locator("#flight-payment-form").locator('button[type="submit"]').click();
      await page.locator("#flight-payment-success-modal").waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
      if (!(await page.locator("#flight-payment-success-modal").evaluate(el => el.classList.contains("open")))) {
        failures.push("Flight funnel: simulated payment did not show success dialog");
      } else {
        await page.locator('#flight-payment-success-modal a[href="flight-confirmation.html"]').click();
        const booking = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-flight-booking") || "null"));
        if (!page.url().endsWith("/flight-confirmation.html") || !booking || booking.status !== "Demo confirmed" || booking.from !== "Delhi" || booking.to !== "Mumbai") {
          failures.push("Flight funnel: demo booking was not persisted or confirmation did not open");
        }
      }
    } catch (error) {
      failures.push("Flight demo funnel check: " + error.message);
    }

    // End-to-end demo car rental funnel, including licence-date validation and confirmation.
    try {
      await page.evaluate(() => {
        ["tripnest-car-search", "tripnest-selected-car", "tripnest-car-driver", "tripnest-car-booking",
          "tripnest-car-insurance", "tripnest-car-insurance-price"].forEach(key => localStorage.removeItem(key));
      });
      await page.goto("http://127.0.0.1:4173/cars.html", { waitUntil: "domcontentloaded" });
      const carDates = await page.evaluate(() => {
        const d = new Date(); d.setDate(d.getDate() + 14);
        const pickup = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() + 3);
        return { pickup, dropoff: d.toISOString().slice(0, 10), license: new Date(Date.now() + 31536000000).toISOString().slice(0, 10) };
      });
      await page.locator("#pickup").fill("Delhi");
      await page.locator("#dropoff").fill("Delhi");
      await page.locator("#pickup-date").fill(carDates.pickup);
      await page.locator("#dropoff-date").fill(carDates.dropoff);
      await page.locator('[data-car-search] button[type="submit"]').click();
      if (!page.url().includes("/car-results.html?")) failures.push("Car funnel: valid search did not open results");
      await page.locator("[data-select-car]").first().click();
      if (!page.url().endsWith("/car-driver.html")) failures.push("Car funnel: selecting a car did not open driver details");
      await page.locator("#car-first").fill("Test");
      await page.locator("#car-last").fill("Driver");
      await page.locator("#car-dob").fill("1990-01-01");
      await page.locator("#car-phone").fill("9876543210");
      await page.locator("#car-email").fill("car.test@example.com");
      await page.locator("#car-license").fill("DL12345678");
      await page.locator("#license-valid").fill(carDates.license);
      await page.locator("#car-driver-form button[type='submit']").click();
      if (!page.url().endsWith("/car-payment.html")) failures.push("Car funnel: valid driver details did not open payment");
      await page.locator("#car-terms").check();
      await page.locator("#car-payment-form button[type='submit']").click();
      await page.locator("#car-payment-success-modal").waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
      if (!(await page.locator("#car-payment-success-modal").evaluate(el => el.classList.contains("open")))) {
        failures.push("Car funnel: simulated payment did not show success dialog");
      } else {
        await page.locator("#car-payment-view-confirmation").click();
        await page.waitForURL("**/car-confirmation.html", { timeout: 5000 }).catch(() => {});
        const booking = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-car-booking") || "null"));
        if (!page.url().endsWith("/car-confirmation.html") || !booking || booking.status !== "Demo confirmed" || booking.car !== "Hyundai Creta or Similar" || booking.driver !== "Test Driver") {
          failures.push("Car funnel: demo rental booking was not persisted or confirmation did not open");
        }
      }
    } catch (error) {
      failures.push("Car rental demo funnel check: " + error.message);
    }

    // Negative-path validation: prevent invalid routes/dates and malformed refund requests.
    try {
      await page.goto("http://127.0.0.1:4173/flights.html", { waitUntil: "domcontentloaded" });
      const dates = await page.evaluate(() => {
        const d = new Date(); d.setDate(d.getDate() + 10);
        const later = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() - 5);
        return { later, earlier: d.toISOString().slice(0, 10) };
      });
      await page.locator("#from").fill("Delhi");
      await page.locator("#to").fill("Delhi");
      await page.locator("#depart").fill(dates.later);
      await page.locator("#return").fill(dates.later);
      await page.locator('[data-flight-search] button[type="submit"]').click();
      if (!page.url().endsWith("/flights.html") || !(await page.locator("#toast").innerText()).includes("Origin and destination must be different")) {
        failures.push("Validation: identical flight origin and destination were not rejected");
      }
      await page.locator("#to").fill("Mumbai");
      await page.locator("#return").evaluate((el, value) => { el.removeAttribute("min"); el.value = value; el.dispatchEvent(new Event("input", { bubbles: true })); }, dates.earlier);
      const returnInput = page.locator("#return");
      const returnValidity = await returnInput.evaluate(el => ({ valid: el.validity.valid, message: el.validationMessage }));
      await page.locator('[data-flight-search] button[type="submit"]').click();
      const returnToast = await page.locator("#toast").innerText().catch(() => "");
      if (!page.url().endsWith("/flights.html") ||
          (returnValidity.valid && !returnToast.includes("Return date must be on or after departure"))) {
        failures.push("Validation: return date before departure was not rejected");
      }

      await page.goto("http://127.0.0.1:4173/cars.html", { waitUntil: "domcontentloaded" });
      const carDates = await page.evaluate(() => {
        const d = new Date(); d.setDate(d.getDate() + 10);
        const pickup = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() - 1);
        return { pickup, dropoff: d.toISOString().slice(0, 10) };
      });
      await page.locator("#pickup").fill("Delhi");
      await page.locator("#dropoff").fill("Delhi");
      await page.locator("#pickup-date").fill(carDates.pickup);
      await page.locator("#dropoff-date").fill(carDates.dropoff);
      await page.locator('[data-car-search] button[type="submit"]').click();
      if (!page.url().endsWith("/cars.html") || !(await page.locator("#toast").innerText()).includes("Return date must be after pick-up date")) {
        failures.push("Validation: car drop-off before pick-up was not rejected");
      }

      await page.goto("http://127.0.0.1:4173/refunds.html", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => localStorage.removeItem("tripnest-refunds"));
      await page.locator("#refund-booking-id").fill("!!");
      await page.locator("#refund-reason").selectOption("Other");
      await page.locator("#refund-details").fill("This is a sufficiently long test refund reason.");
      await page.locator('#refund-form button[type="submit"]').click();
      let refundRows = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-refunds") || "[]"));
      if (refundRows.length !== 0) failures.push("Validation: malformed refund booking ID was stored");
      await page.locator("#refund-booking-id").fill("TNP-TEST-1234");
      await page.locator('#refund-form button[type="submit"]').click();
      refundRows = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-refunds") || "[]"));
      if (refundRows.length !== 1 || refundRows[0].bookingId !== "TNP-TEST-1234" || refundRows[0].status !== "Under review (demo)") {
        failures.push("Refund request: valid demo request was not persisted with the expected status");
      }
    } catch (error) {
      failures.push("Negative-path validation check: " + error.message);
    }

    // Prototype 78 localization draft persistence.
    try {
      await page.goto("http://127.0.0.1:4173/localization-languages.html", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => localStorage.removeItem("tripnest-localization-languages"));
      await page.locator("#defaultLanguage").selectOption({ label: "Hindi (India)" });
      await page.locator("#localeCode").fill("hi-IN");
      await page.locator('form[data-localization-form="languages"] button[type="submit"]').click();
      const localeDraft = await page.evaluate(() => JSON.parse(localStorage.getItem("tripnest-localization-languages") || "null"));
      if (!localeDraft || localeDraft.defaultLanguage !== "Hindi (India)" || localeDraft.localeCode !== "hi-IN") {
        failures.push("Localization: language draft was not persisted correctly");
      }
      if (!(await page.locator(".loc-save-status").innerText()).includes("saved in this browser")) {
        failures.push("Localization: save confirmation status was not shown");
      }
      await page.reload({ waitUntil: "domcontentloaded" });
      if (await page.locator("#defaultLanguage").inputValue() !== "Hindi (India)") {
        failures.push("Localization: saved language draft was not restored after reload");
      }
    } catch (error) {
      failures.push("Localization draft interaction check: " + error.message);
    }

    if (failures.length) {
      console.error("TRIPNEST browser smoke test FAILED:");
      failures.forEach(item => console.error(" - " + item));
      process.exitCode = 1;
    } else {
      console.log("TRIPNEST browser smoke test PASSED: " + pages.length +
        " pages loaded; 6 responsive viewport checks passed.");
    }
  } finally {
    await browser.close();
  }
})();
