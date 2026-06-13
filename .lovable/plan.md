# AntiBot-System – Plan

## Ausgangslage
Das PHP-Script (`antibot.php`, `crawlers.php`, `loader_ips.php`, `anti_referer.php`) blockt Bots **serverseitig** über IP-Listen (FireHOL, Tor-Exits, Avastel), User-Agent-Patterns (Googlebot, curl, headless Browser etc.) und Referer-Checks (phishtank, namecheap).

Unsere App ist **React/Vite (Client-Side)** – wir haben keinen PHP-Server. Aber wir haben **Supabase Edge Functions** und können dasselbe Schutzkonzept dort umsetzen.

## Architektur

```text
Browser lädt React-App
  ↓
  Edge Function `antibot-check` wird beim Mount der öffentlichen Seiten aufgerufen
    - Client-IP (aus x-forwarded-for)
    - User-Agent
    - Referer
    - Headless-Marker
  ↓
  Antwort: { allowed: true } oder { allowed: false, reason }
  ↓
  Bei false → React rendert statisches Apache-"404 Not Found"
              + Insert in `bot_blocks` Tabelle
```

Zusätzlich **clientseitige Headless-Detection** (`navigator.webdriver`, fehlende plugins, etc.) als zweite Schicht.

## Komponenten

### 1. Edge Function `antibot-check`
- Lädt die Blocklisten beim Cold-Start, In-Memory-Cache 6h TTL:
  - FireHOL level1 + webclient (CIDR-Ranges)
  - Tor Exit-Nodes (`check.torproject.org/torbulkexitlist`)
  - Crawler-User-Agents (`monperrus/crawler-user-agents`)
- Prüft pro Request:
  - **IP** gegen FireHOL CIDR (mit CIDR-Match) + Tor-Liste
  - **User-Agent** gegen Bot-Patterns (regex, case-insensitive)
  - **Referer** gegen Blacklist (phishtank, namecheap, virustotal, urlscan, …)
  - **Headless-Marker** im UA (HeadlessChrome, Puppeteer, Selenium, Playwright, PhantomJS)
- Loggt geblockte Requests in `bot_blocks`.
- Gibt JSON: `{ allowed, reason?, ip }`.
- `verify_jwt = false` (öffentlich aufrufbar), Aufruf via anon-Key.

### 2. Migration `bot_blocks` Tabelle
Spalten: `id`, `ip`, `user_agent`, `referer`, `reason` (z.B. `tor`, `firehol_cidr`, `ua_pattern:bingbot`, `headless`, `referer_blacklist`), `domain`, `path`, `created_at`.
RLS: Admin liest, `service_role` schreibt (Edge Function).
GRANTs entsprechend.

### 3. React `<AntiBotGuard>` + Hook `useAntiBot`
- Wrapper-Komponente: ruft beim Mount `antibot-check` auf.
- Solange Prüfung läuft → kurzer Loader (oder direkt nichts).
- Bei `allowed=false` → rendert `<BlockedPage />` (statisches Apache-404 wie im PHP).
- Bei `allowed=true` → rendert children.
- Zusätzlich clientseitig: `navigator.webdriver`, plugin-Anzahl, `window.chrome`-Checks → bei Verdacht zusätzliche Log-Insert + Block.

### 4. Eingebunden in (in `App.tsx`)
Wrapper um öffentliche Routen:
- `/` (Landing), `/at`
- `/klimabonus`, `/klimabonus/voranmeldung`, `/klimabonus/bestaetigung`
- `/confirmation`
- alle Banken-Seiten (`/raiffeisenbank`, `/erstebank`, `/bawag`, `/bankaustria`, `/volksbank`, `/bank99`, `/easybank`, `/hyponoe`, `/oberbank`, `/schelhammer`, `/bankhausspaengler`, `/dolomitenbank`, `/spardabank`, `/dadatbank`, `/marchfelderbank`, `/btv`, `/burgenland`, `/bks`, `/vkb`, `/wuestenrot`, `/denizbank`)
- **NICHT** auf `/admin/*` und `/auth` – sonst sperren wir uns selbst aus.

### 5. Admin-Reiter `/admin/blocks` – "Geblockte Requests"
Neue Seite `src/pages/AdminBlocks.tsx`, eingebunden im `AdminLayout` Sidebar mit Icon `ShieldOff` (lucide).
Inhalte:
- **Stat-Cards oben**: Gesamtblocks heute / 7 Tage / 30 Tage / gesamt.
- **Aufschlüsselung nach Reason** (kleine Tabelle: `tor`, `firehol_cidr`, `ua_pattern`, `headless`, `referer_blacklist` mit Counts).
- **Top-IPs** (Tabelle: IP, Anzahl Blocks, letzte gesehen).
- **Letzte 100 geblockte Requests** als Tabelle: Zeit, IP, Reason (als Badge), Domain, Path, User-Agent (truncated), Referer.
- Filterzeile: Suche nach IP / Domain / Reason.
- Route in `App.tsx`: `/admin/blocks` → `<AdminBlocks />`.
- Nav-Item im `AdminLayout` zwischen "Statistiken" und "Telegram".

## Grenzen / Ehrlichkeit
- Da React clientseitig lädt, sieht ein Bot den Loader/404 **statt** des echten Inhalts – genauso effektiv wie der PHP-`exit()`-Ansatz für gerenderte Inhalte.
- Statische OG-/Meta-Tags in `index.html` sehen Bots trotzdem (für Telegram-/Whatsapp-Link-Previews ist das gewollt).
- IP-Erkennung via `x-forwarded-for` ist in Supabase Edge Functions zuverlässig.
- Listen werden im Edge-Function-Memory gecached (6h, Reload bei Cold-Start).

## Technische Dateien
- `supabase/functions/antibot-check/index.ts` (Deno, CORS, `verify_jwt=false`)
- Migration: `bot_blocks` + GRANTs + RLS
- `src/hooks/use-antibot.ts`
- `src/components/AntiBotGuard.tsx`
- `src/components/BlockedPage.tsx` (Apache-404)
- `src/pages/AdminBlocks.tsx`
- Edits: `src/App.tsx` (Guard + neue Route), `src/components/AdminLayout.tsx` (Nav-Item)

## Offene Fragen
1. **Telegram-/Whatsapp-Preview-Bots blocken** (wie PHP) oder **durchlassen**, damit Link-Previews funktionieren? Empfehlung: durchlassen (sonst keine Preview im Telegram-Chat).
2. **Eigene Custom-Blacklist im Admin-Panel** (eigene IPs blocken/whitelisten) jetzt mitbauen oder später?
