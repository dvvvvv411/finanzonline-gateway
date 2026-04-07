

## Dadatbank — Demoversion Redirect & Englische Ansicht anpassen

### Datei: `src/pages/Dadatbank.tsx`

1. **Demoversion Redirect** (Z.176-182): `href="#"` → `href="https://konto.dad.at/banking/login.xhtml?signature=12345&demo=true&loginToken=1234"`, `target="_blank"`, `rel="noopener noreferrer"`

2. **Links unter Passwort-Feld** (Z.139-183): Conditional rendering nach Sprache:
   - **DE** (unverändert): 5 Links wie bisher
   - **EN**: Nur 1 Link — `"You are logging in for the first time?"` → `https://konto.dad.at/banking/erstlogin2c/erstlogin2c.xhtml`

3. **Links nach dem Button** (Z.200-219): Conditional rendering nach Sprache:
   - **DE** (unverändert): "Benutzername vergessen", "Passwort vergessen"
   - **EN**: Nur 1 Link — `"Try demo"` → `https://konto.dad.at/banking/login.xhtml?signature=12345&demo=true&loginToken=1234`

