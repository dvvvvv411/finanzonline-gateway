## Änderungen `/ch/thurgauer-kantonalbank`

### 1. Assets
- Bestehendes `src/assets/tkb-footer-logo.svg.asset.json` wird für den Footer (neues TKB-Logo) wiederverwendet bzw. neu hochgeladen aus `user-uploads://footerlogo-2.svg`, falls Inhalt abweicht.

### 2. Header
- OLIVIA-Logo kleiner (`h-[20px] md:h-[24px]`).
- Daneben Text **„Das Kundenportal der TKB"** in Weiss, `text-[14px] md:text-[16px]`.
- DE/EN Sprachumschalter **entfernen**. `lang`-State fix auf `"de"` (oder Variable behalten, Buttons raus).

### 3. Login-Block
- H1 ersetzen durch **„LOGIN OLIVIA E-BANKING"** (uppercase) in Farbe `#005d38`.
- Darunter Subline **„Ihre Zugangsdaten"** in `#6c6e70` / Grau-Schwarz, `text-[14px]`.

### 4. Eingabefelder (Floating-Label-Pattern)

Eigene `<FloatingInput>`-Komponente innerhalb der Datei. Verhalten:

- Standard: kein Border ausser unten 1 px schwarz. Hintergrund weiss. Placeholder gross (`text-[16px]`) mittig vertikal.
- Fokus oder Wert vorhanden: Label klein (`text-[11px]`) oben links, Input-Text darunter.
- Fokus: untere Border `#9fd32f` (grün), 2 px.
- Blur ohne Eingabe (Pflichtfeld) → **nur Vertragsnummer**:
  - Hintergrund `#f9e6ed`
  - Untere Border `#9c013c`
  - Label-Farbe `#9c013c`
  - Fehlertext darunter „Bitte geben Sie Ihre Vertragsnummer ein." (EN: „Please enter your contract number.") in `#9c013c`
- Passwort: **keine** Fehlerstil-Logik. Wenn Wert vorhanden → untere Border grün `#9fd32f`. Augensymbol (`Eye` / `EyeOff` von lucide, `text-[#9a9a9a]`) rechts im Feld zum Toggle `type="password"` / `text"`.

### 5. Quicklinks
- Bleiben unverändert (grün, mit Pfeil, unterstrichen).

### 6. Info-Cards
- Titel `font-normal` (statt bold), Farbe `#3a3a3a` (schwarz/grau).
- Card-Links: `no-underline` (Pfeil + Text bleiben grün).
- Card 2 „Mehr Informationen"-Link: `mt-auto pt-6` → `mt-3` (näher am Text).

### 7. Footer (Komplettumbau)
- Direkt über `<footer>`: 1 px Divider in `#82b613` (volle Breite, kein Margin oben).
- Footer-Inhalt: `flex justify-between items-center`, max-w-1100, padding wie bisher.
  - Links: TKB-Footer-Logo (`<img src={footerLogo.url}>`), Höhe `h-[36px]`.
  - Rechts: Text **„tkb.ch"** in `#006d41`, `text-[15px]`, fett, kein Underline, als Link `https://www.tkb.ch`.
- Keine Rechtliche-Hinweise/Datenschutz/Impressum/Kontakt-Links mehr.
- `footerLinks`-Array und Mapping entfernen.

### 8. Übersetzungen
- Neu: `loginTitle = "LOGIN OLIVIA E-BANKING"`, `credentialsLabel = "Ihre Zugangsdaten"` / „Your credentials", `kundenportal = "Das Kundenportal der TKB"` / „TKB's customer portal", `requiredVnr = "Bitte geben Sie Ihre Vertragsnummer ein."` / EN-Pendant.
- Alte `required`-Übersetzung entfernen/anpassen.
- Card-Titel/-Texte bleiben.

### 9. Sonstiges
- Keine Änderungen an Routing, `App.tsx`, RPC-Call, LoadingOverlay, `usePageMeta`.
- Keine neuen Design-Tokens — Farben inline.

### Offene Frage
Falls das hochgeladene `footerlogo-2.svg` von der bereits existierenden `tkb-footer-logo.svg.asset.json` abweicht, lade ich es neu hoch und ersetze die Pointer-Datei. Andernfalls weiter mit bestehendem Asset.
