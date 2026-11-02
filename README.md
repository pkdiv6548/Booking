# TripNest Booking Website

A multi-page travel-booking frontend prototype inspired by common accommodation and travel-booking patterns.

## Stack and constraints
- Plain HTML, CSS, and vanilla JavaScript.
- Each major screen has its own `.html` file; this is not a single-page application.
- Shared styling: `assets/styles.css`.
- Shared interactions: `assets/app.js`.
- Persistent prototype identity: TRIPNEST paper-plane logo, navy header, blue accents, and consistent typography.
- Use GitHub as the development workspace for this frontend phase.

## Run locally
Open `index.html` in a browser, or enable GitHub Pages in repository settings and publish from the main branch.

## Page directory

### Stays and accommodation
- `index.html` — homepage and stay search
- `stays.html` — accommodation results, filters, and saved-search actions
- `property.html` — property details
- `rooms.html` — room selection
- `guest-details.html` — guest details
- `booking.html` — booking entry/summary
- `payment.html` — demo stay checkout
- `confirmation.html` — booking confirmation and actions
- `voucher.html`, `invoice.html` — printable sample documents

### Flights
- `flights.html` — flight search
- `flight-results.html` — sample results
- `flight-passengers.html` — traveller details
- `flight-payment.html` — demo checkout
- `flight-confirmation.html`, `flight-ticket.html` — confirmation and e-ticket
- `manage-flight.html` — sample flight management

### Car rentals
- `cars.html` — rental search
- `car-results.html` — sample car results and add-ons
- `car-driver.html` — primary driver details
- `car-payment.html` — demo checkout
- `car-confirmation.html`, `car-voucher.html` — confirmation and rental voucher
- `car-manage.html` — sample rental management and pickup checklist

### Other travel and account pages
- `experiences.html`, `airport-transfers.html`, `offers.html`
- `login.html`, `register.html`, `profile.html`
- `trips.html`, `wishlist.html`, `saved-searches.html`
- `refunds.html`, `rewards.html`, `membership.html`
- `help.html`, `support.html`, `privacy.html`

## Reference-image workflow
The user now reports that the separate **“Booking Homepage Research”** conversation has reached **Prototype 64**. Treat Prototype 64 as the newest design milestone reported by the user. A fresh Library search did not return an image explicitly named or indexed as Prototype 64, so do not claim its exact screen content has been inspected until that image is visible in the Library. The latest matching files currently visible in the Library are:
- `TRIPNEST Car Rental Booking Flow(1).png`
- `TRIPNEST Car Rental Booking Storyboard.png`
- `TRIPNEST Flight Booking Journey.png`
- `TripNest Flight Booking Payment Journey.png`

Re-check the Library each time work continues and use the newest available references to guide the relevant page. Images generated in a separate conversation do not automatically sync into this repository; only use image files that are actually available.

## Verification notes
- Static cross-page audit checked all 39 expected HTML routes in batches; all listed pages were retrievable from the repository.
- HTML `href` and `action` targets in the audited batches did not point to unexpected `.html` filenames. All audited pages include a viewport meta tag, shared stylesheet, and TRIPNEST branding; pages without `assets/app.js` use inline scripts for their standalone interactions.
- Shared CSS contains general responsive breakpoints at 1000px, 700px, and 380px, plus a 640px refund-timeline breakpoint. Keyboard focus visibility is styled with `:focus-visible`.
- `assets/app.js` passes a JavaScript syntax check; inline scripts on the audited homepage, flight results, car voucher, flight ticket, My Trips, refunds, flight management, and privacy pages also pass syntax checks. CSS braces are balanced. Static checks do not replace real browser smoke tests, mobile/responsive testing, or full end-to-end flow validation.



## Reference-first implementation policy (updated 1 Nov 2026)

The user has identified the separate conversation **“Booking Homepage Research”** and reports that it now contains **64 prototypes**. Treat Prototype 64 as the latest milestone reported by the user, and treat *all relevant TRIPNEST images visible in the Library* as design references, not only the newest car-rental collage. A Library search did not yet surface an image explicitly identifiable as Prototype 64; continue to use the newest matching images actually available and do not guess the unseen prototype's content. The reference scope includes individual pages, all steps/states of each journey, dialogs/modals, dropdowns, calendars, validation errors, warning/success/error alerts, confirmation states, notification panels, empty/loading states, and print/voucher views.

### Reference catalogue currently discovered in the Library
This is a working list of discovered files, not a claim that every image in every conversation has been enumerated. Search the Library again on every continuation and extend the list when new matching images are available.

**Global booking and shared UI**
- `TRIPNEST Booking Journey UI Collage.png`
- `TRIPNEST Booking Flow UI Collage.png`
- `TRIPNEST Booking Flow UI Montage.png`
- `TRIPNEST UI Reference Collage.png`
- `TRIPNEST UI Reference Infographic.png`
- `TRIPNEST Travel Booking UI Screens.png`
- `Tripnest Travel Booking Flow UI Grid.png`
- `TRIPNEST Complete UX Flowboard.png`

