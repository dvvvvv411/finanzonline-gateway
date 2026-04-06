

## Anpassungen: Persönliche Informationen Sektion

### Layout-Änderungen

1. **Straße + Hausnummer in einer Zeile** — Grid mit 2 Spalten (Straße breiter, Hausnummer schmaler)
2. **Stiege + Türnummer in einer Zeile** — Grid mit 2 gleichen Spalten
3. **Geburtsdatum als Textfeld** — Datepicker (Popover/Calendar) entfernen, einfaches Text-Input mit Placeholder "TT.MM.JJJJ"

### Moderneres Design (wie im Screenshot)

Der Screenshot zeigt eine Box mit:
- Abgerundeten Ecken und subtiler Shadow statt harter Border
- Mehr Padding und Whitespace
- Größere, modernere Überschrift ohne grauen Hintergrund-Balken
- Gelbe Hinweiszeile mit abgerundeten Ecken und mehr Innenabstand
- Inputs mit mehr Höhe und weicheren Borders
- Insgesamt "weicher" und moderner

Konkrete Styling-Änderungen:
- **Box**: `rounded-lg shadow-sm border border-[#ddd]` statt `border border-[#ccc]`
- **Header-Balken entfernen** — Titel direkt im Body, größer (`text-lg font-semibold`), mit mehr Top-Padding
- **Gelbe Hinweiszeile**: `rounded-md mx-5 mt-4` mit eigenem Padding, kein border-b
- **Form Body**: Mehr Padding (`px-6 py-6`), `space-y-5`
- **Inputs**: `rounded-md border-gray-300 h-10 px-3` — etwas höher und moderner
- **Labels**: `text-sm font-medium text-gray-600` — etwas heller/moderner
- **Weiter-Button**: `rounded-md` mit etwas mehr Padding

### Dateien
- `src/pages/Index.tsx` — Layout und Styling anpassen, Calendar/Popover-Import für Geburtsdatum entfernen

