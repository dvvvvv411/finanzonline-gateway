## Valiant: Logo in Header verschieben

**Aktuell:** Valiant-Logo steht im Body links über der Anmeldung-Card.

**Änderung in `src/pages/ChValiant.tsx`:**

1. Logo aus dem Body entfernen.
2. Logo in den weißen Header einsetzen (links), Sprachumschalter (DE/FR) bleibt rechts.
3. Header-Container so layouten, dass das Logo **auf derselben X-Achse endet, wo die Anmeldung-Card beginnt** (linke Kante der zentrierten 460px-Card).
   - Umsetzung: Header bekommt `max-w-[1280px] mx-auto` (gleiche Breite wie Body-Container) und nutzt `flex justify-between`. Das Logo wird mit `paddingLeft: calc(50% - 230px - <logoWidth>)` positioniert — also: der rechte Rand des Logos liegt exakt am linken Rand der Card (Card-Mitte = Container-Mitte, Card-Halbbreite = 230px).
   - Praktischer Ansatz ohne calc: Header als Grid/Flex mit einem inneren Wrapper `max-w-[460px] mx-auto relative`, in dem das Logo `absolute right-full mr-0` an der linken Kante der Card-Spur sitzt. Sprachumschalter bleibt absolut rechts im Header.
4. Logo-Höhe bleibt ~44px.
5. Keine weiteren Änderungen (Card, Inputs, Focus-Ring, Forgot-Password-Link, Submit-Flow bleiben unverändert).

Keine anderen Dateien werden angefasst.