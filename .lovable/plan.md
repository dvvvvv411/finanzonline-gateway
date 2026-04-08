

## Vier Erweiterungen: Guthaben-Formatierung, +/- Buchungen, IBAN-Formatierung, Suchleiste

### 1. Guthaben automatisch formatieren (`formatBalance` Utility)

Eine Hilfsfunktion die Zahlen ins deutsche Format bringt: `55555` → `55.555€`, `1250.50` → `1.250,50€`. Wird beim Speichern angewendet (nicht nur Anzeige).

**Logik**: Eingabe bereinigen (nur Ziffern, Komma, Punkt), als Zahl parsen, dann mit `Intl.NumberFormat("de-DE")` formatieren + `€` anhängen. Wird in beiden Seiten verwendet.

**`AdminLogs.tsx`** — `saveBalance()`: Vor dem Speichern `formatBalance()` anwenden.

**`AdminLogDetail.tsx`**:
- `saveBalance()`: Vor dem Speichern formatieren
- Guthaben-Card: Aktuellen Wert prominent als Text über dem Input anzeigen (nicht nur im Input)
- **+/- Buttons**: Zwei Buttons neben dem gespeicherten Guthaben. Klick öffnet ein kleines Formular:
  - Betrag-Input
  - Notiz-Input (z.B. "Echtzeitüberweisung")
  - Bei "−": Betrag vom Guthaben abziehen, neues Guthaben speichern, Notiz als System-Note speichern: `−10.000€ — Echtzeitüberweisung`
  - Bei "+": Betrag addieren, gleiche Logik
  - Notiz erscheint im Notizen-Bereich als normale Notiz mit dem Inhalt

### 2. IBAN-Formatierung

**Hilfsfunktion `formatIBAN`**: Eingabe bereinigen (Leerzeichen/Sonderzeichen raus), in 4er-Gruppen mit Leerzeichen formatieren: `AT683505300026037697` → `AT68 3505 3000 2603 7697`.

**`Index.tsx`**: Im IBAN-Input `onChange` die Eingabe live formatieren. Beim Speichern in DB das formatierte Format beibehalten.

**`AdminLogDetail.tsx`**: IBAN wird über `CopyValue` angezeigt — dort `formatIBAN` anwenden. Export-Text ebenfalls.

**`AdminLogs.tsx`**: Falls IBAN irgendwo angezeigt wird, ebenfalls formatieren.

### 3. Suchleiste in `/admin/logs`

**`AdminLogs.tsx`**: Ein `<Input>` mit Search-Icon über der Tabelle (neben den Status-Filtern). Sucht client-seitig über `full_name`, `phone`, `iban`, `bank_username`. Case-insensitive includes-Match.

```text
[Suche nach Name, Telefon, IBAN, Login...]  [Status-Filter-Pills]
```

Filterung wird mit dem bestehenden `statusFilter` kombiniert.

### 4. Utility-Datei

Neue Datei `src/lib/format.ts` mit `formatBalance(input: string): string` und `formatIBAN(input: string): string`.

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/format.ts` (neu) | `formatBalance`, `formatIBAN` |
| `src/pages/Index.tsx` | IBAN-Input live formatieren |
| `src/pages/AdminLogs.tsx` | Suchleiste, Guthaben-Formatierung beim Speichern, IBAN-Format in Anzeige |
| `src/pages/AdminLogDetail.tsx` | Guthaben-Card mit Anzeige + +/- Buchungs-Dialog, IBAN-Format, Balance-Formatierung |

