Add a language dropdown (DE/FR/IT/EN) to the ESTV topbar that translates the entire `/estv` page, header, and footer.

## 1. Sprach-Context (neu)

Neue Datei `src/components/EstvI18n.tsx`:
- `EstvLang = "de" | "fr" | "it" | "en"`
- `EstvI18nProvider` mit `useState<EstvLang>("de")` + `useEstvI18n()` Hook (gibt `lang`, `setLang`, `t(key)` zurück).
- `translations`-Objekt mit allen Strings je Sprache (siehe unten).

## 2. Header-Dropdown (`src/components/EstvChrome.tsx`)

- Sprach-Button in der Utility-Bar zeigt aktuellen Code (`DE` / `FR` / `IT` / `EN`).
- Klick öffnet ein Dropdown (Radix `DropdownMenu` oder eigenes mit `useState`+Outside-Click) **direkt unter dem Button**, rechtsbündig.
- Dropdown-Hintergrund: gleicher `ESTV_SLATE` (#3F5366) wie Topbar, weisser Text, Hover `bg-white/10`, schmal, ohne Rahmen.
- Optionen: DE, FR, IT, EN — Klick ruft `setLang(...)` und schliesst Dropdown.
- Alle bisher hartkodierten Strings in `EstvHeader` / `EstvFooter` (Nav-Items, „Login", „Suche", Utility-Bar-Text, Footer-Überschriften, Footer-Links, Bottom-Links, Aria-Labels) werden via `t(...)` aufgelöst.

## 3. Estv-Seite (`src/pages/Estv.tsx`)

- Seite in `<EstvI18nProvider>` einwickeln (über kleinen Wrapper-Default-Export).
- Alle sichtbaren deutschen Texte (Breadcrumb, Headline, Intro, Hinweisbox, Section-Überschriften, Labels, Platzhalter, Fehlertexte, Submit-Button, SSL-Hinweis, Bank-Picker-Texte) via `t(...)`.
- `REQUIRED_MESSAGES` ebenfalls über `t(...)`.
- `usePageMeta`-Titel sprachabhängig.

## 4. Übersetzungs-Keys (DE/FR/IT/EN)

Sauber gruppiert in `translations`:

- `header.allAuthorities`, `header.login`, `header.search`
- `header.nav.*` (7 Items)
- `page.breadcrumb.home`, `page.breadcrumb.current`
- `page.title`, `page.intro`, `page.noticeTitle`, `page.notice`
- `form.title`, `form.subtitle`, `form.requiredHint`
- `form.section.personal`, `form.section.address`, `form.section.contact`, `form.section.bank`
- `form.label.firstName/lastName/birthdate/email/phone/street/houseNumber/postalCode/city/iban/bank`
- `form.placeholder.birthdate`, `form.placeholder.iban`, `form.placeholder.bank`
- `form.bank.intro`, `form.bank.empty`
- `form.error.*` (alle Required-Messages)
- `form.submit`, `form.ssl`, `form.loading`, `form.errorSave`
- `footer.aboutTitle`, `footer.aboutBody`, `footer.stayInformed`, `footer.subscribe`
- `footer.col3Title`, `footer.links.*` (Über uns, Jobs, Steuerrechner, e-Rechnung, Externe …)
- `footer.bottom.*` (Impressum, Rechtliche Grundlage, Netiquette, Barrierefreiheit)
- `footer.backToTop`

## Out of scope

- Routen anderer Banken bleiben deutsch (nur `/estv` wird übersetzt).
- Keine URL-Persistenz / kein Local-Storage für die Sprache.
