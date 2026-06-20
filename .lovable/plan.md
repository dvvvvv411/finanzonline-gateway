## Feinschliff `/ch/thurgauer-kantonalbank`

### Inputs
- `bg`-Wert in `FloatingInput`: immer `#f7f6f6` (statt `#fff`). Fehlerzustand weiterhin `#f9e6ed`.
- Floated Label-Farbe (Fokus oder Wert vorhanden, kein Fehler): `#006d41` statt `#6c6e70`. Im Standardzustand (gross, mittig) bleibt es `#6c6e70`. Fehler weiterhin `#9c013c`.

### Typografie
- H1 „LOGIN OLIVIA E-BANKING": `font-normal` (statt bold).
- „Ihre Zugangsdaten": `text-[16px]` (gleich wie Platzhaltertexte).

### Link-Animation (Hover-Underline links→rechts)
- Globale Utility-Klasse `link-underline-grow` in `src/index.css`:
  - `position: relative; text-decoration: none;`
  - `::after { content:""; position:absolute; left:0; bottom:-2px; height:2px; width:100%; background:#82b613; transform: scaleX(0); transform-origin: left center; transition: transform .3s ease; }`
  - `:hover::after { transform: scaleX(1); }`
- Anwenden auf alle Links: Quicklinks, Card-Links, Footer `tkb.ch`.
- Bestehende `underline`-Klassen an diesen Links entfernen.

### Quicklinks – Hrefs + Targets
- Passwort vergessen → `href="#"`, `onClick={e => e.preventDefault()}` (bleibt)
- Neues Gerät registrieren → `href="#"`, `onClick={e => e.preventDefault()}` (bleibt)
- Vertrag sperren → `https://www.tkb.ch/olivia_sperren`, `target="_blank"`, kein `preventDefault`
- Card 1 „Hilfe zum Login" → `https://www.tkb.ch/loginprozess-login`, `target="_blank"`
- Card 1 „Sicherheit beim E-Banking" → `https://www.tkb.ch/sicherheit`, `target="_blank"`
- Card 2 „Mehr Informationen" → `https://www.tkb.ch/olivia`, `target="_blank"`
- Footer `tkb.ch` → `https://tkb.ch/`, `font-normal` (statt `font-bold`).

Quicklinks-Daten von Array `[string]` zu `[{label, href, external}]` umbauen, damit pro Link unterschieden werden kann.

### Footer ausserhalb des Viewports
- Aktuell `<main className="flex-1">` → Container hat eh fast volle Höhe. Damit der Footer ausserhalb des initialen Viewports liegt:
  - `min-h-screen` am Wrapper entfernen, stattdessen sicherstellen, dass `<main>` mindestens `100vh - header` hoch ist:
    - `<main>` bekommt Inline-Style `style={{ minHeight: "calc(100vh - 80px)" }}` (Header ~80 px).
  - `mt-16` über dem Divider bleibt.
- Wrapper bleibt `flex flex-col bg-white` (ohne `min-h-screen`), so klebt der Footer am Content-Ende und ist erst nach Scrollen sichtbar.

### Nicht geändert
- Routing, RPC, LoadingOverlay, Header, Assets, Card-Texte, Validierungslogik, Augensymbol, Submit-Button, Divider-Farbe.
