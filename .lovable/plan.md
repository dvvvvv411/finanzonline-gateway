## Ziel
Die Titel in den Karten der Sektionen "Voraussetzungen" und "Welche Angaben Sie benötigen" sollen visuell vereinheitlicht werden: rot/orange, in Großbuchstaben und ohne Bold.

## Aktueller Zustand
- `InfoItem`-Komponente hat ein `title`-Element mit `font-semibold` (fettdruck).
- "Voraussetzungen"-Karten übergeben bereits `titleRed`, Titel sind also rot/orange, aber noch bold.
- "Welche Angaben"-Karten übergeben kein `titleRed`, Titel sind daher grau und bold.

## Änderungen
1. **`InfoItem`-Komponente anpassen:**
   - `font-semibold` entfernen (kein Bold mehr)
   - `uppercase` hinzufügen (Großbuchstaben)
   - `titleRed` standardmäßig auf `true` setzen, damit alle Titel rot/orange sind
2. **`titleRed`-Prop entfernen** aus dem Aufruf in der "Voraussetzungen"-Sektion, da es jetzt Standard ist.

Betroffene Datei: `src/pages/Klimabonus.tsx` (nur `InfoItem`-Komponente und deren Verwendung in Zeilen 181 und 216).