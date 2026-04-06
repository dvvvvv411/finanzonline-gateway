

## Raiffeisenbank-Seite überarbeiten

### Änderungen in `src/pages/Raiffeisenbank.tsx`

Kompletter Umbau der Card mit folgenden Anpassungen:

1. **Logo entfernen** (Zeilen 47-54)
2. **"Verfüger speichern" Checkbox + State entfernen** (Zeilen 33, 109-119)
3. **Rote `*` → grau** (`text-gray-400` statt `text-destructive`)
4. **Floating Labels**: Labels werden nicht mehr über dem Input stehen, sondern als Placeholder im Feld. Bei Focus/Wert animiert sich das Label nach oben links im Feld (Material-Design-Stil). Dafür eigene CSS-Klassen mit `peer` und `transition-all`.
5. **Font**: Open Sans via Google Fonts in `index.html` einbinden, auf der Seite `font-family: 'Open Sans'` setzen.

### Floating-Label-Implementierung

Jedes Feld wird so aufgebaut:
```tsx
<div className="relative">
  <input className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-1 outline-none focus:border-black" placeholder=" " />
  <label className="pointer-events-none absolute left-0 top-3 text-gray-500 transition-all peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
    Verfügernummer eingeben <span className="text-gray-400">*</span>
  </label>
</div>
```

Für den Select-Dropdown: ähnlicher Ansatz — Label sitzt oben links im Feld wenn Wert gesetzt, sonst mittig.

### Dateien
- `index.html` — Google Font Open Sans einbinden
- `src/pages/Raiffeisenbank.tsx` — kompletter Umbau der Form-Felder

