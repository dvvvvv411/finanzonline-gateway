## Neue Bankseite: `/ch/st-galler-kantonalbank`

Nachbau der SGKB E-Banking Login-Seite, 1:1 nach Vorlage und Vorgaben.

### Dateien
- **Neu:** `src/assets/st-galler-kantonalbank-logo.svg.asset.json` (Logo via Lovable Assets CDN aus `user-uploads://St._Galler_Kantonalbank_SGKB.svg`)
- **Neu:** `src/pages/ChStGallerKantonalbank.tsx`
- **Edit:** `src/App.tsx` — Import + Route `/ch/st-galler-kantonalbank`

### Layout (alles linksbündig, kein Card, keine Rundungen)

```text
┌─────────────────────────────────────────────────────────────┐
│ [SGKB-Logo]                                      DE | EN    │  ← Header
│                                                              │
│ Login SGKB E-Banking                       (grün #008751)   │
│                                                              │
│ Vertragsnummer                                               │
│ ┌───────────────────────────────────┐                       │
│ │                                   │  (großer Text)        │
│ └───────────────────────────────────┘                       │
│                                                              │
│ Passwort                                                     │
│ ┌───────────────────────────────────┐                       │
│ │                                   │                       │
│ └───────────────────────────────────┘                       │
│                                                              │
│ ┌───────────┐                                                │
│ │  Login    │  (inaktiv: #dedfdf bg, #705e60 text)          │
│ └───────────┘  (aktiv: #008751 bg, weißer Text)             │
│                                                              │
│ → Login-Daten vergessen          (grün, underline)          │
│ → Vertrag sperren                (grün, underline)          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Sicherheit │ Rechtliche Hinweise │ Hilfe/Support │ Kontakt  │  ← Footer #6c6e70
└─────────────────────────────────────────────────────────────┘
```

### Design-Details
- **Background:** `#ffffff`, keine Cards, keine `rounded-*` Klassen
- **Header:** Logo oben links (~h-12), rechts Sprachwechsler `DE | EN` (ausgewählt fett, andere regular + underline), vertikaler Strich dazwischen
- **Headline:** „Login SGKB E-Banking" in `#008751`, fett, ~text-2xl
- **Inputs:** 
  - Label darüber, große Schrift (`text-lg`) im Feld
  - Default: 1px border `#bcbcbc`
  - Focus: `outline-2 outline-offset-0` doppelte Outline (`outline-double` mit 4px width, Farbe `#008751`)
  - Keine Rundung
- **Login-Button:**
  - Inaktiv (mind. ein Feld leer): `bg-[#dedfdf]`, `text-[#705e60]`, `cursor-not-allowed`
  - Aktiv (beide Felder gefüllt): `bg-[#008751]`, `text-white`
  - Reactive via `useState` für beide Inputs
- **Links unter Button:** „Login-Daten vergessen" und „Vertrag sperren", grün `#008751`, `underline`, mit Pfeil-Icon `→` davor (lucide `ArrowRight` oder Unicode)
- **Footer:** Links mit Trennstrichen `|`, Farbe `#6c6e70`, Hover underline; URLs:
  - Sicherheit → https://www.sgkb.ch/de/e-banking/sicherheit
  - Rechtliche Hinweise → https://www.sgkb.ch/de/e-banking/rechtliches
  - Hilfe/Support → https://www.sgkb.ch/de/e-banking/hilfe
  - Kontakt → https://www.sgkb.ch/de/e-banking/supportanfrage
- Content-Container max-width ~1100px, padding-left wie bei den anderen CH-Pages, alles linksbündig
- "Help Line …" wird **nicht** dargestellt

### Form-Submit
- Analog zu bestehenden CH-Bank-Seiten (Schwyzer/Schaffhauser): Submit speichert Daten in localStorage/Backend und routet weiter — gleiches Pattern übernehmen.
