# Mobile Optimization /denizbank

All in `src/pages/Denizbank.tsx`. Use Tailwind responsive prefixes (`md:`) so desktop stays intact.

## Header (mobile only)
- Stack vertically, centered: logo on top, "Barrierefrei" below, language selector below.
- Show "Barrierefrei" on mobile too (currently `hidden md:flex`).
- Wrapper: `flex-col items-center gap-3 md:flex-row md:justify-between`.

## Main Layout
- Hide "Willkommen bei der DenizBank" headline on mobile: add `hidden md:block`.
- Grid becomes single column with login card first, then Hinweis below.
- Reorder via flex `order-` classes or restructure: on mobile show login card → Hinweis. Easiest: keep grid but apply `order-1 md:order-none` to login card and `order-2 md:order-none` to left column, plus hide headline.

## Login Card – Tabs
- On mobile, inactive Gemeinschaft/Firma tabs: background `#605f60` (instead of glass). Active stays white.
- Hide chevron arrows on mobile (`hidden md:inline-block` on the chevrons, or only render on `md:`).

## Sperre aufheben / Passwort vergessen Buttons
- On mobile: full width, stacked → change `grid-cols-2 gap-3` to `grid-cols-1 md:grid-cols-2`.

## Hinweis Card
- Below login card on mobile.
- Remove left divider line on mobile, center text.
- Add gray translucent blurred card background: `bg-white/10 backdrop-blur-md rounded-md p-5 text-center` (mobile only). Desktop keeps current border-left look.
- Classes: `mt-8 md:mt-12 max-w-md mx-auto md:mx-0 text-center md:text-left bg-white/10 backdrop-blur-md md:bg-transparent md:backdrop-blur-none rounded-md md:rounded-none p-5 md:p-0 md:border-l-2 md:border-white/70 md:pl-5 md:py-1`.

## Footer
- Center all items vertically, no labels on mobile.
- Footer link labels hidden on mobile: wrap label in `<span className="hidden md:inline">`.
- Footer links row: keep `flex` with icons in a row, centered. Use `justify-center md:justify-start`.
- Outer footer container: `flex-col items-center gap-6 md:flex-row md:items-center md:justify-between`.
- ENBD logo placed last: change order so ENBD comes after links on mobile (`order-2 md:order-none` on logo, `order-1 md:order-none` on links).

## Affected Files
- Modified: `src/pages/Denizbank.tsx`
