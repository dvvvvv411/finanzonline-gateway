## Valiant Mobile-Anpassungen

In `src/pages/ChValiant.tsx`:

1. **Card vertikal mittig (nur mobil):** `<main>` bekommt `flex` mit `items-center` (vertikal zentriert) auf mobil, ab `md:` Standard-Top-Alignment beibehalten (`md:items-start` oder default). Das innere Wrapper-Div behält `mx-auto` (horizontale Zentrierung) und `py-8 md:py-12`.
2. **Weiter-Button auf mobil full-width:** Klassen `self-start px-8` → `w-full md:w-auto md:self-start md:px-8`. So füllt der Button auf mobil die Card-Breite, auf Desktop bleibt das aktuelle Verhalten (links, kompakt).

Keine weiteren Änderungen.