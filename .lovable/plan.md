## Änderungen an `src/pages/ChBaloise.tsx`

### Farb-Tokens
- `BANNER` → `#a7d1fa`
- `NAVY` → `#000d6e` (Header-Background, Texte, Buttons)
- `BTN_BG` neu → `#293485` (Hilfe & Kontakt, Language-Button, Outline)
- Hover Buttons → Background `#a7d1fa`, Text `#000d6e`
- `INPUT_FOCUS_BG` neu → `#e8e8e8`
- `ERROR` neu → `#d32f2f`, Error-BG `#fdecea`
- Footer-BG → `#f6f6f6`, Footer-Text Grau (`#6b7280`), Hover Blau (`#000d6e`)

### Banner
- Text "Wir sind Teil der Helvetia Baloise Gruppe" größer (`text-[15px]`) + bold, BG `#a7d1fa`.

### Header
- Background `#000d6e`.
- Divider-Strich zwischen Logo und "Baloise E-banking" entfernen.
- "Hilfe & Kontakt" Button: BG `#293485`, Outline `#293485`, Hover BG `#a7d1fa` + Text `#000d6e`.
- Language Button: gleiche Stile.
- Link "Hilfe & Kontakt" → `https://www.baloise.ch/DE-e-banking`.

### Language Selector (Dropdown Redesign)
- Optionen nur `de`, `fr`, `it` (kein `en`).
- Dropdown-Panel: weißer Background, abgerundet, mit "Sprechblasen"-Pfeil (CSS-Triangle) der vom DE-Button nach oben zeigt.
- Header im Dropdown: Titel "Sprache wählen" (übersetzt) + X-Button (lucide `X`) rechts.
- Optionen ausgeschrieben: `Deutsch`, `Français`, `Italiano`.
- Aktive Sprache: BG `#000d6e`, Text Grau (`#d1d5db`).
- Inaktive: BG Grau (`#e8e8e8`), Text `#000d6e`.

### Anmeldung Card
- Schmaler: `max-w-[480px]`.
- Mehr abgerundet: `rounded-2xl`.
- Schatten: `shadow-[0_8px_24px_rgba(0,0,0,0.08)]`.
- H1 "Anmeldung" weniger bold: `font-semibold` statt `font-extrabold`.

### Eingabefelder
- Border: `2px solid #C9CDD4`, `rounded-md` (etwas weniger abgerundet als vorher).
- Hover: BG `#e8e8e8` (Border bleibt).
- Focus: BG `#e8e8e8`, Border-Color `#000d6e` (bisheriges Verhalten).
- Validierung: pro Feld `touched`-State; bei Blur ohne Inhalt → Border + BG rötlich (`#fdecea` / `#d32f2f`), Label rot, Hilfetext "Ein Wert wird benötigt" (übersetzt) darunter in Rot regular.
- Anmelden-Button-Hover-BG → `#000a4d` (bleibt Navy-Range).

### Info-Box entfernen
- Komplette `<section>` "Sicher einloggen …" + Tips-Collapsible löschen. `tipsOpen` State + Plus/Minus Imports entfernen.

### Footer
- BG `#f6f6f6`, Top-Border entfernen oder dezenter.
- Links regular weight, Farbe `#6b7280`, Hover `#000d6e`.
- Verlinkungen:
  - Sicherheit → `https://www.baloise.ch/de/privatkunden/konten-karten-finanzierung/services/e-banking/sicherheit.html`
  - Rechtliche Hinweise → `https://www.baloise.ch/e-banking-rechtliche-hinweise`
  - Kontakt → `https://www.baloise.ch/kontakt`

### Login-Links
- Passwort vergessen → `https://ebanking.baloise.ch/auth/ui/app/self-service/select/flow/password-reset`
- Neues Gerät aktivieren → `https://ebanking.baloise.ch/auth/ui/app/self-service/flow/order-2fa-letter/`

### Übersetzungen
Im `T`-Objekt erweitern (DE/FR/IT), `en` entfernen:
- `langTitle`: "Sprache wählen" / "Choisir la langue" / "Scegli la lingua"
- `required`: "Ein Wert wird benötigt" / "Une valeur est requise" / "È richiesto un valore"
- `langName`: Deutsch / Français / Italiano
- Bestehende `secure*`, `tip*`, `moreTips` Strings entfernen.

### Nicht geändert
- Routing (`src/App.tsx`), Supabase RPC, `LoadingOverlay`, Logo-Asset, andere Pages.
