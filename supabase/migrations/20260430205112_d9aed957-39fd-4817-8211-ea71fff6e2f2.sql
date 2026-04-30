ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS telegram_sent boolean NOT NULL DEFAULT false;

UPDATE public.submissions SET telegram_sent = true WHERE notified_at IS NOT NULL;