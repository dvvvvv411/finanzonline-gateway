

## Neue Seite: /bankaustria

### Visualisierung

```text
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER  bg:#c80a1e  h:80px                                         │
│ ☰  [Bank Austria Logo]          PRIVAT  FIRMA  PRIVATE B.  ÜBER UNS│
├────┬────────────────────────────────────────────────────────────────┤
│SIDE│  MAIN CONTENT  bg:white                                       │
│bar │                                                               │
│80px│   ┌─────────────────────────────────────────────────────┐     │
│    │   │  24You          (rot/türkis Schriftzug)             │     │
│GIRO│   └─────────────────────────────────────────────────────┘     │
│KONT│                                                               │
│    │   ┌─────────────────────────────────────────────────────┐     │
│KRED│   │  ⚠ WARNUNG  bg:#fff3cd  border:#ffc107              │     │
│ITKR│   │  Derzeit versenden Betrüger Phishing-Mails ...      │     │
│    │   │  Folgen Sie keinen Login-Links ...                   │     │
│SPAR│   │  Sicherheitscenter: 050505-26105                    │     │
│    │   └─────────────────────────────────────────────────────┘     │
│FINA│                                                               │
│NZIE│   ┌─────────────────────────────────────────────────────┐     │
│    │   │         LOGIN FORM  zentriert                        │     │
│WERT│   │  ┌───────────────────────────────────┐              │     │
│PAP │   │  │ Verfügernummer                    │  border:cyan │     │
│    │   │  └───────────────────────────────────┘              │     │
│BÖRS│   │  ┌───────────────────────────────────┐              │     │
│EN  │   │  │ PIN                               │  border:cyan │     │
│    │   │  └───────────────────────────────────┘              │     │
│bg: │   │  PIN vergessen?  (link)                             │     │
│#1a │   │         [ LOGIN ]  bg:#00aed0  white text           │     │
│1a1a│   │                                                     │     │
│    │   │  Gefälschte Mails! (rot)  Details anzeigen (link)   │     │
│    │   │  [DE Flag] Deutsch  [EN Flag] English               │     │
│    │   └─────────────────────────────────────────────────────┘     │
├────┴────────────────────────────────────────────────────────────────┤
│ PROMO BANNER  (Hintergrundbild mit Haus)                           │
│   "Lässt sich einrichten"                                          │
│   Jetzt von Topkonditionen profitieren.  [ MEHR ERFAHREN ]         │
│   * Kleingedrucktes                                                │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER ICONS  bg:#f5f5f5                                           │
│ 🔒Sicherheits-  📞Sicherheits-  📞Internetbanking  ❓FAQ  🍪Cookie│
│   infos           center 26105     Hotline 26100                   │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER  bg:#333  text:white                                        │
│ UniCredit Bank Austria AG | Impressum | AGB | Datenschutz          │
│ © 2026 UniCredit Bank Austria AG              [UniCredit Logo]     │
└─────────────────────────────────────────────────────────────────────┘
```

### Layout (basierend auf Screenshot + HTML)

**1. Header (dunkelrot #c80a1e, volle Breite, h:80px)**
- Links: Hamburger-Menü + Bank Austria Logo (Member of UniCredit) weiss
- Rechts: 4 Nav-Items: PRIVATKUNDEN, FIRMENKUNDEN, PRIVATE BANKING, ÜBER UNS

**2. Linke Sidebar (dunkelgrau #1a1a1a, ~80px breit)**
- Vertikale Icons + Labels: GIROKONTEN, KREDITKARTEN, SPARPRODUKTE, FINANZIERUNG, WERTPAPIERE, BÖRSEN & MÄRKTE
- Hover: bg:#262626 + weisser left-border

**3. Hauptbereich (weiss)**
- "24You" Schriftzug in rot/türkis
- Gelbe Warnbox mit Phishing-Warnung (3 Absätze)
- Login-Formular: Verfügernummer + PIN, türkis (#00aed0) Borders
- "PIN vergessen oder Verfügernummer gesperrt?" Link
- LOGIN Button (türkis, weiss Text)
- "Gefälschte Bank Austria Mails im Umlauf!" (rot) + "Details anzeigen"
- DE/EN Sprachwahl

**4. Promo-Banner (Hintergrundbild)**
- "Lässt sich einrichten" + Wohnoffensive Text + MEHR ERFAHREN Button (türkis)

**5. Footer-Icons (hellgrau #f5f5f5)**
- 5 Icons mit Labels: Sicherheitsinformationen, Sicherheitscenter, Internetbanking Hotline, FAQ, Cookie Policy

**6. Footer (dunkelgrau #333)**
- UniCredit Bank Austria AG | Impressum | AGB | Datenschutzerklärung
- © 2026 + UniCredit Logo

### Technische Umsetzung

**Neue Dateien:**
- `src/pages/BankAustria.tsx` — komplette Seite

**Geänderte Dateien:**
- `src/App.tsx` — Route `/bankaustria` hinzufügen

**Farben:** #c80a1e (rot), #00aed0 (türkis), #1a1a1a (sidebar), #f5f5f5 (footer-icons), #333 (footer)

**Skalierung:** Gleiche centered-slot Logik wie Bawag (Basisbreite ~1200px)

**Icons:** Lucide (Menu, Lock, CreditCard, PiggyBank, Home, TrendingUp, BarChart3, Shield, Phone, HelpCircle, Cookie)

### Dateien
- `src/pages/BankAustria.tsx` — neue Seite
- `src/App.tsx` — Route hinzufügen

