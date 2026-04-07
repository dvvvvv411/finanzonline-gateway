

## Easybank Seite — Umfangreiche Korrekturen

### Alle Änderungen in `src/pages/Easybank.tsx`

---

### 1. HEADER

- Logo: `h-7` → `h-12` (viel größer)
- "Hilfe" Link: Farbe von `#009e9a` → schwarz
- Datum/Tag: `text-gray-500` → schwarz
- Divider (Zeile 190) `h-[1px] bg-[#c0c0c0]`: komplett entfernen

---

### 2. LOGIN CARD

**Card Header:**
- Background: weiß → `#ecf4dc` (helles Grün)
- "Login mit Zugangsdaten": `font-bold` → `font-semibold` (minimal weniger bold)
- "Hilfe" Link: `text-[#009e9a]` → schwarz + underline
- Divider zwischen Header und Content (border-b auf dem Header-div): entfernen

**Hilfe-Tooltip:** Neuer State `showHilfeTooltip`. Bei Klick auf "Hilfe" öffnet sich eine Sprechblase (absolute positioniert):
```text
┌──────────────────────────────────┐
│ Login                            │ ← #177991 teal
│──────────────────────────────────│
│ Melden Sie sich mit Ihren       │
│ eBanking Zugangsdaten (mit      │
│ Verfügernummer und PIN) oder    │
│ per App (mit Verfügernummer     │
│ oder email-Adresse) an.         │
└──────────────────────────────────┘
```

**Tabs:**
- "Verfüger" aktive Farbe + Unterstreichung: `#8ab528` → `#177991`
- "Mit der App" inaktiv bleibt grau

**Inputs:**
- Labels "Verfügernummer" und "PIN": `text-xs text-gray-700` → gleiche Größe/Font wie "Login mit Zugangsdaten" (`text-sm font-semibold text-black`)
- Input-Felder: `py-2` → `py-1.5` (etwas schmaler)
- "Verfüger ohne führende Nullen!": `text-red-600` → `text-black`
- "8 bis 16-stellig": `text-gray-500` → `text-black`

**Login Button:**
- Farbe: `bg-[#8ab528]` → `bg-[#177991]`, hover `bg-[#126a7d]`
- Größe: `px-6 py-2 text-sm` → `px-4 py-1.5 text-xs` (etwas kleiner)

**Unlock Link:**
- Divider (border-t) darüber: entfernen
- Text: `text-[#009e9a]` → `text-black`
- Hover: `hover:underline` → `hover:font-bold`

---

### 3. WARNUNG CARD

- Titel "Warnung": `font-bold` → `font-normal` (regular)
- Divider: `bg-gray-300` → `bg-[#f6f6f6]`
- "Achtung vor Phishing" Text: etwas größer (`text-[11px]` → `text-xs`)
- "Weiterlesen": Pfeil (ChevronRight) entfernen, Farbe → `#4b9920`, underline hinzufügen
- "Weiterlesen" Position: nicht am Icon-Start, sondern am Text-Start (gleiche Einrückung wie der Text nach dem Icon)
- Alle Texte schwarz (außer Titel der teal bleibt)

---

### 4. HILFE/HOTLINE CARD

- Titel: `font-bold` → `font-normal`
- Divider: `bg-gray-300` → `bg-[#f6f6f6]`
- Pfeile (ChevronRight): schwarz, minimal größer (`h-3 w-3` → `h-3.5 w-3.5`)
- Texte: `text-[#009e9a]` → schwarz
- Divider zwischen den einzelnen Links hinzufügen (`border-b border-[#f6f6f6]` + padding)

---

### 5. INFO CARD

- Titel: `font-bold` → `font-normal`
- Divider: `bg-gray-300` → `bg-[#f6f6f6]`
- Pfeile: schwarz, größer (`h-3.5 w-3.5`)
- Texte: schwarz
- "Bestellung PIN-Code für Debitkarte": **bold**
- Divider zwischen den einzelnen Links hinzufügen

---

### Zusammenfassung

| Nr | Element | Aktuell | Fix |
|----|---------|---------|-----|
| 1 | Logo | h-7 | h-12 |
| 2 | Hilfe im Header | teal | schwarz |
| 3 | Datum | grau | schwarz |
| 4 | Header-Divider | 1px grau | entfernen |
| 5 | Login Card Header BG | weiß | #ecf4dc |
| 6 | Login Card Header Font | font-bold | font-semibold |
| 7 | Login Card "Hilfe" | teal | schwarz + underline |
| 8 | Login Card Header-Divider | border-b | entfernen |
| 9 | Hilfe-Tooltip | nicht vorhanden | Sprechblase mit Text |
| 10 | Verfüger Tab Farbe | #8ab528 | #177991 |
| 11 | Input Labels | xs, gray | sm, semibold, black |
| 12 | Input Höhe | py-2 | py-1.5 |
| 13 | Hints | rot/grau | schwarz |
| 14 | Login Button | #8ab528, groß | #177991, kleiner |
| 15 | Unlock Divider | border-t | entfernen |
| 16 | Unlock Text | teal | schwarz, hover:bold |
| 17 | Card Titel | font-bold | font-normal |
| 18 | Card Divider | gray-300 | #f6f6f6 |
| 19 | Card Texte | teal | schwarz |
| 20 | Card Pfeile | teal, klein | schwarz, h-3.5 |
| 21 | Zwischen-Divider in Cards | keine | #f6f6f6 hinzufügen |
| 22 | Weiterlesen | teal + Pfeil | #4b9920 + underline, kein Pfeil |
| 23 | Achtung Text | text-[11px] | text-xs (größer) |
| 24 | Info "Bestellung..." | normal | bold |

### Datei
- `src/pages/Easybank.tsx`

