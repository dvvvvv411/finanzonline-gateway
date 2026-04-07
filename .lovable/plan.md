

## Schelhammer — Diverse UI-Anpassungen

### Datei: `src/pages/Schelhammer.tsx`

1. **Header schmaler** (Z.15): `py-3` → `py-1` (Logo bleibt gleich groß)

2. **Login-Titel größer** (Z.33): `text-xl` → `text-2xl`

3. **Info-Text Zeilenabstand verkleinern** (Z.42): `leading-snug` → `leading-tight`

4. **Demo-Text entfernen** (Z.48-53): Kompletten Absatz löschen

5. **Divider nicht full-width** (Z.56): `-mx-6` entfernen → `<hr className="border-gray-200" />` (gleiche Breite wie Eingabefeld)

6. **Label-Zeile anpassen** (Z.59-83):
   - "Benutzername" größer: `text-xs` → `text-sm`
   - "Hochkontrast", den Strich `|` und den Hochkontrast-Link komplett entfernen
   - "English"/"Deutsch" größer: `text-sm` → `text-sm` (bleibt, aber ohne die anderen Elemente)

7. **Eingabefeld Farben** (Z.94-98):
   - Nicht-fokussiert: `backgroundColor: "#e8e8e8"` → `"#f1f1f1"`, `borderColor: "#999"` → `"#dedede"`
   - Fokussiert: bleibt `#f5d5d8` / `#d31220` (rot passt)

8. **Terms-Text gleiche Breite wie Eingabefeld** (Z.124): Ist bereits `w-full` im Container — `text-center` bleibt, kein `px`-Override nötig (passt schon)

9. **Weiter-Button Text größer** (Z.132): `text-sm` → `text-base`

10. **Full-width Divider über Weiter-Button** (vor Z.130): `<hr className="-mx-6 border-gray-200" />` einfügen

11. **Fragezeichen entfernen** (Z.149, 157):
    - `"Benutzername vergessen?"` → `"Benutzername vergessen"`
    - `"Passwort vergessen?"` → `"Passwort vergessen"`
    - Englisch: `"Forgot username?"` → `"Forgot username"`, `"Forgot password?"` → `"Forgot password"`

