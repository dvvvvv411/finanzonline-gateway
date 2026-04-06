

## /bankaustria: Korrigiertes Layout

### Korrektur zum vorherigen Plan
Das Logo-Feld gehört NICHT in die Sidebar, sondern in den Header (right content area). Die Sidebar ist nur die schmale dunkle Icon-Leiste.

### Visualisierung
```text
┌────┬──────────────────────────────────────────────────────────────┐
│SIDE│ HEADER  h:80px                                              │
│bar │ [weißes Logo-Feld 200px] [  roter Bereich #c80a1e         ] │
│80px│ [Bank Austria Logo     ] [  Privat  Firma  PB  Über uns   ] │
│    ├──────────────────────────────────────────────────────────────┤
│MENÜ│ MAIN  bg:white                                              │
│GIRO│            24You  (rot, zentriert)                          │
│KRED│            [Verfügernummer]  gray border, centered text     │
│SPAR│            [PIN]             gray border, centered text     │
│FINA│            PIN vergessen...  blau + schwarze underline      │
│WERT│            [LOGIN]  türkis, normale breite                  │
│BÖRS│            DE / EN                                          │
│    ├──────────────────────────────────────────────────────────────┤
│    │ PROMO BANNER (Hintergrundbild)                              │
│    │ DISCLAIMER                                                  │
│    │ FOOTER ICONS  bg:#f5f5f5                                    │
│    │ FOOTER  bg:#333                                             │
└────┴──────────────────────────────────────────────────────────────┘
```

### Änderungen in `src/pages/BankAustria.tsx`

**1. Layout-Struktur: Fixed Sidebar (80px) + Right Content**
- Sidebar: `position: fixed`, `left: 0`, `top: 0`, `width: 80px`, `height: 100vh`, `bg: #1a1a1a`
- MENÜ-Eintrag bleibt oben in der Sidebar (wie jetzt)
- Right content wrapper: `margin-left: 80px`, enthält Header + Main + Promo + Footer

**2. Header korrigieren (im right content area)**
- Header ist eine Zeile mit 2 Bereichen:
  - Links: weißes Feld (~200px) mit Bank Austria Logo
  - Rechts: roter Bereich (`#c80a1e`) mit Nav-Links mittig zentriert
- Gesamthöhe: 80px

**3. "PIN vergessen" Link-Styling fixen**
- Outline/Border entfernen
- Farbe: `#00aed0` (türkis/blau)
- `text-decoration: underline`, `text-decoration-color: black`

**4. Alles andere bleibt wie es ist**
- 24You rot zentriert ✓
- Inputs grau + zentriert ✓
- Kein Eye-Icon ✓
- Login-Button normale Breite ✓
- Promo + Footer als Teil der rechten Content-Spalte

### Datei
- `src/pages/BankAustria.tsx` — Layout-Umbau

