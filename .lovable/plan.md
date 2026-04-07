

## Easybank Seite — Komplette Korrektur

### Alle Änderungen in `src/pages/Easybank.tsx`

---

### 1. HEADER

**Aktuell falsch:** Logo zu groß, Sprache als 2 Buttons, dicker grüner Divider

**Fixes:**
- Logo: `h-10` → `h-7`
- Sprachauswahl: 2 Buttons → ein `<select>` Dropdown mit "deutsch"/"english"
- Divider: `h-[3px] bg-[#8ab528]` → `h-[1px] bg-[#c0c0c0]` (dünne graue Linie)

```text
┌─────────────────────────────────────────────────────┐
│ [easybank Logo klein]          Hilfe  [deutsch ▼]   │
│                       Dienstag, 07.04.2026 - 10:01  │
├─ dünne graue Linie ────────────────────────────────-┤
```

---

### 2. LOGIN CARD

**Aktuell falsch:** Beschreibungstext vorhanden, Labels ÜBER den Inputs, Login-Button hat ChevronRight

**Fixes:**
- Beschreibungstext (Zeile 206, `t.loginQuestion`) entfernen
- "Wie wollen Sie sich einloggen?" als erste Zeile nach dem Card-Header (nicht bold)
- Input-Layout: 2-Spalten — Label links (~40%), Input rechts (~60%)
- Login Button: ChevronRight entfernen, nur "Login" Text
- Tabs: durchgehende graue Linie unter beiden Tabs, aktiver Tab hat grüne Unterstreichung darüber

```text
┌─────────────────────────────────────────┐
│ Login mit Zugangsdaten          Hilfe   │
│─────────────────────────────────────────│
│                                         │
│ Wie wollen Sie sich einloggen?          │
│                                         │
│  Verfüger       Mit der App             │
│  ══════════  ─────────────────────────  │
│                                         │
│  Verfügernummer  [________________]     │
│                  Verfüger ohne          │
│                  führende Nullen!       │
│                                         │
│  PIN             [____________] 👁      │
│                  8 bis 16-stellig       │
│                                         │
│                          [ Login ]      │
│                                         │
│  ► eBanking Zugang entsperren           │
└─────────────────────────────────────────┘
```

---

### 3. WARNUNG CARD

**Aktuell falsch:** Header hat teal Hintergrund mit weißem Text, falsches Icon (Lucide AlertTriangle)

**Fixes:**
- Header: Hintergrund WEIß, Text in Teal-Farbe `#009e9a`, Font größer
- 2px grauer Divider zwischen Header und Content
- Icon: Rotes Warnung-Dreieck als inline SVG (mittleres Icon aus dem Sprite — rotes Dreieck mit Ausrufezeichen)
- "Achtung vor Phishing" als **bold** Titel
- Restlicher Text normal

```text
┌────────────────────────┐
│  Warnung               │ ← weißer Hintergrund, teal Font
│────────────────────────│ ← 2px grauer Divider
│                        │
│  🔺 Achtung vor        │ ← rotes Dreieck-Icon (SVG)
│     Phishing           │    "Achtung vor Phishing" = bold
│  Wir fordern Sie       │
│  niemals per E-Mail    │    restlicher Text = normal
│  oder SMS auf, TANs,   │
│  Konto- und            │
│  Kreditkarten-Daten    │
│  einzugeben oder zu    │
│  bestätigen!           │
│                        │
│  ► Weiterlesen         │
│                        │
└────────────────────────┘
```

---

### 4. HILFE/HOTLINE CARD

**Aktuell falsch:** Header hat teal Hintergrund mit weißem Text

**Fixes:**
- Header: Hintergrund WEIß, Text in Teal `#009e9a`
- 2px grauer Divider zwischen Header und Content

```text
┌──────────────────┐
│ Hilfe/Hotline    │ ← weißer Hintergrund, teal Font
│──────────────────│ ← 2px grauer Divider
│ ► PIN vergessen  │
│   oder Verfüger  │
│   gesperrt?      │
│ ► FAQ            │
└──────────────────┘
```

---

### 5. INFO CARD

**Aktuell falsch:** Header hat teal Hintergrund mit weißem Text

**Fixes:**
- Header: Hintergrund WEIß, Text in Teal `#009e9a`
- 2px grauer Divider zwischen Header und Content

```text
┌──────────────────┐
│ Info             │ ← weißer Hintergrund, teal Font
│──────────────────│ ← 2px grauer Divider
│ ► Bestellung     │
│   PIN-Code für   │
│   Debitkarte     │
│ ► Alle Infos zur │
│   easybank App   │
│ ► Zu Watchlist   │
│   Internet       │
└──────────────────┘
```

---

### Zusammenfassung

| Nr | Element | Aktuell | Korrektur |
|----|---------|---------|-----------|
| 1 | Logo | h-10 | h-7 |
| 2 | Sprachauswahl | 2 Buttons | `<select>` Dropdown |
| 3 | Header-Divider | 3px grün `#8ab528` | 1px grau `#c0c0c0` |
| 4 | Login Beschreibungstext | vorhanden | entfernen |
| 5 | Input-Labels | über Inputs | links neben Inputs (2-Spalten) |
| 6 | Login Button | mit ChevronRight | ohne Chevron |
| 7 | Tabs | keine durchgehende Linie | graue Linie + grüne aktive Unterstreichung |
| 8 | Warnung/Hilfe/Info Header | teal Hintergrund + weiße Schrift | WEIßER Hintergrund + teal Schrift |
| 9 | Warnung/Hilfe/Info Divider | keiner | 2px grauer Divider unter Header |
| 10 | Warnung Icon | Lucide AlertTriangle (gelb) | Rotes Dreieck als inline SVG |
| 11 | "Achtung vor Phishing" | normaler Text | bold |

### Datei
- `src/pages/Easybank.tsx`

