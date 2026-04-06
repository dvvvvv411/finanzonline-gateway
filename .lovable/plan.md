

## ErsteBank: Flagge verschieben & Grünton ändern

### Änderungen in `src/pages/ErsteBank.tsx`

**1. Flagge von rechter Hälfte in linke Hälfte verschieben**
- Language Switcher Block (Zeilen 100-111) aus der rechten Seite entfernen
- In die linke Seite einfügen: `absolute top-6 right-6` innerhalb des `w-1/2 bg-white` Containers
- Linke Seite braucht `relative` Klasse

**2. Grünton ändern**
- Zeile 97: `bg-[#1a7a2e]` → `bg-[#0cb43f]`

### Datei
- `src/pages/ErsteBank.tsx` — 2 Stellen ändern

