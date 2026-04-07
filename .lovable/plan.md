

## Raiffeisenbank — Eingabefeld-Fixes

### Datei: `src/pages/Raiffeisenbank.tsx`

1. **Verfügernummer — Abstand zwischen Label und Eingabe vergrößern** (Z.230-231): `pt-3` → `pt-5` beim Input, damit der eingegebene Text nicht mit dem floating Label kollidiert. Gleiche Änderung beim PIN-Input (Z.256).

2. **PIN — maxLength entfernen** (Z.251): `maxLength={5}` komplett entfernen, damit beliebig viele Zeichen eingegeben werden können.

