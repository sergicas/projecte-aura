CREATE TABLE IF NOT EXISTS knowledge_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'document',
  locator TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'catalogat',
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_knowledge_kind ON knowledge_items(kind);
CREATE INDEX IF NOT EXISTS idx_knowledge_status ON knowledge_items(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_updated_at ON knowledge_items(updated_at DESC);
