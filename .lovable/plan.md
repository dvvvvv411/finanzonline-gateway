

## BAWAG Seite: Festes 970x490px Layout mit allem zentriert

### Konzept
Alles wird in einen **festen 970px breiten Container** zentriert. Das Hintergrundbild hat exakt **970x490px**. Header (Logo, Datum, Sprachen), Login-Card, Info-Card und Footer sind alle innerhalb dieses 970px-Containers. Bewusst veraltet/old-school.

### Layout

```text
          ┌─────────── 970px ───────────┐
          │ Logo   Datum    DE EN BKS TR │  ← Header über dem Bild
          ├─────────────────────────────┤
          │ ┌─ Background 970×490 ────┐ │
          │ │                         │ │
          │ │ ┌Login─┐ ┌Info────────┐ │ │
          │ │ │      │ │Sich│Serv│Su│ │ │
          │ │ │      │ └───────────┘ │ │
          │ │ │      │               │ │
          │ │ └──────┘               │ │
          │ └─────────────────────────┘ │
          │ Impressum AGB Daten... ©    │  ← Footer direkt unter dem Bild
          └─────────────────────────────┘
```

### Änderungen in `src/pages/Bawag.tsx`

1. **Äußerer Container**: `min-h-screen`, `bg-[#f0f0f0]`, `flex flex-col items-center` — alles zentriert
2. **Innerer Container**: feste Breite `w-[970px]`, darin alles
3. **Header**: Innerhalb des 970px-Containers, weiß, mit Logo links, Datum Mitte, Sprachen rechts — kein fullwidth mehr
4. **Bild-Container**: `relative`, `w-[970px]`, `h-[490px]`, Hintergrundbild als `background-image` mit `background-size: cover`
5. **Login-Card + Info-Card**: Absolut positioniert innerhalb des Bild-Containers mit `absolute`, z.B. Login links oben (`top-6 left-6`), Info rechts oben (`top-6 left-[340px]` oder `right-6`)
6. **Footer**: Innerhalb des 970px-Containers, direkt unter dem Bild, weiß, Links + Copyright

### Datei
- `src/pages/Bawag.tsx` — komplett umbauen auf festes 970px-Layout

