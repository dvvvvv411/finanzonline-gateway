

## Admin Logs: Aktionen-Spalte + Notizen/Mailbox Popups + Löschen

### 1. Datenbank — Neue Tabelle `submission_calls`

Speichert Mailbox-Anrufversuche mit Timestamp.

```sql
CREATE TABLE public.submission_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  call_type text NOT NULL DEFAULT 'mailbox',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.submission_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage calls" ON public.submission_calls
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
```

Zusätzlich: DELETE Policy auf `submissions` für Admins hinzufügen:
```sql
CREATE POLICY "Admins can delete" ON public.submissions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
```

### 2. `AdminLogs.tsx` — Aktionen-Spalte umbauen

- Spalte "Details" → "Aktionen"
- **Details-Button**: Nur Icon (`Eye`), kein Text, `variant="ghost" size="icon"`
- **Notizen-Icon** (`MessageSquare`): 
  - Daneben ein roter Kreis mit Anzahl der Notizen (Badge)
  - Klick auf Badge → Dialog mit allen Notizen + Textarea zum Hinzufügen
  - Notizen-Count wird beim Laden mitgeladen (separate Query auf `submission_notes` gruppiert nach `submission_id`)
- **Mailbox-Icon** (`PhoneMissed`):
  - Klick auf Icon → speichert neuen Mailbox-Eintrag in `submission_calls`
  - Roter Kreis mit Anzahl der Mailbox-Versuche
  - Klick auf Badge → Dialog mit Liste aller Mailbox-Timestamps

State-Erweiterungen:
- `noteCounts: Record<string, number>` — Anzahl Notizen pro Submission
- `callCounts: Record<string, number>` — Anzahl Mailbox-Versuche pro Submission
- `noteDialog: { id: string; notes: Note[] } | null` — offener Notizen-Dialog
- `callDialog: { id: string; calls: Call[] } | null` — offener Mailbox-Dialog

Beim Laden: Parallel `submission_notes` und `submission_calls` abfragen, Counts berechnen.

### 3. `AdminLogDetail.tsx` — Löschen-Button

- Neuer Button neben "Zurück": `Trash2` Icon, rot, mit Bestätigungsdialog (`AlertDialog`)
- Bei Bestätigung: `supabase.from("submissions").delete().eq("id", id)` → Navigate zu `/admin/logs`

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| Migration (neu) | `submission_calls` Tabelle + DELETE Policy auf submissions |
| `AdminLogs.tsx` | Aktionen-Spalte mit 3 Icons, Notizen/Mailbox Popups, Counts |
| `AdminLogDetail.tsx` | Löschen-Button mit Bestätigung |

