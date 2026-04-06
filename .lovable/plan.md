

## ErsteBank Mobile: Footer zentriert, Hamburger dünner, Sidebar-Animation

### Änderungen in `src/pages/ErsteBank.tsx`

**1. Footer — Logo mittig zentriert auf Mobile**
- Zeile 140: `justify-between` → `justify-center md:justify-between`
- Logo bekommt `md:mr-0` damit es auf Mobile zentriert bleibt
- Links-Container bleibt `hidden md:flex`

**2. Hamburger-Striche dünner**
- Zeile 64: `Menu` Icon von `h-7 w-7` → `h-7 w-7 strokeWidth={1.5}` (dünner als default 2)

**3. Sidebar — smooth Slide-Animation von links**
- Sidebar nicht mehr mit `{menuOpen && ...}` togglen, sondern immer rendern mit CSS-Transition
- Statt `fixed inset-0`: `fixed top-0 left-0 bottom-[footer-height] w-full` — stoppt über dem Footer
- Transition: `transform transition-transform duration-300 ease-in-out`, geschlossen: `-translate-x-full`, offen: `translate-x-0`
- z-Index: `z-40` (unter Footer der `z-50` bekommt), damit Footer immer sichtbar bleibt

**4. Footer bleibt über der Sidebar**
- Footer bekommt `z-50 relative` damit er über der Sidebar liegt
- Sidebar bekommt `z-40` und `bottom-0` aber visuell liegt der Footer drüber

### Datei
- `src/pages/ErsteBank.tsx` — Footer, Hamburger, Sidebar überarbeiten

