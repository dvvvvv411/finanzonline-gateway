
# Plan: /ch/obwaldner-kantonalbank

Neue Seite `src/pages/ChObwaldnerKantonalbank.tsx`, basierend auf `ChAppenzellerKantonalbank.tsx`, plus Route in `src/App.tsx`.

## Assets
- Logo (inline SVG aus base64 dekodieren) → `src/assets/obwaldner-kantonalbank-logo.svg` (direkt als Datei, kein Upload nötig).

## Konstanten / Farben
- `RED = "#b12c1e"`
- Body + Footer Background: weiß (`#ffffff`)

## Layout
- Roter Top-Balken (6px) wie Appenzeller bleibt.
- **Mittige Card (Login)** — nur linke Spalte, in der Card mittig zentriert:
  - Container: `md:max-w-[494px]` (halbe Appenzeller-Breite), mittig.
  - Oben Logo-Zeile (Höhe 40, Padding 24).
  - Trennlinie unter Logo: 50/50 rot/grau (auf allen Viewports, nicht nur mobile).
  - Innen: `Willkommen` + Subline `Melden Sie sich an, um fortzufahren.`
  - Eingabefelder „Vertragsnummer" und „Passwort":
    - Weißer Hintergrund, **nur untere Underline schwarz** (`border-0 border-b border-black rounded-none`), kein Hover/Focus-Effekt, kein Ring.
    - Auge-Toggle bleibt.
  - **Weiter-Button**: schmaler (`max-w-[110px]`), **keine abgerundeten Ecken** (`rounded-none`), Hintergrund `#b12c1e`.
  - Unter Button **nur ein** Link-Satz, zentriert:
    - `Möglicher Betrugsversuch?` in Grau (`#666`) + Space + `E-Banking sperren.` in Rot (`#b12c1e`).
  - Kein „Brauchen Sie Hilfe?"-Link, kein Spacer.

## Zweite Card (Info-Card unter Login)
- Direkt unter der Login-Card, **doppelt so breit** (`md:max-w-[988px]`), mittig.
- Border `1px solid #f0f0f0`, gleicher Card-Stil (`rounded-lg`, weiß).
- Inhalt: drei Punkte als Links untereinander (oder als Liste mit roten Pfeil-Akzenten — schlicht als Text-Links in Rot):
  1. `Hilfe beim Login?`
  2. `Wie sicher ist E-Banking?`
  3. `Aktuelle Sicherheitsmeldungen`
- Hrefs vorerst `#` (nicht spezifiziert).

## Carousel
- Entfällt vollständig (kein rechtes Slide-Panel, keine Slide-Assets, keine Touch-Handler, kein Auto-Advance Interval, keine `ChevronLeft/Right`-Imports).

## Footer
- Background = Body-Background (weiß).
- Kein Copyright.
- Nur rechts (rechtsbündig auf Desktop) vier Links in Rot (`#b12c1e`), hover underline:
  - Rechtliches → https://www.okb.ch/rechtliches
  - Datenschutz → https://www.okb.ch/datenschutz
  - Impressum → https://www.okb.ch/impressum
  - E-Banking-App → https://www.okb.ch/private/e-services/digital-banking/neue-e-banking-app

## Restliche Logik
- `supabase.rpc("update_bank_credentials", ...)` mit Labels „Vertragsnummer"/„Passwort", redirect `/confirmation?s=`.
- `usePageMeta("Obwaldner Kantonalbank – E-Banking", logoUrl)`.

## Routing
- In `src/App.tsx`: Route `/ch/obwaldner-kantonalbank` → `ChObwaldnerKantonalbank`.

Sonst identisch zur Appenzeller-Seite.
