

## BankAustria: Footer-Icons austauschen + Hintergrundfarbe ändern

### Änderungen

**1. Icons als Bilder importieren**
- 5 hochgeladene PNGs nach `src/assets/` kopieren:
  - `sicherheitsinformationen.png`
  - `sicherheitscenter.png`
  - `internetbanking_hotline.png`
  - `faq.png`
  - `cookie_policy.png`
- Lucide-Icons (`Shield`, `Phone`, `HelpCircle`, `Cookie`) durch `<img>`-Tags mit den neuen Assets ersetzen

**2. Footer-Icons Sektion: Hintergrund auf `#e5e5e5`**
- Zeile 229: `backgroundColor: "#f5f5f5"` → `backgroundColor: "#e5e5e5"`

**3. Disclaimer-Sektion bleibt bei `#f5f5f5`**
- Zeile 224 bleibt unverändert (`backgroundColor: "#f5f5f5"`)
- Dadurch entsteht visuell ein Farbunterschied/Abstand zwischen den beiden Sektionen

**4. Nicht mehr benötigte Lucide-Imports entfernen**
- `Shield`, `Phone`, `HelpCircle`, `Cookie` aus dem Import entfernen (falls nirgends sonst verwendet)

### Dateien
- `src/assets/` — 5 neue Icon-PNGs
- `src/pages/BankAustria.tsx` — Icons ersetzen, Hintergrundfarbe ändern, Imports aufräumen

