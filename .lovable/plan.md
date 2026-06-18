## Anpassungen ChRaiffeisen.tsx

### 1. Floating-Label Inputs
- Label „Vertragsnummer" / „Persönliches Passwort" wandert in das Feld als **Floating-Label** (kein normales `placeholder`-Attribut, sondern animiertes `<label>` darüber).
- **Default-State** (leer, nicht fokussiert): Label sitzt **mitten im Feld** auf der Unterstrich-Linie, Farbe `#949494`, Unterstrich `border-b border-[#949494]` (1 px).
- **Focus / gefüllt**: Label gleitet sanft nach oben (kleinere Schrift, ca. 12 px), Unterstrich wird `border-b-2 border-black` (dicker + schwarz). Transition `transition-all duration-200 ease-out` für Position, Größe und Farbe.
- Umsetzung: Wrapper `relative`, `<input class="peer">` mit `placeholder=" "`, `<label class="absolute left-0 top-2 text-[#949494] transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs">`. Unterstrich via `border-b border-[#949494] peer-focus:border-b-2 peer-focus:border-black peer-[:not(:placeholder-shown)]:border-black` auf dem Wrapper.

### 2. „Passwort vergessen?" Link
- Schrift größer: `text-base` (16 px) statt `text-sm`.
- Unterstrich mit Abstand zum Text, damit das „g" nicht beschnitten wird: `underline underline-offset-4` (oder `underline-offset-[6px]`). Farbe bleibt bronze `#9B8666`.

### 3. Bottom-Service-Links („Neues Gerät für PhotoTAN aktivieren" / „Hilfe und Kontakt")
- Gleiche Schriftgröße wie „Passwort vergessen?" → `text-base`.
- Gleicher horizontaler Container wie das Formular: nicht mehr im vollen `<main>`-Block sondern in einem Container mit identischem `md:ml-[22%]` und symmetrischem `md:mr-[22%]` (bzw. `md:max-w-[calc(100%-44%)]`), sodass linker Startpunkt = Formular-Start und rechter Endpunkt = spiegelbildlich. So beginnt „PhotoTAN" exakt unter dem Formular und „Hilfe und Kontakt" hat denselben Abstand zum rechten Rand. `underline underline-offset-4`.

### 4. „Weiter"-Button
- Leicht abgerundete Ecken: `rounded-md` (6 px). Rest bleibt unverändert (schwarz, kompakt).

### Nicht betroffen
- Header, schwarzer Wartungs-Banner, Footer, Logo, Submit-Logik bleiben unverändert.