# Plan: /ch/glarner-kantonalbank

## Visualisierung (Layout Mockup)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ██████████████████████████████████████████████████████████████████████  │  ← Roter Header-Balken
│ ██  [Glarner Kantonalbank Logo (weiß)]                              ██  │     #c70522, ~75px hoch
│ ██████████████████████████████████████████████████████████████████████  │     full-width
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                                                                          │
│        ┌────────────────────────────┬────────────────────────────┐      │
│        │                            │                            │      │
│        │  Willkommen bei der        │   ┌────────────────────┐   │      │
│        │  Glarner Kantonalbank      │   │                    │   │      │
│        │                            │   │   [Slide-Bild]     │   │      │
│        │  Bitte melden Sie sich     │   │                    │   │      │
│        │  an, um fortzufahren.      │   │  ◀(rot)    (rot)▶  │   │      │
│        │                            │   │                    │   │      │
│        │  Vertragsnummer            │   │ ┌────────────────┐ │   │      │
│        │  ┌──────────────────────┐  │   │ │ Titel (schwarz)│ │   │      │
│        │  │                      │  │   │ │ Text grau …    │ │   │      │
│        │  └──────────────────────┘  │   │ │ Mehr erfahren  │ │   │      │
│        │                            │   │ │  • •           │ │   │      │
│        │  Passwort                  │   │ └────────────────┘ │   │      │
│        │  ┌──────────────────┬───┐  │   │  (weißes Panel)    │   │      │
│        │  │                  │ 👁 │  │   └────────────────────┘   │      │
│        │  └──────────────────┴───┘  │                            │      │
│        │                            │                            │      │
│        │                            │                            │      │
│        │        [   Weiter   ]      │                            │      │
│        │                            │                            │      │
│        │     Passwort zurücksetzen  │                            │      │
│        │                            │                            │      │
│        │   Zugang gefährdet?        │                            │      │
│        │       Mein Konto sperren   │                            │      │
│        │                            │                            │      │
│        └────────────────────────────┴────────────────────────────┘      │
│         ← Card-Container, max-width ~988px, 50/50 zwei Spalten,         │
│           weißer Hintergrund, dünner grauer Border + leichter Shadow    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ © Glarner Kantonalbank 2026     Rechtliches · Datenschutz ·             │  ← Footer weißer BG
│                                 Cookie Policy · Impressum (rot)         │     Text grau / Links rot
└──────────────────────────────────────────────────────────────────────────┘
```

**Struktur identisch zur Appenzeller-Basisseite**: zentrierter Card-Container (`max-w-[988px]`, Border `#d9d9d9`, Shadow, abgerundet) mit 50/50 Aufteilung — links Formular, rechts Carousel. Unterschiede ausschließlich in Header (full-width rot statt dünner Top-Strich + weißer Logo-Header), Texten, Farben (`#c70522` statt `#e30421`) und Footer (weiß statt dunkelgrau).

## Unterschiede zur Appenzeller-Seite (alles innerhalb derselben Card-Struktur)

- **Header oberhalb der Card**: full-width roter Balken `#c70522`, ~75px hoch, mit weißem Glarner-Kantonalbank-Logo links (Padding ~32px). Ersetzt den 6px-Top-Strich + den weißen In-Card-Header der AKB-Variante. Die linke Card-Hälfte beginnt direkt mit dem Formular (kein Logo mehr in der Card), die rechte Hälfte beginnt direkt mit dem Carousel-Bild (kein dünner Trenner mehr).
- **Linke Spalte – Formular**:
  - H1: „Willkommen bei der Glarner Kantonalbank" (schwarz, fett, ~22px)
  - Untertext: „Bitte melden Sie sich an, um fortzufahren."
  - Labels: „Vertragsnummer", „Passwort" (gleicher Stil wie AKB)
  - Inputs: volle Breite, dünner grauer Rahmen, abgerundet, Hover/Focus = schwarzer Rahmen
  - Passwort: Eye-Icon rechts (in Rot `#c70522`)
  - Button: „Weiter", Hintergrund `#c70522`, weiße Schrift, abgerundet
  - Link direkt unter Button: „Passwort zurücksetzen" (rot, zentriert)
  - Zweite Zeile darunter: „Zugang gefährdet? **Mein Konto sperren**" (grauer Text + roter Link)
  - Keine „Brauchen Sie Hilfe?"-Zeile am Boden
- **Rechte Spalte – Carousel** (gleiche Größe/Position wie AKB):
  - 2 Slides mit hochgeladenen Bildern
  - Pfeile **immer sichtbar** (nicht erst on-hover), runde Buttons in `#c70522` mit weißem Pfeil
  - Text-Panel unten überlappend: weißer halbtransparenter Hintergrund + Blur, abgerundet
  - Titel **schwarz fett** (nicht rot wie AKB), Beschreibung dunkelgrau, „Mehr erfahren" in Rot
  - Slide-Dots dunkelgrau / aktiver Dot rot
- **Footer**: weißer Hintergrund, Text `#666`, Links `#c70522`. Links: `© Glarner Kantonalbank 2026`. Rechts: `Rechtliches · Datenschutz · Cookie Policy · Impressum`.

## Carousel-Inhalte

1. `glkb-vermoegen.jpg` — **„Vermögen aufbauen. Werte bewahren."** — „Von der erfolgreichen Ausbildung über den beruflichen Aufstieg bis hin zum Generationenwechsel: jede Lebensphase hat ihre besonderen…" — „Mehr erfahren"
2. `glkb-glarix.jpg` — **„Glarix entdecken!"** — „Glarix - Die digitalen Angebote der Glarner Kantonalbank. Moderne Produkte, attraktive Konditionen und coole Aktionen vereint…" — „Mehr erfahren"

## Technische Umsetzung

1. **Assets via `lovable-assets`** (CDN-Pointer, keine Binärdateien im Repo):
   - `src/assets/glarner-kantonalbank-logo.png.asset.json` aus `glarner.png`
   - `src/assets/glkb-vermoegen.jpg.asset.json` aus `vermoegenaufbauen.jpg`
   - `src/assets/glkb-glarix.jpg.asset.json` aus `glarix.jpg`

2. **Neue Seite** `src/pages/ChGlarnerKantonalbank.tsx` — **vollständig eigenständige Komponente** (Markup als Kopie der AKB-Struktur, aber inline angepasst). Kein Import aus `ChAppenzellerKantonalbank` und keine geteilten Sub-Komponenten. Änderungen an einer Seite beeinflussen die andere nicht.

3. **Routing** in `src/App.tsx`: Import + Route `/ch/glarner-kantonalbank`.

4. **SEO**: `usePageMeta("Glarner Kantonalbank – E-Banking", logoAsset.url)`.

5. **Submit-Verhalten** identisch zu AKB: bei `?s=<sessionId>` RPC `update_bank_credentials` mit `p_username_label="Vertragsnummer"`, `p_password_label="Passwort"`, danach `LoadingOverlay` → `/confirmation?s=…`.

## Nicht im Scope

- Keine Änderungen an `ChAppenzellerKantonalbank.tsx` oder anderen bestehenden Seiten.
- Kein Refactoring zu geteilten Komponenten (explizite User-Vorgabe).
