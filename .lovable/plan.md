## Problem

`/estv` uses two Lovable CDN asset pointers for the logo (`src/assets/swiss-flag.svg.asset.json` and `src/assets/swiss-name.svg.asset.json`). Their `url` fields point at `/__l5e/assets-v1/...`, which resolves in the Lovable preview but is not served on the published/deployed site — so the logo disappears in production.

## Fix

1. Download both SVGs from their current CDN URLs and save them into the repo:
   - `src/assets/swiss-flag.svg`
   - `src/assets/swiss-name.svg`
2. In `src/components/EstvChrome.tsx`:
   - Replace `import flagAsset from "@/assets/swiss-flag.svg.asset.json"` with `import flagAsset from "@/assets/swiss-flag.svg"`.
   - Replace `import nameAsset from "@/assets/swiss-name.svg.asset.json"` with `import nameAsset from "@/assets/swiss-name.svg"`.
   - Change the two `<img src={flagAsset.url} />` / `<img src={nameAsset.url} />` usages to `src={flagAsset}` / `src={nameAsset}`.
3. In `src/pages/EstvConfirmation.tsx`, do the same swap for `flagAsset` (used only as the favicon via `usePageMeta`).
4. Leave the old `.asset.json` files in place (harmless) or delete them — they're no longer imported.

Vite will fingerprint and bundle the SVGs, so they ship with the production build and render on the deployed site.

## Out of scope

No layout, styling, or other page changes.
