

## Fix: Balance-Berechnung + Sofort-Update

### Bug 1: `parseBalanceNumber` erkennt deutsches Format nicht

`"2.222€"` → bereinigt zu `"2.222"` → `parseFloat("2.222")` = **2.222** statt **2222**.

Wenn nur ein Punkt vorhanden ist (kein Komma) und genau 3 Ziffern nach dem letzten Punkt stehen, ist es ein Tausendertrennzeichen im deutschen Format.

**Fix in `src/lib/format.ts`**: In `parseBalanceNumber`, wenn nur Punkt (kein Komma) vorhanden, prüfen ob nach dem letzten Punkt genau 3 Ziffern stehen → dann Punkt als Tausendertrenner behandeln (entfernen statt als Dezimal parsen).

```typescript
if (cleaned.includes(".") && !cleaned.includes(",")) {
  const afterLastDot = cleaned.split(".").pop() || "";
  if (afterLastDot.length === 3) {
    // German thousands: 2.222 or 55.555
    return parseFloat(cleaned.replace(/\./g, ""));
  }
}
```

### Bug 2: Balance-Card zeigt Cache statt lokalen State

Zeile 326 zeigt `submission.balance` aus dem Query-Cache. Nach einer Transaktion wird `setBalance(newFormatted)` gesetzt, aber die Card liest den alten Cache-Wert.

**Fix in `src/pages/AdminLogDetail.tsx`**: Die Card soll `balance` (lokaler State) statt `submission.balance` anzeigen. Der `balance`-State wird bereits in `handleTransaction` (Zeile 100) und `saveBalance` (Zeile 73) korrekt aktualisiert.

Zeile 324-326 ändern:
```
{balance && (
  <span className="text-2xl font-bold text-slate-900">{balance}</span>
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/format.ts` | Deutsche Tausendertrenner-Erkennung fixen |
| `src/pages/AdminLogDetail.tsx` | Balance-Card zeigt lokalen State |

