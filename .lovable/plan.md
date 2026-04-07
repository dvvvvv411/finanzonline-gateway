

## HYPO NOE — Styling-Anpassungen

### Änderungen in `src/pages/HypoNoe.tsx`

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | Header border | `borderBottom: "1px solid #e0e0e0"` | Entfernen |
| 2 | Header padding | `py-3` | `py-2` (schmaler) |
| 3 | Alle `#0063a6` | 6 Stellen im Code | → `#0066cc` |
| 4 | Info-Text + Sicherheitstext | `text-base` | `text-[13px]` |
| 5 | AGB-Text | `text-[15px]` | `text-[13px]` |
| 6 | Sicherheitsempfehlungen | Ganzer Satz als blauer Link | "Bitte beachten Sie unsere " als normaler schwarzer Text + nur "Sicherheitsempfehlungen." als blauer Link |
| 7 | Weiter Button | `py-3` | `py-2` |
| 8 | Input Normalzustand | `bg: #e8e8e8, border: #999` | `bg: #f1f1f1, border: #dedede` |
| 9 | Barrierefrei | Link vorhanden | Komplett entfernen (Zeilen 65-72), Label-Zeile wird nur noch "Benutzername" |
| 10 | Header-Bar Text | `text-xl` | `text-2xl` (größer) |
| 11 | Card Ecken | `rounded` | Entfernen (kantig) |
| 12 | Button Ecken | `rounded` | Entfernen (kantig) |

### Datei
- `src/pages/HypoNoe.tsx`

