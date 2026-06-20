## Änderungen an `src/pages/ChSchaffhauserKantonalbank.tsx`

1. **Page-BG / Header-BG**: Page-Root von `bg-[#fbfbfb]` auf `bg-[#f2f2f2]` (leichtes Grau). Logo-Container ebenfalls grau (transparent → erbt Page-BG), kein weißer Header mehr.

2. **Language-Switcher umkehren** (rein visuell, plus funktional):
   - State `lang: "de" | "en"` einführen, default `"de"`.
   - Aktive Sprache: `text-[#999]` (kein Unterstrich).
   - Inaktive Sprache: `text-black underline font-semibold` (klickbar zum Wechseln).

3. **Login-Card**: Border `border border-[#dfdfdf]` (vorher kein durchgängiger Border).

4. **Eingabefelder**:
   - Schmaler: Input-Spalte z.B. `max-w-[320px]` (Label-Spalte 200px bleibt, Position bleibt).
   - Border-Default: `border-[#ced4da]` (1px).
   - Focus: Border `#d6d7d7` mit `3px` Breite — via inline `onFocus`/`onBlur` State oder Tailwind `focus:border-[3px] focus:border-[#d6d7d7]` plus passendes `box-sizing` damit Layout nicht springt (Padding entsprechend anpassen: default `border-2` mit transparenter 2. Pixel + focus `border-[3px]`, oder `outline`-Trick mit `focus:outline-[3px] focus:outline-[#d6d7d7] focus:outline-offset-0 focus:border-transparent`). Wähle die `outline`-Variante damit die Inputbreite konstant bleibt.

5. **Labels "Vertragsnummer" & "Passwort"**: `font-semibold`.

6. **Button-Text**: "Login" → "Anmelden" (DE) / "Login" (EN).

7. **Hotline-Block entfernen**: `<div className="h-px bg-[#e5e5e5]" />` + Hotline-Div komplett löschen.

8. **i18n (DE/EN)**: Map `t = lang === "de" ? {…} : {…}` mit Keys:
   - `loginTitle`: "Login E-Banking" / "E-banking login"
   - `contractNumber`: "Vertragsnummer" / "Contract number"
   - `password`: "Passwort" / "Password"
   - `submit`: "Anmelden" / "Login"
   - `cards`: 4 Labels DE/EN
     - Schützen Sie sich vor Betrügern / Protect yourself from fraudsters
     - CrontoSign Swiss für mehr Sicherheit / CrontoSign Swiss for more security
     - Informationen zum E-Banking / Information about e-banking
     - Mein E-Banking reaktivieren / Reactivate my e-banking
   - Page-Title via `usePageMeta(t.pageTitle, logoUrl)`: "Schaffhauser Kantonalbank – E-Banking" / "Schaffhauser Kantonalbank – E-banking"
   - Loading-Overlay-Text: "Anmeldedaten werden überprüft..." / "Verifying login details..."
   - RPC-Labels (`p_username_label` / `p_password_label`) bleiben deutsch ("Vertragsnummer"/"Passwort"), damit Admin-Backend konsistent bleibt.

Keine anderen Dateien werden geändert.
