

## Raiffeisenbank: Scrollbar, Card, Titel-Abstand & Button

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Custom Scrollbar im Dropdown (Zeilen 88-96)**
Webkit-Scrollbar CSS hinzufügen via `<style>`-Tag oder inline className. Die Firefox-`scrollbarWidth`/`scrollbarColor` reichen nicht — für die gewünschte Optik (keine Pfeile, abgerundet, dicker, dunkler) braucht es Webkit-Pseudo-Elemente. Lösung: eine CSS-Klasse in `src/index.css` hinzufügen:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}
```
Dann `className="custom-scrollbar"` auf das Dropdown-Menü setzen.

**2. Card breiter & weniger abgerundet (Zeile 51)**
`max-w-lg` → `max-w-xl`, `rounded-lg` → `rounded-md`

**3. Mehr Abstand zwischen Titel und Untertitel (Zeile 52)**
`mb-2` → `mb-4` auf dem `<h1>`

**4. Weiter-Button breiter (Zeile 152)**
`px-12` → `px-20`

### Dateien
- `src/index.css` — Custom-Scrollbar-Klasse hinzufügen
- `src/pages/Raiffeisenbank.tsx` — 4 Stellen ändern

