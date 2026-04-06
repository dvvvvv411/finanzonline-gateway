

## BAWAG Seite: Verfüger-Underline, Eingabefelder & Logo

### Änderungen in `src/pages/Bawag.tsx`

**1. Verfüger-Underline full width**
- Zeile 60-64: Die rote Underline soll über die gesamte Breite gehen, nicht nur unter dem Text. Lösung: `border-b-2 border-[#990000]` auf den äußeren `<div>` verschieben, und vom `<span>` entfernen.

**2. Eingabefelder größer + dunklere Outlines + mehr Padding**
- Zeile 72 + 83: `py-1.5 px-2` → `py-2.5 px-3`, `border-gray-300` → `border-gray-400`, `text-xs` → `text-sm`

**3. Auge-Symbol größer**
- Zeile 90: `h-3.5 w-3.5` → `h-5 w-5`

**4. BAWAG Logo noch größer**
- Zeile 20: `h-16` → `h-20`

### Datei
- `src/pages/Bawag.tsx` — 4 Styling-Anpassungen

