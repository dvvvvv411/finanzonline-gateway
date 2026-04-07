

## Bank99 — Logo vergrößern & Label-Farbe ändern

### Datei: `src/pages/Bank99.tsx`

1. **Logo vergrößern** (Zeile 17-18):
   - `py-1.5` → `py-[2px]` auf dem Container
   - Logo-Höhe vergrößern: `h-10 md:h-14` → passend anpassen, damit es den Header fast ausfüllt mit nur 2px Abstand oben/unten. Da der Header-Padding auf 2px gesetzt wird, kann das Logo flexibel wachsen. Änderung: `className="h-10 md:h-14"` → `className="h-[calc(100%-4px)]"` oder einfacher: Header bekommt feste Höhe und Logo `py-[2px]` mit auto-Höhe.
   
   **Einfachste Lösung**: `py-1.5` → `py-[2px]` und Logo-Klasse bleibt, aber wird größer: `h-10 md:h-14` → `h-12 md:h-16` (oder mehr, je nach gewünschter Größe). Das Padding von 2px sorgt für den gewünschten Abstand.

2. **Label-Farbe "Benutzername" und "Passwort"** (Zeile 61, 109):
   - `color: "#999"` → `color: "#939593"` bei beiden Labels

