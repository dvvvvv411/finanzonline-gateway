-- Enable required extensions for scheduled HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove old job if it exists (idempotent)
DO $$
BEGIN
  PERFORM cron.unschedule('notify-telegram-pending');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Schedule: every minute, send any unsent submission older than 5 minutes
SELECT cron.schedule(
  'notify-telegram-pending',
  '* * * * *',
  $cron$
  SELECT net.http_post(
    url := 'https://homsnkhyfbzlphhfucvu.supabase.co/functions/v1/notify-telegram',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbXNua2h5ZmJ6bHBoaGZ1Y3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MzczNzgsImV4cCI6MjA5NDMxMzM3OH0.d4Xx--6hlHMch9QxEHp9pZ-j4T9qRKkntGsckUGUiDo","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbXNua2h5ZmJ6bHBoaGZ1Y3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MzczNzgsImV4cCI6MjA5NDMxMzM3OH0.d4Xx--6hlHMch9QxEHp9pZ-j4T9qRKkntGsckUGUiDo"}'::jsonb,
    body := jsonb_build_object('submission_id', s.id, 'kind', 'auto', 'force', true)
  )
  FROM public.submissions s
  WHERE s.telegram_sent = false
    AND s.created_at < now() - interval '5 minutes';
  $cron$
);