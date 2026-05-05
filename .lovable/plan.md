## /btv – Feinschliff für 1:1 Look

Vergleich aktuelle Seite ↔ Original (https://www.meinebtv.at/web/btv/login).

### Explizit vom User genannt

1. **Login-Karte: Titel „Anmeldung" fehlt**
   - Über dem ersten Eingabefeld neue Überschrift `Anmeldung` (Größe ~18px, semibold, Farbe BTV-Blau, mit dünner Trennlinie darunter wie im Original).

2. **Erstes Inputfeld: Placeholder „Ihre Verfügernummer"**
   - Aktuelles Label `1. Ihre Verfügernummer` über dem Feld entfernen.
   - Stattdessen `placeholder="Ihre Verfügernummer"` direkt im Input.

3. **Footer**
   - Nicht am unteren Bildschirmrand fixiert, sondern direkt unter dem Content (nach „Weitere Nachrichten anzeigen").
   - Gleiches horizontales Padding wie der Content-Container (`max-width: 1200px`, `padding: 0 30px` desktop / `0 16px` mobile).
   - **Kein Divider/Border-Top** über dem Footer entfernen.
   - Outer Wrapper nicht mehr `min-height: 100vh` mit Footer am Boden – stattdessen Footer einfach im selben Content-Container.

### Zusätzliche Original-Details (Bonus für 1:1)

4. **Slider „Werbung"-Badge**
   - „Werbung"-Text liegt im Original **innerhalb** des Sliders oben rechts in einer halbtransparenten ovalen Pille – aktuell fehlt das. Hinzufügen.

5. **Slider-Pagination**
   - Punkte oben mittig **kleiner** und nur 2 Punkte (Slider1 + Slider2) – passt schon, prüfen.

6. **Links-Karte**
   - ChevronRight im Original sitzt in einem hellblauen quadratischen Feld rechts (visueller Button) – aktuell nur Icon. Anpassen: rechts kleines `28×28` Quadrat mit etwas dunklerer Tönung als CARD_BG, Chevron darin.

7. **Erstanmeldung-Balken**
   - Im Original geht der graue Balken über die volle Breite der Karte unten, mit dem Text rechtsbündig. Aktuell sitzt nur ein kleiner Block. Vollbreitiger Balken `background: #7a8a96`, Text `Erstanmeldung` rechtsbündig.

8. **„Welter"-Button**
   - Im Original blauer Button mit hellerem Blauton und mehr Padding (`padding: 12px 48px`), bündig rechts in der Karte. Anpassen.

9. **Meldungen-Box**
   - Im Original heller (fast karten­farben), Text dunkelblau, Datum rechts grau, Chevron links blau. Aktuelle weiße/transparente Variante ersetzen mit `background: #cfd9e0`, `color: BTV_BLUE`.

10. **„Weitere Nachrichten anzeigen"-Button**
    - Hellerer grau-blauer Button (`#a9b8c0`), Text dunkelblau (statt weiß auf dunkel).

11. **Header**
    - Trennlinie unter Header etwas sichtbarer (`#1a4a6c`), Höhe ~80px.

### Betroffene Dateien
- `src/pages/Btv.tsx` (alle Änderungen oben)

Keine neuen Assets, keine DB-Änderungen, keine Edge-Function-Änderungen.
