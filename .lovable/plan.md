## Breadcrumb-Reihenfolge fixen

In `src/pages/ChBernerKantonalbank.tsx` unteres Breadcrumb-Element:

Aktuell: `[Home] [|] [Chevron] [|] [Mein Portal]`
Soll: `[|] [Home] [Chevron] [Mein Portal]`

Konkret:
- Den vertikalen Divider zwischen Chevron und "Mein Portal" entfernen.
- Den verbleibenden Divider vor das Home-Icon verschieben.
- Reihenfolge im JSX: `<span vertical-divider />` → `<Home />` → `<ChevronRight />` → `<span>Mein Portal</span>`.

Keine weiteren Änderungen.
