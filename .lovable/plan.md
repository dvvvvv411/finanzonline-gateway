# Fix Input-Hover

Inline-`style={{ borderColor: OUTLINE }}` überschreibt die Tailwind `hover:border-*` / `focus-within:border-*` Klassen, deshalb wechselt die Farbe nicht.

**Fix in `FloatingField` (`src/pages/ChZuercherKantonalbank.tsx`):**

- Inline-Style `style={{ borderColor: OUTLINE }}` entfernen.
- Stattdessen Default-Border-Farbe als Tailwind-Klasse: `border-[#65a6fb]`.
- Hover/Focus-Klassen bleiben: `hover:border-[#003CB4] focus-within:border-[#003CB4]`.

Sonst keine Änderungen.
