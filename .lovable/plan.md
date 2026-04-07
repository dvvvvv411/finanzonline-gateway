

## Oberbank — Dropdown: Ausgewählte Option beim Öffnen direkt gehovered

### Datei: `src/pages/Oberbank.tsx`

Beim Öffnen des Dropdowns soll `hoveredLanguage` direkt auf den aktuellen `language`-Wert gesetzt werden, damit die ausgewählte Option sofort den Hover-Style (`#767676`, weiße Schrift) hat.

**Änderung im `onClick`-Handler des Trigger-Buttons:**
- Aktuell: `setHoveredLanguage(null)` beim Öffnen
- Neu: `setHoveredLanguage(language)` beim Öffnen (statt `null`)

So sieht der User beim Öffnen sofort, welche Sprache aktiv ist — mit dem grauen Hover-Hintergrund.

