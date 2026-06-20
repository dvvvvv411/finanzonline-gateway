# Input-Schatten: nur außen (drop-shadow), kein inset

`src/pages/ChZugerKantonalbank.tsx` — beide Inputs:

- `inset_0_2px_4px_rgba(0,0,0,0.35)` entfernen.
- Schatten nur als äußerer Drop-Shadow:
  `focus:shadow-[0_4px_10px_rgba(0,0,0,0.35)]`

Border bleibt blau (`#0085ca`) im Focus. Sonst nichts ändern.
