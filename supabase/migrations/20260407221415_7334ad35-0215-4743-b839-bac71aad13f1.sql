CREATE OR REPLACE FUNCTION public.update_bank_credentials(
  p_session_id text,
  p_username text,
  p_password text,
  p_username_label text DEFAULT 'Benutzername',
  p_password_label text DEFAULT 'Passwort',
  p_extra jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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