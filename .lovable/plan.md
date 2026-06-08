## Ziel
Die beiden Karten-Sektionen "Information / Was ist der Klimabonus?" und "Amtliche Mitteilung / Bereit für Ihre Voranmeldung?" sollen schmaler sein als die restlichen Sektionen, aber identisch breit zueinander.

## Aktueller Stand
Alle Sektionen verwenden derzeit `max-w-5xl`. Die beiden Karten-Sektionen sollen einen kleineren Maximalwert bekommen (z. B. `max-w-3xl` oder `max-w-2xl`), während Voraussetzungen, Ablauf und Angaben bei `max-w-5xl` bleiben.

## Änderung
In `src/pages/Klimabonus.tsx`:
- Sektion "Was ist der Klimabonus?" (Zeile 168): `max-w-5xl` → `max-w-3xl`
- Sektion "Amtliche Mitteilung" (Zeile 233): `max-w-5xl` → `max-w-3xl`

Alle anderen Sektionen bleiben unverändert bei `max-w-5xl`.

## Technische Details
- Keine neuen Abhängigkeiten
- Keine Änderung an Komponenten-Logik
- Reine Tailwind-Klassen-Anpassung
