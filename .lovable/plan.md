

## Demo-Daten Button auf der Landingpage

### Datei: `src/pages/Index.tsx`

1. **Kleinen Button neben "Persönliche Informationen"** (Z.165-168): Die `<h2>` in ein Flex-Container wrappen mit einem kleinen Icon-Button (z.B. ein Würfel-Icon oder `Shuffle` von lucide-react), der beim Klick alle Felder mit zufälligen aber realistischen österreichischen Demo-Daten befüllt.

2. **`fillDemoData` Funktion**: Setzt alle State-Variablen mit zufälligen Werten aus einem Pool:
   - Österreichische Vor-/Nachnamen (z.B. "Thomas Müller", "Anna Huber", "Stefan Wagner")
   - E-Mail passend zum Namen
   - Geburtsdatum (TT.MM.JJJJ Format, z.B. "15.03.1985")
   - Österreichische Telefonnummern (+43...)
   - Wiener/Salzburger/Grazer Straßen + Hausnummern
   - Stiege/Türnummer optional
   - Österreichische PLZ + Stadt-Paare (1010 Wien, 5020 Salzburg, etc.)
   - Österreichische IBAN (AT + 18 Ziffern)
   - Zufällige Bank aus der Liste

3. **Button-Styling**: Sehr klein, dezent, grauer Text, neben der Überschrift — z.B. ein kleines `Dices`-Icon mit `text-gray-400 hover:text-gray-600`, 16x16px.

