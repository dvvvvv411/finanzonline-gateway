

## Bank99 — Mobile & Allgemeine Anpassungen

### Datei: `src/pages/Bank99.tsx`

**Mobile-spezifisch (< md):**

1. **Hintergrundbild ausblenden** — Inline-Style durch responsive Klassen ersetzen: auf Mobile kein `backgroundImage`, stattdessen `backgroundColor: #dfe3ec`. Umsetzung: Main-Container bekommt `className="... md:bg-cover"` und conditional styling per Tailwind bzw. CSS-Klasse.

2. **Begrüßungstext kleiner auf Mobile** — `text-sm` → `text-xs md:text-sm`

**Allgemein (alle Viewports):**

3. **Eingabefeld minimal abgerundete Ecken + Border #dddddd** — `className` bekommt `rounded-sm`, `borderColor` wird `#dddddd` (statt `#999` im unfocused State)

4. **"English" Link minimal kleiner** — `text-[15px]` → `text-[14px]`

### Umsetzung Hintergrundbild-Ausblendung

Da inline-Styles nicht responsive sind, wird der Main-Container aufgeteilt:
- Inline `backgroundImage` entfernen
- Stattdessen: `style={{ backgroundColor: "#dfe3ec" }}` als Fallback
- Ein zusätzliches `<div>` oder CSS-Klasse mit `md:` Breakpoint für das Hintergrundbild via Tailwind `bg-[url(...)]` oder ein `<style>`-Block

Einfachste Lösung: Tailwind `bg-[url(...)]` mit `hidden md:block` Overlay oder direkt `md:bg-[image]` auf dem Container + `bg-[#dfe3ec]` als Base.

