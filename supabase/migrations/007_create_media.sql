CREATE TABLE media (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename        TEXT NOT NULL,
  file_type       TEXT,
  storage_url     TEXT NOT NULL,
  caption         TEXT,
  caption_dz      TEXT,
  caption_ne      TEXT,
  source          TEXT,
  license         TEXT,
  uploaded_by     UUID REFERENCES contributors(id),
  created_at      TIMESTAMPTZ DEFAULT now()
);
