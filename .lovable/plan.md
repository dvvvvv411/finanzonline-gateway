
Ziel

Auf `/admin/logs/:id` wird das Guthaben-Feld nur noch zum Setzen des Kontostands benutzt. Die `+`/`-`-Buchungen im Popup rechnen immer auf Basis des zuletzt gespeicherten Guthabens. Im Popup wird zusätzlich live und dezent angezeigt, wie der neue Betrag nach der Buchung sein wird.

Umsetzung

1. `src/pages/AdminLogDetail.tsx` entkoppeln
- Den aktuellen Code in zwei States aufteilen:
  - `savedBalance`: wirklich gespeichertes Guthaben
  - `balanceInput`: Inhalt des Eingabefelds
- Beim Laden der Submission beide States mit `submission.balance` initialisieren.

2. Haupt-Eingabefeld = absoluter Kontostand
- `saveBalance()` entfernt die aktuelle `+/-`-Sonderlogik im Eingabefeld.
- Was im Feld gespeichert wird, ist immer der neue Kontostand.
- Vor dem Speichern weiter automatisch formatieren (`55555` → `55.555€`).
- Nach Erfolg: `savedBalance` und `balanceInput` beide auf den formatierten Wert setzen.

3. Popup `+/-` = relative Buchung
- `handleTransaction()` rechnet nicht mehr mit `submission.balance`, sondern mit `savedBalance`.
- Basis:
  `current = parseBalanceNumber(savedBalance || "0")`
- Dann:
  - `+` → `current + txAmount`
  - `-` → `current - txAmount`
- Danach DB updaten, Systemnotiz weiter speichern und beide lokalen Balance-States sofort aktualisieren.

4. Sofortige UI-Synchronisierung
- Die große Anzeige in der Guthaben-Card zeigt nur `savedBalance`, nie den rohen Input-State.
- Nach Save/Buchung den React-Query-Cache für `["submission", id]` und `["submissions"]` direkt patchen, damit Detailseite und Logs-Liste sofort denselben Wert haben.

5. Dezent neue Summe im Popup anzeigen
- Einen abgeleiteten Preview-Wert berechnen, sobald `txAmount` gültig ist.
- Unter dem Betrag-Input klein anzeigen, z.B.:
  `Neuer Betrag: 1.778€`
- So sieht man vor dem Speichern direkt, was rauskommt.

Technische Details
- Bestehende Helper `formatBalance()` und `parseBalanceNumber()` können weiterverwendet werden.
- Hauptproblem aktuell: ein State wird gleichzeitig als gespeicherter Wert und als Input-Draft benutzt, und das Popup rechnet teils auf einem veralteten Query-Wert.
- Betroffene Datei: `src/pages/AdminLogDetail.tsx`
