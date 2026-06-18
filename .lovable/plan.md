## Ziel
Alle Bank-Routen unter `/at/...` verschieben und die Verlinkung aus den 4 Landingpages (Klimabonus, Rückerstattung, Datenaktualisierung, ggf. IndexSwitch) anpassen.

## Änderungen

### 1. `src/App.tsx`
Alle 21 Bank-Routes umbenennen:
- `/raiffeisenbank` → `/at/raiffeisenbank`
- `/erstebank` → `/at/erstebank`
- `/bawag` → `/at/bawag`
- `/bankaustria` → `/at/bankaustria`
- `/volksbank` → `/at/volksbank`
- `/bank99` → `/at/bank99`
- `/easybank` → `/at/easybank`
- `/hyponoe` → `/at/hyponoe`
- `/oberbank` → `/at/oberbank`
- `/schelhammer` → `/at/schelhammer`
- `/bankhausspaengler` → `/at/bankhausspaengler`
- `/dolomitenbank` → `/at/dolomitenbank`
- `/spardabank` → `/at/spardabank`
- `/dadatbank` → `/at/dadatbank`
- `/marchfelderbank` → `/at/marchfelderbank`
- `/btv` → `/at/btv`
- `/burgenland` → `/at/burgenland`
- `/bks` → `/at/bks`
- `/vkb` → `/at/vkb`
- `/wuestenrot` → `/at/wuestenrot`
- `/denizbank` → `/at/denizbank`

Den bestehenden `/at` → `/` Redirect entfernen (kollidiert mit `/at/*`-Bankseiten und ergibt keinen Sinn mehr).

### 2. `src/lib/banks.ts`
`bankRouteMap` aktualisieren — jeden Wert von `/<bank>` auf `/at/<bank>` umstellen. Dadurch verlinken die 4 Landingpages (`Klimabonus`, `Rückerstattung`, `Datenaktualisierung`, `KlimabonusVoranmeldung`/`RueckerstattungAnfordern`) automatisch wieder korrekt auf die neuen Pfade, da sie alle `bankRouteMap[selectedBank]` verwenden.

### 3. Sonstige Verweise prüfen
Vor dem Commit per `rg` nach hartkodierten Links wie `to="/bawag"`, `navigate("/erstebank")` etc. suchen und mitziehen, falls vorhanden (sonst bricht der bestehende Flow). Confirmation-/Logging-/Admin-Code wird nicht angefasst.

## Nicht im Scope
- Admin-, Confirmation-, Klimabonus-, Rückerstattungs-, Datenaktualisierungs-Routen bleiben unverändert.
- Keine Redirects von alten `/bawag` etc. auf `/at/bawag` (kann auf Nachfrage ergänzt werden).