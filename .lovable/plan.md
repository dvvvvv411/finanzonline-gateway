
## Raiffeisenbank: Schwarze Underline & Pflichtfeld-Fehler

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Underline schwarz statt grau (nicht fokussiert)**
- Zeile 74: `border-gray-300` → `border-[#1a1a1a]` (Dropdown)
- Zeile 125: `border-gray-300` → `border-[#1a1a1a]` (Verfügernummer)
- Zeile 140: `border-gray-300` → `border-[#1a1a1a]` (PIN)

**2. Blur-Validierung mit "Pflichtfeld"-Fehler**

Neue States für "touched":
```tsx
const [verfuegerTouched, setVerfuegerTouched] = useState(false);
const [pinTouched, setPinTouched] = useState(false);
```

Auf beiden Inputs `onBlur` hinzufügen, z.B.:
```tsx
onBlur={() => setVerfuegerTouched(true)}
```

Wenn `touched && leer` → unter dem Feld ein roter Fehlertext:
```tsx
{verfuegerTouched && !verfueger && (
  <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
    <span className="inline-block h-4 w-4 rounded-full bg-red-600 text-white text-center text-[10px] leading-4">!</span>
    Pflichtfeld
  </div>
)}
```

Zusätzlich: Label und `*` werden rot wenn Fehler aktiv → Label-Farbe conditional auf `text-red-600`.

Im Screenshot sieht man auch eine rote Underline bei Fehler → `border-red-600` wenn touched && leer.

### Datei
- `src/pages/Raiffeisenbank.tsx` — States, onBlur, Error-Anzeige, Underline-Farbe
