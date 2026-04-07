

## Volksbank-Seite: Links & Barrierefreiheit anpassen

### Änderungen in `src/pages/Volksbank.tsx`

**1. "Barrierefrei" und den `|`-Strich entfernen (Zeilen 55-58):** Die beiden Elemente (`<a>Barrierefrei</a>` und `<span>|</span>`) löschen, nur "English" bleibt stehen.

**2. Vergessen-Links (Zeilen 113-128):** Haben bereits `onClick={(e) => e.preventDefault()}` — funktioniert also schon korrekt, kein Forward.

### Datei
- `src/pages/Volksbank.tsx`

