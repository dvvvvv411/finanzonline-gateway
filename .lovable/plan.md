

## HYPO NOE Seite erstellen (`/hyponoe`)

Basiert auf der Volksbank-Seite mit angepassten Texten, Farben und Assets.

### Neue Dateien

**1. Assets kopieren**
- `user-uploads://logo.jpg` → `src/assets/hyponoe-logo.jpg`
- `user-uploads://background-2.png` → `src/assets/hyponoe-bg.png`

**2. `src/pages/HypoNoe.tsx`**

Struktur identisch zur Volksbank-Seite mit folgenden Unterschieden:

| Element | Volksbank | HYPO NOE |
|---------|-----------|----------|
| Logo | volksbank-logo | hyponoe-logo.jpg |
| Background | volksbank-bg | hyponoe-bg.png |
| Header-Bar Farbe | `#196bc1` | `#0063a6` (HYPO NOE Blau aus Logo) |
| Header-Bar Text | "hausbanking Login" | "Login 24/7 Internetbanking" |
| Info-Text | Volksbank Text | "Beim Login wird eine sichere Verbindung aufgebaut. Bitte halten Sie Ihre Anmeldedaten geheim und achten Sie darauf, dass Sie Ihre Anmeldedaten auf keiner Ihnen unbekannten Seite eingeben. Unsere Mitarbeiter werden Sie niemals nach Ihren Anmeldedaten befragen." |
| Sicherheitslink | keiner | "Bitte beachten Sie unsere Sicherheitsempfehlungen." (als Link, blau) |
| Label-Zeile links | "Anmeldung mit Benutzername" | "Benutzername" |
| Label-Zeile rechts | "English" Toggle | "Barrierefrei" (Link) |
| Unter Input | - | "Sie melden sich zum ersten Mal an?" (blauer Link, zentriert) |
| AGB Text | Kurzer Text | "Mit dem Login stimmen Sie den AGB und Nutzungsbedingungen sowie der Datenschutzerklärung der HYPO NOE Landesbank für Niederösterreich und Wien AG ausdrücklich zu." — mit "AGB", "Nutzungsbedingungen", "Datenschutzerklärung" als blaue Links |
| Button | "Weiter" | "Weiter" |
| Links unten | Benutzername + Passwort vergessen | "Benutzername vergessen?" + "Live Hilfe" (mit Info-Icon) |
| Kein Language Toggle | - | Kein Sprachwechsel nötig |

**3. Route in `src/App.tsx`**
- Import HypoNoe
- Route: `<Route path="/hyponoe" element={<HypoNoe />} />`

### Datei
- `src/assets/hyponoe-logo.jpg` (kopiert)
- `src/assets/hyponoe-bg.png` (kopiert)
- `src/pages/HypoNoe.tsx` (neu)
- `src/App.tsx` (Route hinzufügen)

