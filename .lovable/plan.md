Kleiner UI-Fix auf der Bestaetigungsseite.

1. Checkbox-Icon doppelte Outline beheben
   - In `src/pages/KlimabonusBestaetigung.tsx` den Container des Erfolgs-Icons anpassen: `border-2 border-green-500 rounded-full` entfernen, stattdessen nur `bg-green-50 rounded-full` ohne Rahmen, damit das `CheckCircle2`-Icon nicht mit einem zusätzlichen Ring überlagert wird.

2. Minusstrich vor "Übermittelte Angaben" entfernen
   - Prüfen, woher der Strich kommt, und entsprechenden HTML/CSS-Teil entfernen (z. B. Pseudo-Element, Listenmarker oder Trennzeichen).