

## Bank99 Seite — Design-Anpassungen

### Datei: `src/pages/Bank99.tsx`

**1. Header Background** (Zeile 14)
- `backgroundColor: "#fff"` → `"#eceff4"`

**2. "Anmelden" Titel größer** (Zeile 33)
- `text-xl` → `text-2xl`

**3. Begrüßungstext kleiner + bold** (Zeile 42)
- `text-base` → `text-sm font-bold`

**4. Divider unter Begrüßung nicht full-width** (Zeile 49)
- `-mx-6` entfernen → `<hr className="border-gray-200" />` (bleibt innerhalb des Paddings)

**5. "Benutzername" Label — regular font** (Zeile 53)
- `font-semibold` → `font-normal`

**6. "barrierefrei" Link + Strich entfernen** (Zeile 57-65)
- Zeile 57-65 komplett löschen (der `<a>barrierefrei</a>` und der `<span>|</span>`)

**7. "English/Deutsch" Link — blau + underline** (Zeile 72-73)
- `style={{ color: "#333" }}` → `style={{ color: "#007ed1" }}`
- `className="hover:underline"` → `className="underline"`

**8. Eingabefeld weiß** (Zeile 90)
- `backgroundColor: isFocused ? "#fef9c3" : "#e8e8e8"` → `"#fff"` für beide Zustände

**9. "Benutzername vergessen?" — blau + underline** (Zeile 122-123)
- `style={{ color: "#333" }}` → `style={{ color: "#007ed1" }}`
- `className="text-[15px] no-underline hover:underline"` → `className="text-[15px] underline"`

