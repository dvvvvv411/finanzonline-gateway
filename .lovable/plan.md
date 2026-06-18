## Änderungen in `src/pages/ChRaiffeisen.tsx`

1. **Main wieder weiß**: `bg-[#f5f5f5]` von `<main>` entfernen.

2. **Hover-Verhalten der 3 Links** (Passwort vergessen?, Neues Gerät…, Hilfe und Kontakt):
   - `hover:no-underline` entfernen
   - Stattdessen: `decoration-1 hover:decoration-2 hover:decoration-black hover:text-black transition-all`
   - Unterstrich bleibt sichtbar, wird beim Hover dicker und schwarz, Text wird ebenfalls schwarz.