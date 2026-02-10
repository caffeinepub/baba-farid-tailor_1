# Specification

## Summary
**Goal:** Replace the header’s current logo placeholder (scissors icon) with the user-provided logo image in a clean, responsive way.

**Planned changes:**
- Add the uploaded logo image (1770202565370.png) as a static frontend asset and render it in the header branding area instead of the scissors placeholder.
- Ensure the header logo scales appropriately across mobile and desktop without overflow or layout shifts.
- Provide meaningful English alt text for the logo (e.g., "Baba Farid Tailor logo") and a safe fallback if the image fails to load (e.g., the existing placeholder or text-only fallback).

**User-visible outcome:** The site header displays the Baba Farid Tailor logo image (with proper sizing and alt text) instead of the scissors icon, and remains stable/responsive even if the image fails to load.
