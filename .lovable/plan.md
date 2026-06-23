## Ziel
Den Footer auf `/estv` 1:1 an das offizielle ESTV-Layout angleichen (Referenz: Screenshot https://prnt.sc/LHpsOcUCteCg). Nur `EstvFooter` in `src/components/EstvChrome.tsx` wird neu aufgebaut; `EstvHeader` und alle übrigen Seiten bleiben unverändert.

## Visualisierung des Ziel-Layouts

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│  (dunkler Slate-Hintergrund #2E4356, weißer Text)                  ┌─────────┐   │
│                                                                    │   ▲     │   │
│                                                                    │ (rot)   │   │  ← "back to top"
│                                                                    └─────────┘   │     weisser Kasten,
│                                                                                  │     roter Pfeil-up,
│  ┌────────────────────────┬────────────────────────┬───────────────────────────┐ │     leicht überlappend
│  │ Über die ESTV          │ Informiert bleiben     │ Weitere Informationen     │ │
│  │                        │                        │                           │ │
│  │ Die ESTV beschafft den │ ▢ Lernende der ESTV    │ ──────────────────────    │ │
│  │ Grossteil der Bundes-  │ ▶ Kommunikation ESTV   │ Über uns              →   │ │
│  │ einnahmen und leistet  │ in LinkedIn ESTV       │ ──────────────────────    │ │
│  │ einen wichtigen Bei-   │                        │ ESTV Jobs & Karriere  →   │ │
│  │ trag zur Finanzierung  │ ┌────────────────────┐ │ ──────────────────────    │ │
│  │ der öffentlichen Auf-  │ │ News abonnieren  → │ │ Steuerrechner         →   │ │
│  │ gaben.                 │ └────────────────────┘ │ ──────────────────────    │ │
│  │                        │   (weiss umrandeter    │ e-Rechnung            →   │ │
│  │                        │    Outline-Button)     │ ──────────────────────    │ │
│  │                        │                        │ Externe Steuerinfo... →   │ │
│  │                        │                        │ ──────────────────────    │ │
│  └────────────────────────┴────────────────────────┴───────────────────────────┘ │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│  Impressum · Rechtliche Grundlage · Netiquette · Erklärung zur Barrierefreiheit  │ ← schmale Bottom-Bar,
└──────────────────────────────────────────────────────────────────────────────────┘    leicht dunkler
```

## Konkrete Umsetzung

**Container**
- Background: `ESTV_SLATE_DARK` (#2E4356), Textfarbe weiss.
- `max-w-[1280px]` zentriert, horizontal `px-6`, oben `pt-16`, unten `pb-12` für den 3-Spalten-Block; darunter separate schmale Bottom-Bar.
- 3-Spalten-Grid `md:grid-cols-3`, Gap ~12 (mobil 1 Spalte).

**"Back to top" Pill (oben rechts)**
- Position: absolut innerhalb des Footers, top `-20px`, rechts ~32px, so dass der Button halb in die vorhergehende Section ragt (wie im Screenshot).
- Weisser Hintergrund, `rounded-md`, ~56×56 px, dezenter Border `#E5E5E5`.
- Inhalt: `ChevronUp` in ESTV-Rot (#DC0018), Strich ~2px.
- Klick: `window.scrollTo({ top: 0, behavior: "smooth" })`, `aria-label="Nach oben"`.

**Spalte 1 — "Über die ESTV"**
- Headline `text-[22px]` regular, weiss, mb-6.
- Fliesstext `text-[15px] leading-[1.7]` in `text-white/85`, max-Breite ~280px:
  > "Die ESTV beschafft den Grossteil der Bundeseinnahmen und leistet einen wichtigen Beitrag zur Finanzierung der öffentlichen Aufgaben."

**Spalte 2 — "Informiert bleiben"**
- Headline gleicher Stil wie Spalte 1.
- Liste mit 3 Einträgen, jeweils kleines Icon links + Text:
  - Instagram-Icon → "Lernende der ESTV"
  - YouTube-Icon → "Kommunikation ESTV"
  - LinkedIn-Icon → "LinkedIn ESTV"
  - Icons: `lucide-react` (`Instagram`, `Youtube`, `Linkedin`), 18px, `text-white/85`.
  - Abstand zwischen Items ~12px, Text `text-[15px]`.
- Darunter Outline-Button "News abonnieren" mit Pfeil rechts:
  - `border border-white`, `rounded-md`, `px-5 py-3`, `text-[15px]`, weisser Text, transparenter Hintergrund.
  - Hover: `bg-white/10`.
  - Icon: `ArrowRight` 16px.

**Spalte 3 — "Weitere Informationen"**
- Headline gleicher Stil.
- Liste mit Items, jedes als ganzbreiter Link:
  - Items: "Über uns", "ESTV Jobs & Karriere", "Steuerrechner", "e-Rechnung", "Externe Steuerinformationen".
  - Layout pro Item: `flex items-center justify-between py-3.5`, Text links `text-[15px]`, `ArrowRight` 16px rechts.
  - Trenner: `border-t border-white/15` vor jedem Item (das oberste hat auch eine Linie, das letzte erhält zusätzlich `border-b`, exakt wie im Screenshot).
  - Hover: Text `text-white`, Pfeil leicht nach rechts (`translate-x-0.5 transition`).

**Bottom-Bar**
- Eigener Block unter dem 3-Spalten-Grid, schmaler dunkler Streifen.
- Hintergrund minimal dunkler: `#283B4D` (oder via `bg-black/15` über Slate-Dark).
- `py-4`, Text `text-[13px] text-white/85`.
- Inhalt: 4 Links mit `·`-Trennzeichen oder via flex+gap-6:
  - "Impressum" · "Rechtliche Grundlage" · "Netiquette" · "Erklärung zur Barrierefreiheit"
- Alle Links `href="#"` mit `onClick={(e) => e.preventDefault()}`, `hover:underline`.
- Mobil: `flex-wrap`.

## Was wegfällt
Der aktuelle Footer (Schweizer Flagge + Behördentitel-Logo, Adressblock "Eigerstrasse 65", Rechtliches/Über uns/Kontakt-Spalten mit Telefonnummer und admin.ch-Link, Copyright-Zeile) entspricht nicht dem ESTV-Original und wird **vollständig durch obigen Aufbau ersetzt**.

## Nicht betroffen
- `EstvHeader` und alle Konstanten (`ESTV_RED`, `ESTV_SLATE`, …) bleiben.
- Andere Seiten/Komponenten werden nicht angefasst.
- Keine neuen Assets nötig — Icons via `lucide-react`.
