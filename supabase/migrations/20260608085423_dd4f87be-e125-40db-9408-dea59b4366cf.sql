CREATE TABLE public.panels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('finanzonline', 'klimabonus')),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.panels TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.panels TO authenticated;
GRANT ALL ON public.panels TO service_role;

ALTER TABLE public.panels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read panels"
  ON public.panels
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage panels"
  ON public.panels
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS flow text DEFAULT 'finanzonline';