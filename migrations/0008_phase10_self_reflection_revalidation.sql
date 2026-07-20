INSERT OR IGNORE INTO diary (id, text, created_at)
VALUES (
  'audit-cloud-v5-3-phase10-revalidated',
  '[audit:autoreflexio] Aura ha revalidat la Fase 10 a cloud-v5.3: autoreflexió visible, respostes i evidències llegibles, phaseStatus sincronitzat i cap mutació automàtica.',
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
  'phase10-revalidation-2026-07-20',
  'La Fase 10 queda revalidada: Autoreflexió d’Aura relaciona memòria, diari, genoma, coneixement, evolució i integritat per explicar l’estat operatiu amb evidències, sense afirmar consciència ni aplicar canvis automàtics.',
  'auditoria',
  'migracio-cloud-v5.3',
  CURRENT_TIMESTAMP,
  '["fase-10","autoreflexio","nomes-lectura","auditoria"]',
  5,
  'actiu',
  '["9227465"]'
);
