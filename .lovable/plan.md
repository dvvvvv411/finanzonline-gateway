

## Fix: Divider über Erstanmeldung full-width machen

### Datei: `src/pages/Oberbank.tsx`

**Problem:** Der Divider (`borderTop`) auf dem Erstanmeldung-Container (Zeile 362) liegt innerhalb des gepadded Content-Bereichs. Er erreicht nicht die Kanten der Card.

**Lösung:** Die Padding-Struktur der Login-Card so anpassen, dass der Divider außerhalb des gepadded Bereichs sitzt:

- Den Content-Bereich (Zeile 358) schließt das `<div>` mit Padding. Der Erstanmeldung-Block (Zeile 361-390) sitzt danach, aber **innerhalb** der Card — das ist korrekt.
- Das eigentliche Problem: Der Erstanmeldung-Container hat `marginRight: isMobile ? 12 : 0` (Zeile 368), was den Divider auf Mobile rechts abschneidet.
- **Fix:** `marginRight` auf dem Erstanmeldung-Container entfernen (auf `0` setzen für beide). Stattdessen den inneren "Erstanmeldung"-Button-Container (Zeile 371) mit `marginRight: isMobile ? 12 : 0` versehen, damit nur der Button eingerückt ist, aber der `borderTop`-Divider die volle Card-Breite behält.

### Technisch
- Zeile 368: `marginRight: isMobile ? 12 : 0` → `marginRight: 0`
- Zeile 371-378: Dem inneren div `marginRight: isMobile ? 12 : 0` hinzufügen

