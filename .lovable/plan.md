# Glarner Kantonalbank – UI-Anpassungen

Alle Änderungen ausschließlich in `src/pages/ChGlarnerKantonalbank.tsx`.

## 1. Eingabefelder (Vertragsnummer & Passwort)
- Default: graue Outline (`#cccccc`) wie bisher.
- Hover: Outline färbt sich rot (`#c70522`, Header-Farbe).
- Focus (reinklicken): Outline wird transparent/entfernt, stattdessen weicher Schatten rundum (`box-shadow: 0 0 0 4px rgba(199,5,34,0.15), 0 2px 8px rgba(0,0,0,0.12)`), keine Border-Farbe mehr sichtbar.
- Umsetzung über `peer`-freie inline-Styles mit `onMouseEnter/Leave` ist unnötig — stattdessen Tailwind-Klassen: `border-[#cccccc] hover:border-[#c70522] focus:border-transparent focus:shadow-[0_0_0_4px_rgba(199,5,34,0.15),0_2px_8px_rgba(0,0,0,0.12)] focus:outline-none transition`.

## 2. Footer-Links
- URLs setzen:
  - Rechtliches → `https://glkb.ch/rechtliches`
  - Datenschutz → `https://glkb.ch/verlinkung-rechtliches-datenschutz`
  - Cookie Policy → `https://glkb.ch/verlinkung-cookie-policy`
  - Impressum → `https://glkb.ch/verlinkung-impressum`
- Hover-Verhalten: Text wird schwarz, kein Underline. Klasse: `hover:!text-black hover:no-underline` und `hover:underline` entfernen. Standardfarbe bleibt rot (`#c70521`).

## 3. Mobile-Footer Layout
- Reihenfolge auf Mobile: **Zeile 1** = Links (Rechtliches · Datenschutz · Cookie Policy · Impressum), **Zeile 2** = Copyright.
- Auf Desktop bleibt bisheriges Layout (Copyright links, Links rechts).
- Mobile Schriftgröße der Links: `text-[11px]` (Desktop bleibt 13px), Gap reduzieren (`gap-x-3`), `flex-nowrap whitespace-nowrap` damit alles in eine Zeile passt.
- Umsetzung: Im Footer-Wrapper `flex-col-reverse md:flex-row` damit Links oben, Copyright darunter (auf Desktop normale Reihenfolge).

## 4. Mobile Trenner zwischen Content und Carousel
- Im 2-spaltigen Layout (`flex-col md:flex-row`) zwischen Formular-Spalte und Carousel-Spalte ein Trennelement einfügen:
  - Nur Mobile sichtbar (`md:hidden`), Höhe `15px`, Hintergrund `#f5f5f5`, volle Breite.
- Reihenfolge im DOM bleibt Form → Trenner → Carousel.

## Nicht betroffen
- Header, Logo, Formularlogik, Submit, Carousel-Inhalt, Routing, Assets.
