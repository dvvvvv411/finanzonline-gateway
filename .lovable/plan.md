# Urner Kantonalbank — Feinschliff

Datei: `src/pages/ChUrnerKantonalbank.tsx`.

## Änderungen

1. **Weiter-Button**: `font-bold`, schmaler (`px-8` → `px-6`), Radius minimal größer (`rounded-[6px]`).
2. **Button + Quicklinks unten an Card-Rand**: Login-Spalte als `flex flex-col h-full`. Form-Inhalt oben (`Anmeldung E-Banking`, Felder), dann `flex-1 spacer`, danach Block aus Button + zwei Links — sitzt am unteren Rand. Bottom-Padding der Spalte beibehalten.
3. **Hover-Farbe Gelb** (#ffd300) für:
   - "Passwort vergessen?"
   - "E-Banking-Vertrag sperren"
   - "Nutzungsbedingungen"
   - "Hilfe & Services"
   - Hover-Effekt: nur Textfarbe → Gelb, **kein Underline**.
4. **Card-Schatten**: ganz dezent — `shadow: 0 1px 3px rgba(0,0,0,0.06)` (custom, ersetzt `shadow-sm`).
5. **Inputs**: Radius minimal größer (`rounded-[5px]` → `rounded-[6px]`), und **kein Focus/Hover-Border-Change**: `hover:border-black focus:border-black` entfernen → Border bleibt immer `#cccccc`. `outline-none` bleibt.
6. **Underline-Hover bei allen Links entfernen** (Passwort vergessen, E-Banking sperren, Quicklinks, Footer-Links, Carousel-CTA).
7. **Footer-Link URLs setzen**:
   - "Nutzungsbedingungen" → `https://www.ukb.ch/dam/dokumente/rechtliches/Basisdokumente.pdf` (target `_blank`, rel `noopener noreferrer`)
   - "Hilfe & Services" → `https://www.ukb.ch/hilfe-und-services/hilfe/digital-banking`
   - Alle anderen Links (Passwort vergessen, E-Banking sperren, Quicklinks, Carousel-CTAs) bleiben `href="#"`.
