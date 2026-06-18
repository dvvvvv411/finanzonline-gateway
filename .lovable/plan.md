## Mobile-Optimierungen (`src/pages/ChRaiffeisen.tsx`)

Desktop bleibt unverändert — alle Änderungen mit `md:`-Prefix zurücksetzen.

### 1. Weiter-Button
- Mobile: `w-full`, Desktop unverändert
- Klassen: `w-full md:w-auto`

### 2. „Passwort vergessen?"
- Mobile: zentriert
- Wrapper-`<div>`: `text-center md:text-left`

### 3. Service-Links (Neues Gerät / Hilfe und Kontakt)
- Mobile: gestapelt — „Neues Gerät" oben links, „Hilfe und Kontakt" darunter rechts
- Desktop: bisherige Zeile mit `justify-between` bleibt
- Container: `flex-col md:flex-row` + `items-stretch md:items-center`
- „Neues Gerät" `<a>`: `self-start`
- „Hilfe und Kontakt" `<a>`: `self-end mt-4 md:mt-0`

### 4. Footer
- Mobile: alles linksbündig, untereinander, in dieser Reihenfolge mit Abstand:
  1. Demo E-Banking
  2. DE FR IT (horizontal, linksbündig)
  3. © Raiffeisen Schweiz/Suisse/Svizzera
- Desktop: bisherige Anordnung bleibt
- Erste Zeile: `flex-col md:flex-row items-start md:items-center gap-6 md:gap-0`
- Sprachen-Block bleibt `flex gap-8`, rückt mobile linksbündig
- Roter Balken bleibt