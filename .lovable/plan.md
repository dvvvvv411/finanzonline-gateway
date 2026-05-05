## Wüstenrot - Weitere Anpassungen

In `src/pages/Wuestenrot.tsx`:

- **Hinweis-Card**: `rounded-lg` (abgerundete Ecken)
- **Eingabefelder** (E-Mail + Passwort): Border `border` → `border-2` (2px)
- **Headings** ("Willkommen im W&W-Kundenportal" / "Bitte melden Sie sich an."): Farbe `#1a1a1a` → `text-black`
- **Mobile**:
  - Rechte Spalte komplett ausblenden: `hidden md:flex`
  - Divider über Footer ausblenden: `hidden md:block` auf `<hr>`
  - Logo kleiner: `h-9` → `h-7 md:h-9`
