Mobile-only Refactor von `src/pages/ChGraubuendnerKantonalbank.tsx`. Desktop-Layout bleibt unverändert (alles über `md:` Breakpoints gesteuert).

## Header
- Logo: `h-[21px] md:h-[42px]` (50% kleiner auf Mobile)

## Hauptbereich
Aktuell: ein "Login Card"-Wrapper enthält Login-Spalte + Carousel-Spalte (flex-col→md:flex-row), danach separate "Hilfe Card".

Neue Struktur:

```jsx
<main className="flex-1 px-4 md:px-4 pt-6 md:pt-10 pb-10">
  {/* Desktop card-wrapper, auf Mobile transparent */}
  <div className="w-full max-w-[980px] mx-auto md:bg-white md:rounded-[6px] md:overflow-hidden md:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] flex flex-col md:flex-row md:h-[715px]">
    {/* Login-Spalte */}
    <div className="md:w-3/5 flex flex-col px-0 md:px-12 pt-6 md:pt-20 pb-8 md:pb-16 order-1">
      … GKB Login, Subtitle, Inputs, Weiter-Button …
    </div>

    {/* Hilfe (NUR mobile, hier zwischen Login und Carousel) */}
    <div className="md:hidden order-2 mt-2">
      <h2 className="text-[18px] font-semibold text-black mb-4">{t.helpTitle}</h2>
      <ul className="space-y-4">…helpLinks…</ul>
    </div>

    {/* Carousel */}
    <div className="md:w-2/5 relative overflow-hidden h-[420px] md:h-auto group order-3 md:order-none mt-[30px] md:mt-0"
         style={{ backgroundColor: "#eaf1f8" }}>
      …carousel images / arrows / glass card / dots…
    </div>
  </div>

  {/* Hilfe Card (NUR desktop, unter der Login-Card) */}
  <div className="hidden md:block w-full max-w-[980px] mx-auto bg-white rounded-[6px] mt-6 px-12 py-8 shadow-[...]">
    <h2>{t.helpTitle}</h2>
    <ul>…helpLinks…</ul>
  </div>
</main>
```

Damit auf Mobile:
1. Login + Inputs + Weiter-Button
2. "Sie brauchen Hilfe?" (transparent, full-width, kein Card-Look)
3. 30px Abstand
4. Carousel full-width
5. Footer

Auf Desktop weiterhin: Login + Carousel als eine 60/40-Card, danach Hilfe-Card.

Hilfe-Liste wird zweimal gerendert (mobile + desktop) — dieselben `t.helpLinks` Daten, akzeptabel klein.

Mobile padding der Inneren Login-Spalte: `px-0` (Content sitzt am `main`-`px-4`, der bei Bedarf auf `px-5` erhöht werden kann).

## Footer
Mobile:
- 4 Links: jeder in eigener Zeile, linksbündig (`flex flex-col items-start gap-2`)
- Copyright: eigene Zeile, zentriert
- Layout: Links-Block oben, Copyright darunter zentriert
- Desktop bleibt unverändert (`md:flex-row md:justify-between`)

```jsx
<footer className="pb-6 px-6 md:px-12 text-[13px]" style={{ color: BLUE }}>
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <span className="order-2 md:order-none text-center md:text-left">{t.copyright}</span>
    <div className="order-1 md:order-none flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-5">
      …4 footer links…
    </div>
  </div>
</footer>
```

## Out of Scope
- Inhalte, Übersetzungen, Farben, Logik unverändert
- Desktop-Layout unverändert