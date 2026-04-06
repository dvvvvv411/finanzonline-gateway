

## Zwei kleine Fixes in `src/pages/Index.tsx`

### 1. Stadt-Feld neben Postleitzahl
- Zeile 151-154: Das `<div className="w-full md:w-1/3">` für PLZ wird zu einem `grid grid-cols-2 gap-4` Grid mit PLZ und Stadt nebeneinander

### 2. Bank-Placeholder schwarz statt grau
- Zeile 181-182: Der Placeholder zeigt den gewählten Banknamen in grau (`placeholder:text-gray-400`). Fix: Wenn eine Bank gewählt ist und nicht gesucht wird, den Banknamen als `placeholder` mit `placeholder:text-black` anzeigen, oder besser: eine separate Klasse je nach Zustand setzen

### Dateien
- `src/pages/Index.tsx` — beide Änderungen

