Update `src/pages/ChMigros.tsx` with the requested styling changes.

## Header
- Language switcher: active language uses same weight/color as inactive ones; only `hover:font-bold` adds bold.
- Help button: change from pill to slightly rounded (`rounded-md`).

## Hero
- "Anmeldung im E-Banking": `font-bold`, reduce bottom margin to card.

## Login card
- Border: `2px solid #c5d2ce`, `rounded-md`.
- Center input + "Weiter" button horizontally inside card (flex column, items-center, constrained width ~360px).
- Button label: "Weiter" (also FR/IT equivalents updated: "Continuer" / "Continua").
- Input + button: `rounded-md`.
- Input: `border-2 border-[#cad7d3]`; on focus, background changes to `#cad7d3` (focus:bg-[#cad7d3]).
- Remove divider line between button and footer links inside card.
- Footer links inside card: stack vertically, centered, both bold, underline with more offset (`underline-offset-4`).

## Remove
- Floating "Wichtige Information" notification box entirely (and its state/i18n).
- Divider between body and footer.

## Footer
- Three items (`© 2026 Migros Bank AG`, `Rechtliche Informationen`, `Impressum`) all in the same green as the Weiter button (`#144B3C`), all rendered as links.
- Left-aligned.
- Remove divider/separator between "Rechtliche Informationen" and "Impressum".
- Extra spacing between copyright and "Rechtliche Informationen"; keep current spacing between "Rechtliche Informationen" and "Impressum".

## Files
- EDIT `src/pages/ChMigros.tsx`
