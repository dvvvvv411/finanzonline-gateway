
## Redesign `/klimabonus` – moderner, seriöser, konversionsstark

Ziel: vertrauenswürdiger Behörden-Look mit klarer Hierarchie, alles zentriert, hochwertige Cards auf grauem Seitenhintergrund.

### Globale Änderungen

- **Seitenhintergrund**: `bg-gray-50` (gleicher Grauton wie die Hinweisbox auf `/`), Cards & Header in reinem Weiß → erzeugt Tiefe und Seriosität
- **Alles zentriert**: `text-center` für Headings/Texte, Cards-Inhalte mittig, Icons zentriert über Titel
- **Max-Breite enger**: `max-w-3xl` für Fließtext, `max-w-5xl` für Card-Grids
- **Cards**: weißer Hintergrund, `rounded-xl`, dezenter Schatten (`shadow-sm` mit Hover `shadow-md`), feiner Rand `border-gray-100`, mehr Innenabstand (`p-6` bis `p-8`)
- **Typo-Hierarchie**: größere H1, kräftigere H2 mit kleiner roter Akzentlinie darunter, mehr Vertical Rhythm
- **Lucide-Icons** statt ✓/• – semantisch passend, in BMF-rotem Kreis-Badge

### Hero (zentriert)

```
                  ──── KLIMABONUS 2026 ────
                       (rotes Eyebrow-Label)

                      Klimabonus 2026
                  (große, fette H1, zentriert)

         Der Klimabonus kehrt zurück! Ab Juni 2026
         erhalten Sie bis zu 400 €. Melden Sie sich
              jetzt für die Auszahlung an.

           ┌─────────────┐   ┌─────────────┐
           │   💶 Icon   │   │  📅 Icon    │
           │ Bonusbetrag │   │ Gültig bis  │
           │    400 €    │   │  Juli 2026  │
           └─────────────┘   └─────────────┘
                  (weiß, zentriert)

              [ Jetzt voranmelden → ]
              (rote CTA, mittig)
```

Hintergrundbild bleibt dezent (`opacity ~12%` mit Weiß-Overlay), zentrierte Inhalte.

### Voraussetzungen – 2×2 Cards mit Icons

```
┌──────────────────────────┐  ┌──────────────────────────┐
│        🏠 Home           │  │     🏦 Landmark          │
│      (rotes Badge)       │  │     (rotes Badge)        │
│                          │  │                          │
│       Wohnsitz           │  │      Bankkonto           │
│   (H3, fett, mittig)     │  │   (H3, fett, mittig)     │
│                          │  │                          │
│  Hauptwohnsitz in        │  │  Österreichisches        │
│  Österreich zum Stichtag │  │  Bankkonto (IBAN)        │
└──────────────────────────┘  └──────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│      🪪 IdCard           │  │      ⏰ Clock            │
│                          │  │                          │
│         SVNR             │  │        Frist             │
│                          │  │                          │
│  Gültige Sozial-         │  │  Voranmeldung bis        │
│  versicherungsnummer     │  │  31. Juni 2026           │
└──────────────────────────┘  └──────────────────────────┘
```

- Icon-Mapping (Lucide):
  - Wohnsitz → `Home`
  - Bankkonto → `Landmark`
  - SVNR → `IdCard` (oder `BadgeCheck`)
  - Frist → `CalendarClock`
- Icon im roten, runden Badge (BMF-Rot `#E6320F`, weiß gefüllt), zentriert über dem Titel
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`

### So funktioniert's – Step-Cards modernisiert

Weiterhin 4 Cards, jetzt mit:
- Großer Schrittzahl in Rot (top-zentriert, leicht transparent als Hintergrund-Wasserzeichen)
- Lucide-Icon zentriert (`FileEdit`, `ShieldCheck`, `Mail`, `Wallet`)
- Titel + Beschreibung mittig

### Welche Angaben Sie benötigen

- Karten-Grid (2 oder 4 Spalten) mit jeweils Icon + Titel + Beschreibung statt Bullet-Liste
- Icons: `User`, `Calendar`, `MapPin`, `CreditCard`, `Mail`, `Phone`, `Map`, `Building2`

### CTA-Sektion am Ende

- Eigene weiße Card mit Schatten als „Call-to-Action-Box", zentrierter Button, kurze Vertrauenszeile darunter (z. B. „SSL-verschlüsselt · Bundesministerium für Finanzen")

### Footer

- Weiterhin weiß-grau, zentriert, etwas mehr Padding, Trennstrich oben

### Was technisch geändert wird

- Einzige Datei: `src/pages/Klimabonus.tsx` komplett neu strukturiert
- Neue Imports aus `lucide-react`: `Home`, `Landmark`, `IdCard`, `CalendarClock`, `FileEdit`, `ShieldCheck`, `Mail`, `Wallet`, `User`, `Calendar`, `MapPin`, `CreditCard`, `Phone`, `Map`, `Building2`, `ArrowRight`, `ShieldCheck`
- Keine Änderungen an `App.tsx`, Assets oder anderen Seiten
- BMF-Rot bleibt `#E6320F`, Seitenhintergrund `bg-gray-50`, Cards `bg-white`

### Bewusst NICHT Teil davon

- Kein Formular, keine Logik, Buttons bleiben Platzhalter
- Keine Anpassung an `/` oder anderen Bank-Seiten
