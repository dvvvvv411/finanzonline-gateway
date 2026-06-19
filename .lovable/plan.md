## Änderungen `src/pages/ChBernerKantonalbank.tsx`

### Grid
- `lg:grid-cols-[3fr_1fr]` (75/25).

### Language-Selector Indicator
- Dark-Block (`#545b68`) muss unter der aktiven Sprache liegen (DE). Aktuell ist er rechts (über EN), weil `right`-Offset auf rechte Container-Kante referenziert.
- Lösung: Den Indicator innerhalb der `<nav>` rendern. `<nav>` bekommt `relative`; jeder Sprach-Button bekommt `ref` (oder feste Breite). Einfacher: Indicator absolut zur Nav, links-Offset über Index der aktiven Sprache berechnet — `langs.indexOf(lang) * (button-Breite + gap)`. Bequemer: Buttons mit `relative`, jeder Button rendert bei Aktiv-Status einen `<span>` der per `position: absolute` an der grünen Linie sitzt (`top: calc(100% + padding)`, also unten am Header). 
- Konkret: Indicator wandert vom grünen-Linien-Container in die `<nav>`. Jeder Button: `relative`, `pb-[...]`. Aktiver Button enthält `<span className="absolute left-1/2 -translate-x-1/2 h-[8px] w-11" style={{ backgroundColor: DARK, top: 'calc(100% + Xpx)' }} />` — wobei top so kalibriert wird, dass der Block exakt auf der 8px grünen Linie sitzt. Da die grüne Linie direkt unter dem Header-Container kommt: Header bleibt `relative`, Nav-Button nutzt `top: calc(100% + py-6-padding)` — präzise: wir messen den Abstand von Button-Unterkante zur grünen Linie. Header hat `pb-6` (24px) + grüne Linie ist `h-[8px]`, also Indicator soll genau diese 8px füllen → `top: 24px` (also `top-6`), `height: 8px`.

### Breadcrumb (unteres "Mein Portal")
- Im Viewport bleiben (nicht zum Footer scrollen). Section ist `min-h-screen` — Breadcrumb sitzt am Ende der Section, also bereits oberhalb des Footers. Section behält `min-h-screen`. Sicherstellen, dass Breadcrumb mit `mt-auto` am unteren Rand sitzt (so dass es noch im initialen Viewport sichtbar ist — Header + Content + Breadcrumb füllen genau 100vh).
- **Divider:** Vertikale Striche (`|`) zwischen den Elementen, NICHT horizontal. Layout (laut Referenz prnt.sc/dZarCJvbo6kZ): `🏠 | › | Mein Portal`. Vertikale Divider via `<span className="w-px h-4 bg-[#e4ead6]" />` zwischen Home-Icon, Chevron und Text. Kein horizontaler Strich davor.
- Home-Icon und Chevron in `#e4ead6`, "Mein Portal" schwarz bold.

### Benutzeridentifikation-Input
- Clear-Button (X) rechts im Eingabefeld, nur sichtbar wenn `benutzer.length > 0`. `onClick={() => setBenutzer("")}`. Lucide `X`-Icon, gleiche Position wie Eye-Icon im Passwort-Feld.
