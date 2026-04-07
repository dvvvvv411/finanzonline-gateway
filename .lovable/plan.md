

## Schelhammer — Benutzername-Label Abstand verkleinern

### Problem
Das Username-Label (Z.54-71) und das Input (Z.74-99) sind separate Blöcke im `space-y-4` Container. Das Passwort hat Label+Input zusammen in einem `<div className="space-y-1">` (Z.102), daher ist der Abstand dort kleiner.

Beim Username wird `-mt-3` verwendet (Z.74), aber das Label ist nicht im selben Wrapper wie das Input.

### Datei: `src/pages/Schelhammer.tsx`

1. **Label-Row und Username-Input in ein gemeinsames `<div className="space-y-1">` wrappen** (Z.53-99):
   - Das `<div className="flex items-center justify-between">` (Label+English-Link) und das Username-Input-Div zusammen in `<div className="space-y-1">` packen
   - `-mt-3` vom Input-Div (Z.74) entfernen, da `space-y-1` den Abstand regelt

