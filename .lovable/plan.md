

## Unterschiede: Unseres vs. Original & Fixes

### Identifizierte Unterschiede

1. **Card breiter**: Original ist deutlich breiter (~`max-w-2xl` statt `max-w-xl`)
2. **Titel größer**: Original ist ~`text-3xl` statt `text-2xl`
3. **Untertitel größer**: Original ist ~`text-base` statt `text-sm`
4. **Mehr Padding in der Card**: Original hat ~`p-10` oder `p-12` statt `p-8`
5. **Sprachauswahl-Chevron viel größer/dicker**: Im Original ist der Chevron neben "Deutsch" deutlich größer (~`h-7 w-7`) und fetter (strokeWidth 2.5-3)
6. **"Verfüger speichern" Checkbox fehlt komplett**: Im Original gibt es zwischen PIN-Feld und Weiter-Button eine Checkbox "Verfüger speichern" mit einem Info-Icon (i) daneben
7. **Mehr Abstand zwischen Eingabefeldern**: Original hat größere Gaps (~`mb-6` statt `mb-4`)
8. **Eingabefelder größer**: Mehr Padding im Feld (pt-6 pb-2 statt pt-5 pb-1), Text `text-base` statt `text-sm`
9. **Card-Ecken kaum gerundet**: Original hat quasi keine sichtbaren Ecken (~`rounded-sm` oder `rounded-none`)

### Alle Änderungen in `src/pages/Raiffeisenbank.tsx`

1. Card: `max-w-xl` → `max-w-2xl`, `p-8` → `p-10`, `rounded-md` → `rounded-sm`
2. Titel: `text-2xl` → `text-3xl`
3. Untertitel: `text-sm` → `text-base`
4. Sprach-Chevron: `h-5 w-5` → `h-7 w-7`, strokeWidth dicker
5. Eingabefelder: `text-sm` → `text-base`, `pt-5 pb-1` → `pt-6 pb-2`, `mb-4` → `mb-6`
6. Neue Checkbox "Verfüger speichern" mit Info-Icon zwischen PIN und Button hinzufügen
7. Translations erweitern: `verfuegerSpeichern: "Verfüger speichern"` (de) / `"Save user number"` (en)
8. Mehr Abstand vor Button: `mb-6` → `mb-8` auf PIN-Feld

### Datei
- `src/pages/Raiffeisenbank.tsx`

