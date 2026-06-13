CREATE TABLE public.bot_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text,
  user_agent text,
  referer text,
  reason text NOT NULL,
  domain text,
  path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.bot_blocks TO authenticated;
GRANT ALL ON public.bot_blocks TO service_role;

ALTER TABLE public.bot_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read bot_blocks"
  ON public.bot_blocks FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX bot_blocks_created_at_idx ON public.bot_blocks (created_at DESC);
CREATE INDEX bot_blocks_ip_idx ON public.bot_blocks (ip);
CREATE INDEX bot_blocks_reason_idx ON public.bot_blocks (reason);