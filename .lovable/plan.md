Änderungen in `src/pages/ChSchaffhauserKantonalbank.tsx`:

1. Page-BG: `bg-[#f2f2f2]` → `bg-[#fbfbfb]` (root + Logo-Container).
2. Logo: `h-[60px] md:h-[70px]` → `h-[44px] md:h-[54px]`.
3. Anmelden-Button mobil full width: Wrapper `flex justify-end` → `flex justify-end`, Button bekommt `w-full md:w-auto`.
4. Info-Cards-Grid mobil nebeneinander: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → `grid-cols-4` (immer 4-spaltig), Gap mobil verkleinern (`gap-2 sm:gap-4`), Card-Padding `px-4 py-6` → `px-2 py-4 sm:px-4 sm:py-6`, Icon `h-[56px]` → `h-[40px] sm:h-[56px]`, Text `text-[14px]` → `text-[11px] sm:text-[14px]`.
