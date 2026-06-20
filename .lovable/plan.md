## Quicklinks: untereinander + Underline nur unter Text

### Layout
- Drei Quicklinks (`Passwort vergessen`, `Neues Gerät registrieren`, `Vertrag sperren`) untereinander: Anchor von `inline-flex` → `flex w-fit` (Block-Verhalten, eigene Zeile, nur so breit wie nötig).
- Card-Links analog (Hilfe zum Login, Sicherheit, Mehr Informationen): `flex w-fit`.

### Underline nur unter dem Text
- `link-underline-grow`-Klasse vom Anchor auf einen inneren `<span>` verschieben, der nur den Text umschliesst.
- Pfeil-Icon bleibt ausserhalb des Spans → keine Underline unterm Pfeil.
- Anchor selbst: `flex items-center gap-2`, kein `link-underline-grow` mehr.
- Footer `tkb.ch`: behält `link-underline-grow` direkt am Anchor (kein Icon davor).

### Nicht geändert
- Hrefs, Farben, Animation, alles andere.
