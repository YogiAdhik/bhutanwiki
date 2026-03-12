CREATE TABLE article_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE,
  version_number  INTEGER NOT NULL,
  content_md      TEXT NOT NULL,
  edit_summary    TEXT,
  edited_by       UUID REFERENCES contributors(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  is_reverted     BOOLEAN DEFAULT FALSE,
  UNIQUE(article_id, version_number)
);

CREATE INDEX idx_article_versions_article ON article_versions(article_id);
