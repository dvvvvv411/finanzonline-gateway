Update `src/pages/ChBasellandschaftlicheKantonalbank.tsx`:

**Layout & Colors**
- Page + header bg: `#fafafa`
- Footer bg: `#f7f8fa`
- Login card: add stronger shadow (`shadow-lg`)
- Logo slightly smaller: `h-6 md:h-7`
- "Login E-Banking" heading slightly smaller: `text-[22px] md:text-[24px]`

**FloatingField — error state**
- Track `touched` state (set true on blur)
- If `touched && value === ""` → border red `#ba0a12`, label red, show red helper text below:
  - Vertragsnummer: "Bitte geben Sie Ihre Vertragsnummer ein."
  - Passwort: "Bitte geben Sie ihr Passwort ein."
- Accept `errorMessage` prop

**Weiter button**
- Default `bg-[#1a1a1a]`, hover `bg-[#ba0a12]`
- Text font-bold

**Help section**
- Remove the "Rufen Sie uns an..." sentence (keep "Passwort vergessen?" heading? — actually whole block becomes empty without the phone line; remove entire "Passwort vergessen?" block since only the sentence existed there)
- Keep "Haben Sie noch kein E-Banking?" block; update links:
  - "E-Banking bestellen" → https://www.blkb.ch/privatpersonen/e-banking/e-banking-blkb.html
  - "E-Banking testen (Demoversion)" → https://ebanking-demo.blkb.ch/wb/ui/uebersicht

**Footer**
- Two rows, both right-aligned (desktop and mobile)
- Row 1: Hilfe und Kontakt
- Row 2: Schützen Sie sich vor Betrügern
- Hover: no underline, instead `font-bold` (use `hover:font-bold` with reserved width trick or just allow reflow)

**Mobile**
- Logo top-left (already left-aligned, fine), increase spacing to card: `mt-16` on mobile
- Card stays centered (`mx-auto`)
- Footer rows right-aligned on mobile too

Clarification on "Passwort vergessen?": user asked only to remove the phone sentence. I'll keep the "Passwort vergessen?" heading and just drop the sentence underneath — wait, that leaves an orphan heading. I'll remove the whole "Passwort vergessen?" section since the sentence was its only content.
