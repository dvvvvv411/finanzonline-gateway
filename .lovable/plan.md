## Änderungen in `src/pages/ChRaiffeisen.tsx`

1. **Header bleibt weiß**, Content darunter wird leicht grau:
   - `<header>` behält weißen Hintergrund (`bg-white`)
   - `<main>` bekommt `bg-[#f5f5f5]` (leicht gräulich)
   - Footer bleibt wie er ist (eigenes Grau)
   - Wrapper-`bg-white` bleibt, damit Header weiß ist

2. **„Passwort vergessen?"** Unterstrich-Abstand erhöhen: `underline-offset-4` → `underline-offset-[6px]`

3. **Links auf `https://login.raiffeisen.ch/de/first-factor`** setzen für:
   - „Passwort vergessen?"
   - „Neues Gerät für PhotoTAN aktivieren"
   - „Hilfe und Kontakt"