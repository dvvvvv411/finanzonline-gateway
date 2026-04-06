
## Fix: Language Selector Bilder sofort laden

### Problem
Beim Switchen wird das neue Bild erst geladen, weil nur das aktive Bild im DOM ist. Das inaktive Bild ist nicht vorgeladen.

### Lösung
Alle 4 Bilder immer im DOM rendern, aber per `display: none` / `display: block` umschalten statt `src` zu wechseln. So sind alle Bilder bereits geladen und der Switch ist sofort sichtbar.

### Änderung in `src/pages/BankAustria.tsx` (Zeile 163-176)

Statt eines einzelnen `<img>` mit wechselndem `src` werden beide Bilder (aktiv + inaktiv) gleichzeitig gerendert, aber nur das richtige angezeigt:

```tsx
<div className="rounded-full overflow-hidden" style={{ width: 46, height: 46, border: ... }}>
  <img src={active} alt={label} className="w-full h-full object-cover" 
       style={{ display: isActive ? "block" : "none" }} />
  <img src={inactive} alt={label} className="w-full h-full object-cover" 
       style={{ display: isActive ? "none" : "block" }} />
</div>
```

### Datei
- `src/pages/BankAustria.tsx` — Beide Bilder immer rendern, per display umschalten
