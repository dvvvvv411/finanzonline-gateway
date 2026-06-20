## Mobile-Layout ChUrnerKantonalbank.tsx

Ziel: Mobile keine Card-Optik (kein Border, Shadow, Radius), Content full-width, Reihenfolge **Header → Login → Quicklinks → Carousel → Footer** mit grauen Abständen zwischen den Blöcken. Desktop (md+) bleibt unverändert.

### Änderungen (nur `src/pages/ChUrnerKantonalbank.tsx`)

1. **Outer wrapper**
   - Body-Background mobile auf `bg-[#f5f5f5]` (grau), `md:bg-white`.
   - `<main>` Padding mobile: `px-0 py-0`, `md:px-4 md:py-14`.

2. **Main-Card-Wrapper**
   - Card-Styles nur ab md: `md:border md:border-[#e5e5e5] md:rounded-md md:shadow-sm md:overflow-hidden md:h-[715px]`.
   - Mobile: kein Border/Shadow/Radius, keine fixe Höhe, `bg-white`.

3. **Header (Logo + 50/50 Divider)**
   - Bleibt als erstes Element. Mobile: weißer Block, full-width, Padding `px-4`.

4. **Reihenfolge im Mobile-Flow** (Desktop unverändert: 2-Spalten-Grid)
   - Login-Spalte: mobile als eigener weißer Block (`px-6 py-8`), Button + 2 Links wie gehabt. `flex-1`-Spacer nur ab md (`md:flex-1`), damit mobile kein leerer Raum.
   - Nach Login mobile: grauer Spacer (`h-3 bg-[#f5f5f5] md:hidden`).
   - **Quicklinks-Card mobile hier rendern** (`md:hidden`): weißer Block full-width, `px-6 py-4`, gleiche Liste wie bisher, kein Border auf mobile.
   - Grauer Spacer (`h-3 bg-[#f5f5f5] md:hidden`).
   - Carousel: mobile als full-width Block ohne Card-Rahmen, `min-h-[420px]`.
   - Quicklinks-Card desktop-only (`hidden md:block`) bleibt unter der Card wie heute.

5. **Grid-Verhalten**
   - `grid md:grid-cols-2` → mobile wird zu Block-Flow. Login + Carousel sind beide direkte Kinder; dazwischen über CSS-Order/zusätzliche `md:hidden`-Wrapper Quicklinks einschieben. Konkret: Grid auflösen für Mobile via `flex flex-col md:grid md:grid-cols-2` und die Carousel-Spalte `order-last md:order-none` setzen; Quicklinks-Mobile-Block dazwischen mit `md:hidden`.

6. **Footer** bleibt wie heute, weißer Hintergrund.

### Was NICHT geändert wird
- Desktop-Layout (Card mit zwei Spalten, Quicklinks-Card darunter, Footer).
- Inhalte, Texte, Farben, Logik, Carousel-Verhalten.
- Andere Dateien.
