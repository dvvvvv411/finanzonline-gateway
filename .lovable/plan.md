

## Raiffeisenbank: Card breiter, Focus-Styling, Chevron größer

### Änderungen in `src/pages/Raiffeisenbank.tsx`

1. **Card breiter** (Zeile 51): `max-w-md` → `max-w-lg` damit der Beschreibungstext und das Label einzeilig passen

2. **Eingabefelder dunkler bei Focus** (Zeilen 72, 126, 141): `bg-[#f4f4f4]` bekommt zusätzlich `focus:bg-[#e8e8e8]` (Inputs) bzw. beim Dropdown: wenn `selectOpen`, dann `bg-[#e8e8e8]` statt `bg-[#f4f4f4]`

3. **Chevron größer** (Zeile 80): `h-4 w-4` → `h-5 w-5`

### Datei
- `src/pages/Raiffeisenbank.tsx` — 4 Stellen ändern

