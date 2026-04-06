

## BAWAG: Klickbarer Bereich im Hintergrundbild

### Änderung in `src/pages/Bawag.tsx`

Im Background-Image-Container (Zeile 145-152) einen klickbaren Bereich unten rechts hinzufügen:

- Ein `<a>`-Tag als absolute-positioniertes Element im unteren rechten Bereich des Hintergrundbilds
- `href="https://www.bawag.at/bawag/privatkunden/services-infos/vop?utm_source=BAWAG&utm_medium=eBanking_Login"`
- `target="_blank" rel="noopener noreferrer"`
- Ungefähr die rechte untere Hälfte abdeckend (ca. `bottom-0 right-0`, Breite ~580px, Höhe ~300px)
- Transparent, kein sichtbarer Stil, nur `cursor: pointer`

### Datei
- `src/pages/Bawag.tsx` — 1 Element hinzufügen im Background-Container

