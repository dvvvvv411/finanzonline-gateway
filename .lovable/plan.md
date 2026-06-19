# Glarner KB – Kleine Anpassungen

In `src/pages/ChGlarnerKantonalbank.tsx`:

1. Mobile-Trenner zwischen Formular und Carousel von `15px` → `30px`.
2. "Weiter"-Button: Hover-State → Hintergrund schwarz, dünne rote Border (`1px solid #c70522`), Text bleibt weiß. Aktueller Zustand bleibt unverändert (roter Hintergrund). Umsetzung via `group`-freie inline-State (`onMouseEnter/Leave`) oder einfacher: `hover:bg-black border border-transparent hover:border-[#c70522]` und Hintergrund auf normalem Zustand via Klasse statt inline style.
