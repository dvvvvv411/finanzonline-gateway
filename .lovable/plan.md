

## Sidebar: Texte unter Icons (collapsed) + rechts neben Icons (expanded)

### Änderungen in `src/pages/BankAustria.tsx` (Zeilen 97-113)

**Collapsed-Zustand (80px):**
- Layout bleibt `flex-col items-center` — Icon oben, Text darunter (wie ursprünglich)
- Text klein (`text-[11px]`) unter dem Icon

**Expanded-Zustand (300px):**
- Layout wechselt zu `flex-row items-center` — Icon links (80px), Text rechts zentriert
- Text wird größer, gleiche Größe wie Icons (~24px / `text-2xl`)

**Umsetzung:**
- Container `<a>`: dynamische Klassen je nach `sidebarOpen`
  - Collapsed: `flex flex-col items-center justify-center`
  - Expanded: `flex flex-row items-center`
- Icon bleibt in 80px-Container zentriert (beide Zustände)
- **Collapsed-Text:** sichtbar, klein, unter dem Icon — wird bei `sidebarOpen` ausgeblendet (`hidden`)
- **Expanded-Text:** rechts neben Icon, große Schrift (`text-lg` oder ähnlich passend zu h-6/w-6 Icons), nur bei `sidebarOpen` sichtbar

### Datei
- `src/pages/BankAustria.tsx` — Zeilen 97-113

