INSERT OR IGNORE INTO diary (id, text, created_at)
VALUES (
  'audit-cloud-v5-3-phase9-revalidated',
  '[audit:biblioteca-coneixement] Aura ha revalidat la Fase 9 a cloud-v5.3: biblioteca visible, procedència i estat explicats, API, fallback local i backups sincronitzats, sense ingestió automàtica.',
  CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO records (
  id,
  text,
  kind,
  source,
  created_at,
  tags,
  weight,
  state,
  related_ids
)
VALUES (
  'phase9-revalidation-2026-07-20',
  'La Fase 9 queda revalidada: Coneixement d’Aura fa visible el catàleg de fonts, la procedència, el resum i l’estat de revisió, sense confondre catalogació amb lectura, comprensió o ingestió automàtica.',
  'auditoria',
  'migracio-cloud-v5.3',
  CURRENT_TIMESTAMP,
  '["fase-9","coneixement","procedencia","auditoria"]',
  5,
  'actiu',
  '["5702887"]'
);
