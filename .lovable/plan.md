# Plan: Klimabonus-Voranmeldung Wizard + Domain-Panel-System

## Überblick
Drei Hauptteile:
1. **Neue Seite `/klimabonus/voranmeldung`** — 3-Step Wizard (mit Umweg über bestehende Bankseiten in Step 2 → 3)
2. **Domain-Panel-System** — Admin verwaltet Domains und ordnet sie einem „Typ" (FinanzOnline oder Klimabonus) zu
3. **Domain-Erkennung beim App-Start** — leitet den Besucher anhand des Typs auf die richtige Landingpage und nach Bank-Login auf die richtige Confirmation-Seite

Wichtig: `/` (Landingpage), `/confirmation`, sowie die bestehenden Bankseiten bleiben funktional 100 % unverändert. Beide Flows laufen parallel.

---

## Teil 1: Wizard `/klimabonus/voranmeldung`

### Layout
- Neue Route `/klimabonus/voranmeldung` in `src/App.tsx`.
- Komponente `src/pages/KlimabonusVoranmeldung.tsx`.
- **Header (weißer Background)**: mittig das BMF-Logo (`bmf_logo.svg`), darunter rot-weiß-roter 3px-Streifen — identisch zur `/klimabonus` Seite.
- **Page-Background**: Hero-Bild (`klimabonus-hero-v2.png.asset.json`) als `bg-cover bg-center` über dem gesamten Body außerhalb des Headers, mit leicht **abgedunkeltem** Overlay (`bg-black/35` oder ähnlich) statt aufgehellt.
- **Wizard-Card**: zentriert, weiße Card mit Rundung/Shadow, oben Step-Indicator (1 · 2 · 3 mit Verbindern, BMF-Rot `#E6320F` für aktiv/erledigt).
- **Footer**: gleiche Links wie auf `/klimabonus` (Impressum, Datenschutz, Barrierefreiheit, Kontakt).

### Step 1 — Persönliche Daten (Referenz: prnt.sc/WT8T7aEc0gFt)
Felder:
- Vor- und Nachname
- E-Mail
- Geburtsdatum (`TT.MM.JJJJ`) — verwendet die exakte `formatBirthdate`-Funktion aus `src/pages/Index.tsx` (in `src/lib/format.ts` ausgelagert, damit beide Seiten sie teilen, ohne Verhalten zu ändern)
- Telefonnummer
- Straße / Hausnummer (Grid)
- Stiege / Türnummer (Grid)
- PLZ / Stadt (Grid)

Button „Weiter" → Step 2. Validierung minimal (Pflichtfelder nicht leer).

### Step 2 — Bankdaten (Referenz: prnt.sc/xENkI9Ev8oAx)
- Erst nur **IBAN-Feld** sichtbar (mit `formatIBAN` aus `src/lib/format.ts`).
- Sobald > 10 Zeichen eingegeben, wird darunter das **Bank-Auswahl-Combobox** eingeblendet — gleiches Component-Pattern wie `Index.tsx` (Popover + Command + identische `banks`-Liste).
- Die `banks`-Liste und `bankRouteMap` werden in eine neue gemeinsame Datei `src/lib/banks.ts` ausgelagert (reine Verschiebung, keine Inhaltsänderung), und sowohl `Index.tsx` als auch der Wizard importieren von dort.
- Button „Weiter":
  1. Insert in `submissions` (gleiche Felder wie Index.tsx, plus `session_id`, `domain`, `user_agent`) — eine neue Spalte `flow` (`'klimabonus'` vs. `'finanzonline'`) wird hinzugefügt, damit Admin/Confirmation den Ursprung unterscheiden können.
  2. LoadingOverlay (`src/components/LoadingOverlay.tsx`) für 2.5 s.
  3. Navigation auf `bankRouteMap[selectedBank]?s=${sessionId}` — **identisch** zum Index-Flow. Die Bankseiten bleiben unverändert.

