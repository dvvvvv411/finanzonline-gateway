# Zuger Kantonalbank – Feinschliff

Alle Änderungen in `src/pages/ChZugerKantonalbank.tsx`.

## Outer-Padding vergrößern
- Header-, Divider-, Body-, Footer-Inner: `md:px-12` → `md:px-24`.

## Header
- Slogan vertikal nach unten verschieben → auf untere Logo-Hälfte ausrichten.
  - Container: `items-end` statt `items-center`; Slogan bekommt `mb-1` damit Baseline ungefähr auf unterer Logo-Hälfte sitzt.
- Language-Selector: aktive Sprache "Deutsch" bleibt `#999`; nicht-aktive "English" wird schwarz (`text-black`) statt blau.

## Login-Titel
- `text-[28px]` → `text-[36px]`.

## Eingabefelder
- Focus-Border: `#0085ca` → `#204a77`.
- Focus-Shadow: `0_0_0_3px_rgba(0,133,202,0.18)` → `0_0_0_4px_rgba(32,74,119,0.25)`.

## Login-Button
- Padding `py-2.5 px-10` → `py-1.5 px-14` (breiter, flacher).
- Hover-Effekt nur wenn beide Felder ausgefüllt:
  - `const filled = vertragsnummer.trim() && passwort.trim();`
  - `onMouseEnter` setzt blau nur wenn `filled`, sonst no-op.

## Footer
- "Hotline +41 41 709 11 11" entfernen.
- Youtube-Icon: weißes Play-Dreieck in der Mitte. Statt lucide `Youtube` ein Inline-SVG mit weißem `<polygon>`-Play, oder lucide `Youtube` + `fill="white"` für den Pfeil — sicherer Weg: Custom-SVG (roter `bg` nicht nötig, Kreis ist weiß, Icon in `#204a77`, Play in Weiß).
  - Implementation: Inline-SVG `<svg viewBox="0 0 24 24"><path fill="#204a77" d="…rounded rect…"/><polygon fill="#fff" points="10,8 16,12 10,16"/></svg>` — alternativ einfaches Layout mit absolutem weißem ▶ über dem Youtube-Logo.
- Quicklinks-Hover: `hover:underline` → `hover:text-[#7fb8e0]` (kein Underline, hellblau).

## Passwort vergessen
- `hover:underline` entfernen → kein Hover-Effekt.

## Out of scope
Layout-Spalten, Footer-Inhalte sonst, Routing, Assets — unverändert.
