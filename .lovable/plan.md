## Valiant: Logo oben links im Header

Logo ist aktuell `absolute right-full` an der linken Card-Kante positioniert — bei schmalen Viewports wird es außerhalb des sichtbaren Bereichs geschoben und ist deshalb unsichtbar.

**Fix in `src/pages/ChValiant.tsx`:**

- Header umbauen zu `flex items-center justify-between` mit `px-6 md:px-10 py-5`.
- Valiant-Logo links als normales Flex-Child (kein `absolute`), `h-9 md:h-10`.
- Sprachumschalter (DE/FR) rechts als zweites Flex-Child.
- `minHeight`, absolutes Track-Wrapper und `right-full`-Trick entfernen.

Keine anderen Änderungen.