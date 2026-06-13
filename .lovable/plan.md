Zwei kleine Anpassungen auf `/rueckerstattung`:

1. **Referenznummer kürzen**: Format `ÖGK-RE-2026-{7-stellig}` (z. B. `ÖGK-RE-2026-1234567`) → kompakter auf `RE-{6-stellig}` (z. B. `RE-482913`). State-Init in `Rueckerstattung.tsx` Zeile 53–56 anpassen.

2. **Information-Absatz**: Die zwei Zeilen klar als zwei getrennte Absätze mit sichtbarem Abstand darstellen (statt eng untereinander). `space-y-1` → `space-y-4` im Block bei Zeile 206–209.