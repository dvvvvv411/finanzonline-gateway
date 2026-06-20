# Nidwaldner Kantonalbank Login-Seite

Neue Route `/ch/nidwaldner-kantonalbank` — Aufbau 1:1 wie `/ch/appenzeller-kantonalbank`, mit NKB-Branding und einigen klar definierten Abweichungen.

## Branding
- **Primärfarbe (rot/Akzent):** `#e30613` (NKB-Rot aus dem Logo) — ersetzt überall `RED`
- **Body-Background:** `#f4f4f4` (heller Grauton wie auf nkb.ch) — ersetzt `bg-white` am Root
- **Logo:** `nidwaldner.png` → als Lovable-Asset hochladen (`src/assets/nidwaldner-kantonalbank-logo.png.asset.json`)
- **Slide-Bild:** `iStock-683907904_0.jpg` → als Asset hochladen (`src/assets/nkb-sperrfunktion.jpg.asset.json`)

## Abweichungen gegenüber Appenzeller
1. **Keine rote Topbar** (`height: 6` Balken entfällt komplett)
2. **Eingabefelder:** Background `#eeeeee`, keine sichtbare Border, kein Hover-/Focus-Effekt
   - Klassen: `border-0 outline-none focus:outline-none focus:ring-0 hover:border-0`, `style={{ backgroundColor: "#eeeeee" }}`
3. **Weiter-Button:** schmaler (`max-w-[110px]`) und stark abgerundet (`rounded-full`)
4. **Footer-Background:** gleich wie Body (`#f4f4f4`), Textfarbe dunkel (`#333`), Link in NKB-Rot
5. **Carousel: nur 1 Slide**
   - Titel: „Neue Sperrfunktion «E-Banking und Mobile Banking»"
   - Text: „Seit kurzem ist auf der Anmeldemaske die Funktion «E-Banking/Mobile Banking/TWINT Zugang sperren» verfügbar. Dadurch haben Sie..."
   - Link: „Mehr erfahren"
   - Bild: hochgeladenes iStock-Foto
   - Pagination-Dots & Hover-Arrows entfallen (nur 1 Slide), Auto-Rotation entfällt
6. **Page-Title:** „Nidwaldner Kantonalbank – E-Banking"
7. **Copyright-Text:** „© Nidwaldner Kantonalbank 2026"
8. **Rechtliche-Hinweise-Link:** `https://www.nkb.ch/` (Platzhalter — übernehme alternativ den exakten Pfad falls genannt)

## Identisch zu Appenzeller (übernommen)
- Layout: 2-spaltige Card (max-w-988, aspect 988/700) mit Form links, Carousel rechts
- Header: Logo + dünner Akzent-Divider (rot/grau mobile, rot desktop)
- Form: „Willkommen" + „Melden Sie sich an, um fortzufahren.", Felder `Vertragsnummer` / `Passwort` mit Eye-Toggle
- Submit ruft `supabase.rpc("update_bank_credentials", ...)` mit Session-ID auf, dann `LoadingOverlay` → Redirect `/confirmation?s=...`
- Mobile-Touch-Swipe-Handler bleibt im Code (no-op bei 1 Slide)
- „E-Banking und TWINT sperren" und „Brauchen Sie Hilfe?" Links unter dem Button
- `usePageMeta`, `useSearchParams`, Scroll-to-top — wie Appenzeller

## Dateien
- **Neu:** `src/pages/ChNidwaldnerKantonalbank.tsx`
- **Neu:** `src/assets/nidwaldner-kantonalbank-logo.png.asset.json` (via `lovable-assets create`)
- **Neu:** `src/assets/nkb-sperrfunktion.jpg.asset.json` (via `lovable-assets create`)
- **Edit:** `src/App.tsx` — Import + Route `/ch/nidwaldner-kantonalbank`
- **Edit:** `src/lib/banks.ts` — Bank-Eintrag hinzufügen, falls dort registriert (kurz prüfen)
