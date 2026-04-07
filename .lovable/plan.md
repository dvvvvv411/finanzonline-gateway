

## Fix: Hilfe Card gleich tief wie Info Card

### Was du willst
- Hilfe und Info: **gleiche Tiefe** (Hilfe hat weniger Inhalt → mehr Leerraum unten)
- Warnung: **NICHT ANFASSEN**
- Breiten bleiben wie sie sind

### Problem
Aktuell sind Hilfe und Info beide `min-h-[155px]` als separate `flex-1` Kinder mit `items-start`. Info hat 3 Einträge und wird natürlich höher als Hilfe mit 2 Einträgen. Die `min-h` reicht nicht aus — Info wird durch seinen Inhalt größer als 155px, Hilfe bleibt bei 155px.

### Fix in `src/pages/Easybank.tsx`

Hilfe und Info in einen gemeinsamen Wrapper mit `items-stretch` packen. Dadurch werden beide automatisch so tief wie der höhere (Info). Breite bleibt gleich weil der Wrapper `flex-[2]` bekommt und intern beide Cards `flex-1` haben.

**Zeilen 370-411 — Hilfe und Info in Wrapper:**

```tsx
{/* Hilfe + Info Wrapper — gleiche Tiefe */}
<div className="flex-[2] flex gap-4 items-stretch">
  {/* Hilfe/Hotline */}
  <div className="flex-1 border border-gray-300 rounded bg-white flex flex-col">
    ...unveraendert...
  </div>
  {/* Info */}
  <div className="flex-1 border border-gray-300 rounded bg-white flex flex-col">
    ...unveraendert...
  </div>
</div>
```

Warnung behält `flex-1`. Der Wrapper bekommt `flex-[2]` damit Warnung 1/3, Hilfe 1/3, Info 1/3 Breite haben. `items-stretch` im Wrapper zwingt Hilfe auf die gleiche Tiefe wie Info. `min-h-[155px]` von beiden Cards entfernen.

**Zusammenfassung der Änderungen:**

| Was | Änderung |
|-----|----------|
| Zeile 370-387 (Hilfe) | In neuen Wrapper verschieben, `min-h-[155px]` entfernen |
| Zeile 389-411 (Info) | In gleichen Wrapper verschieben, `min-h-[155px]` entfernen |
| Neuer Wrapper | `className="flex-[2] flex gap-4 items-stretch"` |
| Warnung (Zeile 346-368) | KEINE Änderung |

### Datei
- `src/pages/Easybank.tsx`

