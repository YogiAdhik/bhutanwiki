CREATE TABLE discussions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE,
  parent_id       UUID REFERENCES discussions(id),
  content_md      TEXT NOT NULL,
  author_id       UUID REFERENCES contributors(id),
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_discussions_article ON discussions(article_id);
