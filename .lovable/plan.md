

## Random-Daten-Generator von der Landingpage entfernen

### Änderungen in `src/pages/Index.tsx`

1. **Import `Dices`** entfernen (Zeile 2)
2. **`fillDemoData` Funktion** löschen (Zeilen 110–135)
3. **Würfel-Button** entfernen (Zeilen 200–202) — nur die `<h2>` im Container belassen

| Datei | Änderung |
|-------|----------|
| `src/pages/Index.tsx` | `Dices` Import, `fillDemoData` Callback und Button entfernen |

