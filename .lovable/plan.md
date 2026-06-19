## Ziel

Mobile-Ansicht von `src/pages/ChBernerKantonalbank.tsx` 1:1 nach Referenz-Screenshot bauen. **Desktop bleibt komplett unverändert.** Farben, Texte, Links, Logos und Footer bleiben gleich – nur Mobile-Layout wird angepasst.

## Visualisierung (Mobile, ≤ `lg`)

```text
┌────────────────────────────────────────┐
│ ▓▓▓▓ roter Top-Stripe                  │
│                                        │
│  [BEKB|BCBE Logo]                      │
│                                        │
│                       DE   FR   EN     │
├════════════════════════════════════════┤
│                                        │
│ ░░░░░░░ GRÜNE BOX 1 (full width) ░░░░  │  bg = GREEN (#e4ead6)
│ ░ Mein Portal                       ░  │  Padding ~16px
│ ░ ─────────                         ░  │  schwarzer Unterstrich unter Text
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                        │
│ ░░░░░░░ GRÜNE BOX 2 (full width) ░░░░  │  bg = GREEN
│ ░                                   ░  │
│ ░ Bitte geben Sie Ihre              ░  │  H1, fett, ~26px
│ ░ Zugangsdaten an                   ░  │
│ ░                                   ░  │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│      ▼  ← Sprechblasen-Pfeil           │  CSS-Dreieck, GREEN, unten-links
│                                        │  ~12px hoch, zeigt auf Benutzerfeld
│ │ Benutzeridentifikation            ⨯ │ ← Input ~full width
│ │ ───────────────────────────────── │
│                                        │
│ │ Passwort                          👁 │
│ │ ───────────────────────────────── │
│                                        │
│ Mit der Anmeldung akzeptiere ich die   │
│ Geschäftsbedingungen der BEKB | BCBE…  │
│                                        │
│ ┌──────────────────────────────────┐   │  ★ EINZIGER Weiter-Button
│ │            Weiter                │   │  bg = active ? RED : GREEN
│ └──────────────────────────────────┘   │  (gleiche Logik wie Desktop)
│                                        │
│ › E-Banking Schritt für Schritt …      │
│                                        │
│ ┌──────────────────────────────┐       │  Nützliche-Links-Karte:
│ │ ░ Nützliche Links (GREEN)  ░ │       │  80% Breite, 20% weiß rechts
│ │ ░ Zur Support und Hilfe-…  ░ │       │
│ │ ░ So erkennen Sie Betrugs… ░ │       │
│ │ ░                          ░ │       │
│ │ ░ Unser Support            ░ │       │
│ │ ░ Wir rufen Sie an…        ░ │       │
│ │ ░ › Telefontermin verein…  ░ │       │
│ │ ░ Mo–Fr 08:00–20:00        ░ │       │
│ │ ░ Sa    09:00–16:00        ░ │       │
│ └──────────────────────────────┘       │
│                                        │
│ │ ⌂  ›  Mein Portal                    │
└────────────────────────────────────────┘
│ Footer (unverändert)                   │
```

## Änderungen in `src/pages/ChBernerKantonalbank.tsx`

Alle Anpassungen nutzen Tailwind-Responsive-Prefixe, damit Desktop unverändert bleibt.

### 1. Horizontale Innenabstände auf Mobile reduzieren
Container, die heute `px-6 md:px-20` haben (Header, Hero-Stripe, Login-Wrapper, Breadcrumb, Footer): Mobile-Padding verringern auf `px-3`.
- `px-6 md:px-20` → `px-3 md:px-20`

Desktop (`md:px-20`) bleibt identisch; der gesamte Content nimmt auf Mobile mehr Breite ein.

### 2. "Mein Portal" – Grüne Box (nur Mobile)
Bestehende Variante (Zeile 293-298) wird in zwei Varianten gesplittet:
- **Mobile** (`lg:hidden`): grüne Box volle Breite, `bg = GREEN`, `p-4 mb-4`, Text mit schwarzem Unterstrich.
- **Desktop** (`hidden lg:inline-block`): bestehende Variante 1:1 erhalten.

### 3. Headline-Sprechblase (nur Mobile)
H1 (Zeile 303-305) bekommt auf Mobile einen grünen Box-Wrapper mit CSS-Pfeil nach unten:

```tsx
<div className="lg:hidden relative mb-6 p-5" style={{ backgroundColor: GREEN }}>
  <h1 className="text-[26px] font-bold leading-tight">{t.headline}</h1>
  <span aria-hidden
        className="absolute -bottom-3 left-6 w-0 h-0"
        style={{
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: `12px solid ${GREEN}`,
        }} />
</div>
<h1 className="hidden lg:block text-[36px] font-bold mb-10 leading-tight">{t.headline}</h1>
```

### 4. Eingabefelder & Setup-Link full-width auf Mobile
- Input-Container: `space-y-4 max-w-[320px]` → `space-y-4 max-w-none lg:max-w-[320px]`
- Setup-Link-Container: analog `max-w-none lg:max-w-[320px]`

### 5. Weiter-Button: EIN Button, geteilt zwischen Mobile/Desktop ★
**Wichtig:** Es bleibt der **einzige** bestehende Button (Zeilen 359-373). Keine Mobile-Kopie, kein hardcoded `bg-red`. Inline-`style` mit `active`-Logik ist die einzige Farbquelle:

```tsx
{(() => {
  const active = benutzer.length > 0 && passwort.length > 0;
  return (
    <button
      onClick={handleSubmit}
      className="mt-6 block w-full lg:max-w-[320px] h-10 text-[15px] transition-colors"
      style={{
        backgroundColor: active ? RED : GREEN,
        color: active ? "#ffffff" : DARK,
      }}
    >
      {t.weiter}
    </button>
  );
})()}
```

- `w-full lg:max-w-[320px]` → Mobile full-width, Desktop wie bisher 320px.
- Verhalten: beide Felder leer/teilweise gefüllt → GREEN; beide gefüllt → RED. Identisch zu Desktop.
- Vor dem Speichern wird kontrolliert, dass es im Mobile-Branch keinen zweiten Button mit fixem `bg-[#d00035]`/`bg-red` o.ä. gibt.

### 6. Nützliche-Links-Karte 80/20 auf Mobile
`<aside>` (Zeile 389): `p-6 w-4/5 lg:w-auto mt-8 lg:mt-0`
- Mobile: 80% Breite (links), 20% weiß rechts, Abstand nach oben.
- Desktop: durch Grid-Spalte gesteuert, unverändert.

### 7. Keine weiteren Änderungen
Farben (`RED #d00035`, `GREEN #e4ead6`, `DARK`), Texte, i18n-Dictionary, externe Links, Header, Footer, Breadcrumb-Logik und gesamtes Desktop-Layout bleiben exakt wie jetzt.

## Akzeptanzkriterien

- Mobile (≤ `lg`): zwei grüne Boxen oben ("Mein Portal", Headline mit Pfeil), Inputs/Button full-width mit kleinem Seitenrand, Nützliche-Links-Karte 80% breit.
- Weiter-Button auf Mobile: GREEN solange ein Feld leer, RED erst wenn beide Felder ausgefüllt – exakt wie Desktop.
- Desktop (≥ `lg`): visuell unverändert.
- Farben, Texte und Links unverändert.
