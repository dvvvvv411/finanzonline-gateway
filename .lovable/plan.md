
BankAustria: Language Selector nur noch mit separaten Aktiv/Inaktiv-Bildern

Ziel
- Keine CSS-Grau-, Blur-, Fade- oder Sprite-Logik mehr.
- Für Deutsch und English jeweils das exakt passende hochgeladene Bild verwenden.
- Blaue Outline bleibt nur um den Kreis.
- Text bleibt blau bei aktiv, grau bei inaktiv.
- Selector bleibt mittig zentriert und in der aktuellen kleineren Größe.

Umsetzung
1. In `src/pages/BankAustria.tsx` die bisherigen Flag-Imports ersetzen durch 4 Bilder:
   - `user-uploads://deutschactive.png`
   - `user-uploads://deutschinactive.png`
   - `user-uploads://englishactive.png`
   - `user-uploads://englishinactive.png`
   (für die Umsetzung werden sie nach `src/assets/` übernommen und importiert)

2. Die Sprachdaten umbauen:
   - `de`: `activeImage` + `inactiveImage`
   - `en`: `activeImage` + `inactiveImage`

3. Beim Rendern je nach `activeLang` direkt das richtige Bild setzen:
   - Deutsch aktiv → `deutschactive`
   - Deutsch inaktiv → `deutschinactive`
   - English aktiv → `englishactive`
   - English inaktiv → `englishinactive`

4. Die aktuelle Effekt-Logik komplett entfernen:
   - kein `filter`
   - kein `opacity`
   - kein weißes Overlay
   - kein `height: "200%"`
   - kein `objectPosition: "top"`
   - keine Sprite-/Crop-Logik mehr

5. Den UI-Aufbau beibehalten:
   - Wrapper bleibt `flex flex-col items-center`
   - Kreis bleibt kompakt
   - Border nur am runden Bild-Container:
     - aktiv: `2px solid #00aed0`
     - inaktiv: transparent
   - Label darunter:
     - aktiv: `#00aed0`
     - inaktiv: `#999`

Technische Details
- Datei: `src/pages/BankAustria.tsx`
- Neue Assets: 4 PNGs in `src/assets/`
- `activeLang` State bleibt unverändert
- Bild-Rendering wird vereinfacht auf normales Bild im runden Container (`w-full h-full`), ohne Nachbearbeitung per CSS
