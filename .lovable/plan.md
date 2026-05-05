## /btv – Mobile Quick Fix

`src/pages/Btv.tsx`:

1. Mobile Top-Padding für Main: `padding: isMobile ? "20px 16px 40px"` → `"80px 16px 40px"` (Zeile 209), damit Abstand wie mit Logo erhalten bleibt.
2. Weiter-Button mobile full-width + zentriert:
   - Wrapper `<div style={{ textAlign: "right" }}>` → `textAlign: isMobile ? "center" : "right"`.
   - Button: `width: isMobile ? "100%" : undefined`.