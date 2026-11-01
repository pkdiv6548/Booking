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
The user reports that the separate **“Bookingcom Hompage Research”** conversation has generated images through **Prototype 41 — TRIPNEST Car Rental Booking**. The latest matching files currently visible in the Library are:
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

The user has identified the separate conversation **“Bookingcom Hompage Research”** and reports that it contains generated references through **Prototype 41 — TRIPNEST Car Rental Booking**. Treat *all relevant TRIPNEST images visible in the Library* as design references, not only the newest car-rental collage. The reference scope includes individual pages, all steps/states of each journey, dialogs/modals, dropdowns, calendars, validation errors, warning/success/error alerts, confirmation states, notification panels, empty/loading states, and print/voucher views.

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


## Prototype scope and limitations
Search, filters, saved items, modals, and demo booking steps may run in the browser. Listings and prices are sample data, and some state is stored in `localStorage`. No real inventory is queried, and no real reservations, payments, refunds, or external notifications are processed. Do not enter real payment credentials. This is an independent prototype and is not affiliated with Booking.com.
