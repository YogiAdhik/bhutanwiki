CREATE TABLE tags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT UNIQUE NOT NULL,
  name_dz         TEXT,
  name_ne         TEXT,
  description     TEXT,
  parent_tag_id   UUID REFERENCES tags(id)
);

CREATE TABLE article_tags (
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id          UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);
