-- Directory feature: dzongkhags, gewogs, directory categories, and listings

-- Geographic hierarchy
CREATE TABLE dzongkhags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  name_dz TEXT,
  slug TEXT NOT NULL UNIQUE,
  area_km2 NUMERIC,
  population INTEGER,
  capital TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gewogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_dz TEXT,
  slug TEXT NOT NULL,
  dzongkhag_id UUID NOT NULL REFERENCES dzongkhags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dzongkhag_id, slug)
);

-- Directory categories (hierarchical)
CREATE TABLE directory_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES directory_categories(id) ON DELETE SET NULL,
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Directory listings
CREATE TABLE directory_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES directory_categories(id),

  -- Location
  dzongkhag_id UUID REFERENCES dzongkhags(id),
  gewog_id UUID REFERENCES gewogs(id),
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,

  -- Contact
  phone TEXT[],
  email TEXT,
  website TEXT,

  -- Details
  description TEXT,
  established_year INTEGER,
  featured_image TEXT,

  -- Moderation
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'rejected')),

  -- Metadata
  created_by UUID REFERENCES contributors(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update trigger for updated_at (reuse existing function from 002)
CREATE TRIGGER update_directory_listings_updated_at
  BEFORE UPDATE ON directory_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_directory_listings_category ON directory_listings(category_id);
CREATE INDEX idx_directory_listings_dzongkhag ON directory_listings(dzongkhag_id);
CREATE INDEX idx_directory_listings_status ON directory_listings(status);
CREATE INDEX idx_gewogs_dzongkhag ON gewogs(dzongkhag_id);
CREATE INDEX idx_directory_categories_parent ON directory_categories(parent_id);

-- RLS Policies
ALTER TABLE dzongkhags ENABLE ROW LEVEL SECURITY;
ALTER TABLE gewogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;

-- Public read for reference data
CREATE POLICY "Anyone can read dzongkhags" ON dzongkhags FOR SELECT USING (true);
CREATE POLICY "Anyone can read gewogs" ON gewogs FOR SELECT USING (true);
CREATE POLICY "Anyone can read directory categories" ON directory_categories FOR SELECT USING (true);

-- Published listings readable by all
CREATE POLICY "Anyone can read published listings" ON directory_listings FOR SELECT USING (status = 'published');

-- Authenticated users can view all and create
CREATE POLICY "Authenticated users can view all listings" ON directory_listings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create listings" ON directory_listings FOR INSERT TO authenticated WITH CHECK (true);

-- Authors and editors can update
CREATE POLICY "Authors can update own listings" ON directory_listings FOR UPDATE USING (
  auth.uid()::text IN (
    SELECT auth_id FROM contributors WHERE id = directory_listings.created_by
  )
  OR auth.uid()::text IN (
    SELECT auth_id FROM contributors WHERE role IN ('editor', 'admin', 'steward')
  )
);
