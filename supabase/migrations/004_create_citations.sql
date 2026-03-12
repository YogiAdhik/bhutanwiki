CREATE TABLE citations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE,
  citation_key    TEXT,
  source_type     TEXT CHECK (source_type IN ('book','journal','news','report','oral','government','web')),
  title           TEXT,
  author          TEXT,
  publication     TEXT,
  date            DATE,
  url             TEXT,
  archived_url    TEXT,
  page_numbers    TEXT,
  quote           TEXT,
  verified        BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_citations_article ON citations(article_id);
