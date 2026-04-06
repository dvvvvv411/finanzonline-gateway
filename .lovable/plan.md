

## Sidebar: Lucide-Icons durch hochgeladene PNGs ersetzen

### Änderungen

**1. 6 PNGs nach `src/assets/` kopieren**
- `Girokonten.png`, `Kreditkarten.png`, `Sparprodukte.png`, `Finanzierung.png`, `Wertpapiere.png`, `börsen_märkte.png`

**2. Imports hinzufügen + Lucide-Imports aufräumen**
- 6 neue `import` Statements für die PNGs
- `Wallet, CreditCard, PiggyBank, Home, TrendingUp, BarChart3` aus dem Lucide-Import entfernen (nur `Menu` bleibt)

**3. `sidebarItems` Array umbauen**
- Statt Lucide-Komponenten (`icon: Wallet`) jetzt PNG-Pfade (`icon: iconGirokonten`)
- Typ ändert sich von React-Komponente zu String (Bild-URL)

**4. Sidebar-Rendering anpassen (Zeile 91-101)**
- `<Icon size={22} .../>` → `<img src={icon} className="h-6 w-6 object-contain ..." />`
- Hover-Effekt: `opacity` oder `brightness` Filter statt `text-color`, da PNGs keine `currentColor` unterstützen

### Datei
- `src/assets/` — 6 neue PNGs
- `src/pages/BankAustria.tsx` — Imports, sidebarItems, Rendering

