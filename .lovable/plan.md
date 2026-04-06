

## BankAustria Optimierungen

### Änderungen in `src/pages/BankAustria.tsx`

**1. Logo austauschen**
- SVG-Datei aus Upload nach `src/assets/` kopieren
- Im Header: Text "Bank Austria / Member of UniCredit" ersetzen durch `<img>` mit dem SVG-Logo
- Header-Hintergrund von `#c80a1e` auf `#fff` (weiß) ändern
- Nav-Links Farbe anpassen (dunkel statt weiß)

**2. Hamburger-Menü in Sidebar verschieben**
- Menu-Icon aus dem Header entfernen
- Oben in der Sidebar (vor GIROKONTEN) einen neuen Eintrag mit Menu-Icon + "MENU" Label einfügen (gleiche 80px Höhe)

**3. Fullscreen machen**
- Skalierungs-Logik (BASE_WIDTH, scale, transform) komplett entfernen
- Seite nimmt volle Viewport-Breite ein, kein fester Container

**4. Warning-Box und "Gefälschte Mails" entfernen**
- Komplette Warning-Box (Zeilen 100-119) löschen
- "Gefälschte Bank Austria Mails im Umlauf!" Text + Details-Button (Zeilen 166-179) löschen
- State `showWarning` entfernen

**5. 24You Text anpassen**
- Mittig zentrieren (`text-center`)
- Komplett rot (#c80a1e), nicht mehr türkis/rot gemischt

**6. Eingabefelder anpassen**
- Border von `#00aed0` (türkis) auf grau (`#ccc`) ändern
- Text zentrieren (`text-center` auf inputs)
- Placeholder-Text ebenfalls zentriert

**7. Eye-Icon bei PIN entfernen**
- Eye/EyeOff Button komplett entfernen
- PIN-Input immer `type="password"`
- State `showPin` entfernen

**8. "PIN vergessen" Link umpositionieren**
- Von über den Inputs nach unter das PIN-Feld verschieben
- Schwarze Outline (border) hinzufügen, als Button-artig gestaltet

**9. Login-Button nicht full-width**
- `w-full` entfernen, stattdessen `px-8` für normale Breite
- Zentriert mit `flex justify-center` Wrapper

### Dateien
- `src/assets/logo-bank-austria.svg` — Logo kopieren
- `src/pages/BankAustria.tsx` — alle Änderungen

