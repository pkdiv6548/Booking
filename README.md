# StayFinder

A responsive hotel-discovery and booking-flow starter built with Next.js, React, TypeScript and Lucide. Designed to be imported into v0 and iterated page-by-page.

## Current milestone
- Responsive homepage with destination inspiration and sample stays
- Destination/date/guest search controls (demo interaction)
- Sample hotel cards, in-page filtering, wishlist hearts (local UI state)
- Accessible labels, mobile layout, visual design system
- INR-formatted sample prices with clear demo disclaimers

## Important limits
This is a prototype, not a production booking service. Listing content, ratings, prices and images are demo/sample content. There is no live hotel inventory, availability verification, booking persistence, authentication, email or payment processing yet. Do not accept real customer payments or claim reservations are confirmed.

## Planned milestones
1. Search-results route with filters and sorting
2. Hotel detail and room-selection routes
3. Checkout, booking confirmation, My Bookings
4. Login/signup/profile/wishlist
5. Partner property dashboard and admin routes
6. Supabase schema, authentication, row-level security, booking transactions and server-side integrations
7. Testing, accessibility review, and deployment checks

## API / licensing policy
- Maps: Leaflet + OpenStreetMap tiles may be added with visible attribution and a replaceable tile-provider adapter. Follow the tile provider's usage policy.
- Geocoding: Do not use the public Nominatim endpoint for autocomplete. It has strict usage rules and is not a generic no-code autocomplete backend.
- Nearby points of interest: optional OpenStreetMap/Overpass integration only with caching, attribution and usage limits; never treat map data as hotel availability.
- Weather: Open-Meteo's hosted free API is non-commercial; do not enable for a commercial deployment without a suitable license/plan or replacement provider.
- Hotel inventory: connect only a licensed provider or partner-supplied inventory; open map APIs do not provide bookable room inventory.
- Payments and private keys: keep secrets server-side; no real payment provider is configured.

## Run locally
```bash
npm install
npm run dev
```

## Import into v0
Open v0, import the GitHub repository `pkdiv6548/Booking`, and ask v0 to continue the existing Next.js project. Keep the existing visual direction and complete the next route milestone without replacing working components.
