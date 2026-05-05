## Wüstenrot - Style Anpassungen

In `src/pages/Wuestenrot.tsx`:

- **Logo**: `h-12` → `h-9` (kleiner)
- **Content linke Spalte**: `max-w-[480px]` entfernen → full width im Container
- **Anmelden Button**: stärker abgerundet (`rounded-xl`), Normalfarbe `#f84914`, Hover `#e03700`
- **"Hier Registrieren"**: Farbe `#f84914`
- **Auge-Symbol** (Passwort-Toggle): `hover:text-[#f84914]`
- **"Passwort vergessen?"**: `hover:text-[#f84914]`
- **Footer-Links** mit echten URLs, kein hover-underline, stattdessen `hover:text-[#f84914] no-underline`:
  - Impressum → `https://portale.ww-ag.de/go/impressum_kundenportal`
  - Datenschutz → `https://portale.ww-ag.de/go/datenschutz_kundenportal`
  - Hilfeseite → `https://portale.ww-ag.de/go/mewa_faq`
  - `target="_blank" rel="noopener noreferrer"`
