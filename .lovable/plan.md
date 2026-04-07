
Oberbank — Mobile-Fixes (nur `src/pages/Oberbank.tsx`)

1. Logo in Mobile wirklich mittig erzwingen
- Ursache: `textAlign: "center"` reicht hier nicht zuverlässig, weil das Logo als `<img>` durch Tailwind/Browser-Reset blockartig gerendert wird.
- Den mobilen Header auf `display: "flex"`, `justifyContent: "center"`, `alignItems: "center"`, `width: "100%"` umstellen.
- Dem Logo zusätzlich `display: "block"` und `margin: "0 auto"` geben.
- Reihenfolge bleibt: Logo ganz oben, Cookie-Banner direkt darunter.

2. "Schließen"-Button in Mobile kleiner machen
- Nur auf Mobile Padding und Schrift leicht reduzieren, z. B. kleineres Horizontal-Padding und `fontSize: 12`.
- Desktop bleibt unverändert.

3. Mehr Abstand unter dem "Weiter"-Button
- Im oberen Content-Bereich der Login-Card unten mehr Mobile-Abstand ergänzen.
- Das mache ich über zusätzlichen `paddingBottom` im Content-Block oder `marginBottom` am Button, ohne die Card-Struktur zu ändern.

4. Divider unterhalb trotzdem full width lassen
- Die Linie bleibt auf dem äußeren `Erstanmeldung`-Container mit `borderTop`.
- Es wird nur der Abstand oberhalb angepasst, nicht der Divider selbst.
- Dadurch bleibt die Linie über die komplette Card-Breite bis zum Rand.

Technische Details
- Nur `src/pages/Oberbank.tsx` anfassen.
- Kein Eingriff in `src/App.css`; die Datei ist hier nicht relevant.
- Keine anderen Änderungen an Desktop, Dropdown oder restlichem Layout.
- Nach Umsetzung prüfen auf `/oberbank` bei Mobile-Breite 390px: Logo exakt mittig, kleinerer Cookie-Button, mehr Luft unter „Weiter“, Divider weiterhin full width.
