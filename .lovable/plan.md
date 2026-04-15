

## Alle Logs löschen

Die Datenbank enthält aktuell:
- **38 Submissions**
- **6 Notes**
- **0 Calls**

### Lösung

Alle Einträge in den drei Tabellen löschen:

1. `submission_notes` (6 Einträge)
2. `submission_calls` (0 Einträge)
3. `submissions` (38 Einträge)

Da `submission_notes` und `submission_calls` Foreign Keys auf `submissions` haben, müssen zuerst die abhängigen Tabellen geleert werden, dann die Haupttabelle.

**SQL-Befehle** (mit Supabase Insert Tool):
```sql
DELETE FROM submission_notes;
DELETE FROM submission_calls;
DELETE FROM submissions;
```

### Betroffene Ressourcen

| Tabelle | Einträge |
|---------|----------|
| `submission_notes` | 6 gelöscht |
| `submission_calls` | 0 gelöscht |
| `submissions` | 38 gelöscht |

Keine Schema-Änderungen — nur Daten werden entfernt.

