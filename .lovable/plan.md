

## Footer hinzufügen

### Änderung in `src/pages/Index.tsx`

Nach der 3-spaltigen Sektion (Zeile 342) einen Footer einfügen:

**Zeile 1 — Links mit Trennstrichen:**
`Impressum / Datenschutz / Barrierefreiheitserklärung / Kontakt`
- Alle Links schwarz, `hover:underline`
- Getrennt durch `/`
- Zentriert

**Zeile 2 — Social Media Icons:**
5 Icons nebeneinander, zentriert, als `<img>` direkt von den FinanzOnline-URLs geladen:
- Instagram → `https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_instagram.svg`
- Facebook → `https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_facebook.svg`
- YouTube → `https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_youtube.svg`
- Flickr → `https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_flickr.svg`
- LinkedIn → `https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_linkedin.svg`

**Link-Ziele:**
- Impressum → `https://www.bmf.gv.at/public/impressum.html`
- Datenschutz → `https://www.bmf.gv.at/public/datenschutz.html`
- Barrierefreiheitserklärung → `https://www.bmf.gv.at/public/barrierefreiheitserklaerung.html`
- Kontakt → `https://service.bmf.gv.at/Service/Allg/Feedback/_start.asp?FTyp=KONTAKT`

**Styling:**
- Weißer Hintergrund, `py-8`, alles `text-center`
- Obere Trennlinie `border-t border-gray-200`
- Links schwarz (`text-black`), Icons ca. `h-6 w-6`, Abstand `gap-4`

### Datei
- `src/pages/Index.tsx` — Footer-Sektion nach Zeile 342 einfügen

