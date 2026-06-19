In `src/pages/ChAppenzellerKantonalbank.tsx`:

**Allgemein (alle Viewports)**
- "Melden Sie sich an, um fortzufahren." — Farbe von rot auf grau `#666`

**Nur Mobile**
- Card-Wrapper (Z.82): mobile keine Border/Radius/Shadow/Top-Margin, full width. Desktop unverändert.
  - Klassen: `w-full md:max-w-[988px] mx-auto mt-0 md:mt-16 bg-white md:shadow-sm md:rounded-lg overflow-hidden md:aspect-[988/700] md:border md:border-[#d9d9d9]`
  - inline `border` entfernen
- Header-Divider (rote Linie unter Logo): mobile 50% rot + 50% grau, desktop bleibt vollrot
  - Header `borderBottom` entfernen
  - Direkt danach: 
    - `<div className="flex h-[3px] md:hidden"><div className="flex-1" style={{backgroundColor: RED}} /><div className="flex-1 bg-[#ddd]" /></div>`
    - `<div className="hidden md:block" style={{height:3, backgroundColor: RED}} />`
- Main padding: `px-4` → `px-0 md:px-4`
- `<h1>Willkommen</h1>`: `text-[26px]` → `text-[22px] md:text-[26px]`
- Abstand zwischen "E-Banking und TWINT sperren" und "Brauchen Sie Hilfe?" auf mobile verkleinern: "Brauchen Sie Hilfe?" `mt-10` → `mt-4 md:mt-10`. Spacer `<div className="flex-1" />` ist nur auf Desktop wirksam (Form ist `flex-col flex-1`); auf mobile wird er trotzdem zu 0 wegen kein freier Höhe — passt. Wir lassen `flex-1` Spacer drin (Desktop schiebt nach unten).
- Footer mobile 2-zeilig, Rechtliche Hinweise zuerst, Copyright darunter, beide zentriert. Desktop bleibt einzeilig zwischen den Enden.
  - `<div className="max-w-[1100px] mx-auto px-8 py-4 text-[13px] flex flex-col items-center gap-1 md:flex-row md:items-center md:justify-between" style={{color:'#fff'}}>`
  - Reihenfolge im JSX: zuerst der `<a>`-Link (Rechtliche Hinweise), dann `<span>` (Copyright). Damit ist mobile die Reihenfolge "Rechtliche Hinweise" → "© ...".
  - Auf Desktop sind sie nebeneinander mit `justify-between`: links Rechtliche Hinweise, rechts Copyright. Falls Desktop-Reihenfolge "© links, Rechtliche rechts" beibehalten werden soll → mobile-only: nutze `flex-col-reverse md:flex-row`. Wähle `flex-col md:flex-row-reverse` damit auf Desktop Copyright links/Rechtliche rechts (Originalverhalten erhalten? Original war: Copyright links, Rechtliche rechts).
  - Endgültig: JSX-Reihenfolge: `<a>Rechtliche</a>` dann `<span>©</span>`; Klasse `flex flex-col items-center gap-1 md:flex-row md:justify-between md:flex-row-reverse`. → Mobile: Rechtliche oben, Copyright unten. Desktop: Copyright links, Rechtliche rechts (wie vorher).