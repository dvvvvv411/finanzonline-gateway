
## BAWAG: Mobile/Tablet endlich wirklich oben mittig

### Ursache
Das Problem ist nicht nur `transform-origin`, sondern die Struktur:
Aktuell wird der unskalierte 970px-Block zentriert und erst danach skaliert. Dadurch ist nicht der sichtbare Content mittig, sondern nur die unsichtbare 970px-Fläche.

### Richtiger Fix
Ich stelle die Struktur auf einen echten Zentrierungs-Slot um:

- `scale = min(1, window.innerWidth / 970)` bleibt
- neuer Wrapper mit `display: flex; justify-content: center; width: 100%`
- darin ein **scaled slot** mit:
  - `width = 970 * scale`
  - `height = contentHeight * scale`
- erst **innerhalb** dieses Slots liegt der echte 970px-Content mit:
  - `width: 970px`
  - `transform: scale(scale)`
  - `transform-origin: top left`

So wird die **sichtbare verkleinerte Fläche** oben mittig zentriert.

```text
Viewport
┌──────────────────────────────┐
│       centered slot          │  <- width = 970 * scale
│    ┌────────────────────┐    │
│    │ 970px content      │    │  <- scale(...) inside
│    └────────────────────┘    │
└──────────────────────────────┘
```

### Änderungen in `src/pages/Bawag.tsx`
1. `BASE_WIDTH = 970` und `scaledWidth = BASE_WIDTH * scale` ergänzen
2. Die aktuelle Root-Struktur umbauen:
   - Root nur noch für Hintergrund / Font / Overflow
   - neuer Center-Wrapper für horizontale Zentrierung
   - Höhe vom skalierten Inhalt auf den Slot legen, nicht auf den Root
3. Den 970px-Inhalt im Slot rendern und dort weiter skalieren

### Ergebnis
- Desktop: bleibt wie jetzt
- Tablet/Mobile: kompletter Content bleibt sichtbar
- Der ganze BAWAG-Block sitzt **oben mittig**
- Kein Linksschiefstand, kein Rechtsabschneiden

### Datei
- `src/pages/Bawag.tsx`
