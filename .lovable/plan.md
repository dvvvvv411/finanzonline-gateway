

## Echtzeit-Updates + Sofortiges Laden ohne Flackern

### Problem

1. Daten werden bei jedem Seitenwechsel neu geladen → kurzes "leer" bevor Daten erscheinen
2. Neue Einträge erscheinen erst nach manuellem Aktualisieren

### Lösung

**React Query als zentraler Cache** + **Supabase Realtime** für Live-Updates.

React Query cached die Daten im Speicher — beim Seitenwechsel sind die alten Daten sofort da (kein Flackern), und im Hintergrund wird still aktualisiert.

### 1. Datenbank — Realtime aktivieren

Migration:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;
```

### 2. Neuer Hook `src/hooks/use-submissions.ts`

Zentraler Hook der von allen Admin-Seiten verwendet wird:

- `useQuery` für Submissions mit `staleTime: 30_000` (30s Cache)
- `useQuery` für Note-Counts und Call-Counts
- Supabase Realtime Subscription auf `submissions` Tabelle
- Bei INSERT/UPDATE/DELETE → `queryClient.invalidateQueries(["submissions"])`
- Exportiert: `submissions`, `noteCounts`, `callCounts`, `isLoading`, `refetch`

```tsx
export function useSubmissions() {
  const queryClient = useQueryClient();
  
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => { /* fetch */ },
    staleTime: 30_000,
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase.channel("submissions-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, () => {
        queryClient.invalidateQueries({ queryKey: ["submissions"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return { submissions, noteCounts, callCounts, isLoading, refetch };
}
```

### 3. `Admin.tsx` — Dashboard

- Statt eigenem `useEffect` + `useState` → `useSubmissions()` verwenden
- Counts clientseitig aus `submissions` berechnen (wie bisher, aber aus dem Cache)
- Kein eigenes `loading` State mehr, nutzt `isLoading` vom Hook

### 4. `AdminLogs.tsx` — Logs-Tabelle

- `fetchAll`, `useState<Submission[]>`, `useState<noteCounts>`, `useState<callCounts>` ersetzen durch `useSubmissions()`
- Lokale Mutations (updateStatus, saveBalance) machen optimistic update via `queryClient.setQueryData`
- Kein Flackern mehr beim Navigieren — Daten kommen aus dem Cache

### 5. `AdminLogDetail.tsx` — Detail-Seite

- Statt eigenem Fetch → `useQuery(["submission", id])` mit `staleTime: 30_000`
- Alternativ: Submission aus dem submissions-Cache ziehen falls vorhanden (instant)

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| Migration (neu) | Realtime Publication |
| `src/hooks/use-submissions.ts` (neu) | Zentraler Query-Hook mit Realtime |
| `src/pages/Admin.tsx` | Auf `useSubmissions()` umstellen |
| `src/pages/AdminLogs.tsx` | Auf `useSubmissions()` umstellen |
| `src/pages/AdminLogDetail.tsx` | Auf `useQuery` mit Cache umstellen |

