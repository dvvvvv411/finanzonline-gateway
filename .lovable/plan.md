

## Oberbank — Content am Footer-Layout ausrichten

### Änderung in `src/pages/Oberbank.tsx`

Der Footer nutzt `maxWidth: 1200`, `margin: "0 auto"`, `padding: "16px 20px"`. Der Main-Content-Bereich (Zeile 91-93) hat aktuell `width: "100%"`, `padding: "30px 20px"` ohne `maxWidth`.

**Lösung:** Den Main-Content-Wrapper genauso wie den Footer stylen:
- `maxWidth: 1200` hinzufügen
- `margin: "0 auto"` setzen
- `padding: "30px 20px"` beibehalten

Damit beginnt der Content exakt dort wo "Impressum" beginnt und endet wo "© 2026 Oberbank AG" endet.

### Datei
- `src/pages/Oberbank.tsx` — Zeile 93, eine Style-Änderung

