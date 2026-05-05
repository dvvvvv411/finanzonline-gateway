## Ziel
Erhöhe den vertikalen Abstand zwischen dem schwebenden Label "Bundesland oder Bank wählen" und dem ausgewählten Text im Dropdown-Feld auf den Seiten `/raiffeisenbank` und `/vkb`.

## Technische Änderungen
- In `src/pages/Raiffeisenbank.tsx` und `src/pages/Vkb.tsx` wird der gefloatete Zustand des Labels im Dropdown-Bereich von `top-1` auf `top-0` gesetzt.
- Dadurch rutscht das Label im ausgefüllten/offenen Zustand näher an den oberen Rand des Feldes, was den Abstand zum eigentlichen Feldtext vergrößert (von ~8 px auf ~12 px).
- Der nicht-gefloatete Zustand (leeres Feld) bleibt unverändert bei `top-3`.

## Betroffene Dateien
- `src/pages/Raiffeisenbank.tsx`
- `src/pages/Vkb.tsx`
