## /btv – Runde 6

`src/pages/Btv.tsx`:

1. SSL-Hinweis Farbe `#000` → `#292929`.
2. Komplette Meldungen-Sektion entfernen (Titel "Meldungen" + Box mit Phishing-Text + Datum). Der "Weitere Nachrichten anzeigen"-Button bleibt erhalten.
3. "Weitere Nachrichten anzeigen" Button: Hover-Background `#336785` (per `onMouseEnter/Leave` State).
4. AT-Flagge im Footer größer: `height: 18` → `28`.
5. Erstanmeldung-Balken:
   - Text linker positionieren: `justifyContent: "flex-end"` → eigene rechte Position bleibt, aber Padding rechts/links anpassen — der Text-Container bekommt `padding: "12px 8px"`, davor/danach 1px Divider mit nur Höhe ~20px (vertikal zentriert) statt voller Höhe.
   - Divider: nicht mehr 100% Höhe weiß. Stattdessen 1px breit, ca. 16-18px hoch, weiß, vertikal zentriert (per `alignItems: center` am Wrapper + Divider als feste `height: 18`).
6. Links zu Weiterführende-Links Items hinzufügen: `links` Array umstellen auf `{label, href}` Objekte, beim Klick `window.open(href, "_blank")`.
7. Footer-Links als `<a>` Tags mit `href`, `target="_blank"`, default kein Underline, Hover Underline. Support → `href="javascript:void(0)"`. Bold bleibt, weiße Farbe bleibt.
8. Inputs (Verfügernummer, PIN, Sprache) Höhe vergrößern: `38` → `44`. Verfügernummer-Input (nutzt nur Padding) → explizit `height: 44, padding: "0 12px"`.
