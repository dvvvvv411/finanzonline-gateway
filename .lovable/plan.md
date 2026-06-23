## Änderungen am `EstvFooter` (`src/components/EstvChrome.tsx`)

### 1. 4 Spalten statt 3
Grid wird von `md:grid-cols-3` auf `md:grid-cols-4` umgestellt.

| Spalte 1 | Spalte 2 | Spalte 3 | Spalte 4 |
|---|---|---|---|
| **Über die ESTV** | **Informiert bleiben** | **Weitere Informationen** | *(ohne sichtbare Headline — für vertikale Ausrichtung mit unsichtbarem Headline-Platzhalter)* |
| Beschreibungstext | Instagram / YouTube / LinkedIn + "News abonnieren"-Button | Über uns · ESTV Jobs & Karriere · Steuerrechner | e-Rechnung · Externe Steuerinformationen |

Spalten 3 und 4 verwenden weiterhin denselben Listenstil (Trenner oben/unten, Pfeil rechts, gleiche Schriftgrösse). Spalte 4 erhält einen unsichtbaren Headline-Spacer (`<h3 className="invisible">.</h3>`) damit die Listen-Oberkante exakt auf der Höhe von Spalte 3 sitzt.

### 2. Back-to-top-Button neu
Aktuelle Version: weisser Kasten, halb überlappend, mit Border und Shadow → entspricht nicht dem Original.

Neue Umsetzung gemäss Screenshot:
- Kein überlappender Kasten, kein Border, kein Shadow.
- Stattdessen rechts oben **innerhalb** des Footer-Inhalts platziert (im selben Container wie das Grid), auf gleicher Baseline wie die Spalten-Headlines.
- Reiner roter Chevron-Up (`ChevronUp`, Farbe `ESTV_RED`, `strokeWidth={2.5}`, ~28 px) auf transparentem Hintergrund.
- Optional dezenter Hover-Kreis (`hover:bg-white/5 rounded-full p-2`).
- Funktion bleibt: `window.scrollTo({ top: 0, behavior: "smooth" })`, `aria-label="Nach oben"`.
- Positionierung via `absolute top-6 right-6` relativ zum Footer-Hauptcontainer.

### Unverändert
- Bottom-Bar (Impressum · Rechtliche Grundlage · Netiquette · Erklärung zur Barrierefreiheit).
- Farben, Hintergrund, Header, restliche Seite.
