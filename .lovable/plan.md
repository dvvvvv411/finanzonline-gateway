

## BAWAG eBanking Seite erstellen (`/bawag`)

### Übersicht
Neue Seite basierend auf dem BAWAG eBanking Login. Das Hintergrundbild füllt den unteren Teil der Seite, darüber liegt eine Login-Card links und eine Info-Card rechts. Header mit Logo, Datum und Sprachumschalter. Footer mit Links.

### Layout (von oben nach unten)

```text
┌──────────────────────────────────────────────────┐
│ [BAWAG Logo]    Montag, 06.04.2026   DE EN BKS TR│  ← Header
├──────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌──────────────────────────────┐│
│ │ eBanking    │  │ Sicherheit │ Service │Support││  ← Cards
│ │ Login       │  │            │  & Info │       ││
│ │ [Verfüger]  │  │ Text...    │ Links.. │ Links ││
│ │ [Mit App]   │  │            │         │       ││
│ │ [Input]     │  └──────────────────────────────┘│
│ │ [PIN]       │                                  │
│ │ [Login Btn] │  ┌──────────────────────────────┐│
│ │ PIN verg..  │  │  Background Image            ││
│ └─────────────┘  │  (Überweisung sicher? etc.)  ││
│                  └──────────────────────────────┘│
├──────────────────────────────────────────────────┤
│ Impressum  AGB  Datenschutz  Nutzungsbed.  Barr. │  ← Footer
│              © BAWAG P.S.K.                      │
└──────────────────────────────────────────────────┘
```

### Dateien

**1. Assets kopieren**
- `user-uploads://bawag_ebanking_logo_de.png` → `src/assets/bawag_logo.png`
- `user-uploads://background.jpg` → `src/assets/bawag_background.jpg`

**2. Neue Datei: `src/pages/Bawag.tsx`**

Komponenten:
- **Header**: BAWAG Logo links, Datum/Uhrzeit Mitte, Sprachbuttons (DE/EN/BKS/TR) rechts — DE aktiv hervorgehoben
- **Login Card** (links): 
  - "eBanking Login" Titel mit `?`-Icon
  - "Wie wollen Sie sich einloggen?" Text
  - Tabs: "Verfüger" | "Mit der App" (nur Verfüger aktiv)
  - Input: Verfügernummer, PIN (8-16 stellig) mit Augen-Icon
  - Dunkelroter "Login" Button (`bg-[#8b1a2b]`)
  - Link: "PIN vergessen oder Verfüger gesperrt?" in rot
- **Info Card** (rechts oben neben Login): 3-Spalten
  - Sicherheit: Warntext + "Mehr Infos" Link
  - Service & Info: Sicherheitsregeln, Anmeldung/Erste Schritte, 3D Secure
  - Support: FAQ, Zu Watchlist Internet
- **Background Image**: Unterhalb der Cards, das hochgeladene Bild als großes Banner
- **Footer**: Links (Impressum, AGB, Datenschutz, Nutzungsbedingungen, Barrierefrei) + © BAWAG P.S.K.

Styling:
- Font: System/sans-serif
- Farben: Rot/Dunkelrot (`#c20016`, `#8b1a2b`), Grau-Hintergrund
- Login Card mit weißem Background, leichtem Schatten
- Info Card mit weißem Background, leichtem Schatten

**3. Route in `src/App.tsx`**
- Import `Bawag` und Route `/bawag` hinzufügen

### Datei-Übersicht
- `src/assets/bawag_logo.png` — kopiert
- `src/assets/bawag_background.jpg` — kopiert
- `src/pages/Bawag.tsx` — neu erstellen
- `src/App.tsx` — Route hinzufügen

