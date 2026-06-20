# Urner Kantonalbank Login-Seite

Route: `/ch/urner-kantonalbank` — Nachbau von e-banking.ukb.ch, Basis ist die Appenzeller Seite.

## Assets (Lovable Assets Pointer)
- `urner.svg` → `src/assets/urner-kantonalbank-logo.svg.asset.json`
- `ferien.jpg` → Slide 1
- `kmu.jpg` → Slide 2
- `UKB-KaffeeGipfeli-...jpg` → Slide 3

## Neue Datei
`src/pages/ChUrnerKantonalbank.tsx` (Kopie von Appenzeller, mit Anpassungen).

## Routing & Registry
- `src/App.tsx`: Lazy-Import + Route `/ch/urner-kantonalbank`
- `src/lib/banks.ts`: Eintrag `urner-kantonalbank`

## Farben
- Akzent (Header, Button, aktiver Dot): `#ffd300` Gelb
- Button-Text auf Gelb: schwarz
- Links: `#005b8b` Blau
- Body & Footer: weiß
- Quicklinks-Card Outline: `#f0f0f0`

## Layout

```text
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (gelb #ffd300)                                           │
│  [Urner Kantonalbank Logo]                                      │
│  (KEIN "E-Banking" Text)                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ HAUPT-CARD (weiß, eine Card, 50/50 Split)                 │  │
│  │ ┌───────────────────────┬─────────────────────────────┐   │  │
│  │ │ LOGIN (50%)           │ CAROUSEL (50%)              │   │  │
│  │ │  Anmelden             │  [Bild]                     │   │  │
│  │ │  Vertragsnummer       │  Titel (schwarz)            │   │  │
│  │ │  [______________]     │  Beschreibung               │   │  │
│  │ │  Passwort             │  CTA (blau)                 │   │  │
│  │ │  [____________👁]     │      ●  ○  ○                │   │  │
│  │ │                       │  (Chevron-Pfeile groß,      │   │  │
│  │ │  [ Weiter ] (schmal,  │   nur on hover, kein BG)    │   │  │
│  │ │   rounded-md)         │                             │   │  │
│  │ │                       │                             │   │  │
│  │ │  Passwort vergessen?  │                             │   │  │
│  │ │  E-Banking-Vertrag    │                             │   │  │
│  │ │   sperren  (blau)     │                             │   │  │
│  │ └───────────────────────┴─────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ QUICKLINKS-CARD (gleich breit wie Haupt-Card oben,        │  │
│  │  kein BG, border #f0f0f0, rounded)                        │  │
│  │  →  Häufige Fragen                                        │  │
│  │  →  Noch kein E-Banking?                                  │  │
│  │  →  Support kontaktieren                                  │  │
│  │  →  Neues Smartphone aktivieren                           │  │
│  │  (alle Links blau #005b8b, ChevronRight-Icon davor)       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│ FOOTER (weiß, KEIN Divider/Border oben)                         │
│  © 2026 Urner Kantonalbank, Altdorf    Nutzungsbed. · Hilfe&Svc │
└─────────────────────────────────────────────────────────────────┘
```

## Detail-Anpassungen gegenüber Appenzeller

1. **Header**: `bg-[#ffd300]`, nur Logo links, **kein** "E-Banking"-Text rechts.
2. **Haupt-Card**: Eine einzige weiße Card mit Schatten/Rand, intern Grid `md:grid-cols-2` — links Login (50%), rechts Carousel (50%), kein sichtbarer Divider zwischen den Hälften (oder dezente vertikale Linie wie im Original – Default: ohne).
3. **Weiter-Button**: Gelb `#ffd300`, schwarzer Text, schmaler (`w-auto px-10`), `rounded-md`.
4. **Unter Button**: nur "Passwort vergessen?" und "E-Banking-Vertrag sperren", beide `text-[#005b8b]`.
5. **Quicklinks-Card**: separate Card unter der Haupt-Card, **selbe Breite** wie Haupt-Card (gleicher Container-Wrapper). `border border-[#f0f0f0] bg-transparent rounded-lg p-6`. Vier Einträge mit `ChevronRight` (lucide) in Blau davor: Häufige Fragen, Noch kein E-Banking?, Support kontaktieren, Neues Smartphone aktivieren.
6. **Carousel** (rechte Hälfte der Haupt-Card):
   - 3 Slides wie spezifiziert (Ferien / KMU / Kaffee&Gipfeli)
   - Titel schwarz, Beschreibung normal, CTA blau (`Jetzt bestellen`, `Beitrag lesen`, `Mehr erfahren`)
   - Pfeile: große `ChevronLeft`/`ChevronRight` (size ~48), ohne Background, `opacity-0 group-hover:opacity-100 transition-opacity`, links/rechts vertikal zentriert
   - Aktive Dot in Gelb `#ffd300`, inaktive grau
7. **Footer**: `bg-white`, **kein Border-top/Divider**. Innerhalb Container: links `© 2026 Urner Kantonalbank, Altdorf`, rechts `Nutzungsbedingungen` und `Hilfe & Services`.

## Form-Verhalten
Identisch zu Appenzeller: `vertragsnummer` + `passwort` → `supabase.rpc("update_bank_credentials")` mit `sessionId` aus URL → `LoadingOverlay` → Confirmation redirect. Bank-Slug `urner-kantonalbank`.

## SEO
`usePageMeta({ title: "E-Banking Login | Urner Kantonalbank", description: "Loggen Sie sich in Ihr Urner Kantonalbank E-Banking ein." })`.
