
## Bank99 — Passwort-Eingabefeld hinzufügen

### Datei: `src/pages/Bank99.tsx`

1. **Neuer State** — `password` und `isPasswordFocused` analog zu `username`/`isFocused`

2. **Passwort-Label** nach dem Username-Input (nach Zeile 100):
   - `<span className="font-normal text-sm" style={{ color: "#999" }}>` mit `{lang === "de" ? "Passwort" : "password"}`

3. **Passwort-Input** — identisch zum Username-Input, aber `type="password"`, eigener State (`password`, `isPasswordFocused`), eigener X-Button zum Leeren

4. **Reihenfolge**: Username-Label → Username-Input → Passwort-Label → Passwort-Input → Divider → Weiter-Button → …
