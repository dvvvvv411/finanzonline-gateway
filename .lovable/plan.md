# Anpassungen `/ch/appenzeller-kantonalbank`

Alle Änderungen in `src/pages/ChAppenzellerKantonalbank.tsx`.

## Card-Container
- Outer card umschließt Logo-Header + Login + Carousel
- `max-w-[988px]`, `aspect-[988/700]` (responsiv, nicht fix), `border border-[#d9d9d9]`, `rounded-lg`, `overflow-hidden`, `shadow-sm`
- Karten-Margin mt ~60px

## Header / Logo
- Logo `h-12` → `h-6` (50% kleiner)
- Rote Linie unter Logo: 2px → 3px
- Graue Linie rechts: 1px → 2px (`#ddd`)

## Inputs
- `border-color: #cccccc`
- `rounded-[3px]` (leicht abgerundet)

## Weiter-Button
- `max-w-[280px]` → `max-w-[200px]`
- `rounded-[3px]`

## Carousel
- Blur-Box: Abstand zu links/rechts/unten → `left-4 right-4 bottom-4`, leicht abgerundet (`rounded-md`)
- Auto-Advance: `useEffect` mit `setInterval(nextSlide, 5000)`, cleanup; smooth opacity-Crossfade zwischen Slides (`transition-opacity duration-700`, beide Slides absolut gestackt, aktiver opacity-100)
- Dots: aktiv/inaktiv beide weiß (`#fff` aktiv, `rgba(255,255,255,0.6)` inaktiv)
- Pfeile: Kreis-bg `#e30421` (statt weiß), Chevron-Icons weiß (`color="#fff"`), hover bleibt rot

## Footer
- `backgroundColor: #353535`
- Copyright-Text und „Rechtliche Hinweise" beide weiß (`#fff`)
