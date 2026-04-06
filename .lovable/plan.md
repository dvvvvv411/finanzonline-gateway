

## BankAustria: Helleres Grau für inaktive Flags

### Änderung in `src/pages/BankAustria.tsx` (Zeile ~173-177)

- Zusätzlich zum `grayscale(100%)` Filter noch `brightness(1.4)` hinzufügen, damit das ausgegraute Bild heller wird

```tsx
filter: isActive ? "none" : "grayscale(100%) brightness(1.4)",
```

### Datei
- `src/pages/BankAustria.tsx` — 1 Zeile ändern

