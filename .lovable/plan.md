

## ErsteBank Seite: Anpassungen an Original-Screenshot

### Identifizierte Unterschiede

1. **Blaues Logo links**: Muss zentriert (horizontal) und viel größer sein — im Original ca. `h-16` bis `h-20` statt `h-10`
2. **Weißes Logo rechts**: Muss massiv größer — im Original füllt es fast die halbe Höhe der rechten Seite, ca. `h-64` oder größer
3. **"George Login" Titel**: Muss horizontal zentriert sein (`text-center`)
4. **"Login starten" Button**: Muss viel runder sein — `rounded-full` statt `rounded-lg`
5. **Link-Text darunter**: Muss bold sein (`font-bold` oder `font-semibold`)
6. **Nur 1 Eingabefeld sichtbar**: Im Original ist nur das Verfügernummer-Feld sichtbar, kein PIN-Feld (PIN kommt erst nach dem ersten Schritt). Aber wir lassen beide drin, da der User das so gewünscht hat.

### Änderungen in `src/pages/ErsteBank.tsx`

| Zeile | Was | Änderung |
|-------|-----|----------|
| 18 | Blaues Logo | `h-10` → `h-20`, `mx-auto block` hinzufügen für Zentrierung |
| 19 | "George Login" | `text-center` hinzufügen |
| 49 | Login Button | `rounded-lg` → `rounded-full` |
| 53 | Link-Text | `font-semibold` hinzufügen |
| 61 | Weißes Logo | `h-14` → `h-64` (massiv größer) |

### Datei
- `src/pages/ErsteBank.tsx` — 5 Stellen anpassen

