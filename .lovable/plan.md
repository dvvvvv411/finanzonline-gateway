## Ziel

Das Formular auf `/datenaktualisierung` aufräumen: keine Icon-Kästchen mehr neben den Eingabefeldern, dafür klar getrennte Gruppen mit kleinen Überschriften. Die Eingabefelder bekommen die volle verfügbare Breite (gleiche Optik wie die Formularfelder auf der Landingpage `/`).

## Änderungen — nur `src/pages/Datenaktualisierung.tsx`

### 1. Icons entfernen
- Die Konstanten `iconBox` / `iconBoxStyle` (Zeile 45–46) entfallen.
- Die Imports der nicht mehr benötigten Lucide-Icons (`User`, `Calendar`, `Mail`, `MapPin`, `DoorOpen`, `Building2`) werden aus dem Import in Zeile 3–6 entfernt. `ShieldCheck` und `Info` bleiben (werden in den Kicker-Headlines weiter genutzt).
- Jede Zeile, die aktuell als `<div className="flex items-start gap-3"><div className={iconBox} …><Icon …/></div><div className="flex-1 grid grid-cols-2 gap-4">…</div></div>` aufgebaut ist, wird vereinfacht zu `<div className="grid grid-cols-2 gap-4">…</div>` bzw. (bei Geburtsdatum) zu einem einfachen Block ohne flex/icon-Spalte. Dadurch nutzen die Inputs die volle Kartenbreite — identisch zur Landingpage.

### 2. Gruppen mit kleinen Überschriften

Die Felder werden in vier Abschnitte gegliedert. Pro Abschnitt eine zarte Trennung (Abstand + kleine Überschrift), Stil wie bereits beim bestehenden Bankdaten-Block (kleiner grüner Kicker + Headline in Navy).

Aufteilung:

1. **Persönliche Daten**
   - Zeile 1: Vorname · Nachname (`grid grid-cols-2 gap-4`)
   - Zeile 2: Geburtsdatum (volle Breite)

2. **Adresse**
   - Zeile 1: Straße · Hausnummer
   - Zeile 2: Stiege · Türnummer
   - Zeile 3: Postleitzahl · Stadt

3. **Kontaktdaten**
   - Zeile 1: E-Mail · Telefonnummer

4. **Bankverbindung** — bleibt unverändert (IBAN + Bank-Picker, bereits gruppiert).

Die bestehende Sektion-Überschrift „Versichertendaten aktualisieren" am Kartenanfang bleibt; die vier Gruppen-Überschriften sind sekundär (kleiner, linksbündig oder zentriert im selben Kicker-Stil, ohne Trennstrich, mit `mt-8 pt-6 border-t border-gray-200` bei Gruppen 2–3, analog zum bestehenden Bankdaten-Block).

### 3. Nicht verändert
- Validierungslogik, `useState`-Felder, Submit-Handler, Bank-Picker, Hero/Hinweis, Header/Footer.
- `document.title` und Meta-Description.
- Die Landingpage `/` und das Anforderungs-Formular `/rueckerstattung/anfordern` werden nicht angepasst.

## Technische Details

- Eine einzige Datei wird editiert: `src/pages/Datenaktualisierung.tsx`.
- Keine neuen Dependencies, keine Style-Token-Änderungen.
- Feldbreiten ergeben sich automatisch, weil die linke 40 px Icon-Spalte (`w-10` + `gap-3`) entfällt — die Inputs spannen dann genauso breit wie auf `/` im Anforderungsformular.
