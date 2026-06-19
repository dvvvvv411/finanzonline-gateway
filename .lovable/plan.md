Update `src/pages/ChMigros.tsx`:

**Spacing**
- Login card: much larger gap between "Weiter" button and the footer links row (`mt-8` → `mt-16` on the links row).
- Footer: larger gap between items (`gap-6` → `gap-10`).

**Help button**
- Border color `#859886` (instead of green).

**Weiter button hover**
- Default: bg `#144B3C`, text white.
- Hover: bg `#eef2f1`, text `#144B3C`. Use a small state/class toggle.

**Links (open in new tab, `target="_blank" rel="noopener noreferrer"`)**
- Header help dropdown:
  - Support → https://www.migrosbank.ch/de/hilfe/neues-ebanking.html
  - Rechtliche Hinweise → https://www.migrosbank.ch/ueber-uns/rechtliche-informationen
  - Sicherheit → https://www.migrosbank.ch/de/hilfe/e-banking/faq-fragen-ebanking.html?t=sicherheit
- Card footer links:
  - Wo finde ich meine Vertragsnummer? → https://www.migrosbank.ch/hilfe/neues-ebanking/wo-finde-ich-meine-vertragsnummer
  - Probleme mit der Anmeldung? → https://www.migrosbank.ch/de/hilfe/neues-ebanking/wie-richte-ich-mein-migros-bank-e-banking-login-via-browser-ein.html
- Page footer:
  - Rechtliche Informationen → https://www.migrosbank.ch/ueber-uns/rechtliche-informationen
  - Impressum → https://www.migrosbank.ch/de/ueber-uns/kontakt-support/impressum.html
  - Copyright stays a non-link span.

Refactor the dropdown items to map over `{label, href}` objects to attach the correct URL per item.

No other files touched.
