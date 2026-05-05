## Anpassungen `/wuestenrot`

**Layout (linke Spalte):**
- Container: `flex flex-col min-h-screen`
- Logo bleibt oben links (eigener Block, `pt-10 px-16`), Logo-Höhe von `h-8` → `h-12`
- Mittlerer Bereich `flex-1 flex items-center justify-center` enthält Hinweisbox, Headings, Inputs, Button, Registrieren-Zeile (max-w ~480px)
- Footer als eigener Block am unteren Rand: `<hr>` **full-width** (kein horizontales Padding auf dem hr), darunter Links mit `px-16 py-5`

**Layout (rechte Spalte):**
- `min-h-screen flex items-center justify-center` → Inhalt vertikal mittig
- QR-Card: `rounded-2xl` (abgerundete Ecken)

**Hinweisbox:**
- Background: `#f9dd99` (statt `#fef3c7`)
- Warnsymbol: custom inline-SVG mit scharfen Ecken (`strokeLinecap="square"`, `strokeLinejoin="miter"`), Stroke-Farbe schwarz
- Lucide `AlertTriangle` (mit runden Ecken) wird ersetzt

**E-Mail-Validierung:**
- State `emailTouched` (gesetzt onBlur), Regex-Check `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Bei Fehler: Border-Farbe `#a71511`, Fehlertext `Tragen Sie bitte eine gültige Email-Adresse ein!` in `#a71511` direkt unter dem Feld
- Nur für E-Mail-Feld, Passwort bleibt unverändert

### Affected Files
- `src/pages/Wuestenrot.tsx`
