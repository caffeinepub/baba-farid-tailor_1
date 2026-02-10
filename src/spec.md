# Specification

## Summary
**Goal:** Use the user-uploaded Traditional Wear photos as real catalog card images (starting with “Pathani Kurta”) instead of placeholder visuals.

**Planned changes:**
- Add the two uploaded photos to frontend static assets and create 4:3 cropped/resized variants for consistent catalog card display.
- Update the Catalog UI to render card images from `style.image` (with a clean fallback if an image is missing or fails to load).
- Update catalog data returned by `getCatalog()` so relevant Traditional Wear styles reference the new static image paths (at minimum map “Pathani Kurta” to one uploaded photo).

**User-visible outcome:** In the Catalog section, Traditional Wear style cards (including “Pathani Kurta”) display the uploaded photos in the existing 4:3 image area, with a graceful fallback if an image can’t be shown.
