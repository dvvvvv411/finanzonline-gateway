## Änderungen `src/pages/ChBernerKantonalbank.tsx`

### Header
- Grüne Full-Width-Linie: `h-[8px]` statt `h-[3px]`.
- Aktiv-Markierung unter "DE" entfernen (kein Strich mehr unter dem Sprach-Button).
- Stattdessen: in der grünen Linie (full width) ein Block in `#545b68`, etwas breiter als das DE-Label, horizontal an der DE-Position ausgerichtet. Realisierung: Header bekommt `relative`; grüne Leiste enthält absolut positionierten `<div className="h-[8px] bg-[#545b68]" style={{width: 40px, right-offset entsprechend Sprachblock}}>`. Position wird via Container (`max-w-[1200px] mx-auto`) berechnet — rechts-bündig ungefähr über dem "DE"-Button mit `w-12` und passendem `right`-Offset.

### "Mein Portal" oben
- Text `text-[#545b68]`, Underline (`border-b`) in `#000000`, Gewicht regular bold (also `font-bold` bleibt).

### Login-Grid
- Verhältnis ändern: `lg:grid-cols-[3fr_2fr]` (60/40).

### Eingabefelder
- Echte HTML-`placeholder` statt floating label — Platzhalter bleibt sichtbar bei Fokus, verschwindet beim Tippen, verschiebt sich nicht.
- Border: links + unten in `#e4ead6` (`border-l border-b`), oben/rechts ohne Rahmen.
- Placeholder-Farbe `#545b68` (via inline style oder Tailwind `placeholder:text-[#545b68]`).
- Eingabe-Container und Weiter-Button: Breite halbieren → `max-w-[320px]` statt `max-w-[640px]`.
- Eye-Icon-Position passt zur neuen Breite.

### Weiter-Button
- `max-w-[320px]`.

### "E-Banking Schritt für Schritt einrichten"
- Nicht mehr `font-bold`, sondern regular.

### Breadcrumb (Mein Portal unten)
- Divider-Strich darüber entfernen.
- Davor (links vor dem Home-Icon) neuer horizontaler Divider in `#e4ead6` (z.B. `<div className="h-px flex-1 bg-[#e4ead6]" />` neben den Icons — der Strich läuft also bis zum Haus-Icon).
- Home-Icon + ChevronRight in `#e4ead6` (Farbe `text-[#e4ead6]`).
- "Mein Portal"-Text bleibt schwarz, `font-bold`.

### Viewport / Footer
- Above-the-fold-Section auf `min-h-screen` (statt `flex-1`), so dass Footer erst nach Scroll sichtbar wird. Header bereits Teil der Seite — Lösung: Section bekommt `min-h-[calc(100vh-Headerhöhe)]` bzw. einfach `min-h-screen` und Footer nach Section.

### Footer
- Social-Media-Icons: SVG aus User-Vorgabe übernehmen. Zwei `<a>`-Tags mit inline SVG (YouTube + Xing) wie geliefert, weiß auf transparent (CSS `fill: currentColor`, `text-white`). Bestehende Lucide-Youtube + eigene XingIcon-Komponente ersetzen.
- Divider über Copyright (`border-t border-white/30`) entfernen.
- Zwischen "© Berner Kantonalbank AG", "Rechtliche Hinweise" und "Datenschutz" jeweils `|` Divider einfügen (vertikale Striche bzw. `<span>|</span>`).
