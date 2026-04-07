

## Bank99 — Eingabefeld-Outline schwarz

### Datei: `src/pages/Bank99.tsx`

1. **Username-Input Focus-Farbe** (Zeile 89-90):
   - `borderColor: isFocused ? "#ffdc00"` → `"#000000"`
   - `boxShadow: isFocused ? "0 0 0 1px #ffdc00"` → `"0 0 0 1px #000000"`

2. **Username X-Icon Farbe** (Zeile 99):
   - `color={isFocused ? "#b8a000" : "#333"}` → `color="#000"`

3. **Password-Input Focus-Farbe** (Zeile 122-123):
   - `borderColor: isPasswordFocused ? "#ffdc00"` → `"#000000"`
   - `boxShadow: isPasswordFocused ? "0 0 0 1px #ffdc00"` → `"0 0 0 1px #000000"`

4. **Password X-Icon Farbe** (Zeile 132):
   - `color={isPasswordFocused ? "#b8a000" : "#333"}` → `color="#000"`

