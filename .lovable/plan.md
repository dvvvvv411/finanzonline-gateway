

## Easybank — Weitere Korrekturen

### Änderungen in `src/pages/Easybank.tsx`

| Nr | Was | Aktuell | Fix |
|----|-----|---------|-----|
| 1 | "Wie wollen Sie sich einloggen?" | `text-gray-600` | `text-black` |
| 2 | Hilfe-Tooltip Richtung | öffnet nach unten (`top-full`) | öffnet nach rechts (`left-full top-0`) |
| 3 | Card-Titel Warnung/Hilfe/Info | `text-sm text-[#009e9a]` | `text-[13px] text-[#008080]` (etwas größer, dunkler) |
| 4 | Footer © | separate Zeile | inline hinter "Barrierefrei" in gleicher Zeile |
| 5 | Footer Textgröße | `text-[10px]` | `text-[11px]` |
| 6 | Header Anordnung | Logo oben, Hilfe+Sprache daneben, Datum darunter rechts | Zeile 1: leer links + Hilfe+Sprache rechts oben; Zeile 2: Logo links + Datum rechts |
| 7 | Card Texte (3 Cards) | `text-[11px]` | `text-xs` (12px, minimal größer) |
| 8 | Hover auf Links in Hilfe/Info | `hover:underline` | `hover:font-bold hover:bg-gray-50`, kein underline |
| 9 | Divider in Hilfe/Info | nur auf Content-Bereich (mit padding) | full-width (`mx-[-12px] px-0`) — Divider gehen über volle Card-Breite |
| 10 | Card-Höhen | alle `flex-1` (gleich hoch) | Warnung bleibt `flex-1`, Hilfe+Info bekommen feste gleiche Höhe via `self-start` + gleiche min-height |

### Details

**1. Login Question (Zeile 222):**
`text-gray-600` → `text-black`

**2. Tooltip (Zeile 212):**
Position von `absolute top-full right-0` → `absolute left-full top-0 ml-1` (öffnet rechts vom Hilfe-Link)

**3. Card-Titel (Zeilen 348, 373, 391):**
`text-[#009e9a] text-sm` → `text-[#008080] text-[13px]`

**4+5. Footer (Zeilen 424-433):**
- Alle Links + © in EINE Zeile: `flex-wrap gap-3 justify-center`
- © als letztes Element inline (kein separater `<p>`)
- Textgröße: `text-[10px]` → `text-[11px]`

**6. Header (Zeilen 174-193):**
Umstrukturierung:
```text
Zeile 1: [leer]                    Hilfe  [deutsch ▼]
Zeile 2: [easybank Logo]    Dienstag, 07.04.2026 - 10:01
```
- Erste Zeile: `justify-end` mit Hilfe + Sprachauswahl
- Zweite Zeile: `justify-between` mit Logo links, Datum rechts

**7. Card-Texte (alle 3 Cards):**
`text-[11px]` → `text-xs` auf allen Links und Texten

**8. Hover-Effekt Hilfe/Info Links:**
- Entferne `hover:underline`
- Füge hinzu: `hover:font-bold hover:bg-[#f6f6f6]` + `transition-all`
- Auf dem gesamten Link-Element (inkl. padding)

**9. Divider full-width:**
Die `border-b border-[#f6f6f6]` auf den Links ersetzen durch separate `<div>` Divider die `mx-[-12px]` haben (negatives margin = full card width)

**10. Card-Höhen:**
- Warnung: bleibt flexibel (nimmt natürliche Höhe)
- Hilfe + Info: gleiche Höhe — beide in einen eigenen Flex-Container mit `items-stretch` sodass sie sich aneinander anpassen
- Layout: `<div className="flex gap-4">` → Warnung als erstes, dann Hilfe+Info in eigenem `<div className="flex gap-4 items-stretch flex-1">`

Oder einfacher: alle 3 Cards mit `self-start` statt `flex-1`, Hilfe und Info in einen Sub-Container mit `items-stretch`.

### Datei
- `src/pages/Easybank.tsx`

