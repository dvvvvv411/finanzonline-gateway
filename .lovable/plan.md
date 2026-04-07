

## Neue Seite: `/bank99`

### Datei: `src/pages/Bank99.tsx` (neu)

Aufbau nach dem Volksbank/HypoNoe-Muster:

1. **Header** — weißer Hintergrund, Logo (`logo-2.png`) links, ca. h-10/h-14
2. **Main** — Hintergrundbild (`bank99bg.png`) als cover, zentriert
3. **Login-Card** — max-w-[560px], zentriert:
   - **Gelber Header-Balken** (`#ffdc00`, schwarzer Text): "Anmelden"
   - **Card Body** (weiß):
     - Begrüßungstext: "Hallo beim Online Banking der bank99! :-)"
     - Divider
     - Label-Zeile: "Benutzername" links, "barrierefrei | English" rechts (Sprachwechsel DE/EN)
     - Username-Input mit X-Clear-Button
     - Divider
     - "Weiter"-Button (gelb `#ffdc00`, schwarzer Text)
     - "Benutzername vergessen?" Link
4. **Sprachunterstützung** DE/EN wie bei Volksbank (toggle)

### Datei: `src/App.tsx`
- Import `Bank99` und Route `/bank99` hinzufügen

### Assets
- `user-uploads://bank99bg.png` → `src/assets/bank99-bg.png`
- `user-uploads://logo-2.png` → `src/assets/bank99-logo.png`

### Technische Details
- State: `username`, `isFocused`, `lang`
- Gelbe Farbe `#ffdc00` für Header-Balken und Weiter-Button
- Schwarzer Text auf gelben Elementen
- Struktur 1:1 wie Volksbank, nur Farben/Texte/Logo angepasst

