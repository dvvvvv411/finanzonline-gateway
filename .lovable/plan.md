## Ziel
Die "Was ist der Klimabonus?"-Sektion im selben amtlichen Karten-Stil wie die "Amtliche Mitteilung"-Box gestalten.

## Änderung
In `src/pages/Klimabonus.tsx` die aktuelle Sektion (Zeilen 168–174) ersetzen durch dieselbe Karten-Struktur wie die CTA-Box:

- Weißer Karten-Container mit `border`, `rounded-xl`, `shadow-sm` + Hover-Effekt
- Roter 1px-Balken oben (`bg-BMF_RED`)
- Kicker-Zeile mit `Info`-Icon + "INFORMATION" (rot, uppercase, tracking)
- H2 "Was ist der Klimabonus?" (selbe Größe/Gewicht wie "Bereit für Ihre Voranmeldung?")
- Beschreibungstext darunter (gleiche Typografie)
- Kein CTA-Button und kein SSL-Hinweis (rein informativ)

Der `SectionHeading`-Aufruf entfällt für diese Sektion, da der Kicker jetzt innerhalb der Karte sitzt. Container-Breite an die CTA-Box angleichen (`max-w-5xl`).

Betroffene Datei: nur `src/pages/Klimabonus.tsx`.