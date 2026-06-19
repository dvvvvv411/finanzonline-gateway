## Änderungen `src/pages/ChBernerKantonalbank.tsx`

### Header-Layout
- Logo bleibt oben links.
- Sprach-Selector wird vom Logo entkoppelt und sitzt **direkt über der grünen Linie**, rechts ausgerichtet, im selben `max-w-[1200px]` Container.
- Struktur:
  ```
  <header>
    <container>
      <red-bar />
      <flex pt-8>  <img logo /> </flex>   // Logo allein
      <flex justify-end pb-2> <nav langs /> </flex>  // Sprach-Selector direkt über grüner Linie
    </container>
    <green-line h-[8px] full-width position:relative>
      <container position:relative>
        <indicator absolute />   // Dark-Block IN der grünen Linie, an X-Position des aktiven Sprach-Buttons
      </container>
    </green-line>
  </header>
  ```
- **Indicator INNERHALB der grünen Linie:** Indicator wird im grünen `<div>` selbst gerendert (nicht mehr im Button). Position: `absolute inset-y-0` (deckt volle 8px Höhe), Breite ~44px, horizontal an der X-Position des aktiven Sprach-Buttons. Berechnung via Refs (`useRef` für nav + Container) oder per `useState` mit Messung. Pragmatisch: jeder Sprach-Button bekommt `ref`, Indicator misst nach Render (`useLayoutEffect`) `getBoundingClientRect()` relativ zum grünen Container und setzt `style={{ left, width }}`. Dadurch sitzt der dunkle Block exakt mittig unter dem aktiven Sprach-Button, in der grünen Linie.

### "E-Banking Schritt für Schritt einrichten"
- Aktuell `inline-flex` → liegt neben dem Button-Block, weil der Button auch `inline`-Verhalten erzeugt. Wickeln in eigenen `<div className="mt-4 max-w-[320px]">`, der Link selbst bleibt `inline-flex` für die Icon+Text-Ausrichtung. Dadurch erzwingen wir Block-Bruch → Link steht UNTER dem Button.

### Weiter-Button (weiterhin Teil des Plans)
- Höhe `h-10`.
- Standard: `bg-[#e4ead6]`, Textfarbe `#545b68`.
- Wenn `benutzer && passwort` beide gefüllt: `bg-[#d00035]` + Text weiß.
- `transition-colors`.

### Viewport-Layout
- Wrapper `<div className="min-h-screen flex flex-col">` umschließt Header + Section. Section nutzt `flex-1` statt `min-h-screen`. Footer steht außerhalb → erst nach Scroll sichtbar. Breadcrumb mit `mt-auto` am Section-Ende → noch im initialen Viewport.
