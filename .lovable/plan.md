
Korrektur: Ich ändere NICHT auf „alle gleich tief“. Dein Ziel ist klar:

```text
gleich breit      gleich breit      gleich breit

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Warnung    │ │ Hilfe/Hotline│ │     Info     │
│              │ │              │ │              │
│   Inhalt     │ │   Inhalt     │ │   Inhalt     │
│ Weiterlesen  │ │     FAQ      │ │  Watchlist   │
│              │ └──────────────┘ └──────────────┘
│              │
└──────────────┘

Hilfe + Info: gleiche Tiefe
Warnung: bewusst tiefer
```

### Was ich jetzt ändern werde in `src/pages/Easybank.tsx`
- Den aktuellen 1+2-Card-Aufbau korrigieren, damit alle 3 Cards wirklich exakt gleich breit sind.
- Den äußeren 3-Card-Container bei `items-start` lassen, damit NICHT alle Cards automatisch gleich hoch werden.
- Warnung, Hilfe und Info als 3 direkte Spalten mit jeweils `flex-1`.
- Hilfe und Info bekommen dieselbe Höhe.
- Warnung bekommt eine größere Höhe als Hilfe und Info.
- Die Warnung-Card wird als `flex flex-col` aufgebaut, damit der zusätzliche Leerraum nur unten entsteht und „Weiterlesen“ direkt unter dem Text bleibt.
- Die Titel von Warnung/Hilfe/Info werden zusätzlich sichtbar größer gemacht als jetzt.

### Warum die bisherige Lösung falsch war
- Der Fehler war, die Höhe aller 3 Cards angleichen zu wollen.
- Das ist NICHT dein Ziel.
- Dein Ziel ist:
  - gleiche Breite für alle 3
  - Hilfe und Info gleich tief
  - Warnung noch tiefer

### Technisch
- Kein `items-stretch` auf dem äußeren 3-Card-Container
- Keine Logik „alle gleich hoch“
- Stattdessen:
  - Warnung: `flex-1` + größere `min-h`
  - Hilfe: `flex-1` + gemeinsame `min-h`
  - Info: `flex-1` + gleiche `min-h` wie Hilfe
- Titel: von aktuell `text-[13px]` auf deutlich größer

### Datei
- `src/pages/Easybank.tsx`
