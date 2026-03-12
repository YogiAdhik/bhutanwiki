-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE oral_histories ENABLE ROW LEVEL SECURITY;

-- Articles: anyone can read published articles
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT USING (status = 'published');

-- Articles: authenticated users can view all articles
CREATE POLICY "Authenticated users can view all articles"
  ON articles FOR SELECT USING (auth.role() = 'authenticated');

-- Articles: authenticated users can create
CREATE POLICY "Authenticated users can create articles"
  ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Articles: creators and editors can update
CREATE POLICY "Authors and editors can update articles"
  ON articles FOR UPDATE USING (
    auth.uid()::text IN (
      SELECT auth_id FROM contributors WHERE id = articles.created_by
    )
    OR auth.uid()::text IN (
      SELECT auth_id FROM contributors WHERE role IN ('editor', 'admin', 'steward')
    )
  );

-- Articles: only admins/stewards can delete
CREATE POLICY "Admins can delete articles"
  ON articles FOR DELETE USING (
    auth.uid()::text IN (
      SELECT auth_id FROM contributors WHERE role IN ('admin', 'steward')
    )
  );

-- Article versions: anyone can read
CREATE POLICY "Anyone can view article versions"
  ON article_versions FOR SELECT USING (true);

-- Article versions: authenticated can create
CREATE POLICY "Authenticated users can create versions"
  ON article_versions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Contributors: public profiles
CREATE POLICY "Public contributor profiles"
  ON contributors FOR SELECT USING (true);

-- Contributors: users can update own profile
CREATE POLICY "Users can update own profile"
  ON contributors FOR UPDATE USING (auth.uid()::text = auth_id);

-- Contributors: authenticated can insert (for self-registration)
CREATE POLICY "Authenticated users can create contributor profile"
  ON contributors FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Citations: anyone can read
CREATE POLICY "Anyone can view citations"
  ON citations FOR SELECT USING (true);

-- Citations: authenticated can create
CREATE POLICY "Authenticated users can create citations"
  ON citations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Tags: anyone can read
CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT USING (true);

CREATE POLICY "Anyone can view article tags"
  ON article_tags FOR SELECT USING (true);

-- Discussions: anyone can read
CREATE POLICY "Anyone can view discussions"
  ON discussions FOR SELECT USING (true);

-- Discussions: authenticated can create
CREATE POLICY "Authenticated users can create discussions"
  ON discussions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Media: anyone can read
CREATE POLICY "Anyone can view media"
  ON media FOR SELECT USING (true);

-- Oral histories: public ones are readable
CREATE POLICY "Public oral histories are viewable"
  ON oral_histories FOR SELECT USING (consent_level = 'full_public');
