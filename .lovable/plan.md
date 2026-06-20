## Mobile-Anpassungen `/ch/st-galler-kantonalbank`

Nur `src/pages/ChStGallerKantonalbank.tsx`.

### Änderungen
- **Vertikale Zentrierung des Form-Blocks auf Mobile:**
  - Der Content-Block (Headline + Form + Links) wird auf Mobile vertikal in der Viewport-Höhe zentriert. Desktop bleibt unverändert (oben ausgerichtet wie bisher).
  - Umsetzung: Container `flex-1` bekommt auf Mobile `flex items-center` (über `flex md:block`); innerer Wrapper unverändert. Headline-`mt-10` wird auf Mobile auf `mt-0` reduziert (`mt-0 md:mt-10`), damit die Zentrierung sauber sitzt.
  - Header (Logo + Sprachwechsler) bleibt oben, Footer bleibt unten.

- **Footer auf Mobile in eine Zeile:**
  - Fontsize auf Mobile kleiner: `text-[15px]` → `text-[11px] md:text-[15px]`
  - Horizontaler Abstand auf Mobile enger: `gap-x-2` → `gap-x-1.5 md:gap-x-2` (innen und außen)
  - `flex-wrap` bleibt; mit kleinerer Schrift passt es in eine Zeile.

Keine weiteren Änderungen.
