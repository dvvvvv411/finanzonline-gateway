## Plan

### 1. `/admin/telegram` — Label nachträglich bearbeiten
In `src/pages/AdminTelegram.tsx` den Edit-Modus erweitern, sodass beim Klick auf "Bearbeiten" nicht nur die Domains, sondern auch das **Label** editierbar wird.

- Neuer State: `editingLabel` (string).
- `startEdit(entry)` setzt zusätzlich `editingLabel` auf `entry.label ?? ""`.
- Im Edit-View neben dem `DomainInput` ein `Input`-Feld für das Label anzeigen (kleines Label "Label (optional)").
- `saveEdit(id)` schreibt `{ domains: editingDomains, label: editingLabel.trim() || null }` per Update.
- `cancelEdit()` leert auch `editingLabel`.

Keine DB-Änderung nötig — `label` ist bereits eine nullable Spalte.

### 2. `/admin/statistiken` — Label-Badges bei Domains
In `src/pages/AdminStatistiken.tsx` die Domain-Tabelle erweitern:

- Aus den geladenen `telegram_chat_ids` eine Map `domain → labels[]` bauen (Wildcard `*` ignorieren, weil sonst jede Domain das Wildcard-Label kriegt — alternativ als gesondertes "alle"-Badge; **Vorschlag: Wildcard wird NICHT angezeigt**, nur konkrete Domain-Zuordnungen).
- In jeder Domain-Zeile neben dem Domain-Namen Badges rendern mit dem Label (Fallback: ChatID falls kein Label gesetzt). Style: gleicher kleiner blauer Badge-Look wie in AdminTelegram (`bg-blue-50 text-blue-700`).
- Mehrere Labels möglich, wenn eine Domain in mehreren Chats hinterlegt ist.

### Technisches
- Nur Frontend-Edits in zwei Dateien: `src/pages/AdminTelegram.tsx`, `src/pages/AdminStatistiken.tsx`.
- Keine Migration, keine neuen Dependencies.
