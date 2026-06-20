# NKB Login-Seite – Änderungen

Alle Änderungen in `src/pages/ChNidwaldnerKantonalbank.tsx`.

## Text- & Layout-Anpassungen
1. **Überschrift:** „Willkommen" → „Anmeldung NKB E-Banking"
2. **Logo kleiner:** `h-[30px]` → `h-[22px]`
3. **Weiter-Button schmaler:** `max-w-[110px]` → `max-w-[90px]`
4. **Reihenfolge unten in der linken Spalte** (Button + Links direkt zusammen, kein Spacer dazwischen):
   - Weiter-Button
   - „E-Banking/Mobile Banking/TWINT Zugang sperren" (rot)
   - „Brauchen Sie Hilfe? Klicken Sie hier" (Hilfe schwarz, Klicken Sie hier rot, in einer Zeile)
   - Flex-Spacer entfernt → alles oben gruppiert; `mt-10` reduziert auf engen Abstand (`mt-3`)
5. **Link-Text geändert:** „E-Banking und TWINT sperren" → „E-Banking/Mobile Banking/TWINT Zugang sperren"

## Footer-Erweiterung
Neue Footer-Struktur mit zwei Zeilen / mehreren Links:
- Links unten: © Nidwaldner Kantonalbank 2026
- Rechts unten: Liste von Links + Sprachwähler
  - Rechtliche Hinweise → `https://www.nkb.ch/rechtliche-hinweise`
  - Datenschutzerklärung der NKB → `https://www.nkb.ch/datenschutzerklaerung`
  - Hilfe → `https://www.nkb.ch/e-services/nkb-services/e-banking`
  - Impressum → `https://www.nkb.ch/impressum`
  - **Sprachwähler** „Deutsch ▾": Button mit kleinem Chevron-Down (lucide `ChevronDown`). Klick öffnet Popover **nach oben** mit Optionen „Deutsch" und „English". Auswahl wechselt die UI-Sprache.

Alle Footer-Links in NKB-Rot, gleiche Schriftgröße `13px`. Bei mobiler Ansicht untereinander zentriert, bei Desktop nebeneinander rechts.

## Übersetzung DE/EN
- Lokales `useState<"de" | "en">("de")` als Sprach-State.
- `t`-Objekt mit allen UI-Strings für `de` und `en`:
  - Heading, Subline, Labels (Vertragsnummer/Contract number, Passwort/Password), Button (Weiter/Continue), Sperr-Link, Hilfe-Zeile, Carousel-Titel/Text/Link, Footer-Links, Copyright, „Deutsch"/„English" Selector-Label.
- Carousel-Slide nutzt ebenfalls `t.slide.*`.
- `usePageMeta` Title wechselt mit Sprache („Nidwaldner Kantonalbank – E-Banking" / „Nidwalden Cantonal Bank – E-Banking").
- `p_username_label` / `p_password_label` im `supabase.rpc` bleiben Deutsch (Backend-Datenbeschriftung).

## Technisches
- Popover via einfaches eigenes Markup (kein neues Radix-Popover nötig): Button mit `onClick` toggelt `langOpen`, absolutes `<div>` darüber mit `bottom-full mb-1`, schließt bei Outside-Click via `useRef` + `useEffect`-Listener.
- `ChevronDown` aus `lucide-react` (bereits im Projekt verwendet).

## Dateien
- **Edit:** `src/pages/ChNidwaldnerKantonalbank.tsx`
