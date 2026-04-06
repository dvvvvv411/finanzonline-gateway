
## Sidebar-Links deaktivieren

### Änderung in `src/pages/BankAustria.tsx`

Die Sidebar-Items verwenden aktuell `<a href="#">`, was beim Klick zur Seite scrollt. Lösung: `href="#"` entfernen und `e.preventDefault()` hinzufügen, oder die `<a>`-Tags durch `<div>`- oder `<button>`-Elemente ersetzen, damit beim Klick nichts passiert.

**Konkret:** Die `<a>`-Tags der Sidebar-Items zu `<div>`-Tags ändern (oder `<a>` behalten mit `onClick={e => e.preventDefault()}`), sodass kein Navigation-Event ausgelöst wird.

### Datei
- `src/pages/BankAustria.tsx` — Sidebar-Menüpunkte
