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
- Shared CSS contains responsive breakpoints at 950px and 640px.
- `assets/app.js` was previously syntax-checked. Static checks do not replace real browser smoke tests, mobile/responsive testing, or full end-to-end flow validation.

## Prototype scope and limitations
Search, filters, saved items, modals, and demo booking steps may run in the browser. Listings and prices are sample data, and some state is stored in `localStorage`. No real inventory is queried, and no real reservations, payments, refunds, or external notifications are processed. Do not enter real payment credentials. This is an independent prototype and is not affiliated with Booking.com.
