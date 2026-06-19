Zwei Fixes in `src/pages/ChAargauischeKantonalbank.tsx`:

**1. Footer erst beim Scrollen sichtbar**
- `<main>` bekommt `min-h-[100vh]`, damit Header + Main allein den ersten Viewport komplett füllen. Dunkler Footer und heller Sub-Footer rutschen damit unter den Fold und erscheinen erst beim aktiven Runterscrollen.

**2. Slogan im Sub-Footer**
- Text: „Am richtigen Ort" (ohne Punkt).
- Klassen: `font-semibold italic` → `font-semibold` (kein Italic).
- Farbe: `#0069a7` → `#001a41` (gleiches Dunkelblau wie der Footer darüber).