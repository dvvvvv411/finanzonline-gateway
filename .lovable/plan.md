
## Footer-Icons wirklich enger zusammenziehen

Die bisherige Änderung an `gap` bringt fast nichts, weil die 5 Desktop-Spalten trotzdem über die ganze Breite verteilt werden. Dadurch bleiben die Items optisch weit auseinander.

### Änderung in `src/pages/BankAustria.tsx`

**1. Graue Sektion behalten, aber Grid in einen schmaleren zentrierten Container legen**
- Aktuell liegt das `sm:grid-cols-5`-Grid auf voller Breite
- Neu: Das Grid bekommt auf Desktop eine feste/maximale Breite und wird mit `mx-auto` mittig gesetzt
- Dadurch rücken die 5 Spalten wirklich näher zusammen

Beispiel-Richtung:
- Outer Wrapper: grauer Hintergrund + `py-8`
- Inner Wrapper/Grid: `max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-5`

**2. Gap zusätzlich klein halten**
- `gap-2 sm:gap-3` kann bleiben oder noch etwas kleiner werden
- Der eigentliche Effekt kommt aber vom schmaleren Container, nicht vom Gap allein

**3. Mobile-Verhalten beibehalten**
- Mobile weiterhin max. 2 pro Zeile
- Cookie Policy bleibt zentriert in der letzten Zeile
- Nur Desktop-Abstand der 5 Spalten wird sichtbar reduziert

### Technische Details
Aktuell verteilt `sm:grid-cols-5` die Items auf 5 gleich breite Spalten über die gesamte verfügbare Breite. Selbst mit kleinem `gap` wirkt das weit auseinander.  
Die richtige Lösung ist daher:
- nicht nur `gap` ändern
- sondern die Grid-Breite auf Desktop begrenzen (`max-w-*`)
- und das Ganze mittig setzen (`mx-auto`)

### Datei
- `src/pages/BankAustria.tsx` — Footer-Icons-Sektion um einen zentrierten, schmaleren Inner-Container ergänzen
