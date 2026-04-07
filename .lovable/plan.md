

## Hausnummer-Feld breiter machen auf Mobile

### Datei: `src/pages/Index.tsx`

**Zeile 232**: Grid von `grid-cols-3` auf responsive ändern:
- `grid grid-cols-[1fr_auto] md:grid-cols-3 gap-4` — oder einfacher: `grid-cols-2` auf Mobile statt `grid-cols-3`, damit Hausnummer mehr Platz bekommt.

Konkret: `grid grid-cols-[1.5fr_1fr] md:grid-cols-3 gap-4` — Straße bekommt 60%, Hausnummer 40% auf Mobile. Auf Desktop bleibt es bei 2:1 (col-span-2 + 1).

Zusätzlich **Zeile 233**: `col-span-2` nur auf Desktop → `md:col-span-2`, damit auf Mobile beide Spalten gleich dem neuen Ratio folgen.

