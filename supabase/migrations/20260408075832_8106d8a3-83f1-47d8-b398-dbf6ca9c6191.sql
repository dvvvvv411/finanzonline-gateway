CREATE TABLE public.submission_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  call_type text NOT NULL DEFAULT 'mailbox',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.submission_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage calls" ON public.submission_calls
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete" ON public.submissions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));