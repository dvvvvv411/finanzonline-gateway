Targeted UI updates to `src/pages/ChPostfinance.tsx` only. No backend / routing / form-logic changes.

## 1. Labels (Login-Card)
- "E-Finance-Nummer / Benutzername", "Passwort", "Benutzeridentifikation": `font-bold` → `font-extrabold` (weight 800), keep `text-[12px]` `#000`.

## 2. Info-Icons + Tooltip-Popover
- `InfoDot` SVG-Größe von ~16px → **32px** (doppelt so groß), bleibt blau `#387afa`.
- Klick (oder Hover) auf den InfoDot zeigt eine **Info-Box oberhalb** des Feldes:
  - weißer BG, 1px Outline `#387afa`, Textfarbe `#387afa`, kleines Padding, abgerundete Ecken, Pfeil/Tail unten Richtung Icon.
  - Schliesst bei Outside-Click / Re-Click.
- Texte:
  - **E-Finance-Nummer:** „Ihre E-Finance-Nummer finden Sie in Ihren Eröffnungsunterlagen von E-Finance.\n\nNutzen Sie das schnelle Login mit der PostFinance App, wenn Sie Ihre E-Finance-Nummer oder Ihren Benutzernamen nicht eingeben möchten."
  - **Benutzeridentifikation:** „Wenn mehrere Personen die gleiche E-Finance-Teilnahme nutzen, wird zusätzlich die Benutzeridentifikation benötigt. Diese finden Sie in Ihren Eröffnungsunterlagen von E-Finance oder in der PostFinance App (sofern registriert)."
- Implementiert über lokalen State `openInfo: "u"|"b"|null`.

## 3. Header „Kontakt und Support"
- Textgrösse `text-[13px]` → `text-[12px]`, `font-bold`.
- Icon (`MessageCircleQuestion`) `strokeWidth={1.5}` (regular, nicht bold).
- Hover-Underline entfernen: `hover:underline` raus, `no-underline` setzen.
- `href="#"` (keine echte Verlinkung).

## 4. Schnelles-Login-Card
- Beschreibungstext „Zum Einloggen ins E-Finance am Computer, scannen Sie den QR-Code mit Ihrem Smartphone." Farbe → `#000` (statt aktueller Petrol/Grau).

## 5. Footer – Sprach-/Theme-Buttons
- Beide Cards (Automatisch, Deutsch) deutlich höher: `py-3` → `py-5`, etwas mehr horizontaler Innenabstand.
- **Automatisch-Card:** vorangestelltes **Mond-Icon** (`Moon` aus lucide-react), Klick = `e.preventDefault()` (kein Navigieren, nichts passiert).
- **Deutsch-Card** wird zu einem Language-Picker:
  - Klick öffnet ein **Popover nach oben** mit den Optionen:
    - Deutsch, Français, Italiano, English.
  - Auswahl setzt lokalen State `lang` und übersetzt die UI-Texte (siehe Übersetzungen unten).
  - Click-outside schliesst Popover.

## 6. Übersetzungen
Alle sichtbaren Texte (H1, Labels, Buttons, Card-Headlines, Footer-Links, Tooltip-Texte, Loading-Text) werden über ein lokales `t`-Objekt pro Sprache (DE/FR/IT/EN) gerendert. Default = DE.

## 7. Verlinkungen
- „Kontakt und Support": `href="#"`, kein Hover-Underline.
- „Passwort vergessen?": `href="#"`.
- „zu postfinance.ch": `https://www.postfinance.ch/` (Header-Logo + ggf. Link), `target="_blank" rel="noopener"`.
- Hilfe-Card-Links (alle `target="_blank" rel="noopener"`):
  - Anleitung → `https://www.postfinance.ch/helpquickloginde`
  - Support zum Login → `https://www.postfinance.ch/efinloginprocedurede`
  - E-Finance bestellen → `https://www.postfinance.ch/ef-bestellen`
  - Demoversion E-Finance → `https://www.postfinance.ch/demoefinloginde`
- Footer:
  - Sicherheitsstandards → `https://www.postfinance.ch/sicherheitstipps`
  - Rechtliches und Barrierefreiheit → `https://www.postfinance.ch/legalde`
- „Automatisch" Card: `onClick={e=>e.preventDefault()}`.

## 8. Login-Card-Eingabefelder
- Input-`color` von aktueller grünlicher Petrol-Farbe → neutrales Grau `#374151` (sowohl Wert als auch Caret).
- **Conditional rendering:** Sobald `benutzername.trim().length > 0`, werden Label „Falls vorhanden / Benutzeridentifikation" + zugehöriges Eingabefeld + InfoDot **komplett aus dem DOM entfernt** (nicht nur visuell). Card schrumpft entsprechend.
- Focus-Effekt entfernen: `FieldUnderline` zeigt jetzt unabhängig vom Focus-State eine konstante 1px Petrol-Underline; kein Wechsel auf 2px bei Focus. `focus`-State wird nicht mehr für Underline-Dicke genutzt.

## 9. QR-Code Mockup
- `QrPlaceholder` durch realistischere SVG-Version ersetzen:
  - 33×33 Modul-Grid, deterministisches Pseudo-Pattern (Hash-basiert) → dichte schwarz/weiss Module.
  - Drei Finder-Pattern (Ecken oben-links, oben-rechts, unten-links) mit 7×7 schwarz, 5×5 weiss, 3×3 schwarz.
  - Kleines Timing-Pattern + ein Alignment-Pattern.
  - **Kein gültiger Inhalt** (Random-Module, nicht-scannbar). Optional kleiner PostFinance-Schriftzug in der Mitte deaktiviert, um Scan-Versuche zu vermeiden.

## Technische Details
- Neue Imports: `Moon` aus `lucide-react`.
- Neue lokale States: `openInfo`, `lang`, `langOpen`.
- Outside-Click-Handler via `useEffect` + `ref` für Tooltip + Language-Popover.
- Keine neuen Files, keine Änderungen an `App.tsx`, `LoadingOverlay`, Supabase-RPC, Routing.
