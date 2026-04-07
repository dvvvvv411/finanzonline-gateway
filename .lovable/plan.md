

## Oberbank — Weiterführende Links Card anpassen

### Änderungen in `src/pages/Oberbank.tsx` (Zeilen 218-260)

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | **Titel-Schriftgröße** | `fontSize: 14` | `fontSize: 16` — gleich wie "Kundenportal Login" |
| 2 | **Titel-Padding/Abstand** | `padding: "14px 16px 0"`, `margin: "0 0 6px"` | `padding: "20px 20px 0"`, `margin: "0 0 14px"` — gleich wie Login-Card |
| 3 | **Erster Divider entfernen** | Jeder Link hat `borderTop: "1px solid #e0e0e0"` | Erster Link (`i === 0`) bekommt `borderTop: "none"` |
| 4 | **Link-Text vergrößern** | `fontSize: 11`, `padding: "5px 16px"` | Berechnung: Card ist 308px, Titel+Padding ~50px, 7 Links teilen den Rest (~258px) → ca. 36px pro Link-Zeile. `fontSize: 13`, `padding` auf ca. `"9px 20px"` anpassen, damit die Links die volle Restfläche ausfüllen |
| 5 | **Divider-Breite** | Full-width (border geht von Kante zu Kante) | Divider sollen nur von Text-Start bis Pfeil-Ende reichen → `borderTop` entfernen, stattdessen innerhalb des Links ein `borderTop` mit gleicher horizontaler Padding wie der Text nutzen. Konkret: `padding: "9px 20px"` und `borderTop` bleibt, da padding bereits den Innenbereich definiert — die Divider gehen dann von Textbeginn bis Pfeilende |

### Technisches Detail
- Die Links nutzen `padding: "9px 20px"` — da `borderTop` am `<a>`-Element sitzt und das Padding den Inhalt einrückt, geht der Border trotzdem full-width. **Lösung**: Border vom `<a>` entfernen und stattdessen ein `<div>` als Divider innerhalb des Link-Containers setzen mit `margin: "0 20px"`. Alternativ: den Links-Container mit `padding: "0 20px"` versehen und die Links ohne horizontales Padding rendern — dann geht der Border nur über die Container-Breite minus Padding.

### Datei
- `src/pages/Oberbank.tsx`

