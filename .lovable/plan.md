

## Easybank — Card-Layout Fix

### Problem
Aktuell: Warnung ist `flex-1` allein, Hilfe+Info sind in einem Sub-Container mit `flex-1`. Das macht Warnung schmaler als die anderen beiden zusammen, nicht gleich breit.

### Fix in `src/pages/Easybank.tsx` (Zeilen 344-414)

Alle 3 Cards auf gleicher Ebene in einem `flex`-Container, jede mit gleicher Breite (`flex-1`). Warnung bekommt keine Höhen-Beschränkung (nimmt natürliche Höhe). Hilfe und Info bekommen `self-start` damit sie nicht die volle Höhe der Warnung-Card annehmen, ABER beide sollen gleich hoch sein.

**Neues Layout:**
```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Warnung    │ │ Hilfe/Hotline│ │     Info     │
│              │ │              │ │              │
│  (tiefer)    │ │              │ │              │
│              │ └──────────────┘ └──────────────┘
│              │
└──────────────┘
```

**Umsetzung:**
- Den Sub-Container `<div className="flex gap-4 flex-1 items-stretch">` (Zeile 371) auflösen
- Alle 3 Cards direkt als Kinder des `<div className="flex gap-4">` (Zeile 344)
- Jede Card: `flex-1` für gleiche Breite
- Container: `items-start` statt default `stretch`, damit Cards nicht alle gleich hoch werden
- Hilfe und Info in einen inneren Wrapper mit `flex gap-4 flex-1 items-stretch self-start` damit sie untereinander gleich hoch sind aber nicht so tief wie Warnung

### Datei
- `src/pages/Easybank.tsx`

