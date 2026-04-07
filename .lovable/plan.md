

## Volksbank — Passwort-Eingabefeld hinzufügen

### Datei: `src/pages/Volksbank.tsx`

1. **Neuer State** — `password` und `isPasswordFocused` hinzufügen

2. **Passwort-Label** nach dem Username-Input (nach Zeile 95):
   - `<span className="font-semibold text-xs" style={{ color: "#999" }}>` mit `{lang === "de" ? "Passwort" : "Password"}`

3. **Passwort-Input** — identisch zum Username-Input, aber `type="password"`, eigener State (`password`, `isPasswordFocused`), eigener X-Button zum Leeren. Gleiche Styles (Hintergrund `#e8e8e8` / `#d6e5f4`, Border `#999` / `#196bc1`)

4. **Reihenfolge**: Username-Label → Username-Input → Passwort-Label → Passwort-Input → Divider → Weiter-Button → …

