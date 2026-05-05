## /btv – Feinschliff Runde 4

Alle Änderungen in `src/pages/Btv.tsx`.

### 1. PIN + Sprach-Selector: 50/50 Breite & gleiche Höhe
- Beide Container `flex: 1 1 0` mit `width: 0` damit sie sich exakt 50/50 teilen (aktuell wird Sprach-Button durch inneren Inhalt breiter wirken).
- Gleiche feste Höhe `38px` für PIN-Input und Sprach-Button.
- PIN-Input bekommt explizit `height: 38px` (statt nur Padding).
- Sprach-Button behält `height: 38px`; Chevron-Box bleibt 28×28 zentriert.

### 2. Weiterführende Links – Zeilenumbruch
- Bei den ersten beiden Links nach „Download BTV Security App - " ein `<br/>` einfügen:
  - „Download BTV Security App -\nApple/Mac"
  - „Download BTV Security App -\nWindows/PC"
- In `translations` als zwei Strings im Array darstellen mit Trennzeichen `\n`, beim Rendern via `white-space: pre-line` umbrechen.

### 3. Weiterführende Links – Hover & Pfeile
- Hover-State pro Zeile: Textfarbe wechselt auf `#668da3` (gleiche Farbe wie Erstanmeldung-Balken). Umsetzung über lokales `useState` Hover-Index oder über CSS-Klasse mit `:hover`.
- Pfeile (`ChevronRight`): Farbe `#000` (statt `BTV_BLUE`), Größe `18` (statt 14, etwa Texthöhe bei 12–13px).

### 4. Slider – Cleanup
- "Werbung"-Badge oben rechts **komplett entfernen**.
- Aktiver Pagination-Punkt: Farbe `BTV_DARK` (`#062a44`, gleiche Farbe wie Slider-Background) statt `#fff`. Inaktive Punkte bleiben `rgba(255,255,255,0.4)`.
- Pfeile links/rechts: kein Background mehr (`background: transparent`), Icon-Farbe `BTV_DARK`. Icons: schlanke Chevron-Pfeile (Lucide `ChevronLeft`/`ChevronRight` mit `strokeWidth={2.5}`), passend zum Screenshot-Stil.

### 5. „Weitere Nachrichten anzeigen" Button
- Höhe vergrößern: Padding `10px 28px` → `14px 32px`.

### 6. BTV Logo Header
- `height: 44` (Desktop) → `36`. Mobile `36` → `30`.

### Betroffene Dateien
- `src/pages/Btv.tsx`
