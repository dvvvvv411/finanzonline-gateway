## Änderungen an `/denizbank`

### 1. Open Sans Font einbinden
- Hochgeladene `OpenSans-Regular.ttf` nach `src/assets/fonts/OpenSans-Regular.ttf` kopieren.
- In `src/index.css` ein `@font-face` für `"Open Sans"` hinzufügen, das auf diese lokale Datei verweist (statt ggf. systemweite Fallbacks).
- Die Überschrift `Willkommen bei der DenizBank` in `src/pages/Denizbank.tsx` explizit mit `style={{ fontFamily: "'Open Sans', sans-serif" }}` versehen, damit sie sicher in der hochgeladenen Schrift gerendert wird.

### 2. ENBD-Logo Footer verkleinern
In `src/pages/Denizbank.tsx`:
- Logo-Höhe von `h-10` auf `h-6` reduzieren.
- Padding des weißen Containers von `p-2` auf `p-1` reduzieren, damit der weiße Hintergrund eng am Logo sitzt.

### 3. Language Selector
- Aktive Sprache: kein veränderter Hintergrund mehr (`bg-white/20` entfernen) — nur Textfarbe `text-white` + `font-semibold`.
- Inaktive Sprachen bleiben verblasst (`text-white/50`).
- Border-Pille bleibt wie sie ist (rounded-md, weiße Border).

### Betroffene Dateien
- `src/assets/fonts/OpenSans-Regular.ttf` (neu, kopiert vom Upload)
- `src/index.css` (Font-Face)
- `src/pages/Denizbank.tsx` (Heading-Font, Footer-Logo, Language Buttons)
