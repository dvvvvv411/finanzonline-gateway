## Anpassungen `/ch/schwyzer-kantonalbank`

**Header-Card**
- Container breiter: max-width von 720px → 1100px
- Logo 30% kleiner: `h-[70px]` → `h-[49px]` (md), `h-[50px]` → `h-[35px]` (mobile)
- Leicht abgerundete Ecken: `rounded-[6px]`

**Login-Card**
- Border entfernen (kein `border border-[#ebebeb]`), nur weißer Hintergrund
- Leicht abgerundete Ecken `rounded-[6px]` (bleibt für Konsistenz)
- "Anmeldung E-Banking" → `font-bold`
- Mehr vertikaler Abstand zwischen den Feldern: `space-y-5` → `space-y-10`

**Labels (Vertragsnummer / Passwort)**
- `font-semibold`

**Eingabefelder**
- Border-Stärke `border` → `border-2` (2px)
- Leicht abgerundete Ecken `rounded-[2px]` → `rounded-[6px]`

**Anmelden-Button**
- Leicht abgerundete Ecken `rounded-[6px]`
- Im deaktivierten Zustand: Textfarbe `#bab7b5` (Border bleibt `#a85d63` oder ebenfalls auf `#bab7b5` angeglichen? → bleibt `#a85d63` wie bisher, nur Text ändert sich)

**"Passwort vergessen"**
- Schriftgröße `text-[14px]` → `text-[15px]`

Keine anderen Dateien betroffen. Funktionalität, Routing, Assets unverändert.
