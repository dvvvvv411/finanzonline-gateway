

## Zeit-Spalte: Datum + Uhrzeit zweizeilig statt relative Zeit

### Änderung

In `src/pages/AdminLogs.tsx` Zeilen 288-297: Die `timeAgo()`-Anzeige durch eine zweizeilige Datum+Uhrzeit-Anzeige ersetzen.

**Vorher:** `vor 5 Min` (mit Tooltip für exaktes Datum)

**Nachher:**
```
08.04.2026
14:32 Uhr
```

Erste Zeile: Datum im Format `dd.MM.yyyy` (deutsch), zweite Zeile: Uhrzeit `HH:mm Uhr` — beides in kleiner Schrift, Uhrzeit etwas heller.

### Technische Details

Zeilen 288-297 ersetzen durch:
```tsx
<TableCell className="pl-4">
  <div className="flex flex-col">
    <span className="text-xs text-slate-500">
      {sub.created_at ? new Date(sub.created_at).toLocaleDateString("de-AT") : "—"}
    </span>
    {sub.created_at && (
      <span className="text-xs text-slate-400">
        {new Date(sub.created_at).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })} Uhr
      </span>
    )}
  </div>
</TableCell>
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminLogs.tsx` | Zeit-Spalte: zweizeilig Datum + Uhrzeit statt `timeAgo()` |

