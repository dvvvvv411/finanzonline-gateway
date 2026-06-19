Mobile-view changes for `src/pages/ChMigros.tsx` (breakpoint: `< md`, i.e. `<768px`). Desktop layout stays unchanged.

**Logo (mobile)**
- Add a small `MigrosLogoMobile` SVG component using the provided path: `viewBox="0 0 20 25"`, `fill={GREEN}`.
- In header: show `MigrosLogoMobile` on mobile (`md:hidden`), keep desktop logo on `hidden md:block`.

**Header help button (mobile)**
- Remove the `hidden sm:inline` on the "Hilfe" text so it shows on mobile too.

**Card footer links (mobile)**
- On mobile: stack vertically, centered, with "Probleme bei der Anmeldung?" first, then "Wo finde ich meine Vertragsnummer?".
- On desktop (`md:`): keep current row layout with "Wo finde ich" left, "Probleme" right.
- Implementation: use `flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between md:gap-4`. Since current DOM order is `whereFind` then `problems`, `flex-col-reverse` puts `problems` first on mobile; on `md:flex-row` natural order returns (whereFind left, problems right).
- HelpCircle icon next to "Probleme bei der Anmeldung?": size to match text (14px) → `w-[14px] h-[14px]` instead of `w-5 h-5`.

**Footer (mobile)**
- Stack one item per row, left-aligned: `flex-col items-start gap-3 md:flex-row md:items-center md:gap-12`.

No other files touched.
