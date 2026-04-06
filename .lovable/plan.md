

## Raiffeisenbank-Seite: Dropdown, Underline & Titel anpassen

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Custom Dropdown statt native `<select>` (Zeilen 49-79)**

Ersetze das native `<select>` durch ein eigenes Dropdown-Menü:
- Weißer Hintergrund (`bg-white`) mit Border
- Dicke minimalistische Scrollbar (custom CSS via `scrollbar-width` oder Tailwind `scrollbar`)
- Maximal 4 Einträge sichtbar (`max-h` berechnet auf ~4 Items)
- Erste Option ist leer — klickt man darauf, wird die Auswahl zurückgesetzt (`setBundesland("")`)
- Dropdown öffnet/schließt via `selectOpen` State
- Chevron dreht sich bei offen/geschlossen

**2. Focus-Underline gelb statt schwarz (Zeilen 65, 88, 103)**

Auf allen drei Feldern: `focus:border-[#1a1a1a]` → `focus:border-[#fbf315]`

**3. Titel "Bitte melden Sie sich an" (Zeile 42)**

Von `text-xl font-bold` → `text-2xl font-light` — größer und dünn (thin)

### Custom Dropdown Struktur

```text
┌─────────────────────────────┐
│ Bundesland oder Bank wählen │  ← Trigger (bg-[#f4f4f4])
├─────────────────────────────┤
│ (leer)                      │  ← Reset-Option
│ Burgenland                  │
│ Kärnten                     │
│ Niederösterreich/Wien       │
│ ▒ (Scrollbar)               │  ← max 4 sichtbar
└─────────────────────────────┘
     bg-white, dicke Scrollbar
```

### Custom Scrollbar CSS

Inline-Styles oder ein kleines `<style>`-Tag für die Scrollbar:
```css
scrollbar-width: thick;
scrollbar-color: #c4c4c4 transparent;
```

### Datei
- `src/pages/Raiffeisenbank.tsx` — Dropdown-Umbau, Underline-Farbe, Titel-Styling

