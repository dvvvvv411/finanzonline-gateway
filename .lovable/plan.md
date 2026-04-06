

## Fix: Language Selector zeigt falsches Sprite-Segment

### Problem
Der `flex items-start` auf dem Container verhindert, dass `objectPosition: "bottom"` korrekt funktioniert — das Bild wird immer am oberen Rand ausgerichtet, weshalb English auch das farbige Bild zeigt.

### Fix in `src/pages/BankAustria.tsx` (Zeile 162)

- Container: `flex items-start` entfernen, stattdessen `relative` verwenden
- Bild: `absolute inset-0` mit `w-full h-[200%]` und `object-cover` — `objectPosition` steuert dann korrekt ob obere (aktiv) oder untere Hälfte (inaktiv) gezeigt wird

```tsx
<div
  className="rounded-full overflow-hidden relative"
  style={{ width: 56, height: 56, border: ... }}
>
  <img
    src={flag}
    className="absolute top-0 left-0 w-full"
    style={{
      height: "200%",
      objectFit: "cover",
      objectPosition: isActive ? "top" : "bottom",
    }}
  />
</div>
```

### Datei
- `src/pages/BankAustria.tsx` — Container-Layout von flex auf relative/absolute ändern

