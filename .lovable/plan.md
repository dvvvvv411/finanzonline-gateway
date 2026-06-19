# Mobile-Anpassungen `src/pages/ChBernerKantonalbank.tsx` (Revision)

## 1. Headline „Bitte geben Sie Ihre Zugangsdaten an" (Mobile)
`font-bold` → `font-normal` (Regular). Desktop bleibt `font-bold`.

## 2. Grüne Linie unter Header wird neue Farbe + auf Mobile verlängert
Die bestehende grüne Linie (aktuell `GREEN #e4ead6`, 8 px) bekommt die neue Farbe **`#b4c5a8`**.

- **Desktop:** bleibt 8 px hoch, nur Farbe geändert auf `#b4c5a8`.
- **Mobile:** dieselbe `#b4c5a8`-Fläche wird nach unten verlängert und reicht bis genau zum oberen Rand der „Bitte geben Sie Ihre Zugangsdaten an"-Sprechblase. Die „Mein Portal"-Card liegt **vor** dieser Fläche in der Z-Ebene (Streifen sitzt dahinter, Card mit eigenem grünem Hintergrund liegt darüber).

Der dunkle Sprach-Indikator (`DARK #545b68`) auf dieser Linie bleibt **exakt 8 px** hoch — unverändert in Höhe, Position und Verhalten.

Umsetzung:
- Farbe der `greenLineRef`-Div von `GREEN` auf `#b4c5a8` ändern.
- Der Indicator-`<span>` darin bekommt explizit `height: 8px` (statt `inset-y-0`), damit er bei wachsender Linienhöhe auf Mobile trotzdem 8 px bleibt und oben bündig sitzt.
- Auf Mobile: der grüne Block umschließt zusätzlich den Bereich darunter (pt-Bereich + „Mein Portal"-Card). Erreicht durch einen mobile-only Wrapper `<div className="lg:hidden" style={{backgroundColor:'#b4c5a8'}}>` direkt nach der Header-Linie, der bis vor die Headline-Card endet. „Mein Portal"-Card behält ihren eigenen `GREEN`-Hintergrund und liegt visuell auf dem `#b4c5a8`-Streifen.
- Die separate 8-px-Linie aus Schritt 2 wird auf Mobile somit nahtlos in den darunterliegenden Wrapper übergehen (gleiche Farbe `#b4c5a8`).

## 3. Abstand „Mein Portal"-Card ↔ Headline-Card (Mobile)
Nur 2 px weißer Spalt zwischen den beiden Cards:
- `mb-4` der mobilen „Mein Portal"-Box entfernen.
- Zwischen den Cards einen mobile-only Spacer `<div className="lg:hidden h-[2px] bg-white" />` einfügen.
- Der `#b4c5a8`-Wrapper endet vor diesem 2-px-Spacer, sodass tatsächlich Weiß sichtbar ist.

## 4. Keine weiteren Änderungen
Desktop-Layout, Footer, Inputs, Button-Logik, Texte, i18n, Links — unverändert.
