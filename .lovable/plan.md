

## Confirmation Mobile View Fix

### Problem
The confirmation items list uses `flex justify-between` on each row, causing the field label and "Erfolgreich aktualisiert" text to overlap/collide on small screens (390px).

### Lösung — Datei: `src/pages/Confirmation.tsx`

1. **Zeilen-Layout auf Mobile stacken** (Z.61): `flex items-center justify-between` → `flex flex-col items-start md:flex-row md:items-center md:justify-between gap-1`

2. **Inneres Padding reduzieren** (Z.58): `p-6` → `p-4 md:p-6` für weniger Platzverschwendung auf Mobile

3. **"Erfolgreich aktualisiert" Text kürzen auf Mobile**: Den Text durch ein kürzeres Label ersetzen — auf Mobile nur das Häkchen-Icon mit einem kleinen grünen "Aktualisiert" Text zeigen:
   - `<span className="text-xs md:text-sm text-[#28a745]">` und Text von "Erfolgreich aktualisiert" zu `<span className="hidden md:inline">Erfolgreich aktualisiert</span><span className="md:hidden">Aktualisiert</span>`

4. **Outer margins reduzieren** (Z.58): `mx-5` → `mx-3 md:mx-5`

