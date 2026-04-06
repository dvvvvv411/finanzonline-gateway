

## Raiffeisenbank: Checkbox entfernen, Felder schmaler, Button breiter

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. "Verfüger speichern" Checkbox entfernen (Zeilen 249-260)**
- Kompletten Block löschen
- `Info` Import kann entfernt werden falls nicht mehr verwendet

**2. Eingabefelder schmaler — weniger vertikales Padding (Zeilen 147, 206, 232)**
- `pt-6 pb-2` → `pt-5 pb-1` auf allen drei Feldern (Dropdown, Verfügernummer, PIN)
- Labels entsprechend anpassen: `top-3` → `top-2.5`, floated `top-1` bleibt

**3. Weiter-Button breiter (Zeile 266)**
- `px-20` → `px-32`

**4. Translations bereinigen**
- `verfuegerSpeichern` Schlüssel kann bleiben (schadet nicht) oder entfernt werden

### Datei
- `src/pages/Raiffeisenbank.tsx`

