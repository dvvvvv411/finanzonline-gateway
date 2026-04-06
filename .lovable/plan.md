

## Tooltips nach rechts öffnen + Icons größer + mehr Abstand

### Änderungen in `src/pages/BankAustria.tsx`

**1. Icons größer (Zeilen 153, 180):**
- `h-6 w-6` → `h-8 w-8`

**2. Mehr Abstand zwischen Input und Icon (Zeilen 138, 165):**
- `gap-2` → `gap-4`

**3. Tooltip-Position nach rechts (Zeilen 155, 182):**
- Von: `absolute right-0 bottom-full mb-3` (öffnet nach oben-links)
- Zu: `absolute left-full ml-3 top-1/2 -translate-y-1/2` (öffnet nach rechts, vertikal zentriert zum Icon)

**4. Dreieck-Pfeil anpassen (Zeilen 157, 184):**
- Von: Pfeil zeigt nach unten (unter der Blase)
- Zu: Pfeil zeigt nach links (zur linken Seite der Blase, Richtung Icon)
- Position: `absolute right-full top-1/2 -translate-y-1/2`
- Border: `borderTop: 8px solid transparent, borderBottom: 8px solid transparent, borderRight: 8px solid white`

### Datei
- `src/pages/BankAustria.tsx` — Zeilen 138-185

