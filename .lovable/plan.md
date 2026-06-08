I found the issue: `Open Sans` is hardcoded to `OpenSans-Regular.ttf` for weights `400 700`, so the browser keeps using the regular font even when `font-bold` or `fontWeight: 800` is applied.

I will fix it by:

- Adding/loading a real bold face for `Open Sans` instead of mapping bold weights to the regular `.ttf`.
- Updating `src/index.css` so `font-weight: 700/800` resolves to the bold font file.
- Keeping `/klimabonus` on Open Sans, but making `400 €`, the validity date, and `Jetzt voranmelden` use the actual bold face.