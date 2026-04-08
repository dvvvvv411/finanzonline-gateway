

## Modernisierung der /admin/logs/:id Detail-Seite

### Ziel
Die Detail-Seite visuell an das modernisierte Design der `/admin/logs` Tabelle angleichen — gleiche Farben, Typografie, Spacing und Stil.

### Änderungen in `src/pages/AdminLogDetail.tsx`

**Header-Bereich:**
- Avatar mit Initialen neben dem Namen (wie in der Tabelle)
- Datum zweizeilig (Datum + Uhrzeit) statt einzeilig
- Bank-Name als dezentes Badge neben dem Namen
- Buttons (Export, Löschen) visuell cleaner mit subtileren Borders

**Status-Badges:**
- Dot-Indicator + Pill-Form wie in `/admin/logs` (`statusConfig` mit `dot`, `bg`, `text` statt einfache `bg-*` Klassen)

**Cards:**
- Einheitliche Card-Header mit `text-[11px] font-semibold text-slate-400 uppercase tracking-wider` (wie Table-Headers)
- CopyValue-Zeilen: Werte in `font-mono text-[13px]` für IBAN, Login, Passwort
- Copy-Icon nur bei Hover sichtbar (`opacity-0 group-hover:opacity-100`)

**Guthaben-Card:**
- Größerer Kontostand mit Farbcodierung (grün wenn positiv, rot wenn negativ)
- +/- Buttons dezenter, mit Tooltip

**Notizen:**
- Notiz-Einträge mit Avatar-Initialen des Autors
- Datum zweizeilig wie in der Tabelle
- Dezenter Hintergrund und bessere Abstände

### Technische Details
- `statusConfig` (dot/bg/text) aus AdminLogs übernehmen statt `statusBadgeClass`
- `getInitials()` Hilfsfunktion hinzufügen
- Reine UI/CSS-Änderungen, keine Logik-Anpassungen

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminLogDetail.tsx` | Visuelles Redesign aller Cards, Header, Badges, Notizen |

