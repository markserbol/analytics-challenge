-- Seed data for testing with multiple users
-- Note: You'll need to create actual users via Supabase Auth first
-- Then replace the UUIDs below with the actual user IDs

-- This is a template - you'll need to:
-- 1. Sign up 2 users via your auth UI
-- 2. Get their user IDs from the auth.users table
-- 3. Replace '7cc6ae8b-ddc8-4086-a3eb-4862500aa18d' and '73341a1e-2b9d-4d46-981c-65d7430924f2' with actual UUIDs

-- User 1 Posts (15-20 posts spread over the last 30 days)
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
VALUES
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Excited to share our latest product launch! 🚀 What do you think? #startup #launch', 'https://picsum.photos/seed/post1/400/400', 'image', NOW() - INTERVAL '1 day', 1243, 89, 45, 156, 15420, 18650, 8.2, 'https://instagram.com/p/example1'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'Behind the scenes of our creative process 🎬 #bts #creative', 'https://picsum.photos/seed/post2/400/400', 'video', NOW() - INTERVAL '2 days', 5621, 234, 189, 423, 45000, 52000, 12.5, 'https://tiktok.com/@example/video/123'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Monday motivation! 💪 How are you starting your week?', 'https://picsum.photos/seed/post3/400/400', 'carousel', NOW() - INTERVAL '3 days', 876, 56, 23, 89, 9800, 11200, 6.8, 'https://instagram.com/p/example3'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'New tutorial dropping soon! Stay tuned 📚', 'https://picsum.photos/seed/post4/400/400', 'image', NOW() - INTERVAL '5 days', 2134, 145, 67, 289, 21000, 24500, 10.1, 'https://instagram.com/p/example4'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'Quick tips for productivity 🎯', 'https://picsum.photos/seed/post5/400/400', 'video', NOW() - INTERVAL '7 days', 7843, 421, 312, 567, 62000, 71000, 13.8, 'https://tiktok.com/@example/video/456'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Weekend vibes ✨', 'https://picsum.photos/seed/post6/400/400', 'image', NOW() - INTERVAL '8 days', 1567, 98, 45, 178, 16800, 19200, 9.3, 'https://instagram.com/p/example6'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Throwback to our best moments 📸', 'https://picsum.photos/seed/post7/400/400', 'carousel', NOW() - INTERVAL '10 days', 1890, 123, 56, 234, 18900, 21600, 10.7, 'https://instagram.com/p/example7'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'Day in the life 🌟', 'https://picsum.photos/seed/post8/400/400', 'video', NOW() - INTERVAL '12 days', 6234, 289, 234, 445, 51000, 58000, 12.2, 'https://tiktok.com/@example/video/789'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Grateful for this community 🙏', 'https://picsum.photos/seed/post9/400/400', 'image', NOW() - INTERVAL '14 days', 2345, 167, 89, 312, 23400, 26800, 10.9, 'https://instagram.com/p/example9'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'Fun challenge time! 🎉', 'https://picsum.photos/seed/post10/400/400', 'video', NOW() - INTERVAL '15 days', 8912, 456, 378, 623, 72000, 83000, 14.1, 'https://tiktok.com/@example/video/101'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Product review: Worth it? 🤔', 'https://picsum.photos/seed/post11/400/400', 'image', NOW() - INTERVAL '17 days', 1678, 134, 67, 245, 17800, 20400, 9.4, 'https://instagram.com/p/example11'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Before and after transformation 💫', 'https://picsum.photos/seed/post12/400/400', 'carousel', NOW() - INTERVAL '19 days', 3456, 234, 123, 456, 34000, 39000, 11.3, 'https://instagram.com/p/example12'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'This hack changed everything 🔥', 'https://picsum.photos/seed/post13/400/400', 'video', NOW() - INTERVAL '21 days', 9234, 512, 423, 712, 78000, 89000, 14.8, 'https://tiktok.com/@example/video/112'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Sunset views from today 🌅', 'https://picsum.photos/seed/post14/400/400', 'image', NOW() - INTERVAL '23 days', 2134, 156, 78, 289, 21200, 24300, 10.3, 'https://instagram.com/p/example14'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'Reacting to your comments 😂', 'https://picsum.photos/seed/post15/400/400', 'video', NOW() - INTERVAL '25 days', 7123, 389, 267, 534, 59000, 67000, 12.9, 'https://tiktok.com/@example/video/113'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Announcement coming soon! 🎊', 'https://picsum.photos/seed/post16/400/400', 'image', NOW() - INTERVAL '27 days', 1945, 145, 89, 267, 19400, 22200, 10.1, 'https://instagram.com/p/example16'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'instagram', 'Favorite things this month 💕', 'https://picsum.photos/seed/post17/400/400', 'carousel', NOW() - INTERVAL '28 days', 2567, 189, 101, 334, 25600, 29300, 10.8, 'https://instagram.com/p/example17'),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', 'tiktok', 'POV: You finally figured it out 🎯', 'https://picsum.photos/seed/post18/400/400', 'video', NOW() - INTERVAL '29 days', 8456, 445, 356, 689, 71000, 81000, 13.9, 'https://tiktok.com/@example/video/114');

