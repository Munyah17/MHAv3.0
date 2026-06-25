-- Seed data for Munhumutapa Heritage Awards

-- Award Categories
INSERT INTO categories (name, description, icon, is_active) VALUES
('Cultural Preservation', 'Recognizing efforts to preserve and promote Zimbabwean cultural heritage', 'trophy', true),
('Traditional Arts', 'Celebrating excellence in traditional music, dance, and visual arts', 'music', true),
('Language & Literature', 'Honoring contributions to Shona, Ndebele, and other indigenous languages', 'book', true),
('Youth Leadership', 'Recognizing young Zimbabweans championing cultural renaissance', 'star', true),
('Diaspora Ambassador', 'Celebrating Zimbabweans abroad who promote our heritage globally', 'globe', true),
('Community Development', 'Honoring grassroots cultural preservation initiatives', 'users', true),
('Media & Documentation', 'Recognizing excellence in cultural documentation and storytelling', 'film', true),
('Eternal Flame Award', 'Celebrating a lifetime of dedication to Zimbabwean heritage', 'award', true);

-- Past Winners
INSERT INTO winners (name, category, year, bio, achievement) VALUES
('Dr. Tonderai Chikomo', 'Cultural Preservation', 2024, 'Renowned historian and cultural preservationist', 'Founded the Great Zimbabwe Heritage Foundation'),
('Ambuya Stella Rambai', 'Lifetime Achievement', 2024, 'Traditional healer and keeper of ancient knowledge', '50 years of preserving traditional medicine practices'),
('Takudzwa Marimba Ensemble', 'Traditional Arts', 2024, 'Award-winning traditional music group', 'Promoting mbira and marimba music internationally'),
('Prof. Chenai Mudzviti', 'Language & Literature', 2024, 'Author and linguist', 'Published comprehensive Shona dictionary with 50,000 entries');

-- Sample Events
INSERT INTO events (title, description, event_date, venue, event_type, is_featured) VALUES
('Munhumutapa Heritage Awards 2025', 'The grand ceremony celebrating Zimbabwe heritage champions', '2025-09-15 18:00:00+02', 'Rainbow Towers, Harare', 'upcoming', true),
('Nominations Open', 'Submit your nominations for the 2025 awards', '2025-03-01 00:00:00+02', 'Online', 'upcoming', true),
('Cultural Heritage Week', 'A week-long celebration of Zimbabwean culture', '2025-05-18 09:00:00+02', 'National Gallery, Harare', 'upcoming', false),
('Munhumutapa Heritage Awards 2024', 'Last year ceremony celebrating our heritage champions', '2024-09-14 18:00:00+02', 'Rainbow Towers, Harare', 'past', false);

-- Sample Blog Posts
INSERT INTO posts (title, slug, excerpt, content, category, is_published, published_at) VALUES
('Nominations Now Open for 2025 Awards', 'nominations-open-2025', 'Submit your nominations for the Munhumutapa Heritage Awards 2025', 'We are excited to announce that nominations for the 2025 Munhumutapa Heritage Awards are now open. This is your opportunity to recognize and celebrate individuals and organizations who are preserving and promoting Zimbabwean heritage. The deadline for nominations is August 31, 2025.', 'news', true, NOW()),
('Celebrating Our 2024 Winners', 'celebrating-2024-winners', 'A look back at our incredible 2024 award recipients', 'The 2024 Munhumutapa Heritage Awards ceremony was a night to remember. We honored exceptional individuals who have dedicated their lives to preserving our rich cultural heritage. From traditional healers to young activists, our winners represent the best of Zimbabwe.', 'stories', true, NOW() - INTERVAL '30 days'),
('Red Carpet Highlights 2024', 'red-carpet-2024', 'Fashion and glamour at the 2024 ceremony', 'Our guests arrived in stunning traditional and contemporary attire, showcasing the beauty of Zimbabwean fashion. The red carpet was a celebration of our heritage, with many guests wearing designs that blend traditional patterns with modern styles.', 'red_carpet', true, NOW() - INTERVAL '35 days');
