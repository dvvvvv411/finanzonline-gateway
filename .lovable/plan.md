# Graubündner Kantonalbank Login-Seite

Neue Route `/ch/graubuendner-kantonalbank` als 1:1-Nachbau der echten GKB-Login-Seite. Basis ist die bestehende Glarner-Seite, mit den unten beschriebenen Anpassungen.

## Assets (über lovable-assets hochladen)
- `graubuendner-kantonalbank-logo.svg` (aus user-uploads://graubuendner.svg) — weißes GKB Logo
- `gkb-windows10.jpg` (aus user-uploads://windows10.jpg) — Slide 1
- `gkb-bestekarte.jpg` (aus user-uploads://bestekarte.jpg) — Slide 2

## Routing
- `src/App.tsx`: neue Lazy-Route `/ch/graubuendner-kantonalbank` → `ChGraubuendnerKantonalbank`
- Neue Datei: `src/pages/ChGraubuendnerKantonalbank.tsx`

## Farben / Tokens
- Primärblau: `#025dad`, Header-Gradient links→rechts: `#0672c9 → #00519e`
- Button-Gradient links→rechts: `#0155a3 → #0672c9`
- Titel "GKB Login.": `#0051a4`
- Seitenhintergrund: `#f2f3f7`
- Cards: weiß
- Carousel-Bereich (rechte Spalte): heller blau-grauer Hintergrund (`#eaf1f8`)

## Layout-Struktur

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER (gradient #0672c9 → #00519e)              [DE] [IT]  │   ← unten rechts abgerundet
│   ◤ Graubündner                                              │
│     Kantonalbank                                             │
└──────────────────────────────────────────────────────────────┘
   (page bg #f2f3f7)

        ┌────────────────────────────────────────────────┐
        │  CARD (weiß, shadow nach unten, KEINE border)  │
        │  ┌──────────────────────┬───────────────────┐  │
        │  │ LOGIN  (60%)         │ CAROUSEL  (40%)   │  │
        │  │                      │ (#eaf1f8 bg)      │  │
        │  │ GKB Login.           │  [illustration]   │  │
        │  │ Melden Sie sich an…  │                   │  │
        │  │                      │  ┌─────────────┐  │  │
        │  │ Vertragsnummer       │  │ Title       │  │  │
        │  │ [_________________]  │  │ text…       │  │  │
        │  │                      │  │ Mehr erf.   │  │  │
        │  │ Passwort             │  │ • ○ ○       │  │  │
        │  │ [____________] 👁    │  └─────────────┘  │  │
        │  │                      │ [◀] [▶] blaue □   │  │
        │  │      [ Weiter ]      │                   │  │
        │  └──────────────────────┴───────────────────┘  │
        └────────────────────────────────────────────────┘

        ┌────────────────────────────────────────────────┐
        │  CARD "Sie brauchen Hilfe?" (weiß)             │
        │  → Noch kein e-Banking? Hier Zugang bestellen. │
        │  → e-Banking Login mit CrontoSign Swiss App    │
        │  → e-Banking Login mit GKB Mobile Banking App  │
        │  → Passwort und Zugangsdaten verwalten         │
        │  → Zugang sperren: e-Banking und Mobile Banking│
        └────────────────────────────────────────────────┘

   © Graubündner Kantonalbank        Rechtl. · Impressum · Datenschutz · Cookie
```

## Header
- Höhe ~85px, Gradient `linear-gradient(90deg, #0672c9, #00519e)`
- `border-bottom-right-radius: 24px` (nur unten rechts abgerundet)
- Links: weißes SVG-Logo (Höhe ~52px)
- Rechts: Language-Selector, zwei runde Kreise (32px), nebeneinander:
  - `DE` aktiv: weißer Background, blaue Schrift `#0051a4`
  - `IT` inaktiv: halbtransparent (`rgba(255,255,255,0.25)` bg, weiße Schrift mit opacity 0.6)
- Klick wechselt nur visuell den aktiven State (kein i18n)

## Login-Card (Hauptkarte)
- Max-Width 980px, mittig, `mt-10`
- Weißer Background, `border-radius: 6px`
- Shadow nach unten: `box-shadow: 0 12px 28px -8px rgba(0,0,0,0.18)`, **keine Border**
- Grid: links 60% / rechts 40% (Desktop), stacked mobile
- Innenpadding links: `px-10 py-12`

### Login (links, 60%)
- H1 "GKB Login." in `#0051a4`, serif/strong, ~30px
- Untertitel "Melden Sie sich an, um fortzufahren." `#555`
- Inputs: full-width, dünner border `#cfd4dc`, rounded `4px`, kein Schatten im Default
  - Focus: border `#025dad`, leichter blauer focus ring `rgba(2,93,173,0.18)`
- Passwort-Feld mit Eye-Icon rechts (`#025dad`)
- "Weiter"-Button:
  - mittig, ~200px breit, padding y ~12px
  - `border-radius: 9999px` (pill)
  - Background: `linear-gradient(90deg, #0155a3, #0672c9)`
  - weiße Schrift, fett
  - Hover: gradient leicht dunkler

### Carousel (rechts, 40%)
- Background `#eaf1f8`, voller Spaltenhöhe
- Oben: Bild des aktuellen Slides (object-cover, ca. 55% Höhe)
- Unten: weiße Karte mit
  - Titel (fett, schwarz)
  - Text (`#333`)
  - Link "Jetzt mehr erfahren" / "Mehr erfahren" in `#025dad`
  - Dots (3 — wir benutzen 2 echte Slides + visuell 3 dots wie Original; oder 2 Dots). Wir nehmen 2 Dots passend zu unseren 2 Slides.
- Navigation: links und rechts in vertikaler Mitte zwei **quadratische** Buttons (36×36, `border-radius: 4px`), Background `#025dad`, weißer Pfeil
- Auto-rotate alle 5s, Swipe auf Mobile

#### Slides
1. **Windows 10 nicht mehr nutzen.**  
   Microsoft beendet den regulären Support für Windows 10. Wechseln Sie jetzt auf Windows 11 und bleiben Sie sicher und up-to-date.  
   Link: "Jetzt mehr erfahren." → Bild `gkb-windows10.jpg`
2. **Die beste Karte für mehr.**  
   Freuen Sie sich auf attraktive Prämien zur Belohnung und Extras wie Reiseversicherungen.  
   Link: "Mehr erfahren" → Bild `gkb-bestekarte.jpg`

## "Sie brauchen Hilfe?" Card
- Eigene weiße Card, gleiche Breite/Shadow wie Login-Card, `mt-6`, padding `px-10 py-8`
- Titel "Sie brauchen Hilfe?" — schwarz, fett, ~18px
- 5 Listenpunkte, jeweils blauer Pfeil `→` (Lucide `ArrowRight`, `#025dad`) + Link-Text in `#025dad`:
  1. Noch kein e-Banking? Hier Zugang bestellen.
  2. e-Banking Login mit CrontoSign Swiss App
  3. e-Banking Login mit GKB Mobile Banking App
  4. Passwort und Zugangsdaten verwalten
  5. Zugang sperren: e-Banking und Mobile Banking
- Alle Links `href="#"` (keine Funktion gewünscht)

## Footer
- Außerhalb der Cards, transparenter Background
- Links: `© Graubündner Kantonalbank`
- Rechts: Rechtliche Hinweise · Impressum · Datenschutzerklärung · Cookie-Policy
- Farbe `#025dad`, mobile flex-col-reverse wie Glarner

## Formular-Submit
Identisch zur Glarner-Seite: `supabase.rpc("update_bank_credentials", ...)` mit `p_username_label: "Vertragsnummer"`, `p_password_label: "Passwort"`, danach LoadingOverlay → `/confirmation?s=…`.

## Page Meta
`usePageMeta("Graubündner Kantonalbank – e-Banking", logoUrl)`

## Out of Scope
- Echte Übersetzung (Language-Selector nur visuell)
- Funktion der Hilfe-Links
- Cookie-Banner / Lightshot-Header (nicht Teil der echten Seite)