-- User 1 Daily Metrics (30 days)
INSERT INTO daily_metrics (user_id, date, engagement, reach)
VALUES
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '1 day', 1577, 15420),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '2 days', 6044, 45000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '3 days', 965, 9800),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '4 days', 1234, 12300),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '5 days', 2635, 21000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '6 days', 1890, 18500),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '7 days', 8576, 62000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '8 days', 1888, 16800),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '9 days', 2145, 20100),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '10 days', 2303, 18900),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '11 days', 1678, 16200),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '12 days', 7002, 51000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '13 days', 1945, 18900),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '14 days', 2913, 23400),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '15 days', 10369, 72000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '16 days', 1789, 17100),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '17 days', 2124, 17800),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '18 days', 2234, 21500),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '19 days', 4269, 34000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '20 days', 1890, 18200),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '21 days', 10881, 78000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '22 days', 2012, 19300),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '23 days', 2657, 21200),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '24 days', 1945, 18700),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '25 days', 8313, 59000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '26 days', 2134, 20500),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '27 days', 2424, 19400),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '28 days', 3191, 25600),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '29 days', 9946, 71000),
  ('7cc6ae8b-ddc8-4086-a3eb-4862500aa18d', CURRENT_DATE - INTERVAL '30 days', 1823, 17600);

-- User 2 Posts (different data for testing isolation)
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
VALUES
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', 'instagram', 'My journey so far 🌈', 'https://picsum.photos/seed/user2post1/400/400', 'image', NOW() - INTERVAL '1 day', 987, 67, 34, 123, 12300, 14500, 7.5, 'https://instagram.com/p/user2example1'),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', 'tiktok', 'Try this recipe! 🍕', 'https://picsum.photos/seed/user2post2/400/400', 'video', NOW() - INTERVAL '3 days', 4532, 189, 145, 312, 38000, 43000, 11.8, 'https://tiktok.com/@user2/video/1'),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', 'instagram', 'Fashion finds of the week 👗', 'https://picsum.photos/seed/user2post3/400/400', 'carousel', NOW() - INTERVAL '5 days', 1456, 112, 56, 189, 15600, 17800, 8.9, 'https://instagram.com/p/user2example3'),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', 'tiktok', 'Dance challenge accepted 💃', 'https://picsum.photos/seed/user2post4/400/400', 'video', NOW() - INTERVAL '7 days', 6789, 334, 267, 445, 56000, 64000, 13.2, 'https://tiktok.com/@user2/video/2'),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', 'instagram', 'Coffee and conversations ☕', 'https://picsum.photos/seed/user2post5/400/400', 'image', NOW() - INTERVAL '9 days', 1234, 89, 45, 156, 13400, 15300, 8.2, 'https://instagram.com/p/user2example5');

-- User 2 Daily Metrics (30 days)
INSERT INTO daily_metrics (user_id, date, engagement, reach)
VALUES
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '1 day', 1211, 12300),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '2 days', 890, 9200),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '3 days', 4866, 38000),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '4 days', 1123, 11500),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '5 days', 1813, 15600),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '6 days', 945, 9800),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '7 days', 7835, 56000),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '8 days', 1234, 12800),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '9 days', 1524, 13400),
  ('73341a1e-2b9d-4d46-981c-65d7430924f2', CURRENT_DATE - INTERVAL '10 days', 1089, 11200);
