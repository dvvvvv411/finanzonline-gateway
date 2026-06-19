Update `src/pages/ChBasellandschaftlicheKantonalbank.tsx`:

1. **Card shadow on all sides**: replace `shadow-lg` with custom shadow `shadow-[0_0_20px_rgba(0,0,0,0.1)]` so it surrounds the card (top, left, right, bottom) instead of only below.
2. **Error red color**: change `RED` constant from `#ba0a12` to `#FD000D` (same as "E-Banking bestellen" links) — applies to input border, floating label and helper text in error state.
   - Keep button hover color at `#ba0a12` (separate constant) as previously specified.
