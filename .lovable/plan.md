## Info-Card & Footer Anpassungen (`src/pages/ChObwaldnerKantonalbank.tsx`)

### Info-Card (Hilfe-Links)
- Mobile: vertikales Padding der Items von `py-4` → **`py-2`** (Desktop bleibt `py-4` via `md:py-4`)
- Icon `ChevronRight` (Klammer) → **`ArrowRight`** (richtiger Pfeil)
- Schatten verstärken: `shadow-md` → **`shadow-xl`** im Mobile

### Footer
- `flex-col` am Root entfernen damit Footer NICHT mehr durch `flex-1`-Main ans Seitenende gedrückt wird → stattdessen Standard-Blocklayout
- Footer-Margin im Mobile auf **`mt-6`** (klein, sichtbar unter der Card, nicht vom Schatten überlagert)
- Page-Root behält `min-h-screen` aber ohne `flex flex-col`/`flex-1` – stattdessen normales Stacking, Mobile-BG `#f5f5f5` bleibt

Keine weiteren Änderungen.
