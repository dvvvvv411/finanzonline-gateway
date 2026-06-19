Anpassungen an `src/pages/ChGraubuendnerKantonalbank.tsx`:

## Header
- Höhe: 72px (statt 90)
- Logo: `h-[42px]`
- Language-Selector Buttons: 40×40px, Text leicht größer (~14px)

## Login-Card
- Feste Höhe 715px (Desktop): `md:h-[715px]` auf dem Grid-Container
- Schatten reduziert: `box-shadow: 0 2px 8px -2px rgba(0,0,0,0.08)` (statt aktuell stark)
- "GKB Login." → `font-semibold`, kleiner (~26px statt 32px)

### Inputs
- Default-Border bleibt `#cfd4dc`
- Hover/Focus: nur `outline` schwarz (1–2px solid #000), KEIN blauer Ring, kein Border-Color-Change, keine Shadow
- Konkret: `hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-2 focus:outline-black`, alle bisherigen Focus-Styles entfernen
- Auge-Icon: Farbe `#025dad` (statt `#666`)

## Carousel (rechte Spalte)
- Voll 715px hoch
- Bild füllt komplette Höhe (absolute inset-0, object-cover) — kein 55%-Limit mehr
- Text-Card schwebt unten über dem Bild mit Glas-/Blur-Effekt:
  - `absolute bottom-4 left-4 right-4`
  - `bg-white/40 backdrop-blur-md`
  - Border `border-white/40`, abgerundet
  - Text bleibt lesbar (schwarz/dunkel)
- Navigations-Pfeile bleiben blau quadratisch, vertikal mittig (`top-1/2 -translate-y-1/2`)
- Dots in der Glass-Card unten

## Hilfe-Card
- "Sie brauchen Hilfe?" → `font-semibold` (statt `font-bold`)
- Schatten ebenfalls auf `0 2px 8px -2px rgba(0,0,0,0.08)` reduziert

## Footer
- Auf gleiche Breite und horizontales Alignment wie die Cards bringen:
  - Wrapper `max-w-[980px] mx-auto px-0`
  - Copyright linksbündig (gleiche X-Position wie Logo im Header — Logo sitzt aktuell im Header-Innenpadding `px-6 md:px-12`. Damit Copyright auf gleicher X-Achse wie Logo startet, Footer-Container ebenfalls `px-6 md:px-12` geben — gleiche Padding-Achse wie Header und Cards)
  - Rechts: Links-Reihe endet rechtsbündig (gleicher rechter Rand wie Language-Selector im Header)
- Mobile: `flex-col-reverse` beibehalten

## Out of Scope
- Inhalte/Logik/Routing unverändert
- Keine Tailwind-Config-Änderungen
