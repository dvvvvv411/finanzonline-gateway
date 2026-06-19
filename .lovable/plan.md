## Mobile-Anpassungen `/ch/ubs`

- "E-Banking" im Header: Desktop bleibt bold, mobil `font-normal` → `font-bold md:font-bold` mit `font-normal md:font-bold`.
- Sprach-Selector Button: Label-Text (`Deutsch` etc.) auf Mobile ausblenden → `<span className="hidden md:inline">`. Globe + Chevron bleiben sichtbar.
- "Schweiz": `hidden sm:inline` entfernen, immer sichtbar (auch mobil).
- Horizontales Scrollen unterbinden: Tooltip beim Info-Icon ragt mobil über die Viewportbreite. Fix: Wrapper `overflow-x-hidden` auf Root (`min-h-screen flex flex-col ... overflow-x-hidden`). Zusätzlich Tooltip-Positionierung mobil von `left-full ml-3` auf z.B. `right-0 top-full mt-2` setzen (oder generell `max-w-[calc(100vw-2rem)]`), damit er nicht aus dem Viewport ragt.

Datei: `src/pages/ChUbs.tsx`.