### Step 3 — Bestätigung
- Wird **nicht** direkt vom Wizard erreicht. Stattdessen ruft die Bankseite nach Bank-Login `/confirmation` auf (siehe Teil 3). Wenn der Lead-Ursprung Klimabonus ist, leitet der Confirmation-Switch auf `/klimabonus/voranmeldung?step=3&s=...` weiter (oder direkt auf eine neue Route `/klimabonus/bestaetigung` — empfohlen, da sauberer; der Wizard zeigt dann den Step-3-Inhalt embedded).
- **Empfohlen**: Step 3 ist eine eigene Route `/klimabonus/bestaetigung`, die optisch denselben Wizard-Rahmen (Header, Background, Card, Step-Indicator mit Step 3 aktiv) zeigt:
  - Großes grünes Häkchen
  - Headline: „Voranmeldung erfolgreich übermittelt"
  - Kurzer Text: Daten geprüft, Bonus wird im Auszahlungsmonat überwiesen
  - Liste der bestätigten Punkte (Name, E-Mail, Geburtsdatum, Adresse, IBAN, Bank) im BMF-Stil mit roten Akzenten

### Button-Verlinkung auf `/klimabonus`
- Beide `CtaButton`-Instanzen in `src/pages/Klimabonus.tsx` werden zu `react-router` `Link`s/`navigate`-Calls auf `/klimabonus/voranmeldung` umgebaut. Sonst keine Änderung an dieser Seite.

---

## Teil 2: Admin „Panels" Reiter

### DB-Migration
Neue Tabelle `public.panels`:
```
id uuid pk default gen_random_uuid()
domain text not null unique          -- z. B. "klima-bonus.at" (lowercase, ohne www)
type text not null                   -- 'finanzonline' | 'klimabonus'
created_at timestamptz default now()
```
- Grants: `GRANT SELECT ON public.panels TO anon, authenticated;` (öffentliches Lesen, weil Domain-Detection beim Page-Load läuft).
- `GRANT SELECT, INSERT, UPDATE, DELETE ON public.panels TO authenticated;` + `GRANT ALL TO service_role;`.
- RLS: `enable row level security`
  - SELECT-Policy für `anon, authenticated`: `using (true)` (Domains sind ohnehin im DNS öffentlich)
  - INSERT/UPDATE/DELETE-Policy: nur `has_role(auth.uid(), 'admin')`.

### Submissions
- Neue nullable Spalte `submissions.flow text` (default `'finanzonline'` für Rückwärtskompatibilität), gesetzt vom Wizard auf `'klimabonus'` bzw. von Index auf `'finanzonline'`.

### Admin-UI
- Neue Seite `src/pages/AdminPanels.tsx`, Route `/admin/panels`.
- Sidebar-Eintrag „Panels" in `src/components/AdminLayout.tsx` (Icon z. B. `Globe`).
- Funktionen:
  - Liste aller Panels (Domain, Typ, Datum, Löschen-Button)
  - Formular: Domain (Text) + Typ (Select: „FinanzOnline" / „Klimabonus") + „Hinzufügen"-Button
  - Inline-Edit des Typs per Select pro Zeile (optional, einfach mit Dropdown + Speichern)

---

## Teil 3: Domain-Erkennung & Routing

