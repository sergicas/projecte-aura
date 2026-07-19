INSERT OR IGNORE INTO diary (id, text, created_at)
VALUES (
  'audit-cloud-v5-3-phase7-revalidated',
  '[audit:evolucio] Aura ha revalidat la Fase 7 a cloud-v5.3: estat evolutiu i propostes visibles, calculats en només lectura i sincronitzats entre API, fallback local i backups.',
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
  'phase7-revalidation-2026-07-19',
  'La Fase 7 queda revalidada i visible: Aura calcula set indicadors evolutius, presenta propostes sense aplicar-les i conserva Mode Sergi com a límit de qualsevol mutació persistent.',
  'auditoria',
  'migracio-cloud-v5.3',
  CURRENT_TIMESTAMP,
  '["fase-7","evolucio","auditoria"]',
  5,
  'actiu',
  '["233168","377377","610987","987159","1597258","2584181"]'
);
