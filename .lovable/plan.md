## Icons in Hero-Cards (Bonusbetrag & Gültig bis)

In `src/pages/Klimabonus.tsx` (Zeilen 148–155) jeweils ein Icon links neben dem Text-Content einfügen:

- **Bonusbetrag**: `Wallet`-Icon (lucide-react)
- **Gültig bis**: `CalendarClock`-Icon (lucide-react)

### Umsetzung
- Imports erweitern: `Wallet, CalendarClock` aus `lucide-react`
- Beide Card-`<div>`s in Flex-Layout umwandeln (`flex items-center gap-3`)
- Icons links platziert, Größe ca. `w-10 h-10` (umfasst Titel + Wert vertikal)
- Farbe: `BMF_RED` (`#E6320F`, das vorhandene Orange-Rot)
- Text-Block (Titel + Wert) rechts daneben unverändert

Keine weiteren Sektionen oder Logik betroffen.