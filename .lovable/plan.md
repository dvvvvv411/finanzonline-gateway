## Fix: unteres "Mein Portal" (Breadcrumb) ins Sichtfeld

Es wird NICHTS am oberen Header visuell geändert. Es geht nur darum, welcher Block exakt 100vh hoch ist.

**Warum die Breadcrumb aktuell außerhalb des Viewports liegt:**
- Der `min-h-screen`-Wrapper umschließt nur die untere Section.
- Der obere Header-Bereich (rote Linie + Logo + Sprach-Selector + grüne Linie, ~120px) sitzt darüber.
- Ergebnis: Header (120px) + Section (100vh) = 100vh + 120px. Die Breadcrumb am unteren Rand der Section landet damit 120px UNTER der Viewport-Unterkante.

**Fix:** Den `min-h-screen`-Wrapper ein Element weiter nach oben ziehen, sodass er Header UND Section gemeinsam einklammert. Die gesamte Above-the-fold-Zone ist dann exakt 100vh — Breadcrumb sitzt genau über dem Footer am unteren Viewport-Rand.

Konkret in `src/pages/ChBernerKantonalbank.tsx`:
- Das öffnende `<div className="min-h-screen flex flex-col">` (aktuell zwischen `</header>` und `<section …>`) wird VOR den `<header>` verschoben.
- Das zugehörige schließende `</div>` bleibt direkt nach `</section>`.
- Header selbst (Logo, Sprach-Selector, grüne Linie, dunkler Indicator) bleibt unverändert — nichts wird visuell verändert.
- Footer bleibt außerhalb des Wrappers → erst nach Scroll sichtbar.
