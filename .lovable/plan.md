

## HYPO NOE — Label Fixes

### Änderungen in `src/pages/HypoNoe.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | Benutzername Label | `font-semibold` (Zeile 66) | `font-normal` |
| 2 | Passwort Label | `font-semibold` (Zeile 99) | `font-normal` |
| 3 | Abstand Benutzername Label→Input | `-mb-2` reicht nicht (wird von `space-y-4` überschrieben) | `-mb-3` auf beiden Label-Divs |
| 4 | Abstand Passwort Label→Input | `-mb-2` | `-mb-3` |

Das Problem: `space-y-4` auf dem Parent gibt 16px zwischen allen Kindern. `-mb-2` (8px) reicht nicht, um den Abstand sichtbar zu verringern. Mit `-mb-3` (12px) wird der effektive Abstand auf ~4px reduziert.

### Datei
- `src/pages/HypoNoe.tsx`

