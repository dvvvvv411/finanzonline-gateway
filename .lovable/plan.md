

## BankAustria: Promo-Banner aktualisieren

### Änderungen

**1. Hintergrundbild ersetzen**
- Hochgeladenes Bild (`user-uploads://1772443677713.png`) nach `src/assets/` kopieren und als neues `promoBg` importieren

**2. Texte im Banner vergrößern**
- Titel "Lässt sich einrichten": von `text-3xl font-light` auf `text-5xl font-bold`
- Untertitel: von `text-base` auf `text-xl font-bold`
- "MEHR ERFAHREN" Button bleibt wie er ist

**3. Caption-Zeile unter dem Banner**
- Grauen Hintergrund (`#e8e8e8`) entfernen → transparent (kein eigener Background, liegt direkt auf dem Banner-Bild)
- Text deutlich größer machen (von `text-[10px]` auf `text-sm`)
- Caption als Overlay am unteren Rand des Banners positionieren statt als separater Block darunter
- Text in Weiß oder heller Farbe damit lesbar auf dem Bild

### Datei
- `src/pages/BankAustria.tsx` — Promo-Banner-Bereich (Zeile 197-226)

### Technischer Ansatz
- Caption wird `absolute bottom-0` innerhalb des Banner-Containers positioniert
- Kein eigenes `<div>` mit grauem Background mehr
- Padding bleibt für Abstand

