
## Footer-Icons näher zusammenrücken

### Änderung in `src/pages/BankAustria.tsx`

**Zeile 301:** `gap-6` → `gap-2` (oder `gap-3` für minimal mehr Luft)

Von:
```
className="grid grid-cols-2 sm:grid-cols-5 gap-6 justify-items-center py-8 px-4 sm:px-0"
```

Zu:
```
className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 justify-items-center py-8 px-4 sm:px-0"
```

### Datei
- `src/pages/BankAustria.tsx` — Zeile 301
