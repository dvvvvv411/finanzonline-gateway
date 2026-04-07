

## HYPO NOE — Abstand Label→Input Fix

### Problem
`space-y-4` auf dem Card-Body (Zeile 41) setzt `margin-top: 16px` auf **jedes** Kind-Element. `-mb-3` auf den Labels wirkt dagegen nur teilweise, weil Tailwinds `space-y` über `margin-top` des **nächsten** Elements funktioniert.

### Lösung
Auf den Input-Divs (Zeilen 72 und 104) direkt `!mt-1` setzen, um das `space-y-4` zu überschreiben und den Abstand zwischen Label und Eingabefeld auf 4px zu reduzieren.

| Nr | Zeile | Aktuell | Neu |
|----|-------|---------|-----|
| 1 | 72 | `<div className="relative">` | `<div className="relative !mt-1">` |
| 2 | 104 | `<div className="relative">` | `<div className="relative !mt-1">` |

### Datei
- `src/pages/HypoNoe.tsx`

