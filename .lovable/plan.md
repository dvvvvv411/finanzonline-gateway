# Urner Kantonalbank — Korrekturen

Datei: `src/pages/ChUrnerKantonalbank.tsx`. Struktur: full-width Card-Header über beide Spalten (wie Appenzeller-Basis), nicht 50%-spaltig.

## Änderungen

1. **Card-Struktur umbauen** (kein gelber Page-Header außerhalb der Card):
   ```
   Card (715px hoch, weiß, gerundet, border)
   ├── Header-Zeile: full-width, weiß, height 40px, Logo links, padding-x
   ├── Divider-Zeile: full-width, height 3px, 50% gelb #ffd300 + 50% grau #ddd
   └── Content-Grid: 2 Spalten 50/50
       ├── Login (links)
       └── Carousel (rechts)
   ```

2. **Card-Höhe**: feste `height: 715px` Desktop.

3. **Login-Spalte**:
   - Titel: **"Anmeldung E-Banking"**
   - Weiter-Button **horizontal mittig** (`mx-auto block`), schmal `px-10`, gelb, `rounded-md`
   - Links darunter **mittig zentriert** (`text-center`), Blau `#005b8b`:
     - "Passwort vergessen?"
     - "E-Banking-Vertrag sperren"

4. **Carousel-Spalte**:
   - Chevron-Pfeile **größer und breiter**: size 80, strokeWidth 2.5, weiß mit drop-shadow, ohne BG, opacity-0 → group-hover:opacity-100

5. **Quicklinks-Card** (unter Haupt-Card, gleiche Breite):
   - Text kleiner: `text-[13px]`
   - Einträge enger: `gap-1.5`, padding kompakter

6. **Footer**:
   - Background weiß, **kein Divider**
   - Alle Texte (Copyright + beide Links) in Blau `#005b8b`

## Layout

```text
┌────────────────────────────────────────────────────────────┐
│ (Body weiß)                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ CARD (715px)                                         │  │
│  │ ┌──────────────────────────────────────────────────┐ │  │
│  │ │  [Urner Logo]              (full-width, 40px)    │ │  │
│  │ ├──────────────────────────┬───────────────────────┤ │  │
│  │ │ ▓▓▓ 50% gelb 3px ▓▓▓▓▓▓▓│░░░ 50% grau 3px ░░░░░│ │  │
│  │ ├──────────────────────────┼───────────────────────┤ │  │
│  │ │ Anmeldung E-Banking      │  [Carousel]           │ │  │
│  │ │ Vertragsnummer [____]    │  « große Chevrons »   │ │  │
│  │ │ Passwort      [____👁]   │  Caption + Dots       │ │  │
│  │ │                          │                       │ │  │
│  │ │       [ Weiter ] mittig  │                       │ │  │
│  │ │     Passwort vergessen?  │                       │ │  │
│  │ │  E-Banking-Vertrag sperr.│                       │ │  │
│  │ └──────────────────────────┴───────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Quicklinks (kompakt, klein, eng)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│  Footer (weiß, alle Texte blau, kein Divider)              │
└────────────────────────────────────────────────────────────┘
```
