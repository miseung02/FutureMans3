-- Create signups table for KakaoTalk ID submissions
CREATE TABLE IF NOT EXISTS signups (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kakao_id TEXT NOT NULL,
  meetup_id TEXT NOT NULL,
  meetup_title TEXT NOT NULL,
  meetup_category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table for user opinions
CREATE TABLE IF NOT EXISTS feedback (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
