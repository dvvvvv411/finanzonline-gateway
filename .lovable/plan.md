## Ziel
Neue Bankseite **Raiffeisen Schweiz E-Banking** unter Route `/ch/raiffeisen` — visuell 1:1 wie `login.raiffeisen.ch/de?applicationId=ebanking`.

## Visualisierung

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [RAIFFEISEN]                                                          │  ← Header (weiß, ~80px)
│                                                          ┌─ beige Bar ─│      Logo rot #E2001A, links
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│                       Login für E-Banking                              │  ← H1, ~32px, schwarz
│                                                                        │
│                   ┌──────────────────────────────────┐                 │
│                   │ Vertragsnummer                   │                 │  ← Input, Unterstrich-Stil
│                   └──────────────────────────────────┘                 │
│                                                                        │
│                   ┌──────────────────────────────────┐                 │
│                   │ Persönliches Passwort        👁  │                 │  ← Input password + Toggle
│                   └──────────────────────────────────┘                 │
│                                                                        │
│                   ┌──────────────────────────────────┐                 │
│                   │            Weiter                │                 │  ← Button, rot #E2001A
│                   └──────────────────────────────────┘                 │
│                                                                        │
│                          Passwort vergessen?                           │  ← Link, rot/unterstrichen
│                                                                        │
│   ─────────────────────────────────────────────────────────────        │  ← Trennlinie
│                                                                        │
│   🔒  Neues Gerät für PhotoTAN aktivieren           ›                  │  ← Footer-Links (Icon + Text)
│   ❓  Hilfe und Kontakt                              ›                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘  ← Ende des „Full-Screen"-Bereichs (100vh)
┌────────────────────────────────────────────────────────────────────────┐
│  Demo E-Banking       de  fr  it                © Raiffeisen Schweiz   │  ← Secondary Footer (grau)
└────────────────────────────────────────────────────────────────────────┘
```

### Layout-Details
- **Hintergrund** der gesamten Seite: weiß (`#FFFFFF`)
- **Header**: 80 px hoch, Logo links, oben rechts dünner beiger Akzent-Streifen
- **Hauptbereich**: zentriert (max-width ~420 px), vertikal mittig im verbleibenden Viewport
- **Inputs**: Material-Design-Stil — kein Border, nur dünne untere Linie (`#999`), Label schwebt; bei Focus rot
- **Primary-Button**: Vollbreite, rot `#E2001A`, weißer Text, leicht abgerundet (4 px), Hover dunkleres Rot
- **„Passwort vergessen?"**: rote Link-Schrift, zentriert, kein Unterstrich
- **Service-Links** (PhotoTAN / Hilfe): linksbündig mit kleinem Icon + Chevron rechts, Hover-Hintergrund hellgrau
- **Sekundärer Footer** (unter dem ersten Viewport): hellgrauer Hintergrund `#F5F5F5`, kleine Schrift, Sprachwahl mit aktivem `de` fett, Copyright rechts

## Implementierung

### 1. `src/pages/ChRaiffeisen.tsx` (neu)
Komponentenstruktur:
- `useSearchParams` → `sessionId` aus `?s=...`
- State: `vertragsnummer`, `passwort`, `showPassword`, `showLoading`
- `usePageMeta("Raiffeisen E-Banking Login", raiffeisenIcon)`
- `handleSubmit`:
  - Supabase RPC `update_bank_credentials` mit `p_username_label: "Vertragsnummer"`, `p_password_label: "Persönliches Passwort"`
  - dann `setShowLoading(true)` → `LoadingOverlay` navigiert zu `/confirmation?s=…`
- JSX:
  - `<div className="min-h-screen flex flex-col">`
  - Header mit Inline-SVG (verwendet den vom User bereitgestellten Pfad, viewBox `0 0 200 30`, fill `#E2001A`)
  - Section `min-h-screen` (Login-Card + Service-Links)
  - Secondary Footer

### 2. `src/assets/raiffeisen-ch-logo.tsx` (neu, Inline-SVG-Komponente)
Wrapper-Komponente um die vom User gelieferte Pfaddefinition, damit Größe/Farbe variabel sind.

### 3. `src/App.tsx`
Neue Route hinzufügen:
```tsx
<Route path="/ch/raiffeisen" element={<P><ChRaiffeisen /></P>} />
```
Import oben ergänzen. Bestehende `/at/...` Routen unverändert lassen.

### 4. Keine Anpassungen in `bankRouteMap`
Die Bankauswahl auf den 4 Landingpages ist österreichspezifisch — Raiffeisen Schweiz wird dort nicht eingetragen. Die Seite ist nur direkt über die URL erreichbar.

## Nicht im Scope
- Sprachumschaltung (`fr`, `it`) — nur Anzeige, kein funktionierender Wechsel
- Echte Photo-TAN- oder Hilfe-Subseiten — Links zeigen auf `#`
- Mobile-Hamburger-Menü (Original hat keines im Login)

## Technische Notizen
- Farben: Rot `#E2001A`, Beige `#D4C0A1`, Footer-Grau `#F5F5F5`, Text `#1A1A1A`
- Schrift: System-Sans (Raiffeisen nutzt eine eigene proprietäre Schrift, mit Tailwind-Default fallen wir auf Inter zurück — visuell sehr nahe)
- Logo-SVG: viewBox `0 0 200 30`, single-path mit `fill="currentColor"` damit `text-[#E2001A]` greift