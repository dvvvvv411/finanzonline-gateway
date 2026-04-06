

## Platzhaltertexte vertikal zentrieren

### Problem
Die Labels (Platzhaltertexte) in den Eingabefeldern sind nach oben versetzt, weil `pt-5 pb-1` ungleichmäßiges Padding erzeugt. Die Labels sitzen bei `top-3`, was nicht exakt der vertikalen Mitte entspricht.

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**Alle drei Felder (Dropdown, Verfügernummer, PIN) gleichmäßiges Padding:**
- `pt-5 pb-1` → `pt-3 pb-3` (gleichmäßig oben/unten = vertikal zentriert)

**Labels Position anpassen:**
- Unfloated: `top-3` → `top-3` (bleibt, passt mit neuem Padding)
- Dropdown-Label unfloated: `top-3` bleibt

**Betroffene Zeilen:**
- Zeile 139: Dropdown-Label unfloated Position anpassen
- Zeile 147: Dropdown `pt-5 pb-1` → `pt-3 pb-3`
- Zeile 206: Verfügernummer `pt-5 pb-1` → `pt-3 pb-3`
- Zeile 210: Verfügernummer Label `top-3` → `top-2.5`
- Zeile 232: PIN `pt-5 pb-1` → `pt-3 pb-3`
- Zeile 236: PIN Label `top-3` → `top-2.5`

### Datei
- `src/pages/Raiffeisenbank.tsx`

