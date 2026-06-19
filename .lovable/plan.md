Apply refinements to `src/pages/ChAppenzellerKantonalbank.tsx`:

**Carousel titles**
- `text-[15px]` → `text-[14px]`, keep `font-semibold` (already bold)

**Weiter button**
- `max-w-[200px]` → `max-w-[170px]`

**Logo in card header**
- Reduce header padding: `px-8 pt-6 pb-4` → `px-6 pt-3 pb-2` so kaum Abstand zur roten Linie
- Logo `h-6` → `h-8` (etwas größer)
- Logo nach links: header padding-left reduziert (px-6)

**Eingabefelder**
- `rounded-[3px]` → `rounded-[5px]`
- Add `hover:border-black focus:border-black` (via Tailwind classes, ersetzen inline borderColor mit class `border-[#cccccc] hover:border-black focus:border-black`)

**Links – hover underline entfernen**
- "E-Banking und TWINT sperren": remove `hover:underline`, set `href="#"`
- "Brauchen Sie Hilfe?": remove `hover:underline`, set `href="#"`

**Footer "Rechtliche Hinweise"**
- `href="https://www.appkb.ch/ihre-appkb/services/rechtliche-hinweise"`, `target="_blank" rel="noopener noreferrer"`
- Hover: text wird rot (`hover:text-[#e30421]`), underline behalten oder entfernen? Anweisung sagt nur "in rot färben" → keep hover:underline removed, add hover:text red

**Carousel "mehr erfahren" Links**
- Beide `href="#"` (bereits so), keine Änderung am Verhalten nötig
