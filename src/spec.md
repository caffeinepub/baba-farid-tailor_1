# Specification

## Summary
**Goal:** Build a premium multi-page website for “Baba Farid Tailor” with a backend-driven catalog and an online measurement-based order form.

**Planned changes:**
- Create pages/sections: Home, About Us, Catalog, Order Now, Contact Us with header navigation and active section highlighting.
- Add a top header featuring “Baba Farid Tailor” plus a clearly marked, responsive logo placeholder area.
- Show mobile number and email in a top bar and/or footer using easily editable placeholder constants.
- Implement a Catalog section with cards/tiles for Suits, Shirts, Pants, and Traditional wear; allow selecting a category/style to prefill or carry into the Order Now form; load catalog data from the backend.
- Implement an Order Now page with a form to select category/style, enter measurements (at least Length, Chest, Waist, Shoulder), show size-chart guidance, validate inputs, submit to backend, and display confirmation with an order reference.
- Create a single Motoko actor backend API/data model to fetch catalog data, create orders (returning a unique order ID), and list orders for testing; persist data across upgrades per template support.
- Add an About Us section with professional English copy highlighting bespoke tailoring expertise and premium craftsmanship.
- Add a Contact Us section with phone/email, location placeholder text, and a contact form (Name, Email or Phone, Message) with validation; optionally store inquiries in the backend with confirmation, otherwise clearly indicate UI-only behavior.
- Apply a premium theme using Charcoal Grey with Gold accents (optional Deep Blue highlights) with consistent typography, spacing, and component styling (avoid default blue/purple look).
- Use React Query for catalog fetching and order submission (and inquiry submission if implemented), including loading and error states.
- Add generated static images in `frontend/public/assets/generated` and use them to enhance the premium aesthetic without layout/readability issues.

**User-visible outcome:** Visitors can browse a premium tailoring site, view a catalog of categories/styles, submit an order with measurements and receive an order reference, and use a contact page to send a message (stored in backend if implemented) while always seeing clear phone/email contact details.
