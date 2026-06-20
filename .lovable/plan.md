## Mobile Login-Card-Höhe anpassen

In `src/pages/ChObwaldnerKantonalbank.tsx`:

- `min-h-[720px]` nur noch auf **Desktop** anwenden: `md:min-h-[720px]` (kein min-height im Mobile)
- Den `<div className="flex-1" />`-Spacer nur auf Desktop wirken lassen: `hidden md:block`
- Dadurch sitzt im Mobile der Weiter-Button + Sperr-Text **direkt unter den Eingabefeldern** ohne Abstand zum unteren Cardrand, während Desktop weiterhin 720px hoch ist mit Button am unteren Rand.

Keine weiteren Änderungen.
