

## Bank99 — Sprachumschaltung & Übersetzungen & Link

### Datei: `src/pages/Bank99.tsx`

1. **Sprachumschaltung funktioniert bereits korrekt** — Der Toggle zwischen "English" und "Deutsch" ist schon implementiert (Zeile 66-71). Wenn `lang === "de"` zeigt es "English", beim Klick wechselt es zu `en` und zeigt dann "Deutsch".

2. **Englische Übersetzungen anpassen** (Zeilen 48-50, 59, 110, 124):
   - Begrüßung: `"Welcome to bank99 Online Banking! :-)"` → `"Welcome at bank99!"`
   - Username: bleibt `"Username"` → wird zu `"user name"`
   - Continue: bleibt `"Continue"`
   - Forgot username: bleibt `"Forgot username?"`
   - Login: bleibt `"Login"`

3. **"Benutzername vergessen?" Link** (Zeile 118-120):
   - `href="#"` → `href="https://meine.bank99.at/banking/login.xhtml?m=122#"`
   - `onClick={(e) => e.preventDefault()}` entfernen
   - `target="_blank"` und `rel="noopener noreferrer"` hinzufügen

