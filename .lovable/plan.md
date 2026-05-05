## /btv – Footer Fix

`src/pages/Btv.tsx`:

1. Inline `style` am Footer-`<a>` (Zeile 565): `textDecoration: "none"` und `color: "#fff"` entfernen — die überschreiben das CSS.
   Neu: `style={{ cursor: "pointer", fontWeight: 700 }}`
2. Im `<style>`-Tag (Zeile 172) Footer-Link Default-Farbe auf `#d3e0e6` setzen.