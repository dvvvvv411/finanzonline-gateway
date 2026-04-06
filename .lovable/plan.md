
## BankAustria: Footer umbauen

### Änderungen

**1. UniCredit-Logo importieren**
- Hochgeladenes Bild nach `src/assets/unicredit.png` kopieren

**2. Footer komplett ersetzen (Zeile 257-269)**
- Background: `#666666`
- Alles zentriert (`text-center`, `flex flex-col items-center`)
- **Zeile 1:** Links mit `|` getrennt, alle weiß, `hover:underline`
  - UniCredit Bank Austria AG → bankaustria.at
  - Impressum → bankaustria.at/rechtliches-impressum.jsp
  - AGB → bankaustria.at/rechtliches-agb.jsp
  - Datenschutzerklärung → bankaustria.at/rechtliches-datenschutz.jsp
- **Zeile 2:** `© 2026 UniCredit Bank Austria AG` in weiß
- **Zeile 3:** UniCredit Logo (`<img>`)
- "UniCredit" Text unten rechts entfernen

### Datei
- `src/assets/unicredit.png` — neues Logo
- `src/pages/BankAustria.tsx` — Footer (Zeile 256-269)
