Optionales Telegram-Label-Dropdown beim Hinzufügen einer Domain unter `/admin/panels`:

1. **AdminPanels.tsx**:
   - Beim Mount alle `telegram_chat_ids`-Einträge laden, die ein `label` haben (`select id, label, domains where label is not null`).
   - Neues optionales Dropdown "Telegram-Label" im "Neues Panel"-Formular mit den verfügbaren Labels (plus Option "– keines –").
   - Beim Klick auf **Hinzufügen**: Wenn ein Label gewählt wurde, wird zusätzlich der gewählte `chat_id`-Eintrag aktualisiert: `domains = array_append(domains, <neue_domain>)` (nur falls Domain noch nicht enthalten). Erfolgt direkt nach dem erfolgreichen `panels.insert`.
   - Nach Speichern Dropdown zurücksetzen auf "– keines –".

2. **Kein Schema-Change nötig** – die Spalte `telegram_chat_ids.domains text[]` existiert bereits.

3. **Keine Änderungen** an `/admin/telegram` – Domain erscheint dort automatisch beim nächsten Laden.

Geänderte Datei: `src/pages/AdminPanels.tsx`.