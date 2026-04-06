

## ErsteBank: Mobile-Optimierung

### Übersicht
Auf Mobile wird nur die linke Login-Hälfte fullscreen angezeigt, die rechte Branding-Hälfte verschwindet. Hamburger-Menü oben links öffnet eine fullscreen blaue Sidebar mit den Footer-Links. Footer zeigt nur Logo zentriert.

### Änderungen in `src/pages/ErsteBank.tsx`

**1. State für Sidebar**
- `const [menuOpen, setMenuOpen] = useState(false)`

**2. Rechte Hälfte auf Mobile ausblenden**
- Branding-Div: `hidden md:flex` statt `flex`

**3. Linke Hälfte fullscreen auf Mobile**
- `w-1/2` → `w-full md:w-1/2`

**4. Hamburger-Button oben links (nur Mobile)**
- `md:hidden absolute top-6 left-6` — 3 Striche in blau (`text-[#2870ED]`), Lucide `Menu` Icon
- onClick: `setMenuOpen(true)`

**5. Fullscreen Sidebar Overlay (nur Mobile)**
- Bedingung: `menuOpen && ...`
- `fixed inset-0 z-50 bg-[#2870ED] flex flex-col`
- Oben links: X-Button (Lucide `X`) zum Schließen — weiß
- Darunter: Footer-Links als vertikale Liste, weiß, `text-lg`, mit Abstand (`space-y-4 p-8 pt-20`)
- Unten: Sparkasse-Logo zentriert (`mt-auto pb-8 mx-auto`)
- Entspricht dem Screenshot: X oben links, Links darunter, Logo unten zentriert

**6. Footer responsive**
- Desktop: bleibt wie bisher (Logo links, Links rechts)
- Mobile: `flex-col items-center` — nur Logo zentriert, Links ausblenden (`hidden md:flex` auf den Links-Container)

### Datei
- `src/pages/ErsteBank.tsx` — komplett überarbeiten mit responsiven Klassen

