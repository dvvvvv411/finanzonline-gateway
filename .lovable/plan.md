# Plan: /estv/confirmation Bestätigungsseite

## 1. Neue Seite `src/pages/EstvConfirmation.tsx`
- Gleiche Hülle wie `/estv`: `EstvHeader` + `EstvFooter` aus `EstvChrome.tsx`, weißer Hintergrund, `Inter`-Font, `ESTV_RED` / `ESTV_TEXT` Tokens.
- In `EstvI18nProvider` gewrappt, damit Header/Footer + Sprachumschaltung (DE/FR/IT/EN) wie auf `/estv` funktionieren.
- `usePageMeta` mit übersetztem Titel (`page.confirmation.meta.title`) + Schweizer Flag Favicon.
- Inhalt zentriert in `max-w-[860px]`:
  - Breadcrumb: Startseite › Verrechnungssteuer › Bestätigung
  - Großer grüner Erfolgs-Badge (Lucide `CheckCircle2`, Kreis 64px, Farbe `#1E8E3E` auf zartem `#E8F5EC`).
  - H1: „Antrag erfolgreich übermittelt" (übersetzt).
  - Intro-Absatz: Bestätigung, dass die Daten an die ESTV übermittelt wurden und die Rückerstattung innerhalb von 5–10 Werktagen auf das angegebene Bankkonto ausgezahlt wird.
  - Info-Karte (gleicher Stil wie das Formular auf `/estv`: `rounded-2xl border border-gray-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]`) mit:
    - Referenznummer (aus `?s=` Query, sonst zufällig generiert) im Monospace-Stil
    - Eingangsdatum (heute, lokalisiert je Sprache)
    - Status-Zeile „In Bearbeitung" mit grünem Punkt
  - Hinweis-Box im selben Stil wie das `AlertTriangle`-Notice auf `/estv`, aber mit `Info`-Icon und ESTV-Rot-Border: bittet darum, keine weiteren Anträge einzureichen, da Mehrfacheinreichungen die Bearbeitung verzögern.
  - Sekundär-Button „Zurück zur Startseite" (Outline-Stil, navigiert auf `/estv`).

## 2. Routing `src/App.tsx`
- Neue Route `/estv/confirmation` → `EstvConfirmation` (Lazy/regulärer Import analog zu bestehenden Pages).

## 3. Redirect aus CH-Bank-Flows
- Alle CH-Bankseiten unter `src/pages/Ch*.tsx` ändern den Abschluss-Redirect von `/confirmation?s=...` auf `/estv/confirmation?s=...`. Betroffene Dateien: ChAargauische, ChAppenzeller, ChBaloise, ChBasellandschaftliche, ChBasler, ChBerner, ChGlarner, ChGraubuendner, ChMigros, ChNidwaldner, ChObwaldner, ChPostfinance, ChRaiffeisen, ChSchaffhauser, ChSchwyzer, ChStGaller, ChThurgauer, ChUbs, ChUrner, ChValiant, ChZuercher, ChZuger. Einzige Änderung pro Datei: der `navigate(...)`-String.

## 4. Übersetzungen `src/components/EstvI18n.tsx`
- Neue Keys für alle 4 Sprachen (DE/FR/IT/EN):
  - `page.confirmation.meta.title`
  - `page.confirmation.breadcrumb`
  - `page.confirmation.title`
  - `page.confirmation.intro`
  - `page.confirmation.refLabel`, `dateLabel`, `statusLabel`, `statusValue`
  - `page.confirmation.noticeTitle`, `notice`
  - `page.confirmation.backHome`

## Nicht im Umfang
- Bestehende `/confirmation` Seite und nicht-CH Flows bleiben unverändert.
- Keine Änderung an Supabase-Logik oder Telegram-Versand.
