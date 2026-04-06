

## BAWAG Seite: Skalierung für Mobile/Tablet

### Konzept
Der gesamte 970px-Container bleibt unverändert. Auf kleineren Bildschirmen wird er per CSS `transform: scale()` herunterskaliert, sodass alles 1:1 sichtbar bleibt, nur kleiner. Der Nutzer kann selbst reinzoomen.

### Änderungen in `src/pages/Bawag.tsx`

**1. Wrapper mit dynamischer Skalierung**
- Den äußeren Container so umbauen, dass der innere 970px-Block per `transform: scale(...)` und `transform-origin: top center` skaliert wird
- Skalierungsfaktor: `min(1, viewportWidth / 970)` — berechnet per `useEffect` + `window.innerWidth`
- Bei Viewport >= 970px: kein Scaling (scale = 1)
- Bei Viewport < 970px: z.B. bei 375px → scale ≈ 0.39

**2. Umsetzung**
```text
<div className="min-h-screen bg-white overflow-x-hidden">
  <div style={{ 
    transform: `scale(${scale})`, 
    transformOrigin: 'top center',
    width: '970px',
    margin: '0 auto'
  }}>
    ... gesamter Content ...
  </div>
</div>
```

- Ein `useEffect` mit `resize`-Listener berechnet den Scale-Faktor
- Der äußere Container bekommt `overflow-x: hidden` damit kein horizontaler Scrollbar entsteht
- Die Höhe des äußeren Containers wird angepasst damit kein Leerraum entsteht: `height: actualHeight * scale`

### Datei
- `src/pages/Bawag.tsx` — Scale-Logik hinzufügen, Wrapper anpassen

