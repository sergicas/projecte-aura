ALTER TABLE records ADD COLUMN tags TEXT NOT NULL DEFAULT '[]';
ALTER TABLE records ADD COLUMN weight INTEGER NOT NULL DEFAULT 1;
ALTER TABLE records ADD COLUMN state TEXT NOT NULL DEFAULT 'actiu';
ALTER TABLE records ADD COLUMN related_ids TEXT NOT NULL DEFAULT '[]';

CREATE INDEX IF NOT EXISTS idx_records_state ON records(state);
CREATE INDEX IF NOT EXISTS idx_records_weight ON records(weight);
