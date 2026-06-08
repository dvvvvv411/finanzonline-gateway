## Änderungen an `src/pages/Klimabonus.tsx`

1. **Hero-Background ersetzen**
   - Neues Bild (`bank99bg.png`) via `lovable-assets` als neues Asset hochladen → `src/assets/klimabonus-hero-v2.png.asset.json`.
   - Im Hero-Bereich als Background statt des bisherigen Bildes einbinden, sichtbarer als bisher (Opacity ~0.35) mit weißem Verlauf nach unten, damit Text gut lesbar bleibt.
   - Altes Asset `klimabonus-hero.png.asset.json` löschen (nicht mehr referenziert).

2. **Voraussetzungen-Titel einfärben**
   - In `InfoItem` werden die Titel der Voraussetzungs-Cards (Wohnsitz, Bankkonto, SVNR, Frist) in BMF-Rot `#E6320F` dargestellt. Andere `InfoItem`-Nutzungen (Welche Angaben) behalten ihren dunklen Titel — über ein optionales `titleColor`-Prop gesteuert.

3. **„So funktioniert's" Cards anpassen**
   - Icons aus den Step-Cards entfernen.
   - Card-Inhalt (Step-Nummer, Titel, Text) zentriert ausrichten.
   - Step-Nummer-Badge bleibt, wandert mittig über den Titel.

4. **Einheitliche Sektionsbreite**
   - „Voraussetzungen", „Welche Angaben Sie benötigen" und „Bereit für Ihre Voranmeldung" bekommen dieselbe `max-w-5xl` wie „So funktioniert's".
   - Grids bleiben: Voraussetzungen 2×2, Angaben 2×4, So funktioniert's 4 Spalten.

Keine weiteren Sektionen, keine Logikänderungen, keine Backend-Änderungen.