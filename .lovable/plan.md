

## Bank99 — 5 Design-Anpassungen

### Datei: `src/pages/Bank99.tsx`

1. **Begrüßungstext semibold** (Zeile 42)
   - `className="text-sm leading-snug"` → `className="text-sm leading-snug font-semibold"`

2. **Card eckige Kanten** (Zeile 30)
   - `className="w-full max-w-[560px] rounded overflow-hidden"` → `rounded` entfernen
   - Auch beim Input (Zeile 79) und Button (Zeile 102) `rounded` entfernen

3. **Header schmaler** (Zeile 15)
   - `py-3` → `py-1.5` und Logo `h-10 md:h-14` → `h-8 md:h-10`

4. **Weiter-Button flacher** (Zeile 102)
   - `py-2.5` → `py-2`

5. **"Benutzername" Label größer** (Zeile 53)
   - `text-xs` → `text-sm`

