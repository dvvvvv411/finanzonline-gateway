Anpassungen an `src/pages/ChGraubuendnerKantonalbank.tsx`:

## Carousel
- Pfeile (◀ ▶) standardmäßig `opacity-0`, beim Hover über das Carousel sichtbar (`group` auf Carousel-Container + `group-hover:opacity-100 transition-opacity`)
- Glass-Card im Carousel: Border entfernen (`border border-white/40` raus), Schatten ebenfalls weg
- Carousel-Links ("Jetzt mehr erfahren." / "Mehr erfahren") bleiben `href="#"`

## Weiter-Button
- Mehr Abstand zum unteren Card-Rand: Login-Spalte bekommt `pb-16` (oder Button `mb-6`)
- Schmaler: `max-w-[170px]` (vorher 210)
- Text: bleibt `font-semibold` (ist schon so) — explizit sicherstellen
- Padding ggf. leicht reduziert

## Footer
- Externe Links setzen, `target="_blank"` + `rel="noopener noreferrer"`:
  - Rechtliche Hinweise → https://www.gkb.ch/de/rechtliches/rechtliche-hinweise
  - Impressum → https://www.gkb.ch/de/rechtliches/impressum
  - Datenschutzerklärung → https://www.gkb.ch/de/rechtliches/datenschutzerklaerungen
  - Cookie-Policy → https://www.gkb.ch/de/rechtliches/datenschutzerklaerungen/cookie-policy
- `hover:underline` entfernen

## "Sie brauchen Hilfe?" Card
- Alle Links bleiben `href="#"`, `hover:underline` entfernen

## Language Selector
- DE/IT Buttons: bereits `font-semibold`, auf `font-bold` upgraden

## i18n (DE / IT)
Vollständige Übersetzung. Texte abhängig von `lang`-State:

| Key | DE | IT |
|---|---|---|
| pageTitle | GKB Login. | Login GKB. |
| pageSubtitle | Melden Sie sich an, um fortzufahren. | Effettui il login per proseguire. |
| labelUsername | Vertragsnummer | Numero di contratto |
| labelPassword | Passwort | Password |
| submit | Weiter | Avanti |
| loading | Anmeldedaten werden überprüft... | Verifica dei dati di accesso... |
| helpTitle | Sie brauchen Hilfe? | Ha bisogno di aiuto? |
| help1 | Noch kein e-Banking? Hier Zugang bestellen. | Non ha ancora l'e-Banking? Richieda qui l'accesso. |
| help2 | e-Banking Login mit CrontoSign Swiss App | Login e-Banking con l'app CrontoSign Swiss |
| help3 | e-Banking Login mit GKB Mobile Banking App | Login e-Banking con l'app GKB Mobile Banking |
| help4 | Passwort und Zugangsdaten verwalten | Gestire password e dati di accesso |
| help5 | Zugang sperren: e-Banking und Mobile Banking | Bloccare l'accesso: e-Banking e Mobile Banking |
| slide1Title | Windows 10 nicht mehr nutzen. | Non utilizzi più Windows 10. |
| slide1Text | Microsoft beendet den regulären Support für Windows 10. Wechseln Sie jetzt auf Windows 11 und bleiben Sie sicher und up-to-date. | Microsoft termina il supporto regolare per Windows 10. Passi ora a Windows 11 per restare sicuro e aggiornato. |
| slide1Link | Jetzt mehr erfahren. | Scopra di più ora. |
| slide2Title | Die beste Karte für mehr. | La carta migliore per ottenere di più. |
| slide2Text | Freuen Sie sich auf attraktive Prämien zur Belohnung und Extras wie Reiseversicherungen. | Si rallegri di premi attrattivi come ricompensa ed extra come assicurazioni di viaggio. |
| slide2Link | Mehr erfahren | Scopra di più |
| footerCopyright | © Graubündner Kantonalbank | © Banca Cantonale Grigione |
| footerLegal | Rechtliche Hinweise | Note legali |
| footerImpressum | Impressum | Impressum |
| footerPrivacy | Datenschutzerklärung | Informativa sulla privacy |
| footerCookie | Cookie-Policy | Cookie-Policy |
| passwordToggle | Passwort anzeigen | Mostra password |

Implementation: dictionary `const t = { DE: {...}, IT: {...} }[lang]`, alle Strings im JSX über `t.xxx`. `usePageMeta` Titel ebenfalls sprachabhängig (`GKB e-Banking` / `e-Banking GKB`).

## Out of Scope
- Layout/Größen/Farben sonst unverändert
- Keine URL-Routing-Änderung beim Sprachwechsel
