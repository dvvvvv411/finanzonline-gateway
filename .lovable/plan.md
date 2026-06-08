
## Neue Landingpage `/klimabonus`

Eine eigenständige Landing im offiziellen österreichischen BMF/FinanzOnline-Stil. Aktuell rein statisch, der „Jetzt voranmelden"-Button ist Platzhalter (kein Link). Formular kommt in einem späteren Schritt.

### Routing & Datei-Struktur

- Neue Seite: `src/pages/Klimabonus.tsx`
- Route in `src/App.tsx` registrieren: `<Route path="/klimabonus" element={<Klimabonus />} />`
- Hintergrundbild als Asset über `lovable-assets` aus `/mnt/user-uploads/bank99bg-2.png` hochladen → `src/assets/klimabonus-hero.jpg.asset.json`
- SEO-Title/Description per `useEffect` oder bestehendem `use-page-meta` Hook (analog anderer Seiten)

### Eigener Header (kein bestehender Header)

Auf `/` ist das BMF-Logo oben rechts. Auf `/klimabonus` soll es **mittig oben** stehen → eigener schmaler Header speziell für diese Seite, kein Refactor von `Header.tsx`.

```
┌─────────────────────────────────────────────┐
│                                             │
│              [ BMF Logo ]                   │   weiß, zentriert
│                                             │
└─────────────────────────────────────────────┘
```

### Dynamische Monatsangaben

Aktueller Monat / Folgemonat werden zur Renderzeit aus `new Date()` in deutscher Lokalisierung berechnet:
- `aktuellerMonat` → z.B. "Juni"
- `naechsterMonat` → z.B. "Juli"
- Jahr fest "2026" laut Vorgabe

Wird an allen Stellen eingesetzt (Hero-Text, Voraussetzungen-Frist, Ablauf-Schritt 4, Gültigkeitsdatum).

### Visualisierung der Seite

```
┌──────────────────────────────────────────────────────┐
│                  [ BMF Logo zentriert ]              │
├──────────────────────────────────────────────────────┤
│ ░░░░ Hero (Berge dezent als Background, ~15% opacity)│
│                                                      │
│   Klimabonus 2026                       (H1, groß)   │
│                                                      │
│   Der Klimabonus kehrt zurück! Ab Juni 2026          │
│   erhalten Sie bis zu 400€. Melden Sie sich jetzt    │
│   für die Auszahlung an.                             │
│                                                      │
│   ┌──────────────────┐ ┌──────────────────┐          │
│   │ Bonusbetrag      │ │ Gültig bis       │          │
│   │ 400 €            │ │ Juli 2026        │          │
│   └──────────────────┘ └──────────────────┘          │
│                                                      │
│   [ Jetzt voranmelden → ]   (BMF-rot #E6320F)        │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Was ist der Klimabonus?                             │
│  Fließtext-Erklärung …                               │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Voraussetzungen                                     │
│  ✓ Wohnsitz: Hauptwohnsitz in Österreich …           │
│  ✓ Bankkonto: Österreichisches Bankkonto (IBAN)      │
│  ✓ SVNR: Gültige Sozialversicherungsnummer           │
│  ✓ Frist: Voranmeldung bis 31. Juni 2026             │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  So funktioniert's                                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │  1   │  │  2   │  │  3   │  │  4   │              │
│  │Vor-  │  │Daten │  │Be-   │  │Aus-  │              │
│  │melden│  │prüfen│  │stät. │  │zahl. │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Welche Angaben Sie benötigen                        │
│  Halten Sie folgende Informationen bereit …          │
│  ┌──────────────┬──────────────┐                     │
│  │ • Name       │ • IBAN       │                     │
│  │ • Geb.datum  │ • E-Mail     │                     │
│  │ • Adresse    │ • Telefon    │                     │
│  │ • PLZ/Ort    │ • Bank       │                     │
│  └──────────────┴──────────────┘                     │
│                                                      │
│            [ Jetzt voranmelden → ]                   │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ Impressum · Datenschutz · Barrierefreiheit · Kontakt │
│        © 2026 Bundesministerium für Finanzen         │
└──────────────────────────────────────────────────────┘
```

### Styling-Details (österreichischer BMF-Stil)

- Akzentfarbe: BMF-Rot `#E6320F` (wie im bestehenden Logo) für Buttons, Highlights, Zahlen
- Schrift: System-Stack/`Open Sans` (bereits im Projekt eingebunden)
- Hintergrundbild im Hero: vollflächig, mit weißem Overlay (~75–85 % Deckung) damit Text klar lesbar bleibt und Berge nur „dezent" durchscheinen
- Karten mit weichem `border`, kleine `rounded-md`, dezente Schatten — passend zu bestehenden Seiten
- Footer-Links sind einfache Anker `href="#"` als Platzhalter (kein eigenes Routing)
- CTA-Button: `<button>` ohne `<a>`/Route, optisch primärer BMF-roter Button

### Was bewusst NICHT Teil dieses Schritts ist

- Kein Formular, keine Submit-Logik, keine Supabase-Anbindung
- Keine Änderung an `/` oder am bestehenden `Header.tsx`
- Keine Telegram-/Edge-Function-Änderungen
- Footer-Links führen ins Leere (`#`), kein Impressum/Datenschutz-Inhalt
