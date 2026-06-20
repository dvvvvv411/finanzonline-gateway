## Anpassungen `/ch/st-galler-kantonalbank`

Nur `src/pages/ChStGallerKantonalbank.tsx`.

### Änderungen
- **Logo:** `h-[48px] md:h-[60px]` → `h-[38px] md:h-[48px]` (≈ 20% kleiner)
- **Headline „Login SGKB E-Banking":** `font-bold` → `font-normal`
- **Labels „Vertragsnummer" / „Passwort":** ergänze `font-bold`, Farbe auf `#000`
- **Eingabefelder:**
  - Default: `border border-[#6c6e70]`
  - Focus: keine grüne Outline. Stattdessen zweite Outline drum herum: `focus:outline focus:outline-1 focus:outline-offset-[2px] focus:outline-[#6c6e70]`, innere Border bleibt `#6c6e70`
- **Login-Button (inaktiv):** Textfarbe `#705e60` → `#9a9a9a` (grau)
- **Footer:**
  - Links permanent `underline`
  - Abstände enger: `gap-x-3` → `gap-x-2`
  - Fontsize: `text-[13px]` → `text-[15px]`
- **Seitenränder:**
  - Container-Padding: `px-6` → `px-10 md:px-16` für Header, Content, Footer (einheitlich)
- **Validierung „Das Feld darf nicht leer sein.":**
  - Pro Feld State `touched` (true nach erstem `onBlur`, an den ein Wert geschrieben und wieder gelöscht wurde — also: nach jeder Eingabe setzen, dann bei `onBlur` Fehler anzeigen wenn leer)
  - Konkret: `touchedVnr` / `touchedPw` werden bei `onBlur` auf true gesetzt; Fehler wird angezeigt wenn `touched && value.trim() === ""`
  - Roter Hinweistext (`text-[#d32f2f]`, `text-[13px]`, `font-normal`, `mt-2`) unter dem Feld
  - EN-Übersetzung: „This field must not be empty."

Keine weiteren Dateien betroffen.
