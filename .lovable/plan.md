

## Oberbank — Mobile View Optimierung

### Datei: `src/pages/Oberbank.tsx`

Nutze den `useIsMobile()` Hook aus `@/hooks/use-mobile` um zwischen Desktop und Mobile zu unterscheiden. Import hinzufügen.

#### 1. Rote Leiste ausblenden + Header mit zentriertem Logo
- Rote Leiste (Zeile 88): `display: "none"` wenn `isMobile`
- Header (Zeile 124-127): Logo zentriert (`textAlign: "center"`) statt links wenn `isMobile`

#### 2. Cookie-Banner Mobile Layout
- Container (Zeile 91): `flexDirection: "column"` statt Row wenn `isMobile`, `textAlign: "center"`, `padding: "12px 20px"`
- Text-Div (Zeile 92): `flex` entfernen, full width
- Button-Div (Zeile 105): `textAlign: "center"` statt `"right"`, `marginTop: 12`

#### 3. Cards untereinander
- 3-Column Container (Zeile 138): `flexDirection: "column"` wenn `isMobile`, `alignItems: "stretch"`
- Alle 3 Cards: feste `width: 300` entfernen, stattdessen `width: "100%"` wenn `isMobile`, `flex: "0 0 auto"` beibehalten
- Login Card `height: 308` → `height: "auto"` auf Mobile
- Links Card `height: 308` → `height: "auto"` auf Mobile
- Carousel Card `width: 298` / `height: 306` → `width: "100%"` / `height: 250` auf Mobile

#### 4. Content Padding (Seitenabstand)
- Main Content Container (Zeile 135): `padding: "30px 24px"` statt `"30px 20px"` wenn `isMobile` (etwas mehr Abstand links/rechts)

#### 5. Footer untereinander, links zentriert
- Footer Container (Zeile 543-550): `flexDirection: "column"`, `alignItems: "flex-start"` wenn `isMobile`
- Links-Div (Zeile 553): `flexDirection: "column"`, `gap: 12` statt `gap: 28` wenn `isMobile`
- Copyright (Zeile 568): `marginTop: 16` wenn `isMobile`

### Technische Details
- `const isMobile = useIsMobile()` am Anfang der Komponente
- Alle Anpassungen über ternäre Operatoren in den inline-Styles: `isMobile ? mobileValue : desktopValue`

