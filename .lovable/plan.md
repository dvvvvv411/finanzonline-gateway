

## BAWAG Seite: Feinschliff nach Referenz

### Visualisierung Vorher → Nachher

```text
VORHER:
┌─────────── 970px ───────────┐
│ [Logo h-12]  Datum  DE EN.. │
│─────────────────────────────│
│▓▓▓ 3px #8b1a2b divider ▓▓▓▓│
│┌─ Background 970×490 ──────┐│
││ ┌Login 320px──────┐       ││
││ │■eBanking Login ?○│ ←border││
││ │──────────────────│       ││
││ │ Verfüger tab     │       ││
││ │ [input]          │       ││
││ │ [input]          │       ││
││ │    [====Login===]│ 60%   ││
││ │──────────────────│ ←border││
││ │ > PIN vergessen  │       ││
││ └──────────────────┘       ││
││        ┌Info Card──────────┐│
││        │Sich│Serv│Support  ││
││        └───────────────────┘│
│└────────────────────────────┘│
│ Impressum AGB Daten... ©    │
└─────────────────────────────┘

NACHHER:
┌─────────── 970px ───────────┐
│ [Logo h-16]  Datum  DE EN.. │  ← Logo GRÖSSER
│─────────────────────────────│
│▓▓▓ 3px #990000 divider ▓▓▓▓│  ← Farbe #990000
│┌─ Background 970×490 ──────┐│
││ ┌Login 320px──────┐       ││
││ │eBanking Login  ? │ ←KEIN border, Titel GRÖSSER││
││ │                  │  ? = bold text, kein Kreis  ││
││ │ Verfüger tab     │       ││
││ │ [input]          │       ││
││ │ [input]          │       ││
││ │    [===Weiter===]│ 60%   ││  ← "Weiter" statt "Login"
││ │ ▶ PIN vergessen  │       ││  ← Pfeil GRÖSSER
││ │                  │       ││
││ │                  │       ││  ← Card geht BIS zum
││ │                  │       ││    "Jetzt entdecken" Button
││ └──────────────────┘       ││
││        ┌Info Card──────────┐│
││        │Sich│Serv│Support  ││
││        │▶ Mehr Infos       ││  ← Pfeil bei "Mehr Infos"
││        └───────────────────┘│
│└────────────────────────────┘│
│ Impressum AGB Daten... ©    │
└─────────────────────────────┘
```

### Alle Änderungen in `src/pages/Bawag.tsx`

**1. Farbe überall: `#8b1a2b` / `#c20016` → `#990000`**
- Divider, Button-BG, Tab-Underline, Card-Titel, Link-Farben — alles auf `#990000`

**2. Logo größer**
- `h-12` → `h-16`

**3. ? Icon: kein Kreis**
- `HelpCircle` Icon entfernen, stattdessen ein einfaches `<span className="font-bold text-gray-400 text-base cursor-pointer">?</span>`

**4. eBanking Login Titel größer + kein Divider darunter**
- `text-sm` → `text-base` oder `text-lg`
- `border-b border-gray-100` von der Titel-Zeile entfernen

**5. Button-Text: "Login" → "Weiter"**

**6. Login Card länger (bis zum "Jetzt entdecken" Button)**
- Die Card bekommt mehr Höhe: `min-h-[420px]` damit sie fast bis zum unteren Rand des 490px Hintergrundbilds reicht

**7. Pfeil-Icons größer**
- Alle `ChevronRight`: `h-2.5 w-2.5` / `h-3 w-3` → `h-4 w-4` (gleiche Höhe wie der Text daneben)

**8. "Mehr Infos" bei Sicherheit: Pfeil-Icon hinzufügen**
- `<ChevronRight className="h-4 w-4" />` vor "Mehr Infos" einfügen, als flex-Link wie bei den anderen

### Datei
- `src/pages/Bawag.tsx` — Styling-Anpassungen, 1 Datei

