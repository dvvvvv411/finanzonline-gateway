

## Schelhammer — Button schmaler, Passwort-Feld, Label-Abstände

### Datei: `src/pages/Schelhammer.tsx`

1. **Neuer State** — `password` und `isPasswordFocused` hinzufügen

2. **Weiter-Button schmaler** (Z.120): `w-full` → `w-3/4 mx-auto block` (oder ähnlich, ca. 75% Breite)

3. **Labels auf `font-normal`** (Z.53): `font-semibold` → `font-normal` bei "Benutzername", und auch beim neuen "Passwort"-Label

4. **Benutzername Label + Input in `space-y-1` wrappen** — Label-Div (Z.52-68) + Input-Div (Z.71-94) in `<div className="space-y-1">` packen

5. **Passwort-Feld einfügen** nach dem Username-Block:
   - Neues `<div className="space-y-1">` mit:
     - Label: `<span className="font-normal text-sm" style={{ color: "#999" }}>{lang === "de" ? "Passwort" : "Password"}</span>`
     - Identisches Input wie Username, aber `type="password"`, eigener State (`password`, `isPasswordFocused`), eigener X-Button

6. **Reihenfolge**: Username-Block → Passwort-Block → "Erste Anmeldung"-Link → Terms → Divider → Button → …

