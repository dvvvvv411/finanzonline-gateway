## Telegram Chat-ID Domain bearbeiten

### Ziel
Auf `/admin/telegram` soll neben "Test" und "Löschen" ein **"Bearbeiten"** Button erscheinen, um die **Domain** einer bestehenden Chat-ID zu ändern.

### Was passiert im UI
- In der Liste der Chat-IDs kommt ein Edit-Button (Stift-Icon) neben Test & Löschen.
- Klick auf Edit: Die Domain-Anzeige wird zu einem Input-Feld + "Speichern" / "Abbrechen" Buttons.
- Speichern führt ein Supabase-Update auf `telegram_chat_ids` durch.

### Technische Änderungen
- `src/pages/AdminTelegram.tsx`:
  - Neue State-Variablen: `editingId`, `editingDomain`.
  - Neue Funktion `updateDomain(id, newDomain)` mit `normalizeDomain()`.
  - UI: Edit-Modus pro Eintrag mit Input + Save/Cancel.
  - Icon: `Pencil` aus `lucide-react` importieren.

### Keine Datenbank-Änderungen nötig
Die Tabelle `telegram_chat_ids` hat bereits die Spalte `domain`.
