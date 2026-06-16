# Robusterer Domain-Status-Check

## Problem
`oegk-aktualisierung.co` wurde als ❌ down markiert, obwohl die Domain aktiv ist. Grund: Google DoH lieferte `Status: 2` (SERVFAIL — Nameserver haben nicht geantwortet). Unser Code behandelt jedes `Status !== 0` als down und ruft den Cloudflare-Fallback nur bei einem fetch-Exception auf — bei SERVFAIL also nie.

## Fix in `supabase/functions/domain-status-check/index.ts`

`checkDomain()` umbauen zu einem mehrstufigen Resolver-Check:

1. **Google DoH** (`dns.google/resolve`) abfragen.
   - `Status === 0` mit A-Record → ✅ up, fertig.
   - `Status === 3` (NXDOMAIN) → ❌ down, fertig (Domain existiert wirklich nicht).
   - Alles andere (SERVFAIL, Timeout, HTTP-Fehler) → weiter zu Schritt 2.
2. **Cloudflare DoH** (`cloudflare-dns.com/dns-query`) abfragen — gleiche Auswertung wie oben.
3. **Quad9 DoH** (`dns.quad9.net:5053/dns-query`) als dritter unabhängiger Resolver — gleiche Auswertung.
4. Wenn alle drei kein A-Record und kein NXDOMAIN liefern: zusätzlich **NS-Record** prüfen (Typ 2) bei Google + Cloudflare. Wenn NS existiert, gilt die Domain als ✅ up (sie ist registriert und delegiert, nur A-Resolution gerade gestört) — sonst ❌ down.

Jeder Request behält das 5s-Timeout. Resolver werden seriell durchlaufen, sobald einer ein eindeutiges Ergebnis liefert (up oder NXDOMAIN), wird abgebrochen.

## Optional zusätzlich
- Im Telegram-Output bei „ungewissen" Domains (kein A, aber NS vorhanden) ein ⚠️ statt ❌ anzeigen, damit man sieht: registriert aber DNS-instabil.

Sag Bescheid, ob das ⚠️-Verhalten gewünscht ist oder ob NS-vorhanden einfach als ✅ zählen soll.