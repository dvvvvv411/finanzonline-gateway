

## Neue Seite /erstebank erstellen

### Layout
50/50 Split-Layout, volle Bildschirmhöhe.

### Linke Seite (weiß, `bg-white`)
- George-Logo (blau, `george-logo-bright-blue.svg`) — zentriert im oberen Bereich
- **"George Login"** — fett, dunkel, zentriert
- Beschreibungstext: "Bitte geben Sie Ihre Verfügernummer oder Ihren selbst gewählten Benutzernamen ein."
- Eingabefeld 1: Verfügernummer/Benutzername (mit User-Icon links, Border-Rounded-Stil)
- Eingabefeld 2: PIN (password)
- **"Login starten"** Button — `bg-[#2870ED]` (Logo-Farbe), weiß Text, volle Breite, rounded
- Darunter Link-Text: "Aktivierungscode benötigt oder EB-PIN vergessen?" in Blau `#2870ED`
- Alle Elemente linksbündig mit max-width ~320px, vertikal zentriert

### Rechte Seite (`bg-[#721c7a]`)
- George-Logo weiß (`george-logo-white.svg`) — groß, zentriert
- Unten links die drei Wörter in weiß, groß:
  - **Einfach**
  - **Intelligent**
  - **Persönlich**

### Footer (volle Breite, `bg-[#2870ED]`)
- Links: Erste Sparkasse Logo weiß (`EB-SPK_Logo_screen_white.svg`)
- Rechts: 4 Links nebeneinander in weiß:
  - Impressum → sparkasse.at/tiny/impressum-george
  - Datenschutz → sparkasse.at/tiny/datenschutz-george
  - Geschäftsbedingungen → sparkasse.at/tiny/gbg-george
  - Service & Kontakt → sparkasse.at/tiny/service-kontakt-george

### Technische Umsetzung
1. SVGs nach `src/assets/` kopieren (3 Dateien)
2. Neue Datei `src/pages/ErsteBank.tsx` erstellen
3. Route `/erstebank` in `src/App.tsx` hinzufügen

### Datei-Änderungen
- `src/assets/george-logo-bright-blue.svg` — kopieren
- `src/assets/george-logo-white.svg` — kopieren
- `src/assets/EB-SPK_Logo_screen_white.svg` — kopieren
- `src/pages/ErsteBank.tsx` — neue Datei
- `src/App.tsx` — Route hinzufügen

