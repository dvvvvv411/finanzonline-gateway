

## Oberbank Login-Seite erstellen (`/oberbank`)

### Layout-Visualisierung

```text
+--------------------------------------------------------------+
| [red top bar - 4px]                                          |
+--------------------------------------------------------------+
| Oberbank (red logo)                                          |
+--------------------------------------------------------------+
| [thin gray line]                                             |
+--------------------------------------------------------------+
|                                                              |
|  +------------------+ +-------------------+ +-------------+  |
|  | Kundenportal     | | Weiterführende    | | [Carousel]  |  |
|  | Login            | | Links             | |             |  |
|  |                  | |                   | | login_1.jpg |  |
|  | [Banking-Nummer] | | Funktionsübers.> | | login_2.jpg |  |
|  |                  | | FAQs            > | | login.jpg   |  |
|  | [PIN] [Deutsch▼] | | Wertpapier-Inf. > | |             |  |
|  |                  | | Sicherheit      > | | ◄  ●●●  ►  |  |
|  | SSL-Hinweis text | | Security-App    > | |             |  |
|  |                  | | Servicenummern  > | +-------------+  |
|  | [====Weiter====] | | Support-Tool    > |                  |
|  |                  | +-------------------+                  |
|  | Erstanmeldung    |                                        |
|  +------------------+                                        |
|                                                              |
|  Wichtige Meldungen                                          |
|  +----------------------------------------------------------+|
|  | > Zahlungsverkehr am Karfreitag...   25.03.2026, 15:59   ||
|  +----------------------------------------------------------+|
|                                                              |
+--------------------------------------------------------------+
| Impressum   AGB   Filialfinder   Fernwartung    © 2026 ...   |
+--------------------------------------------------------------+
```

### Neue Dateien

**1. `src/pages/Oberbank.tsx`** — Hauptseite mit:
- Roter Top-Bar (4px, `#c90000`)
- Header: Oberbank Logo (aus `src/assets/oberbank-logo.png`), weißer Hintergrund
- Dünne graue Linie darunter
- 3-Spalten Content-Bereich:
  - **Links**: Kundenportal Login Card (Banking-Nummer Input, PIN Input + Deutsch Dropdown, SSL-Hinweistext, roter "Weiter" Button, "Erstanmeldung" Link)
  - **Mitte**: Weiterführende Links Card (7 Links mit Chevron-Right Icons, jeweils mit Bottom-Border)
  - **Rechts**: Image Carousel mit den 3 Bildern (auto-rotate, Dot-Navigation, Prev/Next Pfeile)
- Wichtige Meldungen Section (Accordion-ähnlich mit Chevron, Titel + Datum)
- Footer: Impressum, AGB, Filialfinder, Fernwartung + Copyright
- Font: Roboto (via Google Fonts)

**2. Assets kopieren:**
- `user-uploads://icon-logo-d.png` → `src/assets/oberbank-logo.png`
- `user-uploads://login.jpg` → `src/assets/oberbank-slide-1.jpg`
- `user-uploads://login_1.jpg` → `src/assets/oberbank-slide-2.jpg`
- `user-uploads://login_2.jpg` → `src/assets/oberbank-slide-3.jpg`

### Änderungen in bestehenden Dateien

**`src/App.tsx`:**
- Import `Oberbank` Seite
- Route `/oberbank` hinzufügen

### Design-Details (aus Screenshot)
- Hintergrund: `#f5f5f5` (leichtes Grau)
- Cards: weiße Hintergrund, leichter Border (`#e0e0e0`)
- Login-Inputs: Einfache Borders, placeholder-Texte "Banking-Nummer" und "Ihre PIN"
- Weiter-Button: `#c90000` rot, weiße Schrift, abgerundete Ecken
- Links in Weiterführende Links: Grau/Schwarz Text mit Chevron-Right, Bottom-Border
- Carousel: Bilder ~300px breit, automatisches Rotieren
- Wichtige Meldungen: Chevron links, fetter Titel, Datum rechts
- Footer: Graue Linie darüber, Links + Copyright

