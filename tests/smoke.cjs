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
