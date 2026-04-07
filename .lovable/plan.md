

## Fixes für das Volksbank-Eingabefeld

### Problem 1: Focus-Hintergrund funktioniert nicht
Das inline `style={{ backgroundColor: "#e8e8e8" }}` überschreibt Tailwinds `focus:bg-[#d6e5f4]`, weil inline Styles immer höhere Priorität haben. **Lösung:** `isFocused` State einführen und die Background-Farbe dynamisch per inline Style setzen.

### Problem 2: X-Icon zu klein und Farblogik
- `size={18}` → `size={24}` (deutlich größer)
- Farbe abhängig von `isFocused`: blau (`#196bc1`) wenn fokussiert, schwarz wenn nicht

### Änderungen in `src/pages/Volksbank.tsx`

**1. Neuer State:** `const [isFocused, setIsFocused] = useState(false);`

**2. Input-Feld:** `onFocus` und `onBlur` Handler hinzufügen, inline `backgroundColor` dynamisch: `isFocused ? "#d6e5f4" : "#e8e8e8"`, `borderColor` dynamisch: `isFocused ? "#196bc1" : "#999"`

**3. X-Icon:** `size={18}` → `size={24}`, `color` dynamisch: `isFocused ? "#196bc1" : "#333"`

### Datei
- `src/pages/Volksbank.tsx`

