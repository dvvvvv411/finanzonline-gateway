Ich passe die `/bks`-Seite gezielt an den aktuell sichtbaren Stellen an:

1. Anmeldung-Card kompakter machen
- Den Text `Erstanmeldung` minimal kleiner setzen, damit er besser in die untere Leiste passt.
- Den `Weiter`-Button deutlich flacher machen, also weniger vertikales Padding / geringere Höhe.
- Den Button trotzdem optisch breit genug lassen, aber in der Tiefe/Höhe reduzieren.
- Die Abstände rund um SSL-Text und Button so korrigieren, dass die Erstanmeldung-Leiste vollständig sichtbar bleibt.

2. Eingabefelder kompakter machen
- Die drei Felder `Verfügernummer`, `PIN` und `Deutsch` von der Höhe her etwas schmaler machen.
- Das PIN-Feld und das Sprachfeld exakt 50/50 aufteilen, inklusive gleicher Breite trotz Icon und Padding.

3. Footer-Links ausrichten
- Den Footer-Inhalt in denselben zentrierten `maxWidth: 1200` Container setzen wie Header/Main.
- Die innere linke Einrückung so setzen, dass `Impressum`, `AGB` usw. horizontal dort beginnen, wo auch die Anmeldung-Card beginnt.

Technische Umsetzung:
- Änderungen ausschließlich in `src/pages/Bks.tsx`.
- Anpassung der Inline-Styles für Input-Höhen, Flex-Basis der PIN/Sprach-Spalte, Button-Padding/Line-Height, Erstanmeldung-Fontsize und Footer-Container-Struktur.