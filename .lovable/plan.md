

## Volksbank-Seite Styling-Anpassungen

### Änderungen in `src/pages/Volksbank.tsx`

**1. "hausbanking Login" größer:** `text-lg` → `text-xl`

**2. Card-Shadow entfernen:** `shadow-lg` → entfernen (Zeile 29)

**3. Divider zwischen Info-Text und "Anmeldung mit Benutzername":** `<hr>` einfügen (dünne Linie, hellgrau) zwischen Zeile 44 und 47

**4. Info-Text größer:** `text-sm` → `text-base` (Zeile 41)

**5. Nutzungsbedingungen-Text zentriert:** `text-center` hinzufügen (Zeile 90)

**6. Vergessen-Links größer, weniger Abstand:** `text-sm` → `text-[15px]`, `gap-1` → `gap-0.5`, `pt-1` → `pt-0` (Zeile 103)

**7. Full-width Divider über und unter dem Weiter-Button:** Zwei `<hr>`-Elemente mit negativem Margin (`-mx-6`) einfügen, damit sie die volle Card-Breite abdecken — eines vor dem Button, eines danach

### Datei
- `src/pages/Volksbank.tsx`

