

## BankAustria: Menü-Button in Header verschieben + Header fixed

### Aktueller Zustand
- Sidebar (80px breit, fixed left, z-50) enthält 7 Items: MENÜ, GIROKONTEN, KREDITKARTEN, etc.
- Header (80px hoch) sitzt rechts neben der Sidebar
- MENÜ ist das erste Item in der Sidebar

### Änderungen

**1. MENÜ aus der Sidebar entfernen**
- `sidebarItems` Array: erstes Element `{ icon: Menu, label: "MENÜ" }` entfernen
- Sidebar zeigt dann nur noch 6 Items (GIROKONTEN bis BÖRSEN & MÄRKTE)

**2. MENÜ-Button in den Header einfügen**
- Links im Header (vor dem Logo) einen 80x80px Block einfügen mit `backgroundColor: "#1a1a1a"`
- Gleiche Optik wie in der Sidebar: Menu-Icon + "MENÜ" Text, weiß/grau, gleiche hover-Effekte
- Dadurch sieht es visuell identisch aus — MENÜ bleibt an derselben Position

**3. Header fixed machen**
- Header bekommt `fixed top-0 left-0 w-full z-[60]` (über der Sidebar z-50)
- Die 80px Sidebar-Breite muss im Header berücksichtigt werden: MENÜ-Block ist 80px breit, Logo + roter Bereich füllen den Rest
- `marginLeft: "80px"` auf dem Content-Wrapper bleibt
- Content-Bereich bekommt zusätzlich `margin-top: 80px` (oder `pt-[80px]`) um den fixed Header auszugleichen

**4. Sidebar z-Index anpassen**
- Sidebar bleibt `z-50`, Header wird `z-[60]` → Header liegt über der Sidebar
- Sidebar Top-Position: `top-[80px]` statt `top-0`, damit sie unter dem Header beginnt und nicht vom Header verdeckt wird

### Datei
- `src/pages/BankAustria.tsx` — Sidebar, Header, Content-Wrapper

