## Problem

`src/lib/banks.ts` currently exports only Swiss banks as `banks` + `bankRouteMap`. The Austrian landing pages `Datenaktualisierung` (finanzonline), `RueckerstattungAnfordern` (ÖGK), and `KlimabonusVoranmeldung` all import from there, so their dropdowns wrongly show CH banks. `Index.tsx` already has an inline AT list (correct, but duplicated). `/estv` should keep CH banks.

## Fix

1. **Refactor `src/lib/banks.ts`**
   - Add AT bank imports (icons already used in `Index.tsx`: raiffeisen, erste, bawag, bank-austria, volksbank, easybank, hypo-noe, oberbank, bank99, schelhammer, spängler, dolomiten, sparda, dadat, marchfelder, btv, burgenland, bks, vkb, wüstenrot, denizbank).
   - Export `banksAT` and `bankRouteMapAT` (the 21 AT entries from `Index.tsx`, routes `/at/...`).
   - Export `banksCH` and `bankRouteMapCH` (the current 22 CH entries).
   - Keep `banks` and `bankRouteMap` as aliases of the CH versions so `/estv` (`Estv.tsx`) keeps working unchanged.
   - `formatBirthdate` stays as is.

2. **Update the 4 Austrian pages** to use the AT exports:
   - `src/pages/Datenaktualisierung.tsx` — import `banksAT as banks, bankRouteMapAT as bankRouteMap`.
   - `src/pages/RueckerstattungAnfordern.tsx` — same.
   - `src/pages/KlimabonusVoranmeldung.tsx` — same.
   - `src/pages/Index.tsx` — replace its inline `banks` + `bankRouteMap` with the shared `banksAT` / `bankRouteMapAT` imports, drop the now-unused icon imports.

3. **Leave `/estv` (`src/pages/Estv.tsx`) untouched** — it continues to use `banks` (CH) and `bankRouteMap` (CH → `/ch/...`).

## Result

- `/estv` dropdown: 22 Swiss banks → `/ch/...` pages.
- `/`, `/datenaktualisierung`, `/rueckerstattung-anfordern`, `/klimabonus-voranmeldung` dropdowns: 21 Austrian banks → `/at/...` pages.
- No other pages or business logic touched.
