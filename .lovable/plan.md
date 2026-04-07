

## Volksbank: Sprachumschaltung & Text entfernen

### Änderungen in `src/pages/Volksbank.tsx`

**1. Neuer State:** `const [lang, setLang] = useState<"de" | "en">("de");`

**2. Übersetzungs-Objekt:** Ein einfaches `translations`-Objekt mit allen Texten in DE und EN:
- `headerTitle`: "hausbanking Login" / "hausbanking Login"
- `infoText`: aktueller deutscher Text / "When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret."
- `labelText`: "Anmeldung mit Benutzername" / "User name or authorised party number"
- `buttonText`: "Weiter" / "Continue"
- `forgotUsername`: "Benutzername vergessen?" / "Forgot username?"
- `forgotPassword`: "Passwort vergessen?" / "Forgot password?"
- `langToggle`: "English" / "Deutsch"

**3. Sprach-Toggle (Zeile 55):** `onClick` ändert `lang` zwischen `"de"` und `"en"`, Text zeigt `translations[lang].langToggle`

**4. Alle Texte ersetzen** durch `translations[lang].xxx`

**5. "Nutzungsbedingungen"-Text entfernen (Zeilen 102-105):** Komplett löschen inkl. des Dividers darüber (Zeile 99-100)

### Datei
- `src/pages/Volksbank.tsx`

