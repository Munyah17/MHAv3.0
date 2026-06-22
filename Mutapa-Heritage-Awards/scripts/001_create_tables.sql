-- Munhumutapa Heritage Awards Database Schema

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  venue TEXT,
  image_url TEXT,
  event_type TEXT DEFAULT 'upcoming' CHECK (event_type IN ('upcoming', 'past')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News/Blog posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'news' CHECK (category IN ('news', 'stories', 'updates', 'red_carpet')),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nominations table
CREATE TABLE IF NOT EXISTS nominations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nominee_name TEXT NOT NULL,
  nominee_email TEXT,
  nominee_phone TEXT,
  category TEXT NOT NULL,
  nominator_name TEXT NOT NULL,
  nominator_email TEXT NOT NULL,
  nominator_phone TEXT,
  reason TEXT NOT NULL,
  supporting_evidence TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'winner')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Winners table
CREATE TABLE IF NOT EXISTS winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT,
  bio TEXT,
  achievement TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partnership/Sponsor inquiries
CREATE TABLE IF NOT EXISTS partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  partnership_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'confirmed', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Award categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view published posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view winners" ON winners FOR SELECT USING (true);
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (is_active = true);

-- Anyone can submit nominations and partnership inquiries
CREATE POLICY "Anyone can submit nominations" ON nominations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit partnerships" ON partnerships FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to nominations" ON nominations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to winners" ON winners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to partnerships" ON partnerships FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
