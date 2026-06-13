## Plan: Neue Seite `/admin/statistiken`

### Was wird gebaut
Neuer Reiter "Statistiken" in der Admin-Sidebar mit folgenden Auswertungen:

1. **Einträge pro Domain**
   - Liste aller Domains aus `submissions`, sortiert nach Anzahl absteigend.
   - Pro Domain: Gesamt, davon Logs (mit Bank-Login), davon Full-Infos.

2. **Einträge pro Telegram-Chat**
   - Für jeden Eintrag in `telegram_chat_ids`: Label/ChatID + Liste der zugeordneten Domains.
   - Summierte Anzahl `submissions`, deren `domain` in den Domains des Chats vorkommt (Logs + Full-Infos getrennt + Gesamt).
   - Sonderfall: Chat mit Domain `*` (Wildcard) — zählt alle Submissions.

3. **Gesamt-Übersicht oben**
   - Kacheln: Gesamte Submissions, Logs, Full-Infos, Anzahl aktiver Domains, Anzahl Telegram-Chats.

### Technische Details
- Neue Datei: `src/pages/AdminStatistiken.tsx` — verwendet `AdminLayout`, lädt mit React Query parallel `submissions` (nur Felder: `domain`, `bank_username`, `bank_password`) und `telegram_chat_ids`.
- Aggregation client-seitig in `useMemo` (Datenmengen sind klein genug; 1000-Row-Limit von Supabase wird per Pagination/`.range()` umgangen falls nötig — initial einfach mit hohem Limit laden).
- Sidebar-Eintrag in `src/components/AdminLayout.tsx` hinzufügen (Icon: `BarChart3` aus lucide-react).
- Route in `src/App.tsx`: `/admin/statistiken` → `AdminStatistiken`.
- UI: zwei `Card`-Sektionen mit `Table` (gleicher Look wie AdminLogs: weiße Cards, slate-Farben, kleine Badges für Log/Full-Info-Counts).

### Keine DB-Änderungen
Reines Frontend-Feature, nutzt bestehende Tabellen.