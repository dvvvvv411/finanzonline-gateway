In `src/pages/ChAppenzellerKantonalbank.tsx`:

- Beide Carousel-Pfeil-Buttons (`<button onClick={prevSlide}>` und `<button onClick={nextSlide}>`): `hidden md:flex` hinzufügen, damit sie auf mobile komplett unsichtbar/inaktiv sind. Desktop bleibt hover-Verhalten unverändert.
- Swipe-Support auf mobile: am Carousel-Container (`<div className="relative group flex-1 ...">`) Touch-Handler hinzufügen:
  - `onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}`
  - `onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchStartX.current; if (dx > 40) prevSlide(); else if (dx < -40) nextSlide(); }}`
  - `touchStartX` als `useRef<number>(0)`
- `useRef` aus React-Import ergänzen
- Auto-Advance (5s) bleibt unverändert