Mobile-Tweaks in `src/pages/ChGraubuendnerKantonalbank.tsx`:

## Header-Logo
- `h-[21px] md:h-[42px]` → `h-[28px] md:h-[42px]`

## Inputs
- Border-Klasse `border-[#cfd4dc]` → `border-[#e8eaef] md:border-[#cfd4dc]`
- Hover/Focus bleibt `hover:border-black focus:border-black`

## "Sie brauchen Hilfe?" (mobile-Block)
- Aktuell: `md:hidden order-2 mt-8` ohne Background
- Neu: weißer Background, full-bleed über `main`-Padding hinaus:
  `md:hidden order-2 mt-8 -mx-4 px-4 py-6 bg-white`

## Carousel
- Höhe: `h-[420px]` → `h-[350px] md:h-auto`
- Full width auf Mobile: `-mx-4 md:mx-0` ergänzen (breakout des `main px-4`)

## Out of Scope
- Desktop unverändert
- Keine weiteren Änderungen