## Was fehlt für ein 1:1 Ergebnis

Vergleich Original (links) ↔ Unsere aktuelle Version:

### 1. Header
- **Original**: Logo links, **kein** beiger Balken oben rechts
- **Unsere**: Hat einen beigen Akzent-Streifen → **entfernen**

### 2. Schwarzer Warnungs-Banner (fehlt komplett)
- Direkt unter dem Header ein **schwarzer Vollbreiten-Banner** mit weißer Schrift:
  „**Wartungsarbeiten im E-Banking am 19. / 20. Juni 2026**   Mehr anzeigen"
  („Mehr anzeigen" unterstrichen, rechts daneben)

### 3. Login-Bereich Positionierung
- **Original**: Form sitzt **links-zentriert** auf einer Spalte (~max 530 px), nicht in der Mitte des Viewports
- **Unsere**: Form ist horizontal zentriert → **linksbündig in einem max-w-Container mit linkem Padding/Margin** umstellen

### 4. Überschrift „Login für E-Banking"
- **Original**: **fett (bold)**, ~32 px, schwarz, **linksbündig**
- **Unsere**: `font-light`, zentriert → **`font-bold` + `text-left`**

### 5. Eingabefelder
- **Original**: dünne **schwarze** Unterstrich-Linie, keine Augen-Icon-Toggle sichtbar (im Default-State)
- **Unsere**: graue Linie, mit Augen-Icon → Linie auf `border-black`/`border-gray-900` ändern; Augen-Toggle entfernen (optional behalten ist okay, original hat keinen)

### 6. „Weiter"-Button — größter Unterschied
- **Original**: **schwarzer** Button (`#1A1A1A`), weißer Text, **kompakt rechteckig** (~150 px breit, nicht volle Breite), kein Abrunden
- **Unsere**: roter, vollbreiter, gerundeter Button → komplett umbauen: `bg-black text-white px-12 py-3 rounded-none w-auto`

### 7. „Passwort vergessen?" Link
- **Original**: **bronze/tan** Farbe (`#A08C6A` o.ä.), **unterstrichen**, **linksbündig** unter dem Button
- **Unsere**: rot, zentriert, ohne Unterstrich → Farbe + Alignment + Underline anpassen

### 8. Service-Links („PhotoTAN aktivieren" / „Hilfe und Kontakt")
- **Original**: stehen am **unteren Rand des ersten Viewports**, **links** (PhotoTAN) und **rechts** (Hilfe), **bronze unterstrichene Textlinks** ohne Icons, ohne Chevron, ohne Trennlinien
- **Unsere**: gestapelte Liste mit Icon, Chevron und Hover-Hintergrund → komplett umbauen zu einer `flex justify-between` Reihe ganz unten im 100vh-Bereich, nur Text + Underline + bronze Farbe

### 9. Sekundär-Footer (unter dem 100vh-Bereich)
- Aktuell vorhanden — sieht bereits okay aus, aber:
  - **Trennlinie/Hintergrund**: Original-Footer ist auf weißem Bg mit dezenter Trennlinie statt grauem Bg
  - **Reihenfolge/Stil prüfen** sobald ich den unteren Bereich des Originals scrolle (für Plan: Footer auf weiß setzen, kleine graue Schrift)

## Implementierung
Eine Datei wird angepasst: `src/pages/ChRaiffeisen.tsx`. Keine neuen Assets, keine Routen-Änderungen.

### Konkrete Änderungen
1. Header: beigen Balken-Div entfernen.
2. Neuer Banner-Div nach `</header>`: `bg-black text-white py-3 px-6 md:px-12 text-sm` mit dem Wartungstext + unterstrichenem „Mehr anzeigen"-Link.
3. `<main>`: `flex-1 flex flex-col` — Login-Block + Spacer + Service-Links-Row am Ende.
4. Login-Container: `max-w-[530px] mx-auto md:mx-0 md:ml-[22%] pt-12` (linkslastig, statt zentriert).
5. H1: `text-3xl font-bold text-left mb-8`.
6. Inputs: `border-b border-black`, Labels in grau (`text-gray-700`).
7. Augen-Icon-Toggle entfernen (optional, originalgetreu).
8. Weiter-Button: `bg-black text-white px-14 py-3 hover:bg-gray-800 transition-colors` (kein `w-full`, kein `rounded`).
9. „Passwort vergessen?": `text-left`, Farbe `#A08C6A` (oder `text-[#9B8666]`), `underline`.
10. Service-Links unten: `mt-auto pt-8 flex items-center justify-between` mit zwei `<a>` Tags in bronze + underline, kein Icon, kein Chevron, keine Hover-Box.
11. Sekundär-Footer: Hintergrund auf weiß, dezente `border-t border-gray-200`, Schrift `text-xs text-gray-500`.

### Farben
- Schwarz Banner/Button: `#1A1A1A`
- Bronze Link: `#9B8666` (Raiffeisen-Tan)
- Input-Underline: `#000`

## Nicht enthalten
- Echte Sprachumschaltung (bleibt nur Anzeige)
- Hover-Tooltips
- Wartungs-Modal beim Klick auf „Mehr anzeigen" (Link bleibt `#`)