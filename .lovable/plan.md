
## HYPO NOE — Passwort-Feld hinzufügen

### Änderungen in `src/pages/HypoNoe.tsx`

Nach dem Benutzername-Eingabefeld (ca. Zeile 90) wird ein identischer Block eingefügt:

- Label: `Passwort` (gleicher Style wie "Benutzername": `font-semibold text-xs`, Farbe `#999`)
- Input: `type="password"`, gleiche Styles (bg `#f1f1f1`, border `#dedede`, Focus: bg `#d6e5f4`, border `#0066cc`)
- Clear-Button (X-Icon) wenn Inhalt vorhanden
- Neuer State: `password` + `isPasswordFocused`

### Datei
- `src/pages/HypoNoe.tsx`
