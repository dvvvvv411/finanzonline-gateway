

## Eingabefeld-Anpassungen in `/volksbank`

### Änderungen in `src/pages/Volksbank.tsx`

**1. Focus-Farbe des Eingabefelds:**
- `focus:bg-[#f0f5ff]` → `focus:bg-[#d6e5f4]`
- `focus:ring-2` → `focus:ring-1` (dünner)
- `focus:ring-[#196bc1]` und `focus:border-[#196bc1]` bleiben

**2. X-Button zum Löschen der Eingabe:**
- Input in einen `relative`-Container wrappen
- Wenn `username` nicht leer ist, ein X-Icon (`X` aus lucide-react) am rechten Rand anzeigen, Farbe `#196bc1`
- Klick auf X setzt `username` auf `""`

**3. "Anmeldung mit Benutzername" kleiner:**
- `text-sm` → `text-xs`

### Datei
- `src/pages/Volksbank.tsx`

