Update `src/pages/ChMigros.tsx`:

**Header**
- Help button: outline `border-2` (2px).

**Hero**
- "Anmeldung im E-Banking": `font-semibold` (instead of bold).

**Login card**
- Increase size: wider (`max-w-md` → `max-w-lg`) and more vertical padding (`p-8` → `p-10` or similar).
- Input on focus: background and outline `#eef2f1` (update `focus:bg-[#eef2f1]` and `focus:border-[#eef2f1]` / focus ring).
- Card footer links back to one row (flex row, `justify-between`):
  - Left: "Wo finde ich meine Vertragsnummer?"
  - Right: "Probleme bei der Anmeldung?" (renamed from "Probleme bei der Registrierung?") with the same `?` help icon used in the header Help button, placed before the text.
  - Both links: `font-semibold` (instead of bold).

**Footer**
- `© 2026 Migros Bank AG`, `Rechtliche Informationen`, `Impressum` all on one row (flex, gap), all `font-semibold`, still in green `#144B3C`.

No other files touched.
