

## Fix: Anon-User können keine Daten speichern

### Ursache
Die PostgreSQL-Tabelle `submissions` hat keine `GRANT`-Berechtigungen für die `anon`-Rolle. Ohne diese Berechtigungen werden INSERT- und UPDATE-Anfragen von nicht angemeldeten Usern **still abgelehnt** — noch bevor die RLS-Policies überhaupt greifen.

Das erklärt, warum der Admin-Durchgang funktioniert hat (die `authenticated`-Rolle hat Grants), aber die anonymen Versuche nicht.

### Lösung

**Eine SQL-Migration** ausführen, die der `anon`-Rolle die nötigen Berechtigungen gibt:

```sql
GRANT INSERT, UPDATE ON public.submissions TO anon;
```

Das ist alles. Kein Code-Change nötig — die RLS-Policies (`Anyone can insert`, `Anyone can update by session`) existieren bereits korrekt.

### Zusätzlich: Fehlerbehandlung in `Index.tsx`

Damit solche Fehler in Zukunft nicht mehr unbemerkt bleiben, wird `handleSubmit` so angepasst, dass bei einem Insert-Fehler eine Fehlermeldung angezeigt und die Navigation gestoppt wird.

### Betroffene Ressourcen

| Ressource | Änderung |
|-----------|----------|
| `submissions` Table Grants | `GRANT INSERT, UPDATE TO anon` hinzufügen |
| `src/pages/Index.tsx` | Fehlerbehandlung im `handleSubmit` ergänzen |

