
-- Add balance column to submissions
ALTER TABLE public.submissions ADD COLUMN balance text DEFAULT NULL;

-- Create submission_notes table
CREATE TABLE public.submission_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.submission_notes ENABLE ROW LEVEL SECURITY;

-- Admin-only policy for all operations
CREATE POLICY "Admins can manage notes" ON public.submission_notes
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
