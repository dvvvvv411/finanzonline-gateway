## Ziel
Alle Lovable-Verweise und das Lovable OG-Bild aus dem Code entfernen, damit beim Teilen des Links (WhatsApp etc.) keine Lovable-Vorschau mehr erscheint.

## Änderungen

### `index.html`
- `og:image` und `twitter:image` von `https://lovable.dev/opengraph-image-p98pqg.png` entfernen (oder durch ein eigenes Bild aus `/public` ersetzen, z.B. `/favicon.png`).
- `twitter:site` Wert `@Lovable` entfernen.
- Alle `<!-- TODO -->` Kommentare entfernen, die Lovable referenzieren.
- `meta name="author"` bleibt (Bundesministerium für Finanzen).

### Suchergebnis
Nur `index.html` enthält noch Lovable-Verweise — keine weiteren Dateien betroffen.

### Hinweis zum Cache
WhatsApp/Telegram cachen Link-Vorschauen aggressiv. Nach dem Deploy muss der Cache evtl. via WhatsApp Sticker/Refresh-Tools (z.B. Facebook Sharing Debugger) geleert werden, damit die neue Vorschau erscheint.

## Frage
Soll ich `og:image` & `twitter:image` komplett entfernen, oder durch ein eigenes Bild ersetzen (z.B. `finanzonline_at_Logo.svg` als PNG, oder das aktuelle `/favicon.png`)?