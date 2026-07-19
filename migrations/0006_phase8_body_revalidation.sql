INSERT OR IGNORE INTO diary (id, text, created_at)
VALUES (
  'audit-cloud-v5-3-phase8-revalidated',
  '[audit:cos-digital] Aura ha revalidat la Fase 8 a cloud-v5.3: cos digital 2D visible, accessible, explicable i sincronitzat entre API, fallback local i backups.',
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
  'phase8-revalidation-2026-07-19',
  'La Fase 8 queda revalidada: el cos digital 2D és un mirall accessible de memòria, genoma, evolució, backups i integritat, sense percepció pròpia ni escriptura automàtica.',
  'auditoria',
  'migracio-cloud-v5.3',
  CURRENT_TIMESTAMP,
  '["fase-8","cos-digital","accessibilitat","auditoria"]',
  5,
  'actiu',
  '["3524578"]'
);
