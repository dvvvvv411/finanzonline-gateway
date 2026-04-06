

## Raiffeisenbank-Seite: Styling-Fixes

### Änderungen in `src/pages/Raiffeisenbank.tsx`

1. **Eingabefelder Hintergrund `#f4f4f4`** (Zeilen 65, 88, 103): `bg-transparent` → `bg-[#f4f4f4]` auf allen drei Feldern (Select + 2 Inputs). Auch Padding links hinzufügen (`px-3`) damit es wie ein gefülltes Feld aussieht.

2. **Dropdown umbauen** (Zeilen 50-79): Das Select-Feld soll wie im Screenshot aussehen — gefüllter Hintergrund `#f4f4f4`, mit Underline, Chevron-Up-Icon wenn offen. Die ausgewählte Option hat einen gelben Hintergrund mit Häkchen. Da native `<select>` das nicht kann, behalte ich das native Select aber style es mit `bg-[#f4f4f4]` und `px-3`.

3. **Weiter-Button** (Zeilen 111-117): 
   - Farbe von `#FFC72C` → `#fbf315`
   - `w-full` entfernen, stattdessen `px-12` für Breite
   - Button in einem zentrierten Container: `<div className="flex justify-center">`

4. **Text full width** (Zeile 45): `text-sm` beibehalten, aber sicherstellen dass der Beschreibungstext die volle Breite nutzt — kein `max-width` oder Einschränkung.

### Datei
- `src/pages/Raiffeisenbank.tsx` — 4 Bereiche ändern

