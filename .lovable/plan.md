## Problem

Im Admin-Panel werden Submissions/Logs über `supabase.from("submissions").select("*")` in `src/hooks/use-submissions.ts` geladen. Supabase (PostgREST) limitiert eine Antwort auf **max. 1000 Zeilen** pro Request. Aktuell sind bereits **1052 Einträge** in der DB → ab jetzt fehlen Logs in der Liste und auch in den Note-/Call-Counts (gleiches Limit auf `submission_notes`/`submission_calls`).

## Telegram-Frage

Nein, der 1000-Limit hat die Telegram-Benachrichtigungen **nicht** beeinflusst:
- Neue Submissions triggern `notify-telegram` direkt mit der `submission_id` (Einzelabruf, kein Limit).
- Der Cron-Job läuft als SQL direkt in Postgres (kein PostgREST → kein 1000er-Limit) und schickt pro ungesendeter Submission einen HTTP-Call.
- Aktuell stehen nur 5 ungesendete Submissions (>5 Min alt) in der DB — die werden vom Minuten-Cron abgearbeitet, kein Backlog wegen des Limits.

Falls einzelne Logs nicht angekommen sind, liegt das an anderen Ursachen (passende `telegram_chat_ids` für Domain fehlt, Telegram-API-Fehler, etc.) — nicht am 1000er-Limit.

## Fix-Plan

### 1. `src/hooks/use-submissions.ts` — Paginiertes Laden

`fetchSubmissions` und `fetchCounts` so umbauen, dass sie in Batches von 1000 mit `.range(from, to)` alle Zeilen holen, bis weniger als 1000 zurückkommen.

```ts
async function fetchSubmissions(): Promise<Submission[]> {
  const PAGE = 1000;
  const all: Submission[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data?.length) break;
    all.push(...(data as Submission[]));
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}
```

Gleicher Loop für `fetchCounts("submission_notes")` und `fetchCounts("submission_calls")` — nur `id, submission_id` selektieren.

### 2. Optionaler Performance-Hinweis

Bei wachsendem Datenbestand wird das volle `SELECT *` über alle Submissions im Admin-Panel teurer. Für jetzt reicht Pagination; später kann ein server-seitiger Filter (Status/Suche) oder echtes Infinite-Scroll dazukommen. **In diesem Change nicht enthalten** — nur das Limit-Bug.

## Geänderte Dateien

- `src/hooks/use-submissions.ts` — Pagination in `fetchSubmissions` und `fetchCounts`.

Keine DB-Migrationen, keine Edge-Function-Änderungen nötig.