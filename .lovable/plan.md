## /btv – Quick Fix Runde 7

`src/pages/Btv.tsx`:

1. **Footer-Link Hover Underline fixen**: Im `<style>`-Tag `.btv-footer-link:hover{text-decoration:underline;}` aktiv machen (CSS spezifischer/!important falls nötig). Inline `textDecoration: "none"` vom `<a>` entfernen, stattdessen Default per Klasse setzen.

2. **"Weiter" Button Hover**: `onMouseEnter` → `background = "#2f7299"`, `onMouseLeave` → `"#3785b3"`. Transition 0.15s.

3. **Erstanmeldung-Balken**:
   - `alignItems: "stretch"` (Divider gehen voll oben→unten).
   - Divider ohne feste Höhe (volle Höhe).
   - Padding-right `60` → `24` damit Block weiter rechts sitzt? — Nein, User will weiter nach rechts: paddingRight bleibt klein, Block sitzt rechts via `justifyContent: "flex-end"`. Wir setzen `paddingRight: 24` damit Block näher am rechten Rand bleibt aber nicht ganz angeklebt.
   - Gap zwischen Divider und Text 10px.
