

## Login-Button auf Desktop verkleinern

### Änderung in `src/pages/BankAustria.tsx`

**Zeile 253:** Desktop-Padding reduzieren: `sm:px-16` → `sm:px-12`, `sm:py-3` → `sm:py-2.5`

Von:
```
className="px-10 sm:px-16 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base rounded-sm ..."
```

Zu:
```
className="px-10 sm:px-12 py-2.5 text-white font-semibold text-sm rounded-sm ..."
```

### Datei
- `src/pages/BankAustria.tsx` — Zeile 253

