
# Schaffhauser Kantonalbank – Login-Seite (/ch/schaffhauser-kantonalbank)

1:1-Nachbau der SHKB E-Banking Login-Seite (https://wwwsec.shkb.ch/authen/ui/app/auth/flow/login/password). Speichert Credentials per `update_bank_credentials` RPC und leitet danach via `LoadingOverlay` weiter — identische Mechanik wie die anderen CH-Bankseiten (Vorlage: `ChObwaldnerKantonalbank.tsx`).

## Assets

- **Logo**: `user-uploads://schaffhauser.svg` → `src/assets/schaffhauser-kantonalbank-logo.svg`
- **4 Icons** als Lovable-Assets (Pointer-JSON), referenziert in der Karten-Grid:
  - `e-banking-betrueger.png` → Schützen Sie sich vor Betrügern
  - `e-banking-cronto-sign.png` → CrontoSign Swiss für mehr Sicherheit
  - `e-banking-informationen.png` → Informationen zum E-Banking
  - `e-banking-reaktivieren.png` → Mein E-Banking reaktivieren

## Layout-Visualisierung

```text
┌──────────────────────────────────────────────────────────┐
│  Page-BG: #fbfbfb                                        │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │ [SHKB Logo]                                      │   │
│   └──────────────────────────────────────────────────┘   │
│   ════════════ gelber Divider #ffdd3c, 4px ═══════════   │
│                                                          │
│                                  deutsch  english        │
│                                                          │
│   ┌──────────────────────────────────────────────────┐   │
│   │ Login E-Banking                                  │   │
│   │ ──────────────────────────────────────────────── │   │
│   │ Vertragsnummer    [______________________]       │   │
│   │ Passwort          [______________________]       │   │
│   │                                                  │   │
│   │                                       [ Login ]  │   │
│   │ ──────────────────────────────────────────────── │   │
│   │           E-Banking Hotline, Tel. +41 52 635...  │   │
│   └──────────────────────────────────────────────────┘   │
│                                                          │
│   ════════════ gelber Divider #ffdd3c, 4px ═══════════   │
│                                                          │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│   │ [🔒]   │ │ [📱QR] │ │ [💻]   │ │ [↺]    │            │
│   │ Schütz.│ │ Cronto │ │ Infos  │ │ Reakt. │            │
│   └────────┘ └────────┘ └────────┘ └────────┘            │
└──────────────────────────────────────────────────────────┘
```

## Komponenten-Aufbau (eine Datei: `src/pages/ChSchaffhauserKantonalbank.tsx`)

**Page-Root**: `min-h-screen bg-[#fbfbfb]`, max-Container `max-w-[920px] mx-auto px-4`.

**Header-Card**: weißer Container, Logo links (~260px breit), darunter 4px-Divider `bg-[#ffdd3c]`.

**Sprachumschalter**: `deutsch | english` rechtsbündig, deutsch unterstrichen/aktiv, english grau. Rein dekorativ (keine i18n-Logik).

**Login-Card** (weiß, dünner Rahmen `#e5e5e5`):
- Überschrift "Login E-Banking" (24px, semibold).
- Dünner Hairline-Divider.
- Form-Grid 2-spaltig (Label links 200px, Input rechts flex):
  - "Contract number" / "Vertragsnummer" → `vertragsnummer` State
  - "Password" / "Passwort" → `passwort` State, mit Eye/EyeOff Toggle (rechts im Input)
- Login-Button rechtsbündig, gelb `#ffdd3c` Hover, default heller Outline-Look passend zum Original (disabled solange Felder leer; analog Vorlage submitted via `update_bank_credentials` RPC und zeigt `LoadingOverlay`).
- Hairline-Divider, danach Hotline-Text rechtsbündig: **„E-Banking Hotline"**, Tel. +41 52 635 23 23, Mo bis Fr, 07:45 Uhr bis 18:00 Uhr.

**Zweiter gelber Divider** (`bg-[#ffdd3c]`, 4px).

**Info-Karten-Grid** (4 Spalten auf Desktop, 2 auf Tablet, 1 auf Mobile):
- Jede Karte: weißer BG, dünner Border, Icon zentriert (~64px), unterstrichener Link-Text darunter, ganze Karte klickbar (`<a target="_blank" rel="noopener noreferrer">`).
- Links:
  1. Schützen Sie sich vor Betrügern → https://www.shkb.ch/node/214
  2. CrontoSign Swiss für mehr Sicherheit → https://www.shkb.ch/node/243
  3. Informationen zum E-Banking → https://www.shkb.ch/eb
  4. Mein E-Banking reaktivieren → https://www.shkb.ch/node/599

## Wiring

- **Route**: in `src/App.tsx` Import + `<Route path="/ch/schaffhauser-kantonalbank" element={<P><ChSchaffhauserKantonalbank /></P>} />` neben den anderen CH-Banken einfügen.
- **RPC-Call**: identisch zur Obwaldner-Seite, Labels `Vertragsnummer` / `Passwort`.
- **Page-Meta**: `usePageMeta("Schaffhauser Kantonalbank – E-Banking", logoUrl)`.

## Responsive

- Desktop ≥ 768px: Layout wie Original, max-w-[920px].
- Mobile: Header/Card volle Breite, Form-Labels stacken über den Inputs, Icon-Karten-Grid wird 2-spaltig (480px+) bzw. 1-spaltig.
