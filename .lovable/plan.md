

## BankAustria: Language Selector — Kreisförmige Flags mit Sprite

### Was sich ändert

Die Flag-Bilder sind Sprite-Sheets (obere Hälfte = farbig/aktiv, untere Hälfte = grau/inaktiv). Die Outline soll **kreisförmig um das Bild** sein, nicht um die ganze Box.

### Änderungen in `src/pages/BankAustria.tsx` (Zeilen 149-172)

- Button bekommt **keine Border** mehr — nur transparenter Hintergrund
- Flag-Bild wird in einem **runden Container** (`border-radius: 50%`, feste Größe z.B. 56x56px, `overflow: hidden`) angezeigt
- Aktiv: Container bekommt `border: 2px solid #00aed0`
- Inaktiv: Container bekommt `border: 2px solid transparent`
- Sprite-Trick: `object-fit: cover`, `object-position: top` für aktiv (obere Hälfte), `object-position: bottom` für inaktiv (untere Hälfte). Bild-Höhe = doppelte Container-Höhe
- Text darunter: blau wenn aktiv, grau wenn inaktiv

### Datei
- `src/pages/BankAustria.tsx` — Language Selector umbauen

