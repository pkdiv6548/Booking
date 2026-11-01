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
        const overflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
        );
        if (overflow) failures.push(file + " at " + width + "px: horizontal overflow");
      } catch (error) {
        failures.push(file + " responsive check: " + error.message);
      }
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
