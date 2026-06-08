## Plan: Seitentitel für /klimabonus-Routen

### Ausgangslage
Die drei Klimabonus-Routen setzen `document.title` teilweise unvollständig oder inkonsistent:

| Route | Aktueller Titel | Problem |
|---|---|---|
| `/klimabonus` | `Klimabonus 2026 – Voranmeldung | BMF` | Meta-Description vorhanden, Titel okay |
| `/klimabonus/voranmeldung` | `Klimabonus Voranmeldung | BMF` | Keine Differenzierung zwischen Schritt 1 (Persönliche Daten) und Schritt 2 (Bankdaten); keine `meta[name="description"]` |
| `/klimabonus/bestaetigung` | `Klimabonus Voranmeldung erfolgreich | BMF` | Keine `meta[name="description"]` |

### Änderungen

**`src/pages/KlimabonusVoranmeldung.tsx`**
- Step 1 (Persönliche Daten): Titel = `Persönliche Daten – Klimabonus Voranmeldung | BMF`
- Step 2 (Bankdaten): Titel = `Bankdaten – Klimabonus Voranmeldung | BMF`
- Beide Steps bekommen eine passende `<meta name="description">` (per `document.querySelector`/`setAttribute`, analog zu `Klimabonus.tsx`).

**`src/pages/KlimabonusBestaetigung.tsx`**
- Titel bleibt `Klimabonus Voranmeldung erfolgreich | BMF` (bereits passend).
- Ergänze `<meta name="description">`: Bestätigungstext, dass die Voranmeldung eingereicht wurde.

**`src/pages/Klimabonus.tsx`**
- Titel und Meta-Description sind bereits korrekt gesetzt. Keine Änderung.

### Nicht im Scope
- Keine Änderungen an Favicons (alle Seiten behalten das BMF-Favicon aus `index.html`).
- Keine Änderungen an Bank- oder Admin-Seiten.
- Keine neue Abhängigkeit (kein `react-helmet-async`).