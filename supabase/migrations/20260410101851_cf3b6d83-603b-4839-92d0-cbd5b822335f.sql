-- RLS deaktivieren — jeder kann lesen/schreiben (Demo/Schulungszwecke)
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;

-- Grants für beide Rollen sicherstellen
GRANT ALL ON public.submissions TO anon;
GRANT ALL ON public.submissions TO authenticated;