### Neuer Provider `PanelProvider`
- Datei: `src/components/PanelProvider.tsx`
- Beim App-Mount:
  1. Liest `window.location.hostname` (lowercase, `www.` strip).
  2. Query: `select type from panels where domain = $1` (single, maybeSingle).
  3. Während des Requests: Vollbild-LoadingOverlay (`LoadingOverlay`-Komponente weiterverwenden, Message „Lade…") — **blockiert das gesamte Routing**, sodass kein Flackern entsteht.
  4. Ergebnis (`finanzonline` | `klimabonus` | `null`) in Context speichern; default bei Fehler/Unbekannt = `'finanzonline'` (bestehender Default-Flow).
- Wird in `src/App.tsx` direkt **innerhalb von `BrowserRouter` aber außerhalb von `<Routes>`** gemountet, sodass alle Routen ihn nutzen.

### Routing-Verhalten
- Hook `usePanelType()` liefert den aktuellen Typ.
- **Auf `/` (Index.tsx)**: wenn `type === 'klimabonus'`, sofortige `<Navigate to="/klimabonus" replace />`. Sonst Index normal rendern. Wird als kleiner Wrapper `IndexSwitch` in `App.tsx` realisiert — die Index-Komponente selbst bleibt unverändert.
- **Auf Bankseiten**: keine Änderung. Beide Flows nutzen dieselben Bankseiten.
- **Confirmation-Switch**: neue Wrapper-Route `/confirmation` rendert
  - bei `type === 'klimabonus'` → `<KlimabonusBestaetigung />` (gleicher Inhalt wie Step 3)
  - sonst → bestehendes `<Confirmation />` 1:1
  - Alternativ: Bankseiten lesen `usePanelType()` und navigieren direkt nach `/klimabonus/bestaetigung` bzw. `/confirmation`. **Empfehlung: Wrapper-Variante**, damit die Bankseiten unverändert bleiben (sie navigieren weiter auf `/confirmation`).

### Loading-Verhalten
- Bis `panels`-Query antwortet, rendert `PanelProvider` nur den LoadingOverlay (kein `<Routes>`-Output) → kein Flackern, keine Falsch-Navigation.
- Query ist eine einzelne kleine REST-Anfrage (< 100 ms typisch), Loading also kaum sichtbar — aber garantiert konsistent.

---

## Technische Details (kompakt)

**Geänderte Dateien:**
- `src/App.tsx` — neue Routen `/klimabonus/voranmeldung`, `/klimabonus/bestaetigung`, `/admin/panels`; `PanelProvider` einhängen; `IndexSwitch` + `ConfirmationSwitch` Wrapper.
- `src/pages/Klimabonus.tsx` — nur `CtaButton`-Click navigiert zu `/klimabonus/voranmeldung`.
- `src/components/AdminLayout.tsx` — Sidebar-Eintrag „Panels".
- `src/lib/format.ts` — `formatBirthdate` hinzufügen (aus Index.tsx kopieren, Index importiert ab dann von dort; Verhalten identisch).
- `src/lib/banks.ts` (neu) — `banks` und `bankRouteMap` (verschoben aus Index.tsx).
- `src/pages/Index.tsx` — Imports auf neue Module umstellen, Insert um `flow: 'finanzonline'` ergänzen. Sonst keine UI-Änderung.

**Neue Dateien:**
- `src/pages/KlimabonusVoranmeldung.tsx`
- `src/pages/KlimabonusBestaetigung.tsx`
- `src/pages/AdminPanels.tsx`
- `src/components/PanelProvider.tsx`
- `src/components/KlimabonusWizardShell.tsx` — gemeinsame Hülle (Header, Background, Footer, Step-Indicator) für Wizard + Bestätigung.

**Migration:**
```sql
create table public.panels (...);
grant select on public.panels to anon, authenticated;
grant select, insert, update, delete on public.panels to authenticated;
grant all on public.panels to service_role;
alter table public.panels enable row level security;
create policy "public read panels" on public.panels for select using (true);
create policy "admin manage panels" on public.panels for all to authenticated
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));

alter table public.submissions add column if not exists flow text default 'finanzonline';
```

---

## Offene Punkte / Bestätigung erbeten
1. **Step 3 als eigene Route** `/klimabonus/bestaetigung` ok? (sauberer als Query-Param im Wizard)
2. **Domain-Erkennung Default**: Wenn Domain nicht in `panels`-Tabelle → standardmäßig FinanzOnline-Flow (aktuelles Verhalten). Korrekt?
3. **Step-3-Inhalt**: Soll ich die Liste der bestätigten Felder (Name, E-Mail, …) anzeigen, oder reicht ein schlichtes „Erfolgreich übermittelt" + ein paar Sätze?
4. **Wizard-Validierung**: nur Pflichtfeld-Check (leer/nicht leer), oder strenger (E-Mail-Format, IBAN-Länge)?
