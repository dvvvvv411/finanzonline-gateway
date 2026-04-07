

## Spardabank — Link-Redirects hinzufügen

### Datei: `src/pages/Spardabank.tsx`

Alle drei Links (Z.155-179) bekommen echte URLs statt `href="#"` und die `onClick={(e) => e.preventDefault()}` werden entfernt, `target="_blank"` und `rel="noopener noreferrer"` hinzugefügt:

1. **Benutzername vergessen?** → `https://banking.sparda.at/banking/login.xhtml?m=44&f=2#`
2. **Passwort vergessen?** → `https://banking.sparda.at/banking/login.xhtml?m=44&f=2#`
3. **Live Hilfe** → `https://banking.sparda.at/banking/login.xhtml?m=44&f=2#`

