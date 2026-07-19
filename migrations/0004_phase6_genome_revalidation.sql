UPDATE genes
SET description = 'Defineix la direcció general d''Aura: preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.',
    updated_at = CURRENT_TIMESTAMP
WHERE id = '233168';

INSERT OR IGNORE INTO diary (id, text, created_at)
VALUES (
  'audit-cloud-v5-3-phase6-revalidated',
  '[audit:genoma] Aura ha revalidat la Fase 6 a cloud-v5.3: genoma canònic sincronitzat entre D1, API, fallback local i AURA_GENOME.md; 004 mimesi-humana continua actiu.',
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
  'phase6-revalidation-2026-07-19',
  'La Fase 6 queda revalidada: el genoma digital canònic manté 004 mimesi-humana i 2178309 genoma-digital-canon actius, amb el mateix propòsit a D1, API, fallback local i document mestre.',
  'auditoria',
  'migracio-cloud-v5.3',
  CURRENT_TIMESTAMP,
  '["fase-6","genoma","auditoria"]',
  5,
  'actiu',
  '["004","2178309","233168"]'
);
