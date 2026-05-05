## /btv – Mobile-Anpassungen

`src/pages/Btv.tsx`:

1. **Header (Logo + Divider) auf Mobile ausblenden**: gesamten Header-`<div>` (Zeile ~188-199) in `{!isMobile && (...)}` wrappen.
2. **Cards auf Mobile fix 300×360**: in allen drei Card-Wrappern (Login, Links, Slider) die mobile-Werte ändern:
   - `width: isMobile ? "100%" : 300` → `width: 300`
   - `height: isMobile ? "auto" : 360` → `height: 360` (Slider: `isMobile ? 280 : 360` → `360`)
   - `flex: isMobile ? "0 0 auto" : "0 0 300px"` → `"0 0 300px"`
   - Outer flex-row: `flexDirection: isMobile ? "column" : "row"` bleibt; `alignItems` bleibt; zusätzlich `alignItems: "center"` auf Mobile damit zentriert.
3. **AT-Flagge auf Mobile ausblenden**: `<img src={atFlagge}>` in `{!isMobile && (...)}` wrappen.
4. **Footer-Links auf Mobile untereinander, links zentriert**: 
   - Footer-Wrapper `flexDirection: isMobile ? "column" : "row"` bleibt; `alignItems: isMobile ? "flex-start" : "center"` bleibt.
   - Inner `<div>` mit Links: `flexDirection: isMobile ? "column" : "row"`, `gap: isMobile ? 8 : 24`, `alignItems: "flex-start"`.
   - Copyright `marginLeft: "auto"` nur Desktop bleibt.