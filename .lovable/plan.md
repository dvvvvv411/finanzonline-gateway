

## Fix: Sprachauswahl-Dropdown wird von Card abgeschnitten

### Datei: `src/pages/Oberbank.tsx`

**Problem:** Das Dropdown-Menü mit 5 Sprachen wird durch die Card abgeschnitten (`overflow: hidden` auf der Card oder dem Container). Slowakisch als letzte Option ist nicht sichtbar.

**Lösung (Zeile 416-429):**
1. `zIndex` von `10` auf `9999` erhöhen, damit das Dropdown über allen anderen Elementen liegt.
2. `overflow: "hidden"` entfernen — das Dropdown selbst braucht kein overflow-hidden, es schneidet sich sonst selbst ab.
3. Auf dem übergeordneten Card-Container (der das Login-Formular enthält) `overflow: "visible"` setzen, damit das Dropdown über die Card-Grenzen hinaus sichtbar ist.

### Technische Details
- Zeile 424: `zIndex: 10` → `zIndex: 9999`
- Zeile 427: `overflow: "hidden"` entfernen oder auf `"visible"` ändern
- Den Card-Container (der die Login-Box umschließt) prüfen und ggf. `overflow: "visible"` setzen, damit das absolut positionierte Dropdown nicht abgeschnitten wird.

