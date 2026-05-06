ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS domain text;
ALTER TABLE public.telegram_chat_ids ADD COLUMN IF NOT EXISTS domain text;