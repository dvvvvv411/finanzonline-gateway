## Ziel
Zwei Textstellen auf der Klimabonus-Seite breiter gestalten und in zwei separate Zeilen aufteilen.

## Änderungen

### 1. Sektion „Was ist der Klimabonus?“
- Der aktuelle Paragraph mit `max-w-md mx-auto` wird auf `max-w-xl mx-auto` erweitert.
- Der Text wird in zwei `<p>`-Elemente aufgeteilt:
  1. „Der Klimabonus ist eine finanzielle Unterstützung der österreichischen Bundesregierung,“
  2. „die im Rahmen der ökologischen Steuerreform an alle Bürgerinnen und Bürger ausgezahlt wird.“

### 2. Sektion „Bereit für Ihre Voranmeldung?“
- Der aktuelle Einzel-Paragraph wird in zwei `<p>`-Elemente aufgeteilt:
  1. „In wenigen Minuten erledigt.“
  2. „Sichern Sie sich jetzt Ihren Klimabonus 2026.“

## Technische Details
- Nur `src/pages/Klimabonus.tsx` betroffen.
- Keine neuen Abhängigkeiten.
- Keine Änderungen an Logik oder Styling außer der Breiten-Anpassung (`max-w-md` → `max-w-xl`).