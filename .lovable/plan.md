

## Neue Seite `/bankhausspaengler` — Kopie von Schelhammer mit Anpassungen

### Vorbereitungen
1. **Hintergrundbild kopieren** — `user-uploads://spaengler.png` → `src/assets/spaengler-bg.png`
2. **Route hinzufügen** — `/bankhausspaengler` in `src/App.tsx`

### Neue Datei: `src/pages/BankhausSpaengler.tsx`
Komplettkopie von `Schelhammer.tsx` mit folgenden Änderungen:

1. **Header & Logo entfernen** — Kompletter `<header>` Block weg. Kein Logo-Import.

2. **Hintergrundbild** — `schelhammerBg` → `spaenglerBg` (importiert aus `spaengler-bg.png`)

3. **Farbe `#d31220` → `#43638d`** überall:
   - Card-Header-Bar Hintergrund
   - Weiter-Button Hintergrund
   - Focus-States der Inputs (boxShadow, borderColor)
   - X-Button-Farbe bei Focus

4. **Eingabefelder immer "aktiviert" aussehen**:
   - Standard-Hintergrund: `#dee3eb` (statt `#f1f1f1`)
   - Standard-Border: `#43638d` (statt `#dedede`)
   - Standard-boxShadow: `0 0 0 1px #43638d` (statt `none`)
   - Focus-Hintergrund bleibt `#dee3eb`, Focus-Border bleibt `#43638d`

5. **English-Text Farbe** — `#d31220` → `#b0916b`

6. **"Sie melden sich zum ersten Mal an?"** — Bleibt entfernt (wie gewünscht, Block wird nicht eingefügt)

7. **"Benutzername vergessen" / "Passwort vergessen"**:
   - Fragezeichen hinzufügen: `"Benutzername vergessen?"` / `"Passwort vergessen?"`
   - Englisch: `"Forgot username?"` / `"Forgot password?"`
   - Farbe: `#b0916b` (statt `#d31220`)

8. **Neuer Link "Live Hilfe"** unter den vergessen-Links:
   - Info-Icon (Kreis mit "i") davor, aus lucide-react (`Info`)
   - Text: `"Live Hilfe"` / EN: `"Live Help"`
   - Farbe: `#b0916b`

### Datei: `src/App.tsx`
- Import `BankhausSpaengler` und Route `/bankhausspaengler` hinzufügen

