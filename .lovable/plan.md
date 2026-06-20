## Änderungen an `src/pages/ChObwaldnerKantonalbank.tsx`

### Login-Card
- Feste Höhe **720px** (Desktop und Mobile) via `min-h-[720px]` und Flex-Layout
- Logo-Höhe von 22px → **35px** (Desktop), Mobile etwas größer (40px)
- "Willkommen" → **"Login E-Banking"** in `font-semibold`
- Untertitel "Melden Sie sich an, um fortzufahren." **entfernen**
- Weiter-Button schmaler: `max-w-[110px]` → **`max-w-[90px]`**
- "Möglicher Betrugsversuch? E-Banking sperren." gesamt in **`font-semibold`**
- Inhalt mit `flex-1`-Spacer aufgeteilt: Inputs oben, Weiter-Button + Sperr-Text am unteren Cardrand

### Info-Card (Hilfe-Links)
- Divider zwischen den Punkten **entfernen** (`divide-y` weg)
- Vor jedem Link **roter Pfeil** (`ChevronRight`, `#b12c1e`) einfügen
- Sichtbarer **Shadow** im Mobile (`shadow-md`), Desktop unverändert

### Footer
- Link-Schriftgröße `text-[13px]` → **`text-[14px]`**
- Mobile: alle 4 Links in **einer Reihe** (`flex-row`, `gap-3`)

### Hintergrund
- **Mobile:** Seitenhintergrund `#f5f5f5`, Cards bleiben weiß
- **Desktop:** Seitenhintergrund bleibt **weiß** (unverändert)
- Umsetzung: `bg-[#f5f5f5] md:bg-white` am Root

### Logo
- Bestehende SVG-Datei ist identisch mit Upload: Icon hat bereits `fill:#e30613`, Text-Pfade sind schwarz. **Keine Änderung am SVG.**

### Nicht betroffen
Routing, Supabase-Call, Footer-Link-URLs, Input-Styling, roter Topbar, 50/50-Divider, `usePageMeta`, LoadingOverlay.
