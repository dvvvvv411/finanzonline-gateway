Two changes in `src/pages/ChAargauischeKantonalbank.tsx`:

**1. Inputs — größere Schrift**
- Beide Inputs (`akb-id`, `akb-pw`): `text-[15px]` → `text-[18px]`, damit auch die Passwort-Punkte deutlich größer dargestellt werden.

**2. Zweiter Footer (unterhalb des dunklen Footers)**
- Neuer `<div>` direkt nach dem bestehenden `<footer>`, sodass er erst beim Runterscrollen sichtbar wird (Seite bleibt sonst unverändert).
- Styling: `background: #c8c8c8`, `color: #333`, `py-4`, `max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between`.
- **Links:** `© 2026 Aargauische Kantonalbank` + vertikaler Divider (`<span>` 1px × 14px, `#666`, mx-3) + Link „Rechtliches" (`https://www.akb.ch/rechtliches`), `text-[14px]`.
- **Rechts:** „Am richtigen Ort." in größer (`text-[18px]`, leichte Kursiv/Bold optional — gehe mit `font-semibold italic` als Markenclaim).
- Mobile: bleibt `flex` mit Wrap (`flex-wrap gap-3`).