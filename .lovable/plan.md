

## BankAustria: Banner-Titel normaler + Caption unter das Bild

### Änderungen

**1. Titel "Lässt sich einrichten" weniger dick**
- Zeile 209: `font-bold` → `font-normal` (oder `font-light` für noch dünner)

**2. Caption aus dem Banner raus, darunter positionieren**
- Zeile 223-225: Das `<div>` mit dem Disclaimer aus dem Banner-Container (`relative`) rausnehmen und als eigenes `<div>` direkt nach dem Banner platzieren
- Kein `absolute`, kein `z-10`, einfach normaler Textblock unter dem Bild
- Hintergrund: weiß oder `#f5f5f5`, Text in `#666` oder ähnlich dunkelgrau, `text-sm`

### Datei
- `src/pages/BankAustria.tsx` — Zeilen 197-226

