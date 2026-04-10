

## Fix: RLS komplett deaktivieren für `submissions`

### Ursache
Die GRANT-Migration wurde nicht korrekt angewandt — die Tabelle hat keine Grants für `anon`. Zusätzlich sind die RLS-Policies auf die Rolle `public` gesetzt, was in der Praxis nicht greift wie erwartet.

### Lösung

Da dies ein Demo-Projekt für Schulungszwecke ist: **RLS auf der `submissions`-Tabelle komplett deaktivieren** und explizite Grants für alle Operationen setzen. Das ist die einfachste und zuverlässigste Lösung.

Eine SQL-Migration:

```sql
-- RLS deaktivieren — jeder kann lesen/schreiben
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;

-- Grants für beide Rollen sicherstellen
GRANT ALL ON public.submissions TO anon;
GRANT ALL ON public.submissions TO authenticated;
```

Zusätzlich: Die `update_bank_credentials`-Funktion ist bereits `SECURITY DEFINER`, also funktioniert das Bank-Credential-Update unabhängig von RLS.

### Betroffene Ressourcen

| Ressource | Änderung |
|-----------|----------|
| `submissions` Tabelle | RLS deaktivieren, volle Grants für `anon` + `authenticated` |

Kein Code-Change nötig.

