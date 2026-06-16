# ÖGK-Email Template anpassen

Datei: `src/pages/AdminEmailTemplate.tsx` (nur der `oegkTemplate`-String). Keine anderen Änderungen.

## 1. Logo
Das bestehende Text-Logo („ÖGK" + „Österreichische Gesundheitskasse") **bleibt unverändert**.

## 2. Body-Text — deutlich mehr Druck

Neuer Body (ersetzt aktuelle Hinweisbox + Absätze):

- **Anrede:** unverändert.
- **Einleitungssatz (neu, dringlich):**
  „Ihre bei der Österreichischen Gesundheitskasse hinterlegten Versichertendaten **müssen bis spätestens Mittwoch, 17. Juni, überprüft und aktualisiert werden.**"
- **Warnbox (rot/grün-akzentuiert, Inhalt verschärft):**
  - **Ab dem 18. Juni stehen Ihnen ohne abgeschlossene Datenverifizierung keine Leistungen der ÖGK mehr zur Verfügung.**
  - Bereits beantragte Leistungen — darunter **Rezepte, Heilbehelfe und Kostenrückerstattungen** — werden bis zum Abschluss der Datenverifizierung **ausgesetzt**.
- **Abschlusssatz vor CTA:**
  „Vermeiden Sie eine Unterbrechung Ihrer Versorgung und schließen Sie die Aktualisierung jetzt ab."

## 3. CTA-Button
Text kürzen auf: **„Jetzt Daten aktualisieren"**. Padding bleibt, Button wirkt dadurch kompakter.

## 4. Footer
Aus der Link-Zeile **entfernen**: „Impressum", „Datenschutz", „gesundheitskasse.at" (gesamte `<p>`-Zeile mit den drei `<a>`-Tags wird gelöscht). Adresse + Hotline bleiben.

## Technische Hinweise
- Nur der `oegkTemplate`-String in `src/pages/AdminEmailTemplate.tsx` wird geändert.
- Inline-Styles, Tabellenstruktur, Farben (`#00B050`, `#1B2C5C`) bleiben gleich.
- FinanzOnline-Template, State-Logik, Tabs, Preview-Code: unverändert.
