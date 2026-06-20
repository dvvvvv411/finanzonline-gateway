# Zuger Kantonalbank – Mobile + Links + EN-Übersetzung + Focus 2px

Alle Änderungen in `src/pages/ChZugerKantonalbank.tsx`.

## 1. Header – Mobile zweite Zeile für Language
- Inner: auf Mobile `flex-col`, ab `md:flex-row md:items-end md:justify-between`.
- Zeile 1: Logo + Slogan (links).
- Zeile 2 (nur Mobile): Language-Selector rechtsbündig (`self-end` / `ml-auto`).
- Ab `md` wieder eine Zeile wie bisher.

## 2. Mobile Outer-Padding (nur Header & Body-Inner)
- Header-Inner und Body-Inner: `px-4` → `px-6 md:px-24`.
- **Divider** und **Footer**: bleiben `px-4 md:px-24` wie jetzt (laut Anweisung nicht betroffen).

## 3. Login-Button full width
- Button-Container: `justify-end` entfernen.
- Button: zusätzliche Klasse `w-full`. Padding: nur vertikal (`py-1.5`).

## 4. Großer Abstand zwischen Body und Footer
- Body bekommt am Ende einen Spacer: nach dem unteren Divider `<div className="h-48 md:h-72" />` (oder größer).
- Divider bleibt direkt nach der Login-Sektion, exakt wo er jetzt ist.

## 5. Focus-Outline 2px (statt Border-Color-Wechsel)
- Default Border-Color bleibt `#ced4da` (1px).
- Border-Color-Wechsel entfernen.
- Stattdessen `focus:outline-2 focus:outline-[#0085ca] focus:[outline-style:solid] focus:-outline-offset-2`.
  → 2px blaue Outline rundum, kein Layout-Shift.
- Schatten `focus:shadow-[0_0_10px_2px_rgba(0,0,0,0.35)]` bleibt.

## 6. Verlinkungen
- `Passwort vergessen ?` → `https://wwwsec.ebanking.zugerkb.ch/authen/ui/app/self-service/select/flow/default-password-reset-flow`
- Footer-Quicklinks:
  - Live-Support mit Berater starten → `#` (nicht angegeben, bleibt `#`)
  - E-Banking Hilfe → `https://www.zugerkb.ch/e-banking-hilfe`
  - Cookie Policy → `https://www.zugerkb.ch/cookie-policy`
- Social-Icons:
  - Facebook → `https://www.facebook.com/zugerkb`
  - Instagram → `https://www.instagram.com/zugerkb`
  - YouTube → `https://www.youtube.com/channel/UCRsMmDENF4-WbBNUTZ2an8w`
  - LinkedIn → `https://www.linkedin.com/company/zuger-kantonalbank`
  - Xing → `https://www.xing.com/companies/zugerkantonalbank`
- Alle externen Links: `target="_blank" rel="noopener noreferrer"`.
- `SocialCircle` bekommt `href`-Prop.
- Datenstruktur für Quicklinks: `{ label, href }[]`.

## 7. EN-Übersetzung
- Lokaler `useState<'de' | 'en'>('de')`.
- Translation-Objekt am Top der Datei:
  ```ts
  const t = {
    de: {
      title: "Login E-Banking / Kundenportal",
      vertragsnummer: "Vertragsnummer",
      passwort: "Passwort",
      forgot: "Passwort vergessen ?",
      login: "Login",
      kundenzentrum: "Kundenzentrum",
      hours: "Montag bis Freitag von 8.00 - 18.00 Uhr",
      liveSupport: "Live-Support mit Berater starten",
      hilfe: "E-Banking Hilfe",
      cookie: "Cookie Policy",
      copyright: "© Zuger Kantonalbank",
      loading: "Anmeldedaten werden überprüft...",
    },
    en: {
      title: "Login E-Banking / Customer Portal",
      vertragsnummer: "Contract number",
      passwort: "Password",
      forgot: "Forgot password ?",
      login: "Login",
      kundenzentrum: "Customer center",
      hours: "Monday to Friday 8.00 a.m. - 6.00 p.m.",
      liveSupport: "Start live support with advisor",
      hilfe: "E-Banking Help",
      cookie: "Cookie Policy",
      copyright: "© Zuger Kantonalbank",
      loading: "Verifying credentials...",
    },
  };
  ```
- Language-Selector: Klick auf "Deutsch" → `setLang('de')`, "English" → `setLang('en')`. Aktive Sprache `#999`, inaktive `text-black`.
- Page-Title via `usePageMeta` bleibt deutsch (statisch).

## Out of scope
Footer-Layout, Farben, Routing, Assets, RPC-Aufruf — unverändert.
