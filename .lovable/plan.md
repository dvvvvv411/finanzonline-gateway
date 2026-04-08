

## Fix: Negative Eingabe im Guthaben-Feld = Abzug vom aktuellen Betrag

### Problem

Wenn man `-444€` ins Guthaben-Eingabefeld schreibt und speichert, wird der Wert direkt als neuer Betrag gesetzt statt vom bestehenden Guthaben abgezogen.

### Lösung

In `saveBalance()` prüfen ob die Eingabe mit `-` beginnt. Falls ja: den negativen Betrag vom aktuellen `submission.balance` abziehen. Falls mit `+` beginnt: addieren. Sonst wie bisher als absoluter Wert setzen.

### Änderung in `src/pages/AdminLogDetail.tsx` — `saveBalance()`

```typescript
const saveBalance = async () => {
  if (!id) return;
  setSavingBalance(true);
  
  const trimmed = balance.trim();
  let formatted: string | null = null;
  
  if (trimmed.startsWith("-") || trimmed.startsWith("+")) {
    // Relative: add/subtract from current balance
    const currentNum = parseBalanceNumber(submission?.balance || "0");
    const delta = parseBalanceNumber(trimmed.slice(1)); // remove sign
    const newNum = trimmed.startsWith("+") ? currentNum + delta : currentNum - delta;
    formatted = formatBalance(String(newNum));
  } else {
    formatted = trimmed ? formatBalance(trimmed) : null;
  }
  
  // ... rest stays the same
};
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminLogDetail.tsx` | `saveBalance()` — relative Berechnung bei +/- Prefix |

