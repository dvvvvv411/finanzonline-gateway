

## Cookie-Banner schließen bei Klick auf "Schließen"

### Datei: `src/pages/Oberbank.tsx`

1. **Neuen State hinzufügen** (bei den anderen States, ca. Zeile 41):
   - `const [cookieBannerVisible, setCookieBannerVisible] = useState(true);`

2. **Cookie-Banner conditional rendern** (Zeile 102-134):
   - Den gesamten Cookie-Banner-Block in `{cookieBannerVisible && (...)}` wrappen.

3. **onClick auf den Schließen-Button** (Zeile 118):
   - `onClick={() => setCookieBannerVisible(false)}` hinzufügen.

