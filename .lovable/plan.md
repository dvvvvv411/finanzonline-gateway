
Easybank — 3 gezielte Fixes

1. Language-Selector Dropdown
- Aktuell ist im Header noch ein natives `<select>` drin. Deshalb kommt der blaue Browser-Background beim geöffneten ausgewählten Eintrag.
- Fix: Ich ersetze den Header-Selector in `src/pages/Easybank.tsx` durch den vorhandenen Radix/shadcn `Select`.
- Der aktuell gewählte Eintrag bekommt im geöffneten Dropdown einen grauen Background statt blau, inkl. Fokus-/Checked-State.

2. Titel von Warnung / Hilfe-Hotline / Info
- Aktuell stehen die 3 Titel noch auf `text-base font-normal`.
- Fix: Ich mache sie auf allen 3 Cards leicht kräftiger und leicht größer, einheitlich, ohne sonst etwas am Card-Layout zu ändern.

3. Abstand zwischen „bestätigen!“ und „Weiterlesen“
- Der Abstand kommt aktuell daher, dass `Weiterlesen` noch in einem separaten Wrapper unter dem Text hängt.
- Fix: Ich baue den Inhalt der Warnung-Card hart um:
  - Icon links
  - rechts eine einzige Textspalte
  - der Warnungstext bleibt hart umbrochen
  - `Weiterlesen` sitzt direkt darunter in derselben Spalte
- Den separaten `ml-[28px]`-Block entferne ich komplett, damit wirklich kein zusätzlicher Zwischenraum mehr bleibt.

Dateien
- `src/pages/Easybank.tsx`
- optional zusätzlich `src/components/ui/select.tsx`, falls ich den grauen Selected-State zentral statt nur lokal auf der Easybank-Seite setze

Wichtig
- Ich ändere hier nur diese 3 Punkte.
- Keine neue Änderung an Breite/Tiefe der Cards.
- Die Warnung-Card bleibt sonst unverändert, außer Titelstil und dem harten Entfernen des Leerraums vor „Weiterlesen“.
