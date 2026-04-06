

## Sprachauswahl & Übersetzung für Raiffeisenbank-Seite

### Übersicht

Oben rechts in der Card ein Sprach-Dropdown (wie im Screenshot): zeigt "Deutsch" mit Chevron, beim Öffnen Dropdown mit "Deutsch" (mit Haken) und "Englisch". Alle Texte werden je nach Sprache übersetzt.

### Änderungen in `src/pages/Raiffeisenbank.tsx`

**1. Translations-Objekt**

```tsx
const translations = {
  de: {
    title: "Bitte melden Sie sich an",
    subtitle: "Wählen Sie Ihr Bundesland und geben Sie Verfügernummer und PIN ein.",
    bundeslandLabel: "Bundesland oder Bank wählen",
    verfuegerLabel: "Verfügernummer eingeben",
    pinLabel: "PIN eingeben",
    weiter: "Weiter",
    pflichtfeld: "Pflichtfeld",
    impressum: "Impressum",
    nutzungsbedingungen: "Nutzungsbedingungen",
    barrierefreiheit: "Barrierefreiheitserklärung",
  },
  en: {
    title: "Please sign in",
    subtitle: "Select your state and enter your user number and PIN.",
    bundeslandLabel: "Select state or bank",
    verfuegerLabel: "Enter user number",
    pinLabel: "Enter PIN",
    weiter: "Continue",
    pflichtfeld: "Required field",
    impressum: "Legal Notice",
    nutzungsbedingungen: "Terms of Use",
    barrierefreiheit: "Accessibility Statement",
  },
};
```

**2. State & Sprach-Dropdown**

- Neuer State: `const [lang, setLang] = useState<"de" | "en">("de");`
- Neuer State: `const [langOpen, setLangOpen] = useState(false);`
- `const t = translations[lang];`

**3. Sprach-Dropdown UI (oben rechts in der Card)**

Positioniert mit `absolute right-8 top-8` innerhalb der Card. Zeigt aktuell gewählte Sprache + Chevron (nach unten, beim Öffnen nach oben). Dropdown darunter mit weißem Hintergrund, Border, Schatten. Aktive Sprache hat ein Haken-Icon (Check aus lucide-react).

Styling: kein Hintergrund auf dem Trigger, nur Text + Chevron. Dropdown-Items mit `px-4 py-2`, Hover `bg-gray-100`.

**4. Alle Texte durch `t.xxx` ersetzen**

Titel, Untertitel, Labels, Button-Text, Pflichtfeld-Meldungen, Footer-Links.

### Datei
- `src/pages/Raiffeisenbank.tsx` — Translations-Objekt, lang-State, Sprach-Dropdown, alle Texte ersetzen

