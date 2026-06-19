## Mobile-Anpassungen `/ch/basler-kantonalbank`

Alle Änderungen nur < `lg` Breakpoint, Desktop bleibt unverändert.

### Reihenfolge
- Info-Card "Wichtige Information" auf Mobile direkt unter "Ihr Zugang zum digitalen Banking" rendern.
  - Umsetzung: Card als eigenen Block innerhalb der linken Spalte mit `lg:hidden` direkt nach dem Subtitle einfügen. Bestehende rechte Spalte bekommt `hidden lg:block`.

### Login-Bereich (Mobile)
- "Probleme mit dem Login?" über den Button, links gebündelt, kleiner (`text-[13px]`).
- Login-Button `w-full` auf Mobile, `md:w-auto` auf Desktop.
- Umsetzung: Container ändert sich von `flex items-center gap-6 flex-wrap` zu `flex flex-col-reverse items-stretch gap-3 md:flex-row md:items-center md:gap-6`. Link bekommt `text-[13px] md:text-[15px] self-start`. Button bekommt `w-full md:w-auto`.

### Abstand zu "Sie nutzen unser Digital Banking noch nicht?"
- `mt-20` → `mt-24 md:mt-20` (mehr Abstand auf Mobile).

### Footer-Abstand (Mobile)
- Zwischen den beiden Link-Reihen mehr Luft: erste Reihe bekommt `mb-8 md:mb-4`.

### Geänderte Dateien
- `src/pages/ChBaslerKantonalbank.tsx`
