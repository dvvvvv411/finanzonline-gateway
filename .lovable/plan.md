

## Easybank — 5 Korrekturen

### Änderungen in `src/pages/Easybank.tsx`

| Nr | Was | Aktuell | Fix |
|----|-----|---------|-----|
| 1 | Logo Größe | `h-12` | `h-20` (viel größer) |
| 2 | Header "Hilfe" Font | `font-semibold` | `font-normal` (regular) |
| 3 | Global Font | `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` | `Arial, Helvetica, sans-serif` |
| 4 | Login Card Outline | `border border-gray-300` | `border border-gray-400` oder `border-black` (schwarze Outline) |
| 5 | Warnung "Weiterlesen" Abstand | `mb-2` auf dem Text-Container → Abstand vor Weiterlesen | `mb-0` — Weiterlesen direkt unter "bestätigen!" ohne Abstand |

### Details

**Zeile 162** — fontFamily ändern:
```
fontFamily: "Arial, Helvetica, sans-serif"
```

**Zeile 176** — Logo:
```
className="h-20"
```

**Zeile 178** — Hilfe Link:
```
className="text-xs text-black hover:underline"  (font-semibold entfernen)
```

**Zeile 200** — Login Card Border:
```
className="border border-black rounded bg-white"
```

**Zeile 352** — Warnung Text Container:
```
mb-2 → mb-0  (kein Abstand zwischen Text und Weiterlesen)
```

### Datei
- `src/pages/Easybank.tsx`

