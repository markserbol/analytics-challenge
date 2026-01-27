-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  caption TEXT,
  thumbnail_url TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'carousel')),
  posted_at TIMESTAMPTZ NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  permalink TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create daily metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own posts" ON posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

DROP POLICY IF EXISTS "Users can view own daily_metrics" ON daily_metrics;
DROP POLICY IF EXISTS "Users can insert own daily_metrics" ON daily_metrics;
DROP POLICY IF EXISTS "Users can update own daily_metrics" ON daily_metrics;
DROP POLICY IF EXISTS "Users can delete own daily_metrics" ON daily_metrics;

-- RLS Policies for posts table
-- SELECT: Users can only see their own posts
CREATE POLICY "Users can view own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only insert posts where user_id matches their auth.uid()
CREATE POLICY "Users can insert own posts"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own posts
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own posts
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for daily_metrics table
-- SELECT: Users can only see their own metrics
CREATE POLICY "Users can view own daily_metrics"
  ON daily_metrics
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only insert metrics where user_id matches their auth.uid()
CREATE POLICY "Users can insert own daily_metrics"
  ON daily_metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own metrics
CREATE POLICY "Users can update own daily_metrics"
  ON daily_metrics
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own metrics
CREATE POLICY "Users can delete own daily_metrics"
  ON daily_metrics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_posted_at ON posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_id ON daily_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date DESC);
