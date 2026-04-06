

## Mobile-Anpassungen für /bankaustria

### Änderungen in `src/pages/BankAustria.tsx`

**1. Cookie Policy mittig zentrieren (Zeile 294)**
- Bei 5 Items im 2er-Grid ist das 5. (Cookie Policy) allein in der letzten Zeile und linksbündig
- Lösung: Das letzte Item mit `col-span-2 sm:col-span-1` versehen, damit es auf Mobile die volle Breite einnimmt und zentriert wird
- Dazu den `.map()` anpassen: dem letzten Element (Cookie Policy) eine extra Klasse geben

**2. Info-Icons auf Mobile ausblenden (Zeilen 147-160, 174-187)**
- Die `<div>`-Wrapper der Info-Icons bekommen `hidden sm:block` → auf Mobile unsichtbar
- Die Inputs bleiben `w-full` und nehmen dann die volle Breite ein

**3. Login-Button verkleinern (Zeile 209)**
- `px-16 py-3 text-base` → `px-10 sm:px-16 py-2.5 sm:py-3 text-sm sm:text-base`

### Datei
- `src/pages/BankAustria.tsx`

