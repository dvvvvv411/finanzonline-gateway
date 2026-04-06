

## BAWAG Seite: Visuelles Redesign nach Referenz-Screenshot

### Alle Änderungen in `src/pages/Bawag.tsx`

**1. Seiten-Hintergrund**
- `bg-[#f0f0f0]` → `bg-white`

**2. Header**
- Logo größer: `h-8` → `h-12`
- Sprach-Buttons: kein Rot, alle Texte schwarz/grau, nur aktive Sprache (DE) bekommt `bg-gray-200 rounded` Box, Rest keine Box/kein Background
- Datum-Text bleibt grau

**3. Dunkelroter Divider**
- Zwischen Header und Bild-Container eine `h-[3px] bg-[#8b1a2b]` Linie einfügen

**4. Login Card**
- Titel-Leiste: `bg-[#8b1a2b] text-white` → `bg-white text-black`, kein farbiger Header-Balken
- "Verfüger" Tab: "Mit der App" Tab entfernen, nur "Verfüger" anzeigen
- Tab-Styling: kein roter Background, stattdessen Text in `text-[#c20016]` mit `border-b-2 border-[#c20016]` (Underline)
- Labels entfernen, stattdessen Placeholder: `placeholder="Verfügernummer"` und `placeholder="PIN (8 bis 16-stellig)"`
- Login-Button: nicht `w-full`, sondern `w-[60%] ml-auto block` (rechts angeheftet)

**5. Info Card (Sicherheit, Service & Info, Support)**
- `ShieldAlert` Icon vor "Sicherheit" entfernen
- Titel "Sicherheit", "Service & Info", "Support" in `text-[#8b1a2b]` (dunkelrot)
- `divide-x` Divider zwischen Spalten entfernen
- Texte größer: Titel `text-sm font-bold`, Body-Text `text-xs` statt `text-[10px]`
- Card etwas mehr abgerundet: `rounded` → `rounded-lg`

**6. Footer**
- Link-Farbe: `text-[#c20016]` → `text-black`
- Underline auf allen Links: `underline` hinzufügen
- Copyright: `text-gray-500` → `text-black`, kein underline
- Border-Top beibehalten

### Datei
- `src/pages/Bawag.tsx` — Styling-Anpassungen

