In `src/pages/ChAppenzellerKantonalbank.tsx`, Header-Container der linken Spalte:

- Padding stark reduzieren, sodass der gesamte Header genau 25px hoch ist (inkl. Logo, exkl. roter Trennlinie)
- Container: `flex items-center` mit `style={{ height: 25 }}` und `paddingLeft: 24, paddingRight: 24, paddingTop: 0, paddingBottom: 0`
- Logo: `className="h-[18px]"` (passt in 25px Header mit etwas Luft)
- Rechte Spalte: das leere Spacer-Div `<div className="h-6" />` ebenfalls auf `height: 25` anpassen, damit Carousel-Top mit Form-Top fluchtet
