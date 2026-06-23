## /estv: Scrollbars weg & modernes Formular-Styling

### 1. Header-Scrollbar entfernen (`src/components/EstvChrome.tsx`)
- Navigation aktuell mit `overflow-x-auto` → zeigt auf manchen Viewports einen sichtbaren Scrollbalken.
- Ersetzen durch `overflow-x-auto scrollbar-none` plus utility-Klasse `[&::-webkit-scrollbar]:hidden` (und `scrollbar-width:none` via inline style) damit der Scroll-Balken visuell verschwindet, das horizontale Scrollen aber bei sehr schmalen Viewports weiterhin funktioniert.
- Auf Desktop zusätzlich `md:overflow-visible md:justify-start` damit gar kein Scroll-Container mehr nötig ist.

### 2. Formular modernisieren (`src/pages/Estv.tsx`)
Aktuell: harte Kanten (`rounded-none`), graue 1px Border, h-11, sehr "Behörden 2008". Ziel: clean, modern, weiterhin im roten ESTV-Akzent.

Konkrete Änderungen am Styling (nur Presentation, keine Logikänderung):

- **Input base**:  
  `h-12 w-full rounded-lg border bg-white px-4 text-[14px] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-4`
- **Input ok-state**: `border-gray-200 hover:border-gray-300 focus:border-[#DC0018] focus:ring-[#DC0018]/10`
- **Input error-state**: `border-red-500 focus:border-red-500 focus:ring-red-500/15 bg-red-50/30`
- **Label**: `mb-2 block text-[13px] font-medium text-gray-700` (etwas mehr Luft, weicheres Grau).
- **Section card**: außenrum bekommt die Form ein weicheres Erscheinungsbild: `rounded-2xl border border-gray-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]` statt scharfer Kasten.
- **Section header Bar** (`bg-[#FAFAFA]` Block oben): Border weg, mehr Padding, `rounded-t-2xl`.
- **Section trenner** (`<h3>` Unterstrich): statt `border-b border-gray-200` ein kleiner roter Akzent links: `pl-3 border-l-[3px]` in ESTV_RED, kein border-bottom.
- **Bank-Picker Trigger**: gleiche Optik wie Input (`h-12 rounded-lg border-gray-200 hover:border-gray-300 focus-within:border-[#DC0018] focus-within:ring-4 focus-within:ring-[#DC0018]/10`), Icon mit `rounded-md` Hintergrund.
- **PopoverContent**: `rounded-xl shadow-lg border-gray-100`, CommandItems mit `rounded-md` und subtilem Hover.
- **Submit-Button**: `rounded-full px-8 py-3.5 shadow-sm hover:shadow-md hover:translate-y-[-1px] transition`, behält ESTV_RED Hintergrund.
- **Hinweis-Box**: weicher: `rounded-xl bg-[#FDF2F3] border-l-[3px]` statt scharfe Kante.

### Out of scope
- Keine Änderungen an Logik, Validierung, Submit-Flow, Routing.
- Keine Änderungen an `LoadingOverlay`, `banks.ts`, Supabase.
- Header-Branding (Wappen, Schriftzug, Rotbalken) bleibt unverändert.