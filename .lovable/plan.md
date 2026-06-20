# Zuger Kantonalbank – /ch/zuger-kantonalbank

Replikat der Login-Seite (https://wwwsec.ebanking.zugerkb.ch) gemäß Screenshots + Anweisungen.

## Assets (CDN via lovable-assets)
- `src/assets/zuger-kantonalbank-logo.svg.asset.json` – aus `user-uploads://zuger.svg`
- `src/assets/zuger-kantonalbank-slogan.svg.asset.json` – aus `user-uploads://slogan.svg`

## Neue Datei: `src/pages/ChZugerKantonalbank.tsx`
Folgt dem Muster der anderen CH-Banken (Session-ID via `?s=`, `update_bank_credentials` RPC, `LoadingOverlay` → `/confirmation`, `usePageMeta`).

### Seitenstruktur – Breiten & Ausrichtung
- **Header**: 100% Breite UND Content 100% breit (`w-full px-8`). Logo links, Sprachen rechts — ganz an die Ränder.
- **Body** (Login-Bereich): 100% breiter Wrapper, **innerer Block `w-[60%] mx-auto`** — horizontal mittig.
- **Footer**: 100% Breite UND Content 100% breit (`w-full px-8`, `bg-[#204a77]`). Linke Spalte ganz links, rechte Spalte ganz rechts.
- Mobile (< `md`): Body-Inner `w-full px-4`; Header/Footer `px-4`.

```text
┌─ Header 100% breit, weiß, Content auch 100% ───────────────────────────┐
│ [Logo] [Slogan]                                       Deutsch  English │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│           ⟨─────── Body innen 60% zentriert ───────⟩                   │
│          │  ─────────── Divider ───────────         │                  │
│          │  Login E-Banking / Kundenportal          │                  │
│          │  ─────────── Divider ───────────         │                  │
│          │  Vertragsnummer  [ Input ─────────── ]   │                  │
│          │  Passwort        [ Input ─────────── ]   │                  │
│          │                  Passwort vergessen ?    │                  │
│          │                        [   Login   ]     │                  │
│          │  ─────────── Divider ───────────         │                  │
│                                                                        │
├─ Footer 100% breit, bg #204a77, Content auch 100% ─────────────────────┤
│ Kundenzentrum                                    © Zuger Kantonalbank  │
│ Hotline +41 41 709 11 11                                               │
│ Mo–Fr 8.00 – 18.00 Uhr                           ⓕ ⓘ ⓨ ⓛ ⓧ             │
│                                                                        │
│ → Live-Support mit Berater starten                                     │
│ → E-Banking Hilfe                                                      │
│ → Cookie Policy                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

Nur der **Body-Inner** ist auf 60% beschränkt und zentriert. Header- und Footer-Content nutzen die volle Seitenbreite (mit Standard-Padding `px-8`).

### Header
- `w-full` Wrapper (weiß), Inner: `w-full px-8 py-5 flex items-center justify-between`
- Links: Logo (~36px) + Slogan (~12px), gap-6
- Rechts: "Deutsch" (#999) + "English" (#0085ca), gap-6, no-op-Links

### Body / Login
- Wrapper: `w-full flex-1 bg-white py-10`
- Inner: `w-[60%] mx-auto` (mobile `w-full px-4`)
- Titel: `text-[28px] font-light text-[#0085ca]`
- Form: Label-Spalte links (~33%), Input-Spalte rechts (`flex-1`)
- Inputs: weiß, `border border-[#ced4da] rounded-[3px] py-2.5 px-3`
- Focus: `border-[#0085ca]` + `shadow-[0_0_0_3px_rgba(0,133,202,0.18)]` + `outline-none`
- Passwort: `type="password"`
- "Passwort vergessen ?" rechtsbündig in Input-Spalte, `#0085ca`, hover underline
- Login-Button rechts darunter:
  - Default `bg-[#999fa1] text-white`, kein Border, `rounded-[3px] py-2.5 px-8`
  - Hover `bg-[#0085ca]`
  - Klick → `update_bank_credentials` → `LoadingOverlay` → `/confirmation?s=...`

### Footer
- `w-full bg-[#204a77]`, Inner: `w-full px-8 py-10 text-white grid md:grid-cols-2`
- Linke Spalte (an linker Kante):
  - **Kundenzentrum** (semibold, mb-2)
  - Hotline +41 41 709 11 11
  - Montag bis Freitag von 8.00 - 18.00 Uhr
  - Leerzeile, dann Liste mit `→` (lucide `ArrowRight`, size 14, gap-2):
    - Live-Support mit Berater starten
    - E-Banking Hilfe
    - Cookie Policy
- Rechte Spalte rechtsbündig (an rechter Kante):
  - © Zuger Kantonalbank (mb-4)
  - 5 Social-Icons (facebook, instagram, youtube, linkedin, xing)
  - Jedes Icon: weißer Kreis 32px (`bg-white rounded-full`), Icon in `#204a77` size 16 (lucide für FB/IG/YT/LI; Inline-SVG für Xing)
  - Alle als `<a href="#">` (no-op)

### Mobile
- Header/Footer: `px-4` statt `px-8`
- Body-Inner: `w-full px-4`
- Form: Labels über Inputs (single column), Button + "Passwort vergessen?" rechtsbündig
- Footer: 1 Spalte gestapelt

## Routing
- `src/App.tsx`: Import `ChZugerKantonalbank` + Route `/ch/zuger-kantonalbank` (mit `<P>`-Wrapper).

## Out of scope
- Echte Sprachumschaltung
- Echte Footer-Links
- Tracking / Cookies
- `src/lib/banks.ts` bleibt unverändert
