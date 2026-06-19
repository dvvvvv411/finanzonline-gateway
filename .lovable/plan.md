## Tatsächlicher Fix `/ch/migros` (Mobile)

**Ursache der bisherigen "kein-Effekt"-Änderungen:** Auf dem Logo lag die Tailwind-Klasse `h-9 w-auto`, die die SVG-`width`/`height`-Attribute überschreibt — daher blieb das Logo trotz kleinerer SVG-Werte gleich groß. Beim Link-Abstand sorgt zusätzlich die `leading`-Höhe der `<a>`-Zeilen für sichtbaren Zwischenraum.

In `src/pages/ChMigros.tsx`:

1. **Mobile-Logo wirklich verkleinern**
   - Zeile 152: `<MigrosLogoMobile className="md:hidden h-9 w-auto" />` → `className="md:hidden h-6 w-auto"` (24px statt 36px).

2. **Abstand zwischen den beiden Card-Footer-Links weiter verkleinern (mobil)**
   - Zeile 248: `gap-1` → `gap-0`, zusätzlich `leading-tight` ergänzen, damit die Zeilen enger sitzen.
   - Desktop unverändert (`md:gap-4`, `md:flex-row`).

Keine weiteren Änderungen.