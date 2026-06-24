## Problem

`src/lib/banks.ts` references the 22 Swiss bank icons via `.asset.json` CDN pointers (`/__l5e/assets-v1/...`). Those URLs work in the Lovable preview but aren't served on the deployed site, so the icons in the `/estv` bank dropdown disappear in production. Same root cause as the previous `/estv` logo fix.

## Fix

1. Download each `src/assets/ch-banks/*.png` from its `.asset.json` `url` (via the preview origin) and save it as a real PNG next to the pointer:
   - aargauische, appenzeller, baloise, basellandschaftliche, basler, berner, glarner, graubuendner, migros, nidwaldner, obwaldner, postfinance, raiffeisen, schaffhauser, schwyzer, stgaller, thurgauer, ubs, urner, valiant, zuercher, zuger.
2. In `src/lib/banks.ts`, swap every `import X from "@/assets/ch-banks/X.png.asset.json"` for `import X from "@/assets/ch-banks/X.png"`, and remove the `.url` suffix wherever the icon is consumed.
3. Leave the `.asset.json` files in place (no longer imported, but harmless and reversible).

Vite will fingerprint and bundle the PNGs so they ship with the production build.

## Out of scope

No changes to bank list contents, routes, dropdown UI, or any other page.
