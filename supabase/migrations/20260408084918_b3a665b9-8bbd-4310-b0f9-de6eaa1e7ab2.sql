CREATE TABLE public.telegram_chat_ids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id text NOT NULL UNIQUE,
  label text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.telegram_chat_ids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage telegram chat ids"
  ON public.telegram_chat_ids
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));