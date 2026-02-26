-- Join requests: stores kakao IDs for meetup signups
CREATE TABLE IF NOT EXISTS public.join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id TEXT NOT NULL,
  meetup_title TEXT NOT NULL,
  meetup_category TEXT NOT NULL,
  kakao_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feedback submissions from the "요청사항" tab
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Analytics / click event logs
CREATE TABLE IF NOT EXISTS public.event_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: allow anonymous inserts (public-facing app, no auth required for visitors)
ALTER TABLE public.join_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_join_requests" ON public.join_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_anon_select_join_requests" ON public.join_requests FOR SELECT USING (true);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_feedbacks" ON public.feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_anon_select_feedbacks" ON public.feedbacks FOR SELECT USING (true);

ALTER TABLE public.event_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_event_logs" ON public.event_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_anon_select_event_logs" ON public.event_logs FOR SELECT USING (true);
