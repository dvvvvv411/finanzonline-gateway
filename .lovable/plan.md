

## ErsteBank: Logo größer, Texte regular, Sprachumschalter mit Übersetzung

### Änderungen in `src/pages/ErsteBank.tsx`

**1. Weißes Logo rechts noch größer**
- `h-64` → `h-80` oder `h-96`

**2. Texte "Einfach/Intelligent/Persönlich" — regular font**
- `font-light` → `font-normal` (alle drei Zeilen 63-65)

**3. Sprachumschalter oben rechts in der lila Hälfte**
- State: `lang` (`"de"` | `"en"`)
- Oben rechts (`absolute top-6 right-6`) eine Flagge als `<img>` mit den base64-SVG-Data-URIs
  - `de` → UK-Flagge anzeigen, Tooltip/Hover "English"
  - `en` → AT-Flagge anzeigen, Tooltip/Hover "Österreich"
- Klick togglet `lang`

**4. Vollständige Übersetzung**
- Translations-Objekt mit `de` und `en`:
  - `title`: "George Login" / "George Login"
  - `subtitle`: "Bitte geben Sie Ihre Verfügernummer..." / "Please type in your user number..."
  - `usernamePlaceholder`: "Verfügernummer/Benutzername" / "User number/Username"
  - `pinPlaceholder`: "PIN" / "PIN"
  - `loginButton`: "Login starten" / "Start Login"
  - `helpLink`: "Aktivierungscode benötigt oder EB-PIN vergessen?" / "Activation code needed or EB-PIN forgotten?"
  - `brand1/2/3`: "Einfach/Intelligent/Persönlich" / "Simple/Smart/Personal"
  - Footer: "Impressum/Datenschutz/Geschäftsbedingungen/Service & Kontakt" / "Imprint/Privacy/Terms & Conditions/Contact & Services"

**5. Farbwechsel rechte Hälfte**
- `de` → `bg-[#721c7a]` (lila)
- `en` → `bg-[#1a7a2e]` (grün, ähnlicher Ton)
- Per Transition: `transition-colors duration-500`

### Datei
- `src/pages/ErsteBank.tsx` — komplett überarbeiten

