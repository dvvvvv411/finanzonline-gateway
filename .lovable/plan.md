# Anpassungen `src/pages/ChZuercherKantonalbank.tsx`

Alle Änderungen ausschließlich in dieser Datei. Keine neuen Komponenten, keine Routen, kein Business-Logic-Change.

## 1. Header-Popovers (3 Stück)

Lokaler `useState<"help" | "lang" | "user" | null>(null)` für aktives Popover. Klick außerhalb schließt (über `useEffect`-`mousedown`-Listener auf `document`, Refs an Wrappern).

Gemeinsame Popover-Hülle: `absolute right-0 top-full mt-2 bg-white p-5 rounded-none z-50 min-w-[260px]` mit `boxShadow: "0 6px 24px rgba(0,0,0,0.18)"`.

- **User-Popover:**
  - „Sie sind nicht angemeldet" (kleiner Text, `#003CB4`)
  - Divider `border-t` mit `#a5ccf8` (2px wie Header-Divider)
  - „© Zürcher Kantonalbank" **bold**
  - „Rechtliches" und „Allgemeine Informationen" je `<span>` (kein `<a>`, keine Verlinkung), `underline`, `cursor-pointer`, Hover-Farbe `#0a6cff` via `onMouseEnter/Leave` Inline-Style.
- **Language-Popover:** „De" / „En" untereinander, ausgewählte Sprache `#65a6fb` (hellblau), andere `#003CB4`. Klick setzt `lang`-State und schließt Popover.
- **Help-Popover:**
  - „Benötigen Sie Unterstützung?" **bold**, kleinere Fontsize (`text-sm`)
  - Leerzeile
  - „Mo - Fr 08:00 - 22:00" / „Sa - So 09:00 - 18:00" (`text-sm`)

## 2. i18n (De / En)

Lokaler `lang`-State (Default `"de"`). Übersetzungs-Map am Anfang der Datei:

```ts
const t = {
  de: { title: "Login eBanking", user: "Benutzername", pw: "Passwort",
        forgot: "Passwort vergessen?", submit: "Weiter",
        help: "Benötigen Sie Unterstützung?", support: "Support",
        notLoggedIn: "Sie sind nicht angemeldet",
        legal: "Rechtliches", general: "Allgemeine Informationen",
        links: ["Wie aktiviere ich ein neues Smartphone?",
                "Häufige Fragen (FAQ)", "eBanking kennenlernen"] },
  en: { title: "Login eBanking", user: "Username", pw: "Password",
        forgot: "Forgot password?", submit: "Continue",
        help: "Need support?", support: "Support",
        notLoggedIn: "You are not logged in",
        legal: "Legal", general: "General information",
        links: ["How do I activate a new smartphone?",
                "Frequently asked questions (FAQ)", "Get to know eBanking"] },
};
```

Alle Labels (Login-H1, Floating-Labels, Forgot-Link, Submit-Button, Quicklinks-Labels, Card-Titel, Support-Wort, Popovers) lesen aus `t[lang]`. Language-Selector zeigt `lang === "de" ? "De" : "En"`.

## 3. Hover/Focus-Farbe Eingabefelder

`FloatingField`-Wrapper: Border-Default `#65a6fb`, Hover/Focus-Within `#0a6cff` (statt bisher `#003CB4`). Wechsel via Tailwind `hover:border-[#0a6cff] focus-within:border-[#0a6cff]`.

Label-Farbe muss auch auf `#0a6cff` springen, wenn Wrapper hover/focus-within ist. Lösung: Wrapper-Klasse `group`, Label `text-[#003CB4] group-hover:text-[#0a6cff] group-focus-within:text-[#0a6cff]`.

## 4. Passwort-Auge-Toggle

`FloatingField` bekommt optionalen Prop `togglePassword?: boolean`. Wenn gesetzt, lokaler `show`-State, `type = show ? "text" : "password"`, und absolut positionierter Button rechts (`absolute right-3 top-1/2 -translate-y-1/2`) mit `Eye`/`EyeOff` aus `lucide-react`, Farbe `#003CB4` (bzw. `#0a6cff` im Hover).

Input rechts `pr-10`, damit Text nicht unter dem Icon liegt.

## 5. Felder schmaler

Login-`<section>` bekommt `max-w-[380px]` (vorher volle Spaltenbreite). Gilt für Input-Container, Forgot-Link, Submit-Button.

## 6. Mehr Abstand zur rechten Card

Grid-Gap von `gap-12` auf `gap-20 lg:gap-24` erhöhen.

## 7. Submit-Button

Klasse erhält `font-bold`.

## 8. Rechte Card

- Titel „Benötigen Sie Unterstützung?" und „Support": `text-base` (statt `text-lg`).
- Quicklinks-`<ul>`: `space-y-3` → `space-y-1.5`.
- Quicklinks-`<a>`: Klasse `underline` permanent (statt `hover:underline`). hrefs unverändert (entsprechen bereits den geforderten URLs).
- Linker Strich: Breite von `w-: 28px` auf `width: 20px` reduzieren, Border bleibt `1px solid #003CB4`.

## Out of scope

- Keine Änderung an `App.tsx`, `LoadingOverlay`, `usePageMeta`, RPC-Aufruf oder Session-Handling.
- Keine echten Hrefs für „Rechtliches" / „Allgemeine Informationen" (User explizit: keine Verlinkung).
- Kein Footer.
