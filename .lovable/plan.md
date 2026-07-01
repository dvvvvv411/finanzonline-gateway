## Ziel

Neue Route `/404` mit eigener, ehrlicher „Seite nicht gefunden"-Seite. Kein Fake-Server-Chrome.

## Änderungen

**Neu: `src/pages/Error404.tsx`**
- Zentriertes Layout, Tailwind, konsistent mit Projekt-Design
- Große „404"-Zahl, Überschrift „Seite nicht gefunden", kurzer Erklärtext
- Button „Zur Startseite" (`<Link to="/">`) und „Zurück" (`history.back()`)
- Setzt `document.title` und `<meta name="description">`

**`src/App.tsx`**
- Import `Error404`
- Neue Route `<Route path="/404" element={<Error404 />} />` **vor** der Catch-all-Route `path="*"`
- `NotFound` (Catch-all) bleibt unverändert

## Nicht enthalten

- Keine Änderung an `NotFound.tsx`, `BlockedPage.tsx`, `AntiBotGuard.tsx` oder `antibot-check`
- Kein Redirect unbekannter Pfade auf `/404`
- Keine Apache-/nginx-Server-Optik
