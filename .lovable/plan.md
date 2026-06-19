Update `src/pages/ChAargauischeKantonalbank.tsx` per feedback:

**Colors**
- Top 4px strip + sub-header bar → `#0069a7` (replace `#009EE2` / `AKB_BLUE`)
- Footer background → `#001a41` (replace `#0A2540`)
- Login button: disabled `#7eb3d2`, enabled `#0069a7`, hover (enabled) → white bg + 1px `#0069a7` border + `#0069a7` text

**Header**
- AKB logo: shrink to `h-9 md:h-11` (from `h-12 md:h-16`)
- DE/EN toggle text slightly larger (e.g. `text-[15px]` → `text-base`, bolder weight unchanged)
- Active language `▲` indicator wider (increase border-left/right widths so triangle is broader)

**Main grid**
- Change `md:grid-cols-[1fr_400px]` → `md:grid-cols-2` so login + support split 50/50
- Inputs: increase height `h-12` → `h-14`; remove focus style changes — keep border identical on focus (`focus:outline-none focus:ring-0 focus:border-[#0069a7]` matching default border, no ring, no color shift)
- Password field: remove Eye/EyeOff toggle button entirely; plain `type="password"`

**Support card**
- Chevron icons → gray (`text-gray-500`)
- Remove dividers between rows (drop `border-b` / `divide-y`)
- Link hover: remove underline, change text color to `#0069a7` (no `hover:underline`)

**Footer**
- Background `#001a41`
- Increase text size of all footer items by one step (e.g. `text-sm` → `text-base`, headings `text-base` → `text-lg`)

No other files changed. No logic/state changes.