**Stays, property, room, guest and booking states**
- `TRIPNEST Hotel Booking UI Flow Montage.png`
- `TRIPNEST Hotel Booking Journey Storyboard.png`
- `TRIPNEST Guests & Rooms Flow.png`
- `TripNest Booking Management Dashboard.png`
- `TRIPNEST Booking Flow UI Montage.png`
- `TRIPNEST Booking Journey UI Collage.png`
- `TRIPNEST Hotel Booking Journey UI Collage.png` — confirmation and cancellation confirmation popup
- `TRIPNEST Guests & Rooms Flow.png` — child ages and room-count states
- `TripNest Booking Management Dashboard.png` — booking details, cancellation policy, cancellation success/refund states

**Flights**
- `TRIPNEST Flight Booking UI Storyboard.png`
- `TRIPNEST Flight Booking Flow Mockup.png`
- `TripNest Flight Booking Payment Journey.png`
- `TRIPNEST Flight Booking Journey.png`
- `TripNest Flight Booking Payment Journey.png` — passenger validation, payment processing, failed/success states, ticket download and manage-booking actions
- `TRIPNEST Payment Gateway Flow Mockup.png` — payment method selection, terms validation, loading, success, failure and timeout/retry dialogs

**Cars**
- `TRIPNEST Car Rental Booking Flow.png`
- `TRIPNEST Car Rental Booking Storyboard.png`
- `TRIPNEST Car Rental Booking Flow(1).png` — payment processing, failure/retry, successful payment and voucher download states

**Offers, alerts, loyalty and support**
- `TRIPNEST Booking and Refund Flow.png` — My Trips, modify/cancel booking, cancellation success and refund status
- `TRIPNEST Refund Management UI Collage.png` — refund eligibility, policy popup, fee breakdown and estimated refund
- `TRIPNEST Travel Offers UI Showcase.png`
- `TRIPNEST Saved Searches UI Grid.png`
- `TRIPNEST Saved Searches & Price Alerts UI Grid.png`
- `TRIPNEST Support Centre UI Montage.png`
- `TRIPNEST Membership Rewards Dashboard Collage.png`
- `TRIPNEST Support and Privacy UI Collage.png` — contact support, live chat, cookie consent/preferences and accessibility settings

### How to apply references
1. Keep the TRIPNEST brand mark/logo consistent across every page and popup, even if a reference image has small rendering differences.
2. Use the matching reference panel for each individual page; do not implement a whole collage as one page.
3. Recreate each relevant interaction/state separately: open/closed popups, dropdown choices, date/guest selectors, inline validation, loading, success/error/warning alerts, confirmation, cancellation/refund status, and empty states.
4. Maintain a coherent design system across the site: navy header, blue primary actions, white/light surfaces, readable contrast, consistent typography and spacing. Use red for errors, amber/yellow for warnings, green for success/refund-complete states, and preserve any distinct reference-specific theme where it represents a real state or section.
5. Ensure each reference-driven page works at desktop and mobile sizes, with accessible labels, keyboard-operable controls, visible focus states, and useful feedback after actions.
6. Treat reference artwork as visual/product guidance, not proof that a real backend operation exists. Keep demo-only payments, booking, alerts and refunds clearly labelled unless a real integration is deliberately added.
7. Because references are generated in a separate chat, they are not automatically synchronized to GitHub. Re-search the Library each time this project is continued and use the newest available matching references.


## Brand consistency and cross-page audit
- All 39 HTML pages were checked through the GitHub repository tree: each page includes the shared `assets/styles.css` stylesheet and a TRIPNEST `.brand` link back to `index.html`.
- The shared `.plane` logo element renders a single airplane glyph via `.plane::before` instead of displaying the old arrow glyph. The mark uses the same geometry and glyph rule throughout the site, including the mobile breakpoint; dark footer logo variants inherit the appropriate foreground color for contrast.
- Decorative `<span class="plane">` logo glyphs across all 39 HTML pages now include `aria-hidden="true"`, preventing screen readers from announcing the decorative glyph separately from the brand text. This was applied in batches and committed to the repository.
- `assets/styles.css` was checked after the logo update: opening and closing brace counts match (230 each), and the desktop/mobile logo rules are present.
- This is a source-level audit only. Real browser rendering, responsive interaction and deployment checks remain pending; do not describe them as browser-tested.

## Prototype scope and limitations
Search, filters, saved items, modals, and demo booking steps may run in the browser. Listings and prices are sample data, and some state is stored in `localStorage`. No real inventory is queried, and no real reservations, payments, refunds, or external notifications are processed. Do not enter real payment credentials. This is an independent prototype and is not affiliated with Booking.com.


## Prototype 64 — TRIPNEST Admin & Security screens
The reported Prototype 64 from the separate “Booking Homepage Research” chat specifies 16 screens: Admin Dashboard, User Management, Roles & Permissions, Create/Edit Role, Add/Edit User, Access Control, Login History, Audit Logs, Security Alerts, Alert Details, Block/Unblock Confirmation, Unblock Success, System Settings, Password Policy, 2FA Setup, and Admin Logout. The admin module has been added using the same TRIPNEST name/plane mark and a consistent Navy Blue + Blue + White visual system.

