## Zwei minimale Änderungen

### 1. Bereich neben dem roten Balken einfärben
- Aktuell: der rote Balken hat `w-1/2` — daneben ist weiß (Body-Hintergrund)
- Lösung: roten Balken in einen Wrapper mit `bg-[#f2f2f2]` (gleicher Grau-Ton wie Footer-Sektion darüber) packen. Der rote `<div>` bleibt `w-1/2`, der Wrapper füllt die andere Hälfte automatisch grau.

### 2. "Neues Gerät für PhotoTAN aktivieren" auf X-Achse mit "Passwort vergessen?" ausrichten
- "Passwort vergessen?" sitzt im Formular-Container `max-w-[530px] md:ml-[22%]` linksbündig
- Aktuell: Service-Link-Zeile ist `justify-end gap-16 pr-12` → "Neues Gerät" wandert mit nach rechts
- Lösung: Layout ändern zu `justify-between` mit Container, der links bei `md:ml-[22%]` startet und rechts mit `pr-12` endet. Dadurch sitzt "Neues Gerät" exakt unter "Passwort vergessen?", "Hilfe und Kontakt" bleibt rechts.

Betroffene Datei: `src/pages/ChRaiffeisen.tsx` (nur diese zwei Stellen, sonst nichts)