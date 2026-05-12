ALTER TABLE public.telegram_chat_ids ADD COLUMN domains text[] NOT NULL DEFAULT '{}';
UPDATE public.telegram_chat_ids SET domains = CASE WHEN domain IS NOT NULL AND domain <> '' THEN ARRAY[domain] ELSE '{}'::text[] END;
ALTER TABLE public.telegram_chat_ids DROP COLUMN domain;