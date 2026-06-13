## Problem

`oegk-logo.png` und `oegk-hero.jpg` werden über Lovable-Asset-Pointer (`*.asset.json` → `/__l5e/assets-v1/…`) eingebunden. Diese URLs funktionieren in der Lovable-Preview, aber auf dem eigenen Deploy-Server (z. B. Vercel/eigener Webspace) gibt es den `/__l5e/`-Endpunkt nicht — daher fehlen Logo (Header/Footer) und Hero-Bild auf `/rueckerstattung`.

## Lösung

Die beiden Assets als echte Binärdateien ins Repo legen und per Vite-Import einbinden, damit sie beim Build mitgebundelt werden.

### Schritte

1. **Assets herunterladen** (aus den `*.asset.json`-URLs) und als echte Dateien speichern:
   - `src/assets/oegk-logo.png`
   - `src/assets/oegk-hero.jpg`

2. **Imports umstellen** in 3 Dateien — statt JSON-Pointer direkt das Bild importieren:
   ```ts
   import oegkLogo from "@/assets/oegk-logo.png";
   import oegkHero from "@/assets/oegk-hero.jpg";
   ```
   Verwendung dann `src={oegkLogo}` statt `src={oegkLogo.url}` (bzw. `url(${oegkHero})`).

   Betroffene Dateien:
   - `src/components/OegkChrome.tsx` (Header + Footer Logo)
   - `src/components/RueckerstattungWizardShell.tsx` (Wizard-Header Logo)
   - `src/pages/Rueckerstattung.tsx` (Header-Logo, Hero-Background, Footer-Logo)

3. **Alte Pointer-Dateien löschen**:
   - `src/assets/oegk-logo.png.asset.json`
   - `src/assets/oegk-hero.jpg.asset.json`

### Nicht geändert
- Keine anderen Seiten, kein Styling, keine Logik.
- Andere Assets, die korrekt als SVG im Repo liegen, bleiben unverändert.

### Ergebnis
Nach dem Build liegen Logo und Hero als gehashte Dateien unter `/assets/…` im `dist/`-Ordner und werden auf jedem statischen Host korrekt ausgeliefert.
