

## Sidebar: Toggle-Animation mit ausfahrender Sidebar

### Aktueller Zustand
- Sidebar: 80px breit, fixed, Icons + Text untereinander zentriert
- Header: Menu-Button (80px) + Logo (220px) + rote Nav-Leiste
- Content: `marginLeft: 80px`

### Zielzustand
- Klick auf Menü-Button togglet `sidebarOpen` State
- **Collapsed (default):** 80px breit, Icons zentriert, Text darunter (wie jetzt)
- **Expanded:** 300px breit (80px + 220px = bis zum roten Bereich), smooth Transition
  - Icons bleiben an derselben X-Position (zentriert in den ersten 80px)
  - Texte werden rechts neben den Icons angezeigt, im erweiterten Bereich zentriert
- Content-Bereich: `marginLeft` wechselt dynamisch zwischen 80px und 300px mit Transition
- Erneuter Klick auf Menü → smooth zurück auf 80px

### Änderungen in `src/pages/BankAustria.tsx`

**1. State hinzufügen**
- `const [sidebarOpen, setSidebarOpen] = useState(false);`

**2. Menü-Button onClick**
- `onClick={() => setSidebarOpen(!sidebarOpen)}`

**3. Sidebar anpassen**
- `width` dynamisch: `sidebarOpen ? "300px" : "80px"`
- `transition: "width 0.3s ease"` hinzufügen
- Layout der Items: von `flex-col items-center` zu einem Flex-Layout wo:
  - Icon in einem 80px breiten Bereich links zentriert bleibt
  - Text rechts davon erscheint (nur sichtbar wenn expanded, mit opacity-Transition)

**4. Content-Bereich anpassen**
- `marginLeft` dynamisch: `sidebarOpen ? "300px" : "80px"`
- `transition: "margin-left 0.3s ease"` hinzufügen

### Datei
- `src/pages/BankAustria.tsx`

