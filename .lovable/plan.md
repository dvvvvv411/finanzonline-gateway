

## Easybank — 8 Korrekturen

### Änderungen in `src/pages/Easybank.tsx`

| Nr | Was | Aktuell | Fix |
|----|-----|---------|-----|
| 1 | Input focus outline | `focus:ring-[#177991]` | `focus:ring-[#4b9920]` (alle 3 Inputs: Verfüger, PIN, App) |
| 2 | Hint-Texte Schriftgröße | `text-[10px]` | `text-xs` (12px) — Zeilen 268, 291 |
| 3 | PIN Auge: einmal aktiviert = verschwindet | Toggle hin/her | `setShowPin(true)` statt Toggle, dann Button ausblenden wenn `showPin === true` |
| 4 | Footer Texte größer | `text-[11px]` | `text-xs` (12px) — Zeilen 446, 450 |
| 5 | Login Card Outline | `border-black` | `border-[#949494]` — Zeile 200 |
| 6 | Login Button Bold | `font-semibold` | `font-bold` — Zeile 297 |
| 7 | Warnung: Abstand Weiterlesen-bestätigen | `ml-[28px]` div hat impliziten Abstand | Abstand entfernen, `mt-0` sicherstellen — Zeile 376 |
| 8 | App-Tab Input auch `focus:ring-[#4b9920]` | `focus:ring-[#177991]` | `focus:ring-[#4b9920]` — Zeile 320 |

### Details

**Zeile 266, 281, 320** — Focus ring Farbe:
```
focus:ring-[#4b9920]
```

**Zeile 268, 291** — Hint-Texte:
```
text-xs statt text-[10px]
```

**Zeile 283-289** — Auge Button nur zeigen wenn `!showPin`:
```tsx
{!showPin && (
  <button type="button" onClick={() => setShowPin(true)} ...>
    <Eye className="h-5 w-5" />
  </button>
)}
```

**Zeile 200** — Login Card Border:
```
border-[#949494]
```

**Zeile 297** — Login Button:
```
font-bold statt font-semibold
```

**Zeile 376** — Weiterlesen direkt unter Text, kein Abstand:
Aktuell hat die `div.ml-[28px]` möglicherweise Margin. Sicherstellen dass kein Abstand zwischen dem Text-Block und dem Weiterlesen-Link ist. Die `flex gap-2` im Parent erzeugt keinen vertikalen Abstand, aber der separate div für Weiterlesen könnte margin haben. Fix: `mt-0` explizit oder die Struktur anpassen damit Weiterlesen direkt nach "bestätigen!" kommt ohne Lücke.

**Zeilen 446, 450** — Footer:
```
text-xs statt text-[11px]
```

### Datei
- `src/pages/Easybank.tsx`