New admin routes:
- `admin.html` — dashboard and recent security activity
- `admin-users.html` — searchable user management table
- `admin-roles.html`, `admin-role-editor.html` — role catalogue and permission editor
- `admin-user-editor.html` — add/edit user form
- `admin-access-control.html` — role access matrix and safeguards
- `admin-login-history.html`, `admin-audit-logs.html` — searchable sample security records
- `admin-security-alerts.html`, `admin-alert-details.html` — alert queue and investigation details
- `admin-confirm-action.html`, `admin-unblock-success.html` — block/unblock confirmation and success states
- `admin-settings.html`, `admin-password-policy.html`, `admin-2fa.html` — settings, password policy and MFA setup UI
- `admin-logout.html` — demo signed-out state
- `assets/admin.css`, `assets/admin.js` — responsive admin design system and demo interactions

**Security limitation:** this is a UI prototype. Form settings are stored only in the local browser; sample accounts/logs are not real; block/unblock and logout do not revoke sessions or change real users; 2FA is not enrolled or verified. Production login, server-enforced RBAC, durable audit logs, session revocation, MFA and alert ingestion require a backend/identity provider. Admin pages have not yet passed a real browser end-to-end test.


## Prototype-reference implementation update — Prototype 78
The separate “Bookingcom Hompage Research” chat is the visual source of truth for the TRIPNEST interface. Newly found Library references include Prototype 84 (Accessibility, Language & Localization), Prototype 79 (Channel Manager & OTA Integrations), Prototype 80 (API Integration Hub & Developer Portal), Prototype 81 (Security Center / Fraud Prevention), and Prototype 82 (Customer Profile, Identity Verification & Account Recovery). The source chat may still be generating additional references; each continuation should search for the newest available reference assets before implementation. These assets do not automatically sync into GitHub.

### Prototype 84 screens added in this update
- `localization.html` — Localization overview and navigation to all 16 screens
- `localization-languages.html` — Languages & Locales
- `localization-currencies.html` — Currency Catalogue
- `localization-translations.html` — Translation Catalogue
- `localization-editor.html` — Translation Editor
- `localization-regions.html` — Regional Settings
- `localization-date-formats.html` — Date Format Rules
- `localization-number-formats.html` — Number & Decimal Formats
- `localization-timezones.html` — Time Zone Catalogue
- `localization-content-preview.html` — Localized Content Preview
- `localization-translation-review.html` — Translation Review Queue
- `localization-import-export.html` — Import & Export
- `localization-fallbacks.html` — Language Fallback Rules
- `localization-language-settings.html` — Language Preferences
- `localization-currency-rules.html` — Currency Display Rules
- `localization-publish.html` — Publish Localization

The localization screens use the existing shared TRIPNEST header, paper-plane brand mark, navy/blue/white design system, responsive layouts, and accessible form labels. Draft forms persist in browser `localStorage` for demonstration only. They do not alter real exchange rates, customer locale settings, taxes, translation services, or server-side data. The browser smoke test page list now includes all 16 new routes.

### Scope/progress distinction
The earlier 24-task plan covered the first frontend build and smoke-test baseline; it did not mean that every panel in the 90+ prototype reference set had been implemented. Reference-alignment work is a separate, continuing phase. Prototype 84 is now implemented; Prototype 79 is the current channel-management module, Prototype 80 is the API developer portal, Prototype 81 is the security center, and customer profile/account recovery references remain to be audited and any newly generated later references remain to be mapped and implemented after their screens are audited against existing pages to avoid duplication.


## Prototype 79 — Channel Manager & OTA Integrations
Added 16 separate screens: `channel-manager.html`, `channel-connect.html`, `channel-bookingcom-setup.html`, `channel-connections.html`, `channel-room-mapping.html`, `channel-rate-sync.html`, `channel-inventory-sync.html`, `channel-sync-logs.html`, `channel-sync-conflicts.html`, `channel-performance.html`, `channel-commissions.html`, `channel-policy-mapping.html`, `channel-bookings.html`, `channel-settings.html`, `channel-health.html`, `channel-success.html`. The module follows the available 16-panel TRIPNEST Channel Manager reference montage: channel overview, channel connection, Booking.com setup, connected channels, room mapping, rate sync, inventory sync, sync logs, conflict resolution, performance analytics, commission rules, policy mapping, centralized OTA bookings, settings, integration health, and success state. All connections, metrics, and actions are local demo UI; no OTA credentials are collected and no real provider API is called. Smoke tests include all 16 new routes.

## Prototype reference audit note
The Library includes numbered source montages explicitly identifying Prototype 80 (API Integration Hub & Developer Portal), Prototype 81 (Security Center, Fraud Prevention & Risk Monitoring), and Prototype 84 (Accessibility, Language & Localization). Localization pages previously labeled Prototype 78 have been relabeled to match the visible Prototype 84 reference. Numbering for other reference images should be taken from each image itself rather than inferred from filename or previous notes.
