

## Neue Sektion: "Persönliche Informationen" auf der Landing Page

### Design
Styled wie die "Anmeldung mit Benutzername"-Box auf finanzonline.bmf.gv.at:
- Box mit Rahmen (`border border-[#ccc]`)
- Überschrift "Persönliche Informationen" im grauen Header-Balken (wie `react-box-heading`)
- Gelbe Hinweiszeile mit Warnsymbol (AlertTriangle) darunter
- Formularfelder im Box-Body mit Labels oben, Inputs darunter
- "Weiter"-Button unten rechts (ohne Funktion)

### Hinweiszeile (gelb)
Text: "Achtung! Bitte überprüfen und aktualisieren Sie Ihre persönlichen Informationen, um Ihren Zugang zu FinanzOnline aufrechtzuerhalten."

### Formularfelder
Alle als einfache Text-Inputs (außer Bank):
1. Voller Name
2. E-Mail
3. Geburtsdatum (Datepicker)
4. Telefonnummer
5. Straße
6. Hausnummer
7. Stiege
8. Türnummer
9. Postleitzahl
10. IBAN
11. Bank-Auswahl — Dropdown/Select mit Suchleiste, enthält: Raiffeisen Bank, Erste Bank, BAWAG P.S.K., Bank Austria, Volksbank, Easy Bank, HYPO NOE, OberBank, Bank99, Schelhammer, Bankhaus Spängler, Dolomiten Bank, Sparda Bank, Dadat Bank

### Layout
- Adressfelder (Straße, Hausnummer, Stiege, Tür, PLZ) ggf. in einer Zeile/Grid
- "Weiter"-Button rechts unten, gleicher Stil wie auf finanzonline (`btn btn-default` → `border border-[#ccc] bg-white text-black`)

### Technisch
- Alles in `src/pages/Index.tsx` unterhalb der Hinweis-Box
- Bank-Dropdown mit Popover + Command (cmdk) für Suchfunktion, oder einfaches `Select` mit allen Optionen
- Lucide `AlertTriangle` für das Warn-Icon
- Keine Formular-Logik, nur UI

