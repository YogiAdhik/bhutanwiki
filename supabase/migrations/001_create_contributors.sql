CREATE TABLE contributors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name    TEXT NOT NULL,
  auth_id         TEXT UNIQUE,
  email           TEXT,
  role            TEXT CHECK (role IN ('reader','contributor','editor','admin','steward')) DEFAULT 'contributor',
  is_anonymous    BOOLEAN DEFAULT FALSE,
  trust_level     INTEGER DEFAULT 0,
  location_country TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contributors_auth_id ON contributors(auth_id);
