

## Mobile Layout für /raiffeisenbank

### Übersicht
Auf Mobile (< md) wird das Layout zu einem vertikalen 40/60-Split: oben 40% Hintergrundbild sichtbar, unten 60% weiße Login-Card die bis ganz nach unten geht. Footer und Schatten-Gradient werden auf Mobile ausgeblendet.

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Layout-Struktur auf Mobile ändern**
- Äußerer Container: auf Mobile `flex-col` mit `items-stretch` statt zentriert
- Oberer Bereich (Bild): `h-[40vh]` div das das Hintergrundbild zeigt (nur Mobile)
- Unterer Bereich (Card): `min-h-[60vh]` weiße Card, kein `max-w`, kein `rounded`, kein `shadow`, volle Breite, geht bis unten

**2. Responsive Klassen**
- Container: Mobile = kein Hintergrundbild auf dem Container selbst, stattdessen separates Bild-div oben. Desktop = bleibt wie bisher (zentrierte Card mit Hintergrundbild)
- Card: Mobile = `w-full rounded-none shadow-none p-6 flex-1`. Desktop = `max-w-2xl rounded-sm shadow-lg p-10`

**3. Footer & Schatten auf Mobile ausblenden**
- Footer: `hidden md:fixed md:block`
- Schatten-Gradient: `hidden md:block`

**4. Abstände & Sizing auf Mobile**
- Titel: mehr `mt` auf Mobile für Abstand zum Language Selector (`mt-12 md:mt-0`)
- Button: `w-full` statt `px-32` auf Mobile
- Eingabefelder: bereits `w-full`, passt

**5. Language Selector Position**
- Bleibt `right-4 top-4`, relativ zur Card — passt auf Mobile

### Technischer Ansatz
- Zwei Bereiche innerhalb eines `flex flex-col md:flex-row md:items-center md:justify-center` Containers
- Mobile: Bild-Bereich als eigenes `<div>` mit `md:hidden` und `h-[40vh]` mit dem bgImage als `background-image`
- Die bestehende Card bekommt responsive Klassen: `md:max-w-2xl md:rounded-sm md:shadow-lg md:p-10` und auf Mobile `p-6 rounded-none shadow-none flex-1`

### Datei
- `src/pages/Raiffeisenbank.tsx`

