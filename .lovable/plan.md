

## Schelhammer — Links, Übersetzungen & Hover-Underline

### Datei: `src/pages/Schelhammer.tsx`

1. **"Sie melden sich zum ersten Mal an?" — keine Weiterleitung** (Z.133-140):
   - `href="#"` und `onClick` entfernen, stattdessen `<span>` verwenden (kein Link, nur Text in rot, kein cursor-pointer)

2. **"Benutzername vergessen" Link** (Z.166-173):
   - `href="#"` → `href="https://www.banking.co.at/banking/login.xhtml?m=45#"`
   - `onClick` entfernen, `target="_blank" rel="noopener noreferrer"` hinzufügen

3. **"Passwort vergessen" Link** (Z.174-181):
   - `href="#"` → `href="https://www.banking.co.at/banking/login.xhtml?m=45#"`
   - `onClick` entfernen, `target="_blank" rel="noopener noreferrer"` hinzufügen

4. **English-Link Hover-Underline** (Z.59-68):
   - `className` hinzufügen: `"no-underline hover:underline"`

5. **Übersetzungen anpassen**:
   - Username-Label (Z.56): `"Username"` → `"User name or authorised party number"`
   - First-time-login (Z.139): `"First time logging in?"` → `"You are logging in for the first time?"`
   - Button (Z.158): `"Continue"` (bleibt)
   - Forgot links (Z.172, 180): `"Forgot username"` / `"Forgot password"` (bleiben)

6. **Terms-Text im Englischen ausblenden** (Z.143-148):
   - Nur rendern wenn `lang === "de"`: `{lang === "de" && <p>...</p>}`

