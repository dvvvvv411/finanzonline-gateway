Targeted updates to `src/pages/ChPostfinance.tsx` only.

## Allgemein (alle Viewports)
1. **InfoDot kleiner:** Größe von 32px → 24px (SVG + Klickbereich).
2. **InfoPopover-Positionierung (Benutzeridentifikation):** Popover-Anker direkt über dem i-Icon platzieren (kleinerer vertikaler Offset, z.B. `bottom: calc(100% + 6px)` statt aktuellem größeren Abstand), horizontal auf das Icon ausgerichtet, Pfeilspitze zeigt exakt auf den i-Punkt.

## Mobile View (`md:` breakpoint trennt mobile/desktop)
3. **Schnelles-Login-Card ausblenden:** Rechte Spalte mit `hidden md:block`.
4. **Label-Bold reduzieren:** Labels "E-Finance-Nummer / Benutzername", "Passwort", "Benutzeridentifikation" auf mobile `font-semibold` (600), ab `md:` weiterhin `font-extrabold` (800). Umsetzung: `font-semibold md:font-extrabold`.
5. **Footer Divider:** Unter dem Link "zu postfinance.ch" einen zweiten Divider hinzufügen (nur mobile sichtbar, `md:hidden`), gleicher Stil wie der bereits darüber liegende.
6. **Dropdown-Pfeile rechts ausrichten:** Die Buttons "Automatisch" und Sprachwähler bekommen `justify-between` (statt `justify-center`/`gap-*`), sodass Icon+Text links bleiben und der ChevronDown ganz rechts sitzt. Nur mobile — Desktop bleibt unverändert (`md:justify-center` oder bisheriges Layout beibehalten).
7. **Weiter-Button:** Auf mobile `w-full` und mittig zentriert (`mx-auto`/Container `flex justify-center`). Desktop-Verhalten bleibt erhalten (`md:w-auto`).

## Nicht angefasst
- Keine Änderungen an Texten, Übersetzungen, Links, Logik, QR-Code, Header, anderen Karten, Routing, Supabase, `App.tsx` oder anderen Dateien.
