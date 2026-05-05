# Refinements

In `src/pages/Denizbank.tsx`:

1. **Willkommen Headline** (currently dimmed by the page's `bg-black/50` overlay):
   - Increase size: `text-4xl md:text-6xl` → `text-5xl md:text-7xl`
   - Bolder: `font-bold` → `font-extrabold`
   - Ensure visibility above the dark overlay by raising z-index/contrast: add `text-white drop-shadow-lg relative z-10`

2. **Info Popovers** (Benutzer speichern + Kundennummer i-icons):
   - Make backgrounds slightly translucent with subtle blur:
   - `bg-[#555]` → `bg-[#555]/85 backdrop-blur-sm`

No other changes.
