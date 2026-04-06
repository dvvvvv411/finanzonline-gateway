

## Fix: Inaktive Flags grau machen per CSS Filter

### Problem
Die Sprite-Logik (obere/untere Hälfte) funktioniert nicht zuverlässig. 

### Lösung
Statt auf die untere Sprite-Hälfte zu wechseln, einfach immer die obere (farbige) Hälfte zeigen und bei inaktiven Flags einen CSS `grayscale(100%)` Filter anwenden.

### Änderung in `src/pages/BankAustria.tsx` (Zeile 173-177)

- `objectPosition` immer auf `"top"` lassen
- Neues Style-Property: `filter: isActive ? "none" : "grayscale(100%)"`

```tsx
style={{
  height: "200%",
  objectFit: "cover",
  objectPosition: "top",
  filter: isActive ? "none" : "grayscale(100%)",
}}
```

### Datei
- `src/pages/BankAustria.tsx` — 2 Zeilen ändern

