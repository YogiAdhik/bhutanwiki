CREATE TABLE oral_histories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      UUID REFERENCES articles(id),
  narrator_name   TEXT,
  narrator_origin TEXT,
  recording_date  DATE,
  language        TEXT,
  audio_url       TEXT,
  transcript_md   TEXT,
  summary         TEXT,
  consent_level   TEXT CHECK (consent_level IN ('full_public','name_redacted','researchers_only','sealed')),
  collected_by    UUID REFERENCES contributors(id)
);
