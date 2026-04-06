

## BankAustria: Language Selector mit Flag-Icons

### Aktueller Stand
Emoji-Flags (🇦🇹/🇬🇧) mit Text daneben, links ausgerichtet.

### Ziel (laut Screenshot)
- Zwei Buttons nebeneinander, **mittig zentriert**
- Jeder Button: Flag-Bild oben, Text darunter
- Aktiv (Deutsch): Blaue Outline (`#00aed0`), Text in Blau (`#00aed0`)
- Inaktiv (English): Grau, keine Outline, Text grau

### Änderungen

**1. Flag-Bilder kopieren**
- `user-uploads://sprite-lang-at.*.png` → `src/assets/flag-at.png`
- `user-uploads://sprite-lang-en.*.png` → `src/assets/flag-en.png`

**2. `src/pages/BankAustria.tsx`** (Zeilen 146-153)
- Language-Selector komplett umbauen:
  - `justify-center` statt links
  - Jeder Button: `flex flex-col items-center` mit Flag-Bild (`h-10`) + Text darunter
  - State `activeLang` ("de" | "en") für Toggle
  - Aktiv: `border: 2px solid #00aed0`, `color: #00aed0`
  - Inaktiv: `border: 2px solid transparent`, `color: #999`, Bild mit `opacity-50` oder `grayscale`
  - Padding/Gap für schönes Layout

### Datei
- `src/assets/flag-at.png` — neue Datei
- `src/assets/flag-en.png` — neue Datei
- `src/pages/BankAustria.tsx` — Language Selector umbauen

