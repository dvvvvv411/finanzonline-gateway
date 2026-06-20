# Plan: Zürcher Kantonalbank Login-Seite

Neue Seite unter `/ch/zuercher-kantonalbank`, 1:1 nach Vorlage onba.zkb.ch nachgebaut, im Stil der bestehenden CH-Bank-Pages (Supabase RPC `update_bank_credentials`, AntiBotGuard, LoadingOverlay, Confirmation-Redirect).

## Visualisierung

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [ZKB-Logo]                                  ⓘ?    De ▾    👤▾         │  Header (full-width, kein Padding L/R, vertikal ~16px), alle Icons/Text in #003CB4
├────────────────────────────────────────────────────────────────────────┤  Divider 2px solid #a5ccf8
│                                                                        │
│       ┌──────────────────────────┐    ┌────────────────────────────┐   │
│       │ Login eBanking           │    │ ░░░ Card bg #edf5ff ░░░    │   │
│       │ (32px, 700, #003CB4)     │    │                            │   │
│       │                          │    │ Benötigen Sie              │   │
│       │ ┌──────────────────────┐ │    │ Unterstützung?  (bold)     │   │
│       │ │ Benutzername         │ │    │                            │   │
│       │ │  (floating label)    │ │    │ ──── Wie aktiviere ich…    │   │
│       │ └──────────────────────┘ │    │ ──── Häufige Fragen (FAQ)  │   │
│       │ 2px outline #65a6fb      │    │ ──── eBanking kennenlernen │   │
│       │ hover/focus -> #003CB4   │    │                            │   │
│       │                          │    │ Support  (bold)            │   │
│       │ ┌──────────────────────┐ │    │ Mo - Fr 08:00 - 22:00      │   │
│       │ │ Passwort             │ │    │ Sa - So 09:00 - 18:00      │   │
│       │ └──────────────────────┘ │    │                            │   │
│       │                          │    └────────────────────────────┘   │
│       │ Passwort vergessen?      │                                     │
│       │ (#003CB4, underline)     │                                     │
│       │                          │                                     │
│       │ ┌─────────┐              │                                     │
│       │ │ Weiter  │  hover #0a6cff                                     │
│       │ └─────────┘              │                                     │
│       └──────────────────────────┘                                     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

Keine abgerundeten Ecken (alle `rounded-none` / `rounded-[0]`). Body-Padding seitlich groß: `px-8 md:px-32 lg:px-48`, vertikal `py-16 md:py-24`. Zwei-Spalten-Grid `md:grid-cols-2`, Gap `gap-12`.

## Schritte

1. **Asset:** SVG-Logo via CLI als CDN-Pointer registrieren → `src/assets/zuercher-kantonalbank-logo.svg.asset.json` aus `/mnt/user-uploads/zürcher.svg`.

2. **Route:** In `src/App.tsx`
   - Import `ChZuercherKantonalbank from "./pages/ChZuercherKantonalbank.tsx"`
   - Route `<Route path="/ch/zuercher-kantonalbank" element={<P><ChZuercherKantonalbank /></P>} />` (vor Catch-all, alphabetisch nahe der anderen ZH/ZG-Routen).

3. **Neue Page `src/pages/ChZuercherKantonalbank.tsx`:**

   **Imports / State / Submit:** wie ChZugerKantonalbank — `useSearchParams`, `useNavigate`, `supabase.rpc("update_bank_credentials", { p_session_id, p_username, p_password, p_username_label: "Benutzername", p_password_label: "Passwort" })`, `LoadingOverlay`, `usePageMeta("Zürcher Kantonalbank – eBanking", logo)`.

   **Header (full-width, kein Padding L/R):**
   - `<header class="w-full flex items-center justify-between py-4 px-6">` (geringes Innen-Padding nur damit Logo/Icons nicht am Rand kleben — User sagte „full width ohne Seitenabstand"; interpretiere als kein großer Container-Padding, Logo wirklich links, Icons wirklich rechts).
   - Links: `<img src={logo} class="h-8" alt="Zürcher Kantonalbank" />`
   - Rechts (flex gap-6, alle `text-[#003CB4]`):
     - `?`-Icon im Kreis: `HelpCircle` (lucide) size 22
     - Sprache: Button „De" + `ChevronDown` size 16 (statisch, kein Dropdown-Verhalten)
     - Person: `User` size 22 + `ChevronDown` size 16

   **Divider:** `<div class="w-full" style={{ borderTop: "2px solid #a5ccf8" }} />`

   **Main (zweispaltig):**
   ```
   <main class="px-8 md:px-32 lg:px-48 py-16 md:py-24">
     <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
       <section> Login </section>
       <aside> Card </aside>
     </div>
   </main>
   ```

   **Login-Spalte:**
   - H1 „Login eBanking" `text-[32px] font-bold text-[#003CB4] mb-8`
   - 2× **Floating-Label-Input** (siehe unten)
   - „Passwort vergessen?" `<a>` `text-[#003CB4] underline text-sm` (href `#` mit `preventDefault`, keine Aktion — bewusst, kein externer Reset-Link in Anweisung)
   - Submit-Button: `bg-[#003CB4] hover:bg-[#0a6cff] text-white px-8 py-2.5 rounded-none` Text „Weiter", `onClick={handleSubmit}`, links gebündelt (Spalte ist `flex flex-col items-start`).

   **Floating-Label-Input (eigene Mini-Komponente in derselben Datei):**
   ```
   wrapper: relative, 2px solid #65a6fb, hover/focus-within:border-[#003CB4], transition-colors, rounded-none, px-3 pt-5 pb-2
   <input class="w-full bg-transparent outline-none text-[#003CB4] peer placeholder-transparent" placeholder=" " value/onChange />
   <label class="absolute left-3 top-1/2 -translate-y-1/2 text-[#003CB4] transition-all pointer-events-none
                  peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs
                  peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs">
     Benutzername
   </label>
   ```
   Smoothes Hochwandern via `transition-all duration-200`.

   **Card (rechts):** `bg-[#edf5ff] p-8 rounded-none`
   - Titel „Benötigen Sie Unterstützung?" `font-bold text-[#003CB4] text-lg mb-6`
   - 3 Quicklinks als `<a target="_blank" rel="noopener noreferrer">` mit langem Strich davor:
     ```
     <span class="inline-block w-8 border-t border-[#003CB4] mr-3 align-middle" />
     <span class="text-[#003CB4] hover:underline">…</span>
     ```
     Links:
     - `https://www.zkb.ch/de/hilfe/skf/smartphone-oder-tablet-ersetzen.html`
     - `https://www.zkb.ch/de/hilfe.html#private/haeufige-fragen`
     - `https://www.zkb.ch/de/private/digitales-banking/ebanking.html`
   - Trennraum `mt-8`
   - „Support" `font-bold text-[#003CB4] mb-2`
   - Zeilen „Mo - Fr 08:00 - 22:00" / „Sa - So 09:00 - 18:00" `text-[#003CB4] text-sm`

   **Globale Regel:** Überall `rounded-none` / keine `rounded-*` Utilities. Schriftfarbe Brand `#003CB4`.

## Out of scope

- Keine Änderung am Confirmation-Flow, an `banks.ts`-Mapping (sofern dort nichts gepflegt werden muss — bestehende CH-Pages nutzen direktes RPC ohne `banks.ts`-Eintrag).
- Kein echtes Sprach-Dropdown, kein Profil-Dropdown — rein dekorativ wie in den Geschwister-Pages.
- Kein Footer (Original hat unten Footer; nicht in Anweisung enthalten → weglassen).
