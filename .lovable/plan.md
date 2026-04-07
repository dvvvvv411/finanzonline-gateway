

## Oberbank — Login Card: Eingabefelder + Erstanmeldung Fix

### Änderungen in `src/pages/Oberbank.tsx`

#### 1. Platzhaltertext verschwindet bei Fokus
Die nativen HTML `<input>` Elemente mit `placeholder` zeigen den Platzhaltertext standardmäßig nur wenn leer — das funktioniert bereits. **Kein Code-Change nötig**, da `placeholder` bei fokussiertem, leerem Feld sichtbar bleibt (Browser-Standard). Falls gewünscht, dass der Placeholder auch bei Fokus verschwindet (bevor man tippt), wird per CSS `input:focus::placeholder { opacity: 0; }` in `src/index.css` hinzugefügt.

#### 2. PIN-Feld: Show/Hide Passwort mit Eye-Icon
- Neuer State: `showPin` (boolean)
- PIN-Input wird in ein `div` mit `position: relative` gewrappt
- `type` wird dynamisch: `showPin ? "text" : "password"`
- Wenn `pin.length > 0`: Eye-Icon (`Eye` / `EyeOff` aus lucide-react) wird rechts im Input angezeigt (absolut positioniert)
- Klick auf Icon togglet `showPin`

#### 3. Erstanmeldung vertikal zentrieren
Der Footer-Bereich (Zeile 197-215) hat `padding: "12px 20px"` — zusätzlich `display: "flex"`, `alignItems: "center"`, `justifyContent: "flex-end"` setzen, damit "Erstanmeldung" vertikal mittig im Footer-Bereich sitzt. `marginTop: 20` durch `marginTop: "auto"` ersetzen, damit der Footer-Bereich den restlichen Platz der Card einnimmt.

### Dateien
- `src/pages/Oberbank.tsx` — State, PIN-Wrapper, Eye-Icons, Erstanmeldung-Layout
- `src/index.css` — `input:focus::placeholder { opacity: 0; }` Regel

