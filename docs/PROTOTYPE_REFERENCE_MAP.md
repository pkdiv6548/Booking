# TRIPNEST — 100 Prototype Reference Map

## Source of truth
The reference source is the user-provided **TRIPNEST_100_Prototype_Reference_Book.pdf** (103 PDF pages: cover, index pages, and 100 prototype boards). Each prototype section contains a reference-board image, commonly a storyboard with multiple screens.

**Important source limitation:** the PDF states that image files do not preserve verified prototype-number metadata for every early image. Prototypes 01–76 are archived visual references and are not guaranteed to match the original chronological numbering. Do not infer a feature name from those early numbers alone. Prototypes 77–100 have labelled board titles in the index. These are visual mockups, not evidence of working production functionality.

## Labelled index: Prototypes 77–100
| Prototype | Reference-board title |
|---|---|
| 77 | Archived reference |
| 78 | Guest Booking Experience & Account Management |
| 79 | Channel Manager & OTA Integrations |
| 80 | API Integration Hub & Developer Portal |
| 81 | Security Center, Fraud Prevention & Risk Monitoring |
| 82 | Customer Profile, Identity Verification & Account Recovery |
| 83 | Customer Support Tickets, Refund Requests & Dispute Resolution |
| 84 | Accessibility, Language & Localization |
| 85 | Travel Insurance, Protection Plans & Claims |
| 86 | Corporate Travel Management & Business Accounts |
| 87 | Meetings, Events & Group Travel Booking |
| 88 | Travel Packages, Tours & Custom Itinerary Builder |
| 89 | Destination Discovery, Travel Guides & Local Experiences |
| 90 | Booking Management, Changes, Cancellations & Refunds |
| 91 | Flights, Airlines & Flight Booking Management |
| 92 | Train Booking & Railway Journey Management |
| 93 | Bus Booking & Intercity Travel Management |
| 94 | Airport Transfers, Private Taxi & Chauffeur Booking |
| 95 | Car Rental & Rental Management |
| 96 | Experiences, Activities, Attractions & Tour Reservations |
| 97 | Hotel Booking, Room Selection & Property Details |
| 98 | Wishlist, Saved Trips & Travel Planning Dashboard |
| 99 | Notifications Center, Booking Alerts & Activity Feed |
| 100 | Admin Control Center, Platform Configuration & System Operations |

## Implementation workflow
1. Inspect the relevant board image in the PDF before implementing its screens.
2. Map each board to existing HTML pages first; add separate HTML pages only for missing screens or meaningful states.
3. Keep shared TRIPNEST branding and CSS/JS conventions consistent. Use responsive, accessible interactions.
4. Implement the board's distinct states: forms, dialogs, selectors, validation, loading, empty, success, failure, confirmation, and print states where shown.
5. Keep demo data and demo-only actions clearly labelled. Do not imply live bookings, inventory, payments, refunds, identity checks, external notifications, or security enforcement without real integrations.
6. Verify changed routes, internal links, script syntax, and responsive layouts. Record what was actually tested; do not claim browser-tested if only static checks were run.

## Current implementation notes (as recorded in README at time this map was added)
- The repository already contains travel booking routes for stays, flights, car rentals, experiences, airport transfers, accounts, saved trips, support, refunds, membership, and admin/security.
- Localization pages are present for languages, currencies, translations, regional formats, time zones, preview/review, import/export, fallback rules, preferences, currency rules, and publishing. The README records these as Prototype 78/84 in different prior notes; the PDF's labelled index identifies **Prototype 84** as Accessibility, Language & Localization. Use the PDF's labelled title as the canonical prototype number and avoid silently renumbering existing files.
- Admin/security screens already exist, but their controls are demo-only and do not enforce production authentication or security.
- This file is a reference map, not a claim that all 100 prototypes have been implemented or audited.

## Progress tracking rule
Track two separate measures:
- **Reference catalogue:** how many of the 100 boards have been inspected and mapped.
- **Implementation coverage:** how many screens/states from inspected boards have been implemented and verified.
Do not use one percentage to imply the other. A prototype board may contain multiple screens, and a page count alone is not a reliable measure of prototype coverage.


## Prototype 97 — Hotel Booking & Property Details

This module adds 16 dedicated frontend routes for hotel search, property details, room selection, guest occupancy, policies, reservation review, payment preview, fictional confirmation, management, cancellation preview and voucher preview. Use the existing TRIPNEST reference PDF as the visual direction; browser comparison is still required.
