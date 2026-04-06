

## BankAustria: Flags noch heller/verblasster

### Änderung in `src/pages/BankAustria.tsx`

- `brightness(1.4)` → `brightness(1.8)` für deutlich verblassteren Look bei inaktiven Flags

```tsx
filter: isActive ? "none" : "grayscale(100%) brightness(1.8)",
```

### Datei
- `src/pages/BankAustria.tsx` — 1 Zeile ändern

