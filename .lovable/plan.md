

## Oberbank — Mobile View Fixes

### Datei: `src/pages/Oberbank.tsx`

#### 1. Logo-Header ÜBER Cookie-Banner (Zeilen 89-132)
Auf Mobile: Reihenfolge umdrehen — Header mit Logo kommt **vor** dem Cookie-Banner. Lösung: Den Header-Block (Zeilen 126-129) und die graue Linie (Zeile 132) vor den Cookie-Banner-Block verschieben, wenn `isMobile`. Alternativ einfacher: beide Blöcke umordnen mit bedingtem Rendering:
- Wenn `isMobile`: erst Header (Logo zentriert), dann Cookie-Banner
- Wenn Desktop: erst rote Leiste, dann Cookie-Banner, dann Header

#### 2. Cards schmaler / mehr Seitenabstand (Zeile 137)
Main Content Container `padding` auf Mobile erhöhen:
- Von `"30px 24px"` auf `"30px 36px"` (mehr Abstand links/rechts)

#### 3. Weiter-Button full width + zentriert (Zeilen 329-345)
Auf Mobile:
- `width: isMobile ? "100%" : "auto"`
- `marginLeft: isMobile ? 0 : "auto"` (nicht mehr rechts-ausgerichtet)
- `textAlign: "center"` implizit durch full width

#### 4. Erstanmeldung mehr Abstand rechts (Zeilen 358-373)
Auf Mobile: `padding: "12px 20px"` statt `"12px 20px"` — mehr rechten Abstand hinzufügen, z.B. `marginRight: isMobile ? 12 : 0` auf dem äußeren Container, oder den `justifyContent` von `"flex-end"` auf `"center"` ändern wenn `isMobile`.

