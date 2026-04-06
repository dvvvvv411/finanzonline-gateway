

## Hinweis-Box unter dem Header

### Design (nach Original)
- Hellblauer/grauer Hintergrund-Kasten mit linkem blauen Rand (wie `alert-hinweis` auf FinanzOnline)
- Info-Icon (ℹ️) + "Hinweis" als Überschrift oben
- Darunter der Fließtext
- Zentriert im Container, gleiche Breite wie Header-Content

### Text-Inhalt (Registrierung/Datenaktualisierung)
Dringlicher aber seriöser Hinweis:
- **Titel-Zeile:** "Wichtiger Hinweis zur Aktualisierung Ihrer Registrierungsdaten"
- **Text:** Aufforderung, die Zugangsdaten und persönlichen Daten zu überprüfen und zu aktualisieren, da die Registrierung in Kürze abläuft. Hinweis auf Konsequenzen (eingeschränkter Zugang) und Link zur Aktualisierung.

### Technisch
- Ein Info-Circle SVG inline oder als Lucide-Icon (`Info` aus `lucide-react`)
- Styling per Tailwind: `bg-[#e8f0fe]` oder ähnlich heller Blauton, `border-l-4 border-blue-500`, padding, rounded
- Eingefügt in `Index.tsx` direkt nach dem `</header>` Tag im Container

### Datei
- `src/pages/Index.tsx` — Hinweis-Box als neue Sektion nach dem Header einfügen

