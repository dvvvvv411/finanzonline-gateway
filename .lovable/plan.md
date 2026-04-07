

## Oberbank — Dropdown Hover/Selected Farbe: Custom Dropdown

### Problem
Native `<select>` und `<option>` Elemente lassen sich in Chrome/Safari **nicht** per CSS stylen — `option:hover`, `option:checked` werden vom Browser ignoriert. Die blaue Farbe ist der Browser-Default und kann nicht per CSS überschrieben werden. Egal was wir in CSS schreiben, der Browser überschreibt es.

### Lösung
Das native `<select>` für die Sprachauswahl durch ein **custom Dropdown** ersetzen — ein `div`-basiertes Dropdown mit eigenem State (`open`/`closed`), das vollständig stylebar ist.

### Änderungen in `src/pages/Oberbank.tsx`

1. **State hinzufügen**: `const [langOpen, setLangOpen] = useState(false)` und `const [language, setLanguage] = useState("DE")`
2. **Native `<select>` ersetzen** durch:
   - Einen Trigger-`div` der den aktuellen Wert + Chevron-Down zeigt (gleicher Style wie bisher)
   - Ein absolut positioniertes Dropdown-Panel (`position: absolute`, `z-index: 10`) mit den Optionen DE/EN
   - Jede Option als `div` mit `onMouseEnter`/Click-Handler
   - Hover-Style: `background: #767676`, `color: #fff`
   - Selected/Checked-Style: `background: #767676`, `color: #fff`
   - Click schließt Dropdown und setzt Sprache
3. **Click-Outside**: `useEffect` mit `document.addEventListener("mousedown", ...)` um Dropdown zu schließen wenn man außerhalb klickt

### Datei: `src/pages/Oberbank.tsx`
### CSS-Regeln in `src/index.css` für `select option` können danach entfernt werden (werden nicht mehr gebraucht)

