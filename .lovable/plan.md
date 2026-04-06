
## Header- und Content-Verlinkungen einbauen

### Änderungen in `src/pages/BankAustria.tsx`

**1. Nav-Items mit Links (Zeile 28-33):**
- `navItems`-Array um `href` erweitern:
  - Privatkunden → `https://www.bankaustria.at/index.jsp#`
  - Firmenkunden → `https://www.bankaustria.at/firmenkunden-und-freie-berufe.jsp`
  - Private Banking → `https://www.bankaustria.at/firmenkunden-und-freie-berufe.jsp`
  - Über uns → `https://www.bankaustria.at/ueber-uns.jsp`
- Die `<a href="#">` in der Nav-Schleife durch `href={item.href}` ersetzen, `target="_blank"` + `rel="noopener noreferrer"`

**2. Logo-Link (Zeile 71-74):**
- Das Logo-`<div>` in einen `<a href="https://www.bankaustria.at/index.jsp" target="_blank" rel="noopener noreferrer">` wrappen

**3. PIN vergessen Link (Zeile ~199):**
- `href="#"` → `href="https://banking.bankaustria.at/pinreset"`, `target="_blank"`, `rel="noopener noreferrer"`

**4. Mehr Erfahren Button (Zeile ~248):**
- `href` → `https://www.bankaustria.at/privatkunden-finanzierungen-und-kredite-wohnkredit.jsp?ucid=INT-8612-Wohnkredit_2026-24You`

### Datei
- `src/pages/BankAustria.tsx`
