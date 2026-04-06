

## Sprachauswahl-Dropdown wie im Screenshot anpassen

### Problem
Aktuell ist der Trigger nur ein kleiner Textlink. Im Screenshot sieht man einen **gerahmten, breiten Button** mit großem Chevron — wie ein eigenes Select-Feld.

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**Trigger-Button (Zeilen 97-103):**
- Breiter gerahmter Button: `border border-gray-300 rounded-md px-4 py-2 min-w-[160px] justify-between`
- Text größer: `text-base` statt `text-sm`
- Chevron größer: `h-5 w-5` statt `h-4 w-4`
- Hintergrund weiß: `bg-white`

**Dropdown-Menü (Zeilen 105-120):**
- Breite an Trigger anpassen: `min-w-full` statt `min-w-[140px]`
- Kein `mt-1` Gap, direkt anschließend: `mt-0 top-full`
- Rounded nur unten: `rounded-t-none rounded-b-md`
- Border oben entfernen: `border-t-0`
- Items Text größer: `text-base`
- Checkmark größer: `h-5 w-5`

### Datei
- `src/pages/Raiffeisenbank.tsx` — Zeilen 96-121

