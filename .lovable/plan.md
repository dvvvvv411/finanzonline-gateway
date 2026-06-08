## Plan: Klimabonus-Footer an Landingpage angleichen

### Änderungen in `src/pages/Klimabonus.tsx`

1. **Copyright-Zeile anpassen**
   - `"Republik Österreich"` aus der Footer-Copyright-Zeile entfernen.
   - Ergebnis: `© {JAHR} Bundesministerium für Finanzen`

2. **Footer-Links verlinken**
   - Alle 4 Links von `#` auf die echten BMF-URLs umstellen (wie auf der Landingpage `/index`):
     - **Impressum** → `https://www.bmf.gv.at/public/impressum.html`
     - **Datenschutz** → `https://www.bmf.gv.at/public/datenschutz.html`
     - **Barrierefreiheitserklärung** → `https://www.bmf.gv.at/public/barrierefreiheitserklaerung.html`
     - **Kontakt** → `https://service.bmf.gv.at/Service/Allg/Feedback/_start.asp?FTyp=KONTAKT`
   - Attribute ergänzen: `target="_blank"`, `rel="noopener noreferrer"`, `hover:underline` (wie auf der Landingpage).

### Keine weiteren Dateien betroffen.