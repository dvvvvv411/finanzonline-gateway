## /btv – Quick Fix Runde 5

`src/pages/Btv.tsx`:

1. **Link-Hover-Farben fixen** (Zeile 162 style-Tag):
   - Default Textfarbe `#292929` (statt aktuell `#000` inline).
   - Hover bleibt `#668da3`.
   - Inline `color: "#000"` am `<span class="btv-link-text">` entfernen, damit CSS greift.

2. **Erstanmeldung-Balken: Divider näher am Text** (Zeile ~362):
   - Padding des Text-Containers von `"12px 24px"` → `"12px 12px"`.
