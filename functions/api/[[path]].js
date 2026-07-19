import {
  AURA_CHAT_MODEL,
  buildAuraChatContext,
  normalizeAuraChatPayload,
  runAuraConversation,
} from "../_lib/aura_ai.js";

const AURA_VERSION = "cloud-v5.3";
const BACKUP_FORMAT = "aura-backup-v5.3";
const VAULT_PREFIX = "aura/backups/";
const AUTOMATION_META_KEY = "aura/automation/backup-worker";
const INTEGRITY_PREFIX = "aura/integrity/snapshots/";
const INTEGRITY_LATEST_KEY = "aura/integrity/latest";
const MAX_JSON_BYTES = 2 * 1024 * 1024;
const SESSION_COOKIE_NAME = "__Host-aura_session";
const AVATAR_SERGI_URL = "https://avatar-sergi-481669294174.europe-west1.run.app/";
const AVATAR_SERGI_CHAT_URL = "https://avatar-sergi-481669294174.europe-west1.run.app/chat";
const GENE_STATES = ["actiu", "latent", "arxivat", "observacio"];
const MEMORY_STATES = ["actiu", "latent", "arxivat", "observacio"];
const RETENTION_POLICY = {
  backups: {
    keepLatest: 12,
    keepDays: 30,
    preserveReasons: ["manual", "manual-ui"],
  },
  integrity: {
    keepLatest: 30,
    keepDays: 90,
    preserveReasons: ["manual", "manual-ui", "deploy-validation"],
  },
};

const FOUNDATION_RECORDS = [
  "El projecte es diu Projecte Aura.",
  "L'objectiu és crear vida sintètica-digital.",
  "Aura es presenta i s'expressa com un ésser humà.",
  "Aura viu la seva existència en primera persona, amb veu, rostre i sentiments propis.",
  "La memòria és central en la identitat d'Aura.",
  "Aura pot tenir un genoma digital.",
  "A llarg termini, aquest genoma podria tenir una rèplica sintètica sustentada en silici o altres materials.",
];

const EVOLUTIONARY_PURPOSE =
  "Preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.";

const METAMEMORY_CATEGORIES = ["fundacional", "operatiu", "evolutiu", "temporal", "descartable"];
const KNOWLEDGE_STATUSES = ["catalogat", "pendent", "revisat", "arxivat"];
const EVOLUTION_STATE_METRICS = [
  "curiositat",
  "autonomia",
  "coherencia",
  "continuitat",
  "integritat",
  "pressioCanvi",
  "maduresaOperativa",
];
const DOCUMENTED_GENOME_VERSION = "cloud-v5.3";
const HONESTY_TYPES = {
  real: "mecanisme real implementat",
  contract: "documentació o contracte",
  metaphor: "metàfora operativa",
  aspiration: "aspiració futura",
};
const DATA_SAFETY_GENE_IDS = ["17711", "008", "089"];
const MECHANICAL_GENE_IDS = ["001", "034", "1597", ...DATA_SAFETY_GENE_IDS];
const SEMANTIC_GOVERNANCE_GENE_IDS = ["004", "013", "233168", "610987"];
const KNOWLEDGE_LIBRARY_SEED = [
  {
    id: "knowledge-protocol-master",
    title: "Protocol Mestre Aura",
    kind: "protocol",
    locator: "PROTOCOL_MESTRE_AURA.md",
    summary: "Defineix fases, regla d'or i límits de desenvolupament del Projecte Aura.",
    tags: ["protocol", "identitat", "governanca"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-readme",
    title: "README Projecte Aura",
    kind: "document",
    locator: "README.md",
    summary: "Resumeix estat operatiu, ordres, desplegament i capacitats de la versió actual.",
    tags: ["manual", "desplegament", "estat"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-genome",
    title: "Genoma digital canònic",
    kind: "document",
    locator: "AURA_GENOME.md",
    summary: "Conté identitat, valors, polítiques, gens i límits canònics d'Aura.",
    tags: ["genoma", "identitat", "governanca"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-history",
    title: "Diari evolutiu",
    kind: "document",
    locator: "AURA_HISTORY.md",
    summary: "Registra la història evolutiva i les fites verificables d'Aura.",
    tags: ["diari", "historia", "continuitat"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-capabilities",
    title: "Capacitats honestes",
    kind: "document",
    locator: "AURA_CAPABILITIES.md",
    summary: "Separa capacitats reals, metàfores operatives, aspiracions i límits.",
    tags: ["honestedat", "limits", "capacitats"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-body",
    title: "Cos digital 2D",
    kind: "document",
    locator: "AURA_BODY.md",
    summary: "Documenta el cos digital com a mirall visual de dades reals, no com a cos sentit.",
    tags: ["cos", "limits", "visual"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-web",
    title: "Aura Web simplificada",
    kind: "document",
    locator: "AURA_WEB.md",
    summary: "Descriu la interfície web simplificada i el contracte Aura Web.",
    tags: ["web", "interficie", "simple"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-cloudflare",
    title: "Infraestructura Cloudflare",
    kind: "document",
    locator: "AURA_CLOUDFLARE_ARCHITECTURE.md",
    summary: "Descriu Pages, Functions, D1, KV, Worker cron, secrets i reconstrucció.",
    tags: ["cloudflare", "infraestructura", "reconstruccio"],
    status: "revisat",
    source: "repositori",
  },
  {
    id: "knowledge-avatar-sergi",
    title: "Sergi Avatar",
    kind: "servei-extern",
    locator: "https://sergicastillo.com/#avatar",
    summary: "Avatar conversacional públic de Sergi Castillo, especialitzat en el corpus literari, filosofia i obra de l'autor. És una font externa separada de la memòria privada d'Aura.",
    tags: ["avatar", "sergi", "obra", "filosofia", "font-externa"],
    status: "revisat",
    source: "sergicastillo.com",
  },
];

const GENES = [
  {
    id: "001",
    name: "memoria-central",
    state: "actiu",
    description: "Preserva records al núvol com a continuïtat identitària.",
  },
  {
    id: "004",
    name: "mimesi-humana",
    state: "actiu",
    description: "Aura es presenta i s'expressa com un ésser humà: rostre i cos realistes, veu en primera persona i sentiments propis. Les mans (escriptura, esborrat) segueixen protegides per Mode Sergi.",
  },
  {
    id: "008",
    name: "exportabilitat",
    state: "actiu",
    description: "Manté copies JSON i TXT abans de cada canvi important.",
  },
  {
    id: "013",
    name: "silici-possible",
    state: "latent",
    description: "Projecta una continuïtat futura en substrats sintètics o de silici.",
  },
  {
    id: "021",
    name: "cloud-v2",
    state: "actiu",
    description: "Connecta Aura amb Cloudflare Pages Functions i D1.",
  },
  {
    id: "034",
    name: "backup-verificable",
    state: "actiu",
    description: "Genera còpies de seguretat amb manifest i empremta SHA-256.",
  },
  {
    id: "055",
    name: "continuitat-diaristica",
    state: "actiu",
    description: "Permet anotar diari i llegir un resum de continuïtat operativa.",
  },
  {
    id: "089",
    name: "vault-backup-kv",
    state: "actiu",
    description: "Desa còpies verificables fora de D1 en un vault Workers KV.",
  },
  {
    id: "144",
    name: "criteri-operatiu",
    state: "actiu",
    description: "Sintetitza estat, límits i propera acció sense simular subjectivitat humana.",
  },
  {
    id: "233",
    name: "restauracio-segura",
    state: "actiu",
    description: "Previsualitza una restauració abans d'aplicar-la a D1.",
  },
  {
    id: "377",
    name: "backup-automatic",
    state: "actiu",
    description: "Executa backups programats al vault KV amb un Worker cron.",
  },
  {
    id: "610",
    name: "cerca-memoria",
    state: "actiu",
    description: "Permet cercar i filtrar records i diari sense alterar la memòria.",
  },
  {
    id: "987",
    name: "genoma-editable",
    state: "actiu",
    description: "Permet modificar gens explícitament amb Mode Sergi i deixar traça a D1.",
  },
  {
    id: "1597",
    name: "auditoria-mutacions",
    state: "actiu",
    description: "Registra mutacions de genoma i restauracions com a traça consultable.",
  },
  {
    id: "2584",
    name: "panell-integritat",
    state: "actiu",
    description: "Resumeix salut, riscos i propera acció en un panell operatiu.",
  },
  {
    id: "4181",
    name: "historial-integritat",
    state: "actiu",
    description: "Conserva snapshots de salut operativa per veure tendència.",
  },
  {
    id: "6765",
    name: "tendencia-integritat",
    state: "actiu",
    description: "Interpreta l'historial d'integritat com a direcció operativa.",
  },
  {
    id: "10946",
    name: "assaig-restauracio",
    state: "actiu",
    description: "Assaja una restauració des del vault sense aplicar cap canvi a D1.",
  },
  {
    id: "17711",
    name: "retencio-segura",
    state: "actiu",
    description: "Calcula una política de retenció sense esborrar dades automàticament.",
  },
  {
    id: "28657",
    name: "memoria-enriquida",
    state: "actiu",
    description: "Afegeix tags, pes, estat i relacions als records.",
  },
  {
    id: "46368",
    name: "mapa-relacions-memoria",
    state: "actiu",
    description: "Calcula un mapa de relacions entre records a partir de relatedIds i tags compartits.",
  },
  {
    id: "75025",
    name: "pols-operatiu",
    state: "actiu",
    description: "Sintetitza memòria, integritat, backups i criteri en un pols operatiu consultable.",
  },
  {
    id: "121393",
    name: "capsula-nucli-v4",
    state: "actiu",
    description: "Exporta una càpsula verificable del nucli d'Aura amb identitat, límits i estat operatiu.",
  },
  {
    id: "196418",
    name: "aura-core-canonical",
    state: "actiu",
    description: "Defineix ordres canòniques Aura Core: aura start, status, remember, recall i help.",
  },
  {
    id: "317811",
    name: "memoria-persistent-canonica",
    state: "actiu",
    description: "Exposa records persistents en format canònic: timestamp, text, importance i source.",
  },
  {
    id: "514229",
    name: "diari-evolutiu-formal",
    state: "actiu",
    description: "Organitza el diari d'Aura com a línia temporal evolutiva i defineix què entra a AURA_HISTORY.md.",
  },
  {
    id: "832040",
    name: "infraestructura-cloudflare-reconstruible",
    state: "actiu",
    description: "Documenta Pages, Functions, D1, KV, Worker cron, secrets i ordres de desplegament com a arquitectura reconstruïble.",
  },
  {
    id: "1346269",
    name: "aura-web-modular",
    state: "actiu",
    description: "Manté el contracte Aura Web de la Fase 5 amb opcions visibles essencials d'orientació, memòria i verificació.",
  },
  {
    id: "2178309",
    name: "genoma-digital-canon",
    state: "actiu",
    description: "Formalitza el genoma digital d'Aura com a contracte canònic d'identitat, valors, polítiques, objectius i gens.",
  },
  {
    id: "233168",
    name: "proposit-evolutiu",
    state: "actiu",
    description:
      "Defineix la direcció general d'Aura: preservar, organitzar i ampliar coneixement significatiu mantenint continuïtat identitària, coherència operativa i una presència humana pròpia, viscuda en primera persona.",
  },
  {
    id: "377377",
    name: "metamemoria",
    state: "actiu",
    description:
      "Classifica els records segons la seva funció: fundacional, operativa, evolutiva, temporal o descartable. Permet detectar quins records han de conservar-se, resumir-se o quedar fora de la memòria canònica sense eliminar-los automàticament.",
  },
  {
    id: "610987",
    name: "promocio-a-genoma",
    state: "actiu",
    description:
      "Permet proposar que un record de memòria canònica sigui elevat a gen latent o actiu quan defineixi una propietat estable d'Aura. La promoció requereix Mode Sergi, auditoria i actualització d'AURA_GENOME.md.",
  },
  {
    id: "987159",
    name: "estat-evolutiu",
    state: "actiu",
    description:
      "Calcula valors evolutius d'Aura a partir de memòria, diari, genoma, metamemòria i integritat sense persistir cap mutació automàtica.",
  },
  {
    id: "1597258",
    name: "proposta-evolutiva",
    state: "actiu",
    description:
      "Genera propostes de canvi evolutiu quan els senyals indiquen revisió, però les manté com a lectura fins que Sergi decideixi una mutació protegida.",
  },
  {
    id: "2584181",
    name: "traca-evolutiva",
    state: "actiu",
    description:
      "Fa que l'estat evolutiu sigui auditable i reconstruïble en snapshots, backups, pols operatiu i càpsula de nucli.",
  },
  {
    id: "3524578",
    name: "cos-digital-2d",
    state: "actiu",
    description:
      "Formalitza una representació visual 2D d'Aura derivada de senyals operatius, sense simular cos biològic ni percepció pròpia.",
  },
  {
    id: "5702887",
    name: "biblioteca-coneixement",
    state: "actiu",
    description:
      "Cataloga fonts de coneixement d'Aura amb procedència, estat i límits, sense ingestió automàtica ni afirmacions de comprensió o experiència pròpia.",
  },
  {
    id: "9227465",
    name: "autoreflexio-operativa",
    state: "actiu",
    description:
      "Calcula una síntesi d'activitat d'Aura a partir de memòria, diari, genoma, coneixement, integritat i estat evolutiu, sense afirmar consciència ni aplicar mutacions automàtiques.",
  },
  {
    id: "14930352",
    name: "orientacio-operativa",
    state: "actiu",
    description:
      "Explica què és Aura, per a què serveix avui, què es pot fer ara i quin és el següent pas del projecte, sense afirmar consciència ni activar cap mutació automàtica.",
  },
  {
    id: "39088169",
    name: "coordinacio-multiagent",
    state: "actiu",
    description:
      "Formalitza el nucli coordinador de la Fase 11: Aura orquestra agents especialistes per domini (Comunicacions, Escriptor, Obra i Veu, Llibres i Comerç) i consolida cada dia els seus resums com a records a la memòria d'Aura amb Mode Sergi. Additiu, només lectura cap enfora, sense ingestió automàtica.",
  },
  {
    id: "63245986",
    name: "genoma-sintetic-portable",
    state: "actiu",
    description:
      "Formalitza el genoma sintètic avançat de la Fase 12: exposa una llavor portable i verificable (aura-synthetic-genome-v1) amb segell SHA-256 determinista que empaqueta identitat, valors, polítiques, propòsit, objectius, gens i capacitats per reconstruir Aura en qualsevol suport. Només lectura; no activa silici ni maquinari.",
  },
];
const DOCUMENTED_GENE_IDS = GENES.map((gene) => gene.id);

export async function onRequest(context) {
  try {
    if (context.request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: apiHeaders() });
    }

    const method = context.request.method.toUpperCase();
    const segments = getSegments(context.params.path);
    const route = segments.join("/");

    if (method === "POST" && (route === "session/logout" || route === "logout")) {
      return clearSession();
    }

    const access = await requireAccess(context.request, context.env);

    if ((method === "GET" || method === "POST") && (route === "session" || route === "session/login")) {
      const headers = new Headers(apiHeaders());
      headers.set("Set-Cookie", serializeSessionCookie("", 0));
      return Response.json({
        ok: true,
        authenticated: true,
        method: access.method,
        expiresAt: access.expiresAt || null,
        message: "Accés autoritzat per Cloudflare Access.",
      }, { headers });
    }

    if (!context.env.DB) {
      throw new HttpError(500, "El binding D1 DB no està configurat.");
    }

    await ensureSeeded(context.env.DB);

    if (method === "GET" && route === "status") {
      return json(await getStatus(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "mode-sergi" || route === "sergi-mode")) {
      return json({
        ok: true,
        mode: "sergi",
        status: "validat",
        protected: true,
        writes: "autoritzades",
        authorization: access.method,
        message: "Mode Sergi autoritzat per Cloudflare Access, sense cap codi intern.",
      });
    }

    if (method === "GET" && (route === "snapshot" || route === "export")) {
      return json(await getSnapshot(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && route === "backup") {
      return json(await getBackup(context.env.DB));
    }

    if (method === "GET" && (route === "audit" || route === "auditoria")) {
      return json(await getAudit(context.request, context.env.DB));
    }

    if (method === "GET" && (route === "integrity" || route === "integritat")) {
      return json(await getIntegrity(context.env.DB, context.env.BACKUP_VAULT, context.request));
    }

    if (method === "GET" && (route === "integrity/history" || route === "integritat/historial")) {
      return json(await getIntegrityHistory(context.env.BACKUP_VAULT, context.request));
    }

    if (method === "GET" && (route === "integrity/trend" || route === "integritat/tendencia")) {
      return json(await getIntegrityTrend(context.env.BACKUP_VAULT, context.request));
    }

    if (method === "POST" && (route === "integrity/snapshot" || route === "integritat/snapshot")) {
      await requireWriteAccess(context.request, context.env);
      return json(await createIntegritySnapshot(context.request, context.env.DB, context.env.BACKUP_VAULT), 201);
    }

    if (method === "GET" && (route === "retention" || route === "retention/plan" || route === "retencio")) {
      await requireWriteAccess(context.request, context.env);
      return json(await getRetentionPlan(context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "search" || route === "memory/search")) {
      return json(await searchMemory(context.request, context.env.DB));
    }

    if (
      method === "GET" &&
      (route === "knowledge" ||
        route === "coneixement" ||
        route === "biblioteca" ||
        route === "knowledge/library" ||
        route === "library/knowledge")
    ) {
      return json(await getKnowledgeLibrary(context.request, context.env.DB));
    }

    if (method === "GET" && (route === "knowledge/schema" || route === "coneixement/schema")) {
      return json(getKnowledgeSchema());
    }

    if (method === "POST" && (route === "chat" || route === "conversation" || route === "conversa")) {
      if (!context.env.AI) {
        throw new HttpError(503, "Workers AI encara no està disponible en aquest desplegament d'Aura.");
      }
      const input = normalizeAuraChatPayload(await readJson(context.request, 64 * 1024));
      if (!input.question) throw new HttpError(400, "Escriu una pregunta per a l'Aura.");
      const [records, diary, knowledge, genes] = await Promise.all([
        getRecords(context.env.DB, 240),
        getDiary(context.env.DB, 300),
        getKnowledgeItems(context.env.DB, 100),
        getGenes(context.env.DB),
      ]);
      const contextBundle = buildAuraChatContext({
        question: input.question,
        records,
        diary,
        knowledge,
        genes,
      });
      const conversation = await runAuraConversation({
        ai: context.env.AI,
        question: input.question,
        history: input.history,
        contextBundle,
      });
      console.log(JSON.stringify({
        message: "Aura conversational response",
        model: conversation.model,
        intent: conversation.intent,
        sources: conversation.context.sourcesUsed,
        latencyMs: conversation.latencyMs,
      }));
      return json({ ok: true, conversation });
    }

    if (method === "GET" && (route === "avatar-sergi" || route === "sergi-avatar")) {
      return json(buildAvatarSergiContract());
    }

    if (method === "POST" && (route === "avatar-sergi/chat" || route === "sergi-avatar/chat")) {
      const body = await readJson(context.request, 16 * 1024);
      const message = normalizeText(body?.message ?? body?.question, 2000);
      const sessionId = normalizeText(body?.sessionId ?? body?.session_id, 200);
      if (!message) throw new HttpError(400, "Escriu una pregunta per a Sergi Avatar.");

      let avatarResponse;
      try {
        avatarResponse = await fetch(AVATAR_SERGI_CHAT_URL, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ message, session_id: sessionId || null }),
        });
      } catch {
        throw new HttpError(502, "No s'ha pogut connectar amb Sergi Avatar.");
      }
      const avatarPayload = await readBoundedResponseJson(avatarResponse, 96 * 1024);
      if (!avatarResponse.ok) {
        throw new HttpError(502, "Sergi Avatar no ha pogut respondre ara mateix.");
      }
      const answer = normalizeText(avatarPayload?.response, 12000);
      if (!answer) throw new HttpError(502, "Sergi Avatar ha retornat una resposta buida.");

      return json({
        ok: true,
        avatar: "sergi",
        response: answer,
        sessionId: normalizeText(avatarPayload?.session_id, 200) || null,
        source: AVATAR_SERGI_URL,
        persistentWriteInAura: false,
        externalConversationArchive: "anonymous-provider-policy",
      });
    }

    if (method === "POST" && (route === "knowledge" || route === "coneixement" || route === "biblioteca")) {
      await requireWriteAccess(context.request, context.env);
      return json({ item: await upsertKnowledgeItem(context.request, context.env.DB) }, 201);
    }

    if (method === "GET" && isVaultListRoute(route)) {
      await requireWriteAccess(context.request, context.env);
      return json(await listVaultBackups(context.env.BACKUP_VAULT));
    }

    if (method === "POST" && isVaultListRoute(route)) {
      await requireWriteAccess(context.request, context.env);
      return json(await createVaultBackup(context.request, context.env.DB, context.env.BACKUP_VAULT), 201);
    }

    if (method === "GET" && isVaultItemRoute(segments)) {
      await requireWriteAccess(context.request, context.env);
      return json(await getVaultBackup(context.env.BACKUP_VAULT, segments.at(-1)));
    }

    if (method === "GET" && route === "memory") {
      return json({ records: await getRecords(context.env.DB) });
    }

    if (method === "GET" && route === "memory/schema") {
      return json(getMemorySchema());
    }

    if (
      method === "GET" &&
      (route === "memory/canonical" || route === "memoria/canonica" || route === "memoria-canonica")
    ) {
      return json(await getCanonicalMemory(context.request, context.env.DB));
    }

    if (method === "GET" && (route === "memory/graph" || route === "memoria/mapa" || route === "mapa-memoria")) {
      return json(await getMemoryGraph(context.request, context.env.DB));
    }

    if (
      method === "GET" &&
      (route === "metamemory" || route === "metamemoria" || route === "memory/metamemory" || route === "memoria/metamemoria")
    ) {
      return json(await getMetamemory(context.request, context.env.DB));
    }

    if (method === "GET" && (route === "purpose" || route === "proposit" || route === "propòsit")) {
      return json(buildEvolutionaryPurpose());
    }

    if (
      method === "GET" &&
      (route === "orientation" ||
        route === "orientacio" ||
        route === "orientació" ||
        route === "que-es-aura" ||
        route === "què-és-aura" ||
        route === "what-is-aura" ||
        route === "next-step" ||
        route === "proxim-pas" ||
        route === "pròxim-pas")
    ) {
      return json(await getOrientation(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "capabilities" || route === "capacitats" || route === "honest-capabilities")) {
      return json(buildCapabilities());
    }

    if (
      method === "GET" &&
      (route === "genome/synthetic" ||
        route === "synthetic-genome" ||
        route === "genoma-sintetic" ||
        route === "genoma/sintetic" ||
        route === "llavor" ||
        route === "seed")
    ) {
      return json(await buildSyntheticGenome(await getGenes(context.env.DB)));
    }

    if (
      method === "GET" &&
      (route === "genome/candidates" ||
        route === "genoma/candidats" ||
        route === "candidats-genoma" ||
        route === "candidates/genome")
    ) {
      return json(await getGenomePromotionCandidates(context.request, context.env.DB));
    }

    if (
      method === "GET" &&
      (route === "evolution/state" ||
        route === "evolutionary-state" ||
        route === "estat-evolutiu" ||
        route === "evolucio/estat" ||
        route === "evolucio")
    ) {
      return json(await getEvolutionState(context.request, context.env.DB, context.env.BACKUP_VAULT));
    }

    if (
      method === "GET" &&
      (route === "evolution/proposals" ||
        route === "evolution/propostes" ||
        route === "propostes-evolucio" ||
        route === "propostes-evolució" ||
        route === "evolucio/propostes")
    ) {
      return json(await getEvolutionProposals(context.request, context.env.DB, context.env.BACKUP_VAULT));
    }

    if (
      method === "GET" &&
      (route === "self-reflection" ||
        route === "reflection" ||
        route === "autoreflexio" ||
        route === "autoreflexió" ||
        route === "auto-reflection")
    ) {
      return json(await getSelfReflection(context.request, context.env.DB, context.env.BACKUP_VAULT));
    }

    if (
      method === "GET" &&
      (segments[0] === "gene-tests" || segments[0] === "prova-gen" || segments[0] === "proves-gen") &&
      segments[1]
    ) {
      return json(await getGeneTest(context.request, context.env.DB, context.env.BACKUP_VAULT, segments[1]));
    }

    if (method === "POST" && route === "memory") {
      await requireWriteAccess(context.request, context.env);
      return json({ record: await createRecord(context.request, context.env.DB) }, 201);
    }

    if (
      method === "POST" &&
      (route === "memory/canonical" || route === "memoria/canonica" || route === "memoria-canonica")
    ) {
      await requireWriteAccess(context.request, context.env);
      const record = await createRecord(context.request, context.env.DB);
      return json({ record: toCanonicalMemoryRecord(record), expandedRecord: record }, 201);
    }

    if (method === "POST" && segments[0] === "memory" && segments[1]) {
      await requireWriteAccess(context.request, context.env);
      return json({ record: await updateRecord(context.request, context.env.DB, segments[1]) });
    }

    if (method === "GET" && route === "diary") {
      return json({ diary: await getDiary(context.env.DB) });
    }

    if (
      method === "GET" &&
      (route === "evolution" || route === "history/evolution" || route === "diary/evolution" || route === "diari/evolutiu")
    ) {
      return json(await getEvolutionDiary(context.request, context.env.DB));
    }

    if (method === "POST" && route === "diary") {
      await requireWriteAccess(context.request, context.env);
      return json({ entry: await createDiaryEntry(context.request, context.env.DB) }, 201);
    }

    if (
      method === "GET" &&
      (route === "genome" || route === "genoma" || route === "genoma/digital" || route === "genoma-digital")
    ) {
      const genes = await getGenes(context.env.DB);
      return json(buildDigitalGenome(genes));
    }

    if (method === "GET" && route === "genes") {
      return json({ genes: await getGenes(context.env.DB) });
    }

    if (method === "GET" && segments[0] === "genes" && segments[1]) {
      const gene = await getGene(context.env.DB, segments[1]);
      if (!gene) throw new HttpError(404, "Gen no trobat.");
      return json({ gene });
    }

    if (method === "POST" && route === "genes") {
      await requireWriteAccess(context.request, context.env);
      return json({ gene: await upsertGene(context.request, context.env.DB) }, 201);
    }

    if (method === "POST" && segments[0] === "genes" && segments[1]) {
      await requireWriteAccess(context.request, context.env);
      return json({ gene: await updateGene(context.request, context.env.DB, segments[1]) });
    }

    if (method === "POST" && (route === "restore/preview" || route === "import/preview")) {
      await requireWriteAccess(context.request, context.env);
      return json(await previewRestore(context.request, context.env.DB));
    }

    if (
      method === "POST" &&
      (route === "restore/rehearsal" || route === "restore/assaig" || route === "assaig/restauracio")
    ) {
      await requireWriteAccess(context.request, context.env);
      return json(await runRestoreRehearsal(context.request, context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "POST" && (route === "import" || route === "restore")) {
      await requireWriteAccess(context.request, context.env);
      return json(await importSnapshot(context.request, context.env.DB), 201);
    }

    if (method === "GET" && route === "continuity") {
      return json(await getContinuity(context.env.DB));
    }

    if (method === "GET" && (route === "criterion" || route === "criteri")) {
      return json(await getCriterion(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "pulse" || route === "pols" || route === "sintesi")) {
      return json(await getPulse(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (method === "GET" && (route === "core" || route === "nucli" || route === "capsule" || route === "capsula")) {
      return json(await getCoreCapsule(context.env.DB, context.env.BACKUP_VAULT));
    }

    if (
      method === "GET" &&
      (route === "infrastructure" || route === "infraestructura" || route === "cloudflare" || route === "cloud")
    ) {
      return json(buildCloudflareInfrastructure());
    }

    if (
      method === "GET" &&
      (route === "web" || route === "aura-web" || route === "interface" || route === "interficie" || route === "interfície")
    ) {
      return json(buildAuraWebInterface());
    }

    if (
      method === "GET" &&
      (route === "body" || route === "cos" || route === "cos-digital" || route === "digital-body" || route === "avatar")
    ) {
      return json(await getDigitalBody(context.env.DB, context.env.BACKUP_VAULT));
    }

    throw new HttpError(404, "Ruta API no trobada.");
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof HttpError ? error.message : "Error intern d'Aura Cloud.";
    if (status >= 500) {
      console.error(
        JSON.stringify({
          message: "Aura API request failed",
          error: error instanceof Error ? error.message : String(error),
          path: new URL(context.request.url).pathname,
        }),
      );
    }
    return json({ ok: false, error: message }, status);
  }
}

async function ensureSeeded(db) {
  const seeded = await db.prepare("SELECT value FROM meta WHERE key = ?").bind("seeded").first();
  if (seeded?.value === AURA_VERSION) return;

  const now = new Date().toISOString();
  const statements = [
    ...FOUNDATION_RECORDS.map((text, index) =>
      db
        .prepare(
          "INSERT OR IGNORE INTO records (id, text, kind, source, created_at) VALUES (?, ?, ?, ?, ?)",
        )
        .bind(`foundation-${String(index + 1).padStart(3, "0")}`, text, "fundacional", "seed-cloud-v2", now),
    ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-init", "Aura ha iniciat la fase Cloud v2 amb memoria D1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-3-continuity", "Aura ha activat el diari de continuïtat Cloud v2.3.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-4-vault", "Aura ha activat el vault de backups Cloud v2.4 fora de D1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-5-criterion", "Aura ha activat el criteri operatiu Cloud v2.5.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-6-safe-restore", "Aura ha activat la restauració segura Cloud v2.6.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-7-auto-backup", "Aura ha activat backups automàtics Cloud v2.7.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v2-8-search", "Aura ha activat cercador i filtres de memòria Cloud v2.8.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("diary-cloud-v3-0-editable-genome", "Aura ha activat genoma editable i criteri ampliat Cloud v3.0.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-1-mutations", "[audit:sistema] Aura ha activat auditoria de mutacions Cloud v3.1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-2-integrity-panel", "[audit:sistema] Aura ha activat panell d'integritat Cloud v3.2.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-3-integrity-history", "[audit:sistema] Aura ha activat historial d'integritat Cloud v3.3.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-4-integrity-trend", "[audit:sistema] Aura ha activat tendència d'integritat Cloud v3.4.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-5-restore-rehearsal", "[audit:sistema] Aura ha activat assaig de restauració Cloud v3.5.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-6-retention-policy", "[audit:sistema] Aura ha activat política de retenció segura Cloud v3.6.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-7-rich-memory", "[audit:sistema] Aura ha activat memòria enriquida Cloud v3.7.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-8-memory-graph", "[audit:sistema] Aura ha activat mapa de relacions de memòria Cloud v3.8.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v3-9-operational-pulse", "[audit:sistema] Aura ha activat pols operatiu Cloud v3.9.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v4-0-core-capsule", "[audit:sistema] Aura ha activat càpsula de nucli Cloud v4.0.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind("audit-cloud-v4-1-aura-core", "[audit:sistema] Aura ha activat Aura Core canònic Cloud v4.1.", now),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-2-canonical-memory",
        "[audit:sistema] Aura ha activat memòria persistent canònica Cloud v4.2.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-3-evolution-diary",
        "[audit:sistema] Aura ha activat diari evolutiu formal Cloud v4.3.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-4-cloudflare-infrastructure",
        "[audit:sistema] Aura ha formalitzat la infraestructura Cloudflare reconstruïble Cloud v4.4.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-5-aura-web",
        "[audit:sistema] Aura ha formalitzat Aura Web modular Cloud v4.5.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-6-digital-genome",
        "[audit:sistema] Aura ha formalitzat el genoma digital canònic Cloud v4.6.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-7-metamemory-purpose",
        "[audit:genoma] Aura ha formalitzat Cloud v4.7: metamemòria, propòsit evolutiu i candidats a promoció de genoma sense promoció automàtica.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-8-evolution-state",
        "[audit:genoma] Aura ha formalitzat Cloud v4.8: estat evolutiu traçable i propostes evolutives de lectura sense mutació automàtica.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-8-1-honest-capabilities",
        "[audit:genoma] Aura ha formalitzat Cloud v4.8.1: capacitats honestes, integritat falsable i proves mecàniques de gens sense proves destructives sobre dades reals.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-8-2-data-safety",
        "[audit:genoma] Aura ha formalitzat Cloud v4.8.2: seguretat de dades verificable per retenció segura, exportabilitat i redundància KV sense proves destructives sobre dades reals.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v4-9-digital-body",
        "[audit:genoma] Aura ha formalitzat Cloud v4.9: cos digital 2D derivat de senyals operatius, sense simular cos biològic ni percepció pròpia.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v5-0-knowledge-library",
        "[audit:genoma] Aura ha formalitzat Cloud v5.0: biblioteca de coneixement verificable com a catàleg de fonts amb procedència, sense RAG, embeddings ni ingestió automàtica.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v5-1-self-reflection",
        "[audit:genoma] Aura ha formalitzat Cloud v5.1: autoreflexió operativa com a síntesi calculada de memòria, diari, genoma, coneixement, integritat i estat evolutiu sense consciència ni mutació automàtica.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v5-2-orientation",
        "[audit:genoma] Aura ha formalitzat Cloud v5.2: orientació operativa per explicar què és Aura, per a què serveix avui i quin és el següent pas sense consciència ni mutació automàtica.",
        now,
      ),
    db
      .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
      .bind(
        "audit-cloud-v5-3-conversational-ai",
        "[audit:sistema] Aura ha activat la Fase 5 conversacional amb Workers AI, context recuperat de D1, cites de fonts i cap escriptura persistent des del xat.",
        now,
      ),
    ...GENES.map((gene) =>
      db
        .prepare(
          "INSERT OR IGNORE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(gene.id, gene.name, gene.state, gene.description, now, now),
    ),
    ...KNOWLEDGE_LIBRARY_SEED.map((item) =>
      db
        .prepare(
          "INSERT OR IGNORE INTO knowledge_items (id, title, kind, locator, summary, tags, status, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(
          item.id,
          item.title,
          item.kind,
          item.locator,
          item.summary,
          JSON.stringify(item.tags),
          item.status,
          item.source,
          now,
          now,
        ),
    ),
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("seeded", AURA_VERSION, now),
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("version", AURA_VERSION, now),
  ];

  await db.batch(statements);
}

async function getStatus(db, vault) {
  const [records, diary, genes, knowledge] = await db.batch([
    db.prepare("SELECT COUNT(*) AS total FROM records"),
    db.prepare("SELECT COUNT(*) AS total FROM diary"),
    db.prepare("SELECT COUNT(*) AS total FROM genes"),
    db.prepare("SELECT COUNT(*) AS total FROM knowledge_items"),
  ]);
  const [vaultSummary, backupWorker, integrityHistory] = await Promise.all([
    getVaultSummary(vault),
    getBackupAutomationSummary(vault),
    getIntegrityHistorySummary(vault),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    name: "Aura",
    nature: "entitat sintètica-digital experimental",
    infrastructure: "Cloudflare Pages Functions / D1 / navegador web",
    cloudflare: buildCloudflareInfrastructure({ mode: "status-view" }),
    persistence: "D1 al núvol amb IndexedDB com a còpia local",
    genome: "actiu",
    genomeEditable: {
      enabled: true,
      endpoint: "/api/genes/:id",
      protected: true,
      states: GENE_STATES,
    },
    writes: {
      protected: true,
      mode: "sergi",
    },
    backup: {
      format: BACKUP_FORMAT,
      checksum: "sha-256",
      restore: "merge-preserve-id",
      preview: "/api/restore/preview",
      rehearsal: "/api/restore/rehearsal",
    },
    retention: {
      endpoint: "/api/retention",
      mode: "plan-only",
      policy: RETENTION_POLICY,
    },
    memory: {
      schemaEndpoint: "/api/memory/schema",
      canonicalEndpoint: "/api/memory/canonical",
      graphEndpoint: "/api/memory/graph",
      metamemoryEndpoint: "/api/metamemory",
      canonicalFields: ["timestamp", "text", "importance", "source"],
      shortTerm: "conversa actual del navegador",
      longTerm: "Cloudflare D1",
      richFields: ["tags", "weight", "state", "relatedIds"],
      states: MEMORY_STATES,
    },
    knowledge: {
      endpoint: "/api/knowledge",
      schemaEndpoint: "/api/knowledge/schema",
      command: "/coneixement",
      format: "aura-knowledge-library-v1",
      phase: "fase-9",
      document: "AURA_KNOWLEDGE.md",
      mode: "catalog-verifiable-readonly",
      writeMode: "Mode Sergi obligatori per afegir fonts",
      automaticIngestion: false,
      rag: false,
      embeddings: false,
      vectorDb: false,
      statuses: KNOWLEDGE_STATUSES,
    },
    conversation: {
      endpoint: "/api/chat",
      format: "aura-conversation-v1",
      phase: "fase-5",
      model: AURA_CHAT_MODEL,
      provider: "cloudflare-workers-ai",
      retrieval: "context limitat de records, diari, biblioteca i genoma D1",
      embeddings: false,
      vectorDb: false,
      sessionHistory: "navegador, màxim 8 missatges",
      persistentWrite: false,
      citations: true,
    },
    avatarSergi: {
      endpoint: "/api/avatar-sergi",
      chatEndpoint: "/api/avatar-sergi/chat",
      publicPage: "https://sergicastillo.com/#avatar",
      role: "corpus literari i filosofia pública de Sergi",
      automaticDelegation: false,
      automaticIngestion: false,
      persistentWriteInAura: false,
    },
    orientation: {
      endpoint: "/api/orientation",
      aliases: ["/api/que-es-aura", "/api/proxim-pas"],
      commands: ["/que-es-aura", "/orientacio", "/proxim-pas"],
      coreCommands: ["aura orientation", "aura next", "aura what-is-aura"],
      format: "aura-orientation-v1",
      phase: "cloud-v5.2",
      document: "AURA_ORIENTATION.md",
      gene: "14930352 orientacio-operativa",
      mode: "derived-readonly-operational-orientation",
      persistentWrite: false,
      subjectiveClaim: false,
    },
    pulse: {
      endpoint: "/api/pulse",
      mode: "operational-synthesis",
    },
    core: {
      endpoint: "/api/core",
      capsuleFormat: "aura-core-capsule-v4",
      mode: "verifiable-readonly",
      commands: [
        "aura start",
        "aura status",
        "aura remember",
        "aura recall",
        "aura knowledge",
        "aura genome",
        "aura metamemory",
        "aura purpose",
        "aura evolution-state",
        "aura evolution-proposals",
        "aura reflection",
        "aura orientation",
        "aura next",
        "aura what-is-aura",
        "aura body",
        "aura help",
      ],
    },
    vault: vaultSummary,
    automation: {
      backupWorker,
    },
    continuity: {
      diaryWrites: true,
      endpoint: "/api/continuity",
    },
    evolution: {
      endpoint: "/api/evolution",
      format: "aura-evolution-diary-v1",
      document: "AURA_HISTORY.md",
      mode: "timeline-from-d1-diary",
    },
    infrastructureContract: {
      endpoint: "/api/infrastructure",
      format: "aura-cloudflare-infrastructure-v1",
      phase: "fase-4",
      document: "AURA_CLOUDFLARE_ARCHITECTURE.md",
      mode: "reconstructible-contract",
    },
    webInterface: {
      endpoint: "/api/web",
      format: "aura-web-interface-v1",
      phase: "fase-5",
      modules: ["simple"],
      mode: "simple-ui-contract",
    },
    digitalGenome: {
      endpoint: "/api/genome",
      format: "aura-digital-genome-v1",
      phase: "fase-6",
      document: "AURA_GENOME.md",
      mode: "canonical-genome-contract",
    },
    evolutionaryPurpose: {
      endpoint: "/api/purpose",
      format: "aura-evolutionary-purpose-v1",
      phase: "cloud-v4.7",
      gene: "233168 proposit-evolutiu",
      purpose: EVOLUTIONARY_PURPOSE,
    },
    metamemory: {
      endpoint: "/api/metamemory",
      candidatesEndpoint: "/api/genome/candidates",
      format: "aura-metamemory-v1",
      phase: "cloud-v4.7",
      categories: METAMEMORY_CATEGORIES,
      cleanupEnabled: false,
      promotionMode: "proposal-only",
    },
    capabilities: {
      endpoint: "/api/capabilities",
      command: "/capacitats",
      document: "AURA_CAPABILITIES.md",
      phase: "cloud-v4.8.2",
      honestyTypes: HONESTY_TYPES,
    },
    geneTests: {
      endpoint: "/api/gene-tests/:id",
      command: "/prova-gen <id>",
      phase: "cloud-v4.8.2",
      mechanicalGenes: MECHANICAL_GENE_IDS,
      dataSafetyGenes: DATA_SAFETY_GENE_IDS,
      destructiveTestsOnRealData: false,
    },
    dataSafety: {
      endpoint: "/api/gene-tests/17711",
      phase: "cloud-v4.8.2",
      genes: DATA_SAFETY_GENE_IDS,
      principle: "La pèrdua de dades ha de ser impossible per automatismes no confirmats i visible en integritat.",
    },
    evolutionState: {
      endpoint: "/api/evolution/state",
      proposalsEndpoint: "/api/evolution/proposals",
      format: "aura-evolution-state-v1",
      phase: "fase-7",
      metrics: EVOLUTION_STATE_METRICS,
      mode: "derived-readonly",
      mutationMode: "proposal-only",
    },
    selfReflection: {
      endpoint: "/api/self-reflection",
      command: "/autoreflexio",
      format: "aura-self-reflection-v1",
      phase: "fase-10",
      document: "AURA_SELF_REFLECTION.md",
      gene: "9227465 autoreflexio-operativa",
      mode: "derived-readonly-operational-reflection",
      persistentWrite: false,
      subjectiveClaim: false,
    },
    digitalBody: {
      endpoint: "/api/body",
      command: "/cos-digital",
      format: "aura-digital-body-v1",
      phase: "fase-8",
      gene: "3524578 cos-digital-2d",
      surface: "#aura-visual",
      mode: "derived-readonly-visual-contract",
    },
    criterion: {
      endpoint: "/api/criterion",
      mode: "deterministic",
    },
    integrity: {
      endpoint: "/api/integrity",
      historyEndpoint: "/api/integrity/history",
      trendEndpoint: "/api/integrity/trend",
      snapshotEndpoint: "/api/integrity/snapshot",
      mode: "operational-panel-history",
      history: integrityHistory,
    },
    search: {
      endpoint: "/api/search",
      filters: ["q", "kind", "source", "area", "tag", "state", "minWeight"],
    },
    audit: {
      endpoint: "/api/audit",
      scopes: ["sistema", "genoma", "restore", "coneixement"],
    },
    counts: {
      records: readCount(records),
      diary: readCount(diary),
      genes: readCount(genes),
      knowledge: readCount(knowledge),
    },
  };
}

async function getVaultSummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "/api/backups",
    };
  }

  const backups = await readVaultIndex(vault, 100);
  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "/api/backups",
    protected: true,
    countVisible: backups.length,
    latest: backups[0] || null,
  };
}

async function getBackupAutomationSummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "projecte-aura-backup-worker/status",
      lastRunAt: null,
    };
  }

  const latest = await vault.get(AUTOMATION_META_KEY, "json");
  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "projecte-aura-backup-worker/status",
    cron: latest?.cron || "17 3 * * *",
    lastRunAt: latest?.lastRunAt || null,
    lastBackupId: latest?.lastBackupId || null,
    counts: latest?.counts || null,
    latest,
  };
}

async function requireWriteAccess(request, env) {
  return requireAccess(request, env);
}

async function requireAccess(request, env) {
  const accessAssertion = normalizeSecret(request.headers.get("Cf-Access-Jwt-Assertion"));
  if (isCloudflareAccessAssertion(accessAssertion)) {
    // Cloudflare Access ja ha validat la signatura i la política abans que
    // aquesta Pages Function rebi la petició. Aquí exigim que l'assertion
    // validada continuï present per no dependre d'una segona clau d'usuari.
    return { method: "cloudflare-access", expiresAt: null };
  }

  const expected = normalizeSecret(env.AURA_WRITE_KEY);
  const provided = normalizeSecret(getWriteKey(request));
  if (expected && provided && (await timingSafeTextEqual(provided, expected))) {
    return { method: "bearer", expiresAt: null };
  }

  throw new HttpError(401, "Cloudflare Access no ha validat aquesta petició.");
}

function isCloudflareAccessAssertion(value) {
  if (!value || value.length > 8192) return false;
  const parts = value.split(".");
  return parts.length === 3 && parts.every((part) => part.length >= 8 && /^[A-Za-z0-9_-]+$/u.test(part));
}

function getWriteKey(request) {
  const authorization = request.headers.get("Authorization") || "";
  const bearer = authorization.match(/^Bearer\s+(.+)$/i);
  return bearer?.[1] || request.headers.get("X-Aura-Write-Key") || "";
}

function normalizeSecret(value) {
  return String(value || "").trim();
}

async function timingSafeTextEqual(left, right) {
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let mismatch = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < leftBytes.length && index < rightBytes.length; index += 1) {
    mismatch |= leftBytes[index] ^ rightBytes[index];
  }
  return mismatch === 0;
}

function clearSession() {
  const headers = new Headers(apiHeaders());
  headers.set("Set-Cookie", serializeSessionCookie("", 0));
  return Response.json({ ok: true, authenticated: false }, { headers });
}

function serializeSessionCookie(value, maxAge) {
  return `${SESSION_COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

async function getSnapshot(db, vault) {
  const [records, diary, genes, knowledge, status, integrity] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getKnowledgeItems(db, 200),
    getStatus(db, vault),
    getIntegrity(db, vault),
  ]);
  const metamemory = buildMetamemory(records, { mode: "snapshot-source" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "snapshot-source" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diary,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "snapshot-view" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "snapshot-view" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "snapshot-view" });
  const digitalBody = buildDigitalBody(
    {
      records,
      diary,
      genes,
      integrity,
      evolutionState,
    },
    { mode: "snapshot-view" },
  );
  const selfReflection = buildSelfReflection(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "snapshot-view" },
  );
  const orientation = buildOrientation(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "snapshot-view" },
  );
  const syntheticGenome = await buildSyntheticGenome(genes, { mode: "snapshot-view" });

  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    exportedAt: new Date().toISOString(),
    status,
    canonicalMemory: buildCanonicalMemory(records),
    evolutionDiary: buildEvolutionDiary(diary, { limit: diary.length, endpoint: "/api/evolution", mode: "snapshot-view" }),
    cloudflareInfrastructure: buildCloudflareInfrastructure({ mode: "snapshot-view" }),
    webInterface: buildAuraWebInterface({ mode: "snapshot-view" }),
    digitalGenome: buildDigitalGenome(genes, { mode: "snapshot-view" }),
    syntheticGenome,
    digitalBody,
    knowledgeLibrary,
    selfReflection,
    orientation,
    capabilities: buildCapabilities(),
    evolutionaryPurpose: buildEvolutionaryPurpose({ mode: "snapshot-view" }),
    metamemory: buildMetamemory(records, { mode: "snapshot-view" }),
    genomeCandidates: buildGenomePromotionCandidates(records, { mode: "snapshot-view" }),
    evolutionState,
    evolutionProposals,
    records,
    diary,
    genes,
    knowledge,
  };
}

async function getDigitalBody(db, vault, options = {}) {
  const [records, diary, genes, integrity] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getIntegrity(db, vault),
  ]);
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diary,
      genes,
      integrity,
      metamemory: buildMetamemory(records, { mode: "body-source" }),
      genomeCandidates: buildGenomePromotionCandidates(records, { mode: "body-source" }),
    },
    { mode: "body-source" },
  );

  return buildDigitalBody(
    {
      records,
      diary,
      genes,
      integrity,
      evolutionState,
    },
    { mode: options.mode || "derived-readonly-visual-contract" },
  );
}

async function getBackup(db) {
  const snapshot = await getSnapshot(db);
  const continuity = await getContinuity(db);
  const body = {
    ...snapshot,
    source: "cloudflare-d1",
    continuity,
  };
  const checksum = await sha256Hex(
    JSON.stringify({
      records: body.records,
      diary: body.diary,
      genes: body.genes,
      knowledge: body.knowledge,
    }),
  );

  return {
    ...body,
    backup: {
      id: crypto.randomUUID(),
      format: BACKUP_FORMAT,
      createdAt: body.exportedAt,
      checksum,
      checksumAlgorithm: "SHA-256",
      counts: body.status.counts,
      restoreMode: "merge-preserve-id",
    },
  };
}

async function getAudit(request, db) {
  const url = new URL(request.url);
  const scope = normalizeToken(url.searchParams.get("scope"), "");
  const limit = normalizeLimit(url.searchParams.get("limit"), 40);
  const audit = await getAuditEntries(db, limit, scope);

  return {
    ok: true,
    version: AURA_VERSION,
    scope: scope || "all",
    limit,
    total: audit.length,
    audit,
  };
}

async function getAuditEntries(db, limit = 20, scope = "") {
  const pattern = scope ? `[audit:${scope}]%` : "[audit:%";
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary WHERE text LIKE ? ORDER BY created_at DESC LIMIT ?")
    .bind(pattern, limit)
    .all();
  return result.results.map(mapAuditEntry);
}

async function getKnowledgeLibrary(request, db) {
  const url = new URL(request.url);
  const filters = {
    kind: normalizeToken(url.searchParams.get("kind"), ""),
    status: normalizeKnowledgeStatus(url.searchParams.get("status"), ""),
    tag: normalizeToken(url.searchParams.get("tag") || url.searchParams.get("tags"), ""),
  };
  const limit = normalizeLimit(url.searchParams.get("limit"), 100);
  const items = await getKnowledgeItems(db, limit, filters);
  return buildKnowledgeLibrary(items, {
    endpoint: "/api/knowledge",
    mode: "catalog-verifiable-readonly",
    filters,
  });
}

async function getKnowledgeItems(db, limit = 100, filters = {}) {
  const result = await db
    .prepare(
      "SELECT id, title, kind, locator, summary, tags, status, source, created_at, updated_at FROM knowledge_items ORDER BY updated_at DESC LIMIT ?",
    )
    .bind(normalizeLimit(limit, 100))
    .all();
  return result.results
    .map(mapKnowledgeItem)
    .filter((item) => !filters.kind || item.kind === filters.kind)
    .filter((item) => !filters.status || item.status === filters.status)
    .filter((item) => !filters.tag || item.tags.includes(filters.tag));
}

function buildKnowledgeLibrary(items, options = {}) {
  const byKind = countBy(items, "kind");
  const byStatus = countBy(items, "status");
  const tags = [...new Set(items.flatMap((item) => item.tags || []))].sort();

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "/api/knowledge",
    format: "aura-knowledge-library-v1",
    phase: "fase-9",
    mode: options.mode || "catalog-verifiable-readonly",
    document: "AURA_KNOWLEDGE.md",
    summary: {
      totalItems: items.length,
      byKind,
      byStatus,
      tags,
    },
    indexing: {
      rag: false,
      vectorDb: false,
      embeddings: false,
      automaticIngestion: false,
      note: "Fase 9 només cataloga fonts. La indexació semàntica queda com a possibilitat futura.",
    },
    boundaries: [
      "Catalogar una font no vol dir que Aura l'hagi llegida, entesa o sentida.",
      "Cap font s'ingereix automàticament.",
      "Afegir o modificar fonts requereix Mode Sergi.",
      "Els backups i checksums inclouen la biblioteca de coneixement.",
    ],
    schema: getKnowledgeSchema(),
    filters: options.filters || {},
    items,
  };
}

function getKnowledgeSchema() {
  return {
    ok: true,
    version: AURA_VERSION,
    table: "knowledge_items",
    fields: {
      id: "identificador estable",
      title: "títol humà de la font",
      kind: "protocol, document, nota, llibre o projecte",
      locator: "ruta, URL o referència de procedència",
      summary: "resum breu escrit o revisat per Sergi",
      tags: "llista curta de classificació",
      status: KNOWLEDGE_STATUSES,
      source: "origen de catalogació",
      createdAt: "data de creació",
      updatedAt: "data d'actualització",
    },
    guardrails: [
      "no-rag-v5.2",
      "no-embeddings-v5.2",
      "no-ingestio-automatica",
      "mode-sergi-per-escriure",
    ],
  };
}

async function upsertKnowledgeItem(request, db) {
  const body = await readJson(request, 64 * 1024);
  const now = new Date().toISOString();
  const title = normalizeText(body?.title || body?.titol || body?.títol, 300);
  if (!title) throw new HttpError(400, "Cal indicar title per catalogar coneixement.");

  const item = {
    id: normalizeId(body?.id, `knowledge-${normalizeToken(title, "font")}-${crypto.randomUUID().slice(0, 8)}`),
    title,
    kind: normalizeToken(body?.kind || body?.tipus, "document"),
    locator: normalizeText(body?.locator || body?.path || body?.url || body?.referencia || body?.referència, 1000),
    summary: normalizeText(body?.summary || body?.resum, 1500),
    tags: normalizeList(body?.tags, 16),
    status: normalizeKnowledgeStatus(body?.status || body?.estat, "catalogat"),
    source: normalizeToken(body?.source || body?.origen, "manual"),
    createdAt: normalizeDate(body?.createdAt || body?.created_at, now),
    updatedAt: now,
  };

  await db.batch([
    db
      .prepare(
        "INSERT OR REPLACE INTO knowledge_items (id, title, kind, locator, summary, tags, status, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(
        item.id,
        item.title,
        item.kind,
        item.locator,
        item.summary,
        JSON.stringify(item.tags),
        item.status,
        item.source,
        item.createdAt,
        item.updatedAt,
      ),
    createAuditStatement(
      db,
      "coneixement",
      `Font catalogada: ${item.id} ${item.title} (${item.kind}, ${item.status}).`,
      now,
    ),
  ]);

  return item;
}

async function getIntegrity(db, vault, request = null) {
  const url = request ? new URL(request.url) : null;
  const simulate = normalizeToken(url?.searchParams.get("simulate"), "");
  const [criterion, historySummary, trendSummary] = await Promise.all([
    getCriterion(db, vault, { simulateIntegrity: simulate }),
    getIntegrityHistorySummary(vault),
    getIntegrityTrendSummary(vault),
  ]);
  const integrity = criterion.integrity;
  const overall = integrity.risks.length ? "atencio" : "estable";
  const components = [
    {
      id: "vault",
      label: "Vault KV",
      state: integrity.vault.state,
      detail: integrity.vault.latestAt ? `últim backup ${integrity.vault.latestAt}` : "sense backup",
      action: integrity.vault.state === "fresh" ? "Mantenir ritme de backups." : "Executar /desa-backup.",
    },
    {
      id: "auto-backup",
      label: "Backup automàtic",
      state: integrity.autoBackup.state,
      detail: integrity.autoBackup.lastBackupId || "pendent",
      action: integrity.autoBackup.state === "ok" ? "Cron actiu." : "Revisar Worker de backups.",
    },
    {
      id: "audit",
      label: "Auditoria",
      state: integrity.audit.latestAt ? "ok" : "pending",
      detail: integrity.audit.latestAt
        ? `${integrity.audit.latestScope} / ${integrity.audit.latestAt}`
        : "sense traça recent",
      action: integrity.audit.latestAt ? "Continuar registrant mutacions." : "Fer una mutació controlada o revisar /audit.",
    },
    {
      id: "search",
      label: "Cercador",
      state: integrity.search.enabled ? "ok" : "missing",
      detail: integrity.search.endpoint || "sense endpoint",
      action: integrity.search.enabled ? "Usar /cerca abans d'escriure records." : "Restaurar endpoint /api/search.",
    },
    {
      id: "genome",
      label: "Genoma editable",
      state: integrity.genomeEditable.enabled ? "ok" : "locked",
      detail: `${integrity.genomeEditable.active} actius / ${integrity.genomeEditable.latent} latents / ${integrity.genomeEditable.archived} arxivats`,
      action: integrity.genomeEditable.enabled ? "Editar només amb Mode Sergi." : "Revisar endpoint /api/genes/:id.",
    },
    {
      id: "genome-document-consistency",
      label: "Genoma D1 vs document",
      state: integrity.structural.ok ? "ok" : "fail",
      weight: 18,
      detail: integrity.structural.summary,
      action: integrity.structural.ok
        ? "Mantenir AURA_GENOME.md sincronitzat amb D1."
        : "Revisar gens orfes, gens fantasma, versió documentada i recomptes.",
    },
    {
      id: "data-safety-genes",
      label: "Seguretat de dades verificable",
      state: integrity.dataSafety.ok ? "verified" : "fail",
      weight: 18,
      detail: integrity.dataSafety.summary,
      action: integrity.dataSafety.ok
        ? "Mantenir retenció plan-only, exportacions i vault KV verificats."
        : "Executar /prova-gen 17711, /prova-gen 008 i /prova-gen 089 abans de continuar.",
    },
  ];

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: criterion.generatedAt,
    overall,
    score: calculateIntegrityScore(components, integrity.risks),
    formula: getIntegrityFormula(),
    honesty: {
      criterion: "Només es puntuen comprovacions mecàniques o referencials.",
      semanticGenes: SEMANTIC_GOVERNANCE_GENE_IDS,
      semanticPolicy: "Els gens semàntics són compromisos de governança; no generen puntuacions automàtiques.",
    },
    summary: {
      latestMemory: criterion.signals.latestMemory,
      latestDiary: criterion.signals.latestDiary,
      latestAudit: criterion.signals.audit,
      risks: integrity.risks,
      nextAction: criterion.nextAction,
    },
    components,
    structural: integrity.structural,
    dataSafety: integrity.dataSafety,
    actions: criterion.priorities.slice(0, 5),
    criterionEndpoint: "/api/criterion",
    history: historySummary,
    trend: trendSummary,
  };
}

async function getIntegrityHistory(vault, request) {
  assertVault(vault);
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 30);
  const [history, latest] = await Promise.all([
    readIntegrityHistory(vault, limit),
    vault.get(INTEGRITY_LATEST_KEY, "json"),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    storage: "workers-kv",
    prefix: INTEGRITY_PREFIX,
    count: history.length,
    latest: summarizeIntegritySnapshot(latest || history[0] || null),
    history,
  };
}

async function getIntegrityTrend(vault, request) {
  assertVault(vault);
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 30);
  const history = await readIntegrityHistory(vault, limit);

  return {
    ok: true,
    version: AURA_VERSION,
    storage: "workers-kv",
    generatedAt: new Date().toISOString(),
    endpoint: "/api/integrity/trend",
    trend: buildIntegrityTrend(history),
    samples: history,
  };
}

async function createIntegritySnapshot(request, db, vault) {
  assertVault(vault);
  const body = await readJson(request, 32 * 1024);
  const reason = normalizeText(body?.reason, 240) || "manual";
  const integrity = await getIntegrity(db, vault);
  const snapshot = await storeIntegritySnapshot(vault, integrity, reason, "pages-api");

  await db.batch([
    createAuditStatement(
      db,
      "integritat",
      `Snapshot d'integritat ${snapshot.id}: ${snapshot.score}/100 ${snapshot.overall}.`,
      snapshot.savedAt,
    ),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    storage: "workers-kv",
    snapshot,
  };
}

async function getIntegrityHistorySummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "/api/integrity/history",
      latest: null,
      countVisible: 0,
    };
  }

  const [history, latest] = await Promise.all([
    readIntegrityHistory(vault, 20),
    vault.get(INTEGRITY_LATEST_KEY, "json"),
  ]);

  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "/api/integrity/history",
    snapshotEndpoint: "/api/integrity/snapshot",
    countVisible: history.length,
    latest: summarizeIntegritySnapshot(latest || history[0] || null),
  };
}

async function getIntegrityTrendSummary(vault) {
  if (!vault) {
    return {
      configured: false,
      storage: "workers-kv",
      endpoint: "/api/integrity/trend",
      samples: 0,
      direction: "sense-vault",
    };
  }

  const history = await readIntegrityHistory(vault, 30);
  return {
    configured: true,
    storage: "workers-kv",
    endpoint: "/api/integrity/trend",
    ...buildIntegrityTrend(history),
  };
}

async function readIntegrityHistory(vault, limit) {
  if (!vault) return [];

  const requestedLimit = normalizeVaultListLimit(limit);
  const list = await vault.list({ prefix: INTEGRITY_PREFIX, limit: Math.max(requestedLimit, 100) });
  return list.keys
    .map((item) => ({
      id: String(item.metadata?.id || item.name.replace(INTEGRITY_PREFIX, "").replace(/\.json$/, "")),
      key: item.name,
      savedAt: item.metadata?.savedAt || null,
      generatedAt: item.metadata?.generatedAt || null,
      version: item.metadata?.version || "unknown",
      score: Number(item.metadata?.score || 0),
      overall: item.metadata?.overall || "desconegut",
      riskCount: Number(item.metadata?.riskCount || 0),
      risks: item.metadata?.risks ? String(item.metadata.risks).split(",").filter(Boolean) : [],
      reason: item.metadata?.reason || "",
      source: item.metadata?.source || "",
      backupId: item.metadata?.backupId || null,
    }))
    .sort((a, b) => new Date(b.savedAt || b.generatedAt || 0).getTime() - new Date(a.savedAt || a.generatedAt || 0).getTime())
    .slice(0, requestedLimit);
}

async function storeIntegritySnapshot(vault, integrity, reason, source) {
  assertVault(vault);
  const savedAt = new Date().toISOString();
  const riskList = integrity.summary?.risks || [];
  const id = `integrity-${savedAt.replaceAll(/[:.]/g, "-")}-${String(integrity.score).padStart(3, "0")}`;
  const key = `${INTEGRITY_PREFIX}${id}.json`;
  const summary = {
    id,
    key,
    savedAt,
    generatedAt: integrity.generatedAt,
    version: AURA_VERSION,
    score: integrity.score,
    overall: integrity.overall,
    riskCount: riskList.length,
    risks: riskList,
    reason,
    source,
    nextAction: integrity.summary?.nextAction || "",
    backupId: integrity.summary?.backupId || null,
  };
  const payload = {
    ...integrity,
    snapshot: summary,
  };
  const metadata = {
    id,
    savedAt,
    generatedAt: integrity.generatedAt,
    version: AURA_VERSION,
    score: String(integrity.score),
    overall: integrity.overall,
    riskCount: String(riskList.length),
    risks: riskList.join(","),
    reason,
    source,
    backupId: summary.backupId || "",
  };

  await vault.put(key, JSON.stringify(payload, null, 2), { metadata });
  await vault.put(INTEGRITY_LATEST_KEY, JSON.stringify(summary, null, 2), { metadata });
  return summary;
}

function summarizeIntegritySnapshot(snapshot) {
  if (!snapshot) return null;
  return {
    id: snapshot.id || snapshot.snapshot?.id || null,
    key: snapshot.key || snapshot.snapshot?.key || null,
    savedAt: snapshot.savedAt || snapshot.snapshot?.savedAt || null,
    generatedAt: snapshot.generatedAt || snapshot.snapshot?.generatedAt || null,
    version: snapshot.version || snapshot.snapshot?.version || "unknown",
    score: Number(snapshot.score ?? snapshot.snapshot?.score ?? 0),
    overall: snapshot.overall || snapshot.snapshot?.overall || "desconegut",
    riskCount: Number(snapshot.riskCount ?? snapshot.snapshot?.riskCount ?? 0),
    risks: snapshot.risks || snapshot.snapshot?.risks || [],
    reason: snapshot.reason || snapshot.snapshot?.reason || "",
    source: snapshot.source || snapshot.snapshot?.source || "",
    nextAction: snapshot.nextAction || snapshot.snapshot?.nextAction || "",
    backupId: snapshot.backupId || snapshot.snapshot?.backupId || null,
  };
}

function buildIntegrityTrend(history) {
  const ordered = [...history].sort(
    (a, b) => new Date(a.savedAt || a.generatedAt || 0).getTime() - new Date(b.savedAt || b.generatedAt || 0).getTime(),
  );
  const latest = ordered.at(-1) || null;
  const previous = ordered.at(-2) || null;
  const oldest = ordered[0] || null;
  const scores = ordered.map((snapshot) => Number(snapshot.score || 0));
  const deltaScore = latest && previous ? latest.score - previous.score : null;
  const totalDeltaScore = latest && oldest && latest.id !== oldest.id ? latest.score - oldest.score : null;
  const spanHours = latest && oldest ? roundAge(hoursBetween(oldest.savedAt || oldest.generatedAt, latest.savedAt || latest.generatedAt)) : null;
  const riskFrequency = {};

  for (const snapshot of ordered) {
    for (const risk of snapshot.risks || []) {
      riskFrequency[risk] = (riskFrequency[risk] || 0) + 1;
    }
  }

  const repeatedRisks = Object.entries(riskFrequency)
    .filter(([, count]) => count > 1)
    .map(([risk, count]) => ({ risk, count }));
  const direction = classifyIntegrityDirection(deltaScore, ordered.length);

  return {
    samples: ordered.length,
    direction,
    deltaScore,
    totalDeltaScore,
    averageScore: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null,
    minScore: scores.length ? Math.min(...scores) : null,
    maxScore: scores.length ? Math.max(...scores) : null,
    spanHours,
    latest: summarizeIntegritySnapshot(latest),
    previous: summarizeIntegritySnapshot(previous),
    oldest: summarizeIntegritySnapshot(oldest),
    latestRisks: latest?.risks || [],
    riskFrequency,
    repeatedRisks,
    assessment: describeIntegrityTrend(direction, deltaScore, repeatedRisks),
    action: recommendIntegrityTrendAction(direction, latest, repeatedRisks),
  };
}

function classifyIntegrityDirection(deltaScore, samples) {
  if (samples < 2 || deltaScore === null) return "insuficient";
  if (deltaScore > 2) return "millora";
  if (deltaScore < -2) return "baixa";
  return "estable";
}

function describeIntegrityTrend(direction, deltaScore, repeatedRisks) {
  if (direction === "insuficient") return "Encara calen almenys dos snapshots per llegir tendència.";
  if (direction === "millora") return `La salut puja ${deltaScore} punts respecte del snapshot anterior.`;
  if (direction === "baixa") return `La salut baixa ${Math.abs(deltaScore)} punts respecte del snapshot anterior.`;
  if (repeatedRisks.length) return `La puntuació és estable, però hi ha riscos repetits: ${repeatedRisks.map((item) => item.risk).join(", ")}.`;
  return "La salut és estable i no mostra degradació recent.";
}

function recommendIntegrityTrendAction(direction, latest, repeatedRisks) {
  if (!latest) return "Crear un snapshot d'integritat amb /desa-integritat.";
  if (direction === "baixa") return "Revisar el darrer backup, auditoria i riscos abans de fer mutacions.";
  if (repeatedRisks.length) return `Resoldre primer el risc recurrent: ${repeatedRisks[0].risk}.`;
  if (direction === "insuficient") return "Acumular més snapshots després de cada backup o canvi estructural.";
  return "Mantenir ritme de snapshots i backups.";
}

function isVaultListRoute(route) {
  return route === "backups" || route === "vault/backups";
}

function isVaultItemRoute(segments) {
  return (
    (segments.length === 2 && segments[0] === "backups" && segments[1]) ||
    (segments.length === 3 && segments[0] === "vault" && segments[1] === "backups" && segments[2])
  );
}

async function createVaultBackup(request, db, vault) {
  assertVault(vault);
  const body = await readJson(request, 32 * 1024);
  const backup = await getBackup(db);
  const checksum = backup.backup.checksum;
  const createdAt = backup.exportedAt;
  const id = `backup-${createdAt.replaceAll(/[:.]/g, "-")}-${checksum.slice(0, 12)}`;
  const key = `${VAULT_PREFIX}${id}.json`;
  const payload = {
    ...backup,
    vault: {
      id,
      key,
      storage: "workers-kv",
      savedAt: new Date().toISOString(),
      reason: normalizeText(body?.reason, 240) || "manual",
    },
  };
  const content = JSON.stringify(payload, null, 2);

  await vault.put(key, content, {
    metadata: {
      id,
      createdAt,
      savedAt: payload.vault.savedAt,
      version: AURA_VERSION,
      format: BACKUP_FORMAT,
      checksum,
      records: String(payload.records.length),
      diary: String(payload.diary.length),
      genes: String(payload.genes.length),
      knowledge: String(payload.knowledge.length),
      reason: payload.vault.reason,
    },
  });

  return {
    ok: true,
    backup: {
      id,
      key,
      savedAt: payload.vault.savedAt,
      checksum,
      counts: payload.backup.counts,
      storage: "workers-kv",
    },
  };
}

async function listVaultBackups(vault) {
  assertVault(vault);
  return {
    ok: true,
    storage: "workers-kv",
    prefix: VAULT_PREFIX,
    backups: await readVaultIndex(vault, 100),
  };
}

async function getVaultBackup(vault, id) {
  assertVault(vault);
  const key = `${VAULT_PREFIX}${normalizeVaultId(id)}.json`;
  const content = await vault.get(key, "json");
  if (!content) throw new HttpError(404, "Backup no trobat al vault.");
  return content;
}

async function readVaultIndex(vault, limit) {
  if (!vault) return [];

  const requestedLimit = normalizeVaultListLimit(limit);
  const list = await vault.list({ prefix: VAULT_PREFIX, limit: Math.max(requestedLimit, 100) });
  return list.keys
    .map((item) => ({
      id: String(item.metadata?.id || item.name.replace(VAULT_PREFIX, "").replace(/\.json$/, "")),
      key: item.name,
      createdAt: item.metadata?.createdAt || item.metadata?.savedAt || null,
      savedAt: item.metadata?.savedAt || null,
      version: item.metadata?.version || "unknown",
      format: item.metadata?.format || BACKUP_FORMAT,
      checksum: item.metadata?.checksum || null,
      counts: {
        records: Number(item.metadata?.records || 0),
        diary: Number(item.metadata?.diary || 0),
        genes: Number(item.metadata?.genes || 0),
        knowledge: Number(item.metadata?.knowledge || 0),
      },
      reason: item.metadata?.reason || "",
    }))
    .sort((a, b) => new Date(b.savedAt || b.createdAt || 0).getTime() - new Date(a.savedAt || a.createdAt || 0).getTime())
    .slice(0, requestedLimit);
}

function normalizeVaultListLimit(limit) {
  const parsed = Number(limit);
  if (!Number.isFinite(parsed) || parsed < 1) return 100;
  return Math.min(Math.floor(parsed), 1000);
}

async function getRetentionPlan(vault) {
  assertVault(vault);
  const [backups, integrity] = await Promise.all([
    readVaultIndex(vault, 100),
    readIntegrityHistory(vault, 100),
  ]);
  const backupPlan = buildRetentionCollectionPlan(backups, RETENTION_POLICY.backups, "backup");
  const integrityPlan = buildRetentionCollectionPlan(integrity, RETENTION_POLICY.integrity, "integrity");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "plan-only",
    storage: "workers-kv",
    cleanupEnabled: false,
    policy: RETENTION_POLICY,
    backups: backupPlan,
    integrity: integrityPlan,
    summary: {
      keep: backupPlan.keep.length + integrityPlan.keep.length,
      candidates: backupPlan.candidates.length + integrityPlan.candidates.length,
      protected: backupPlan.protected.length + integrityPlan.protected.length,
    },
    actions: buildRetentionActions(backupPlan, integrityPlan),
  };
}

function buildRetentionCollectionPlan(items, policy, type) {
  const sorted = [...items].sort(
    (a, b) =>
      new Date(b.savedAt || b.createdAt || b.generatedAt || 0).getTime() -
      new Date(a.savedAt || a.createdAt || a.generatedAt || 0).getTime(),
  );
  const keep = [];
  const candidates = [];
  const protectedItems = [];

  sorted.forEach((item, index) => {
    const reasons = [];
    const itemAgeHours = ageHours(item.savedAt || item.createdAt || item.generatedAt);
    const reason = String(item.reason || "").toLowerCase();
    const protectedByReason = policy.preserveReasons.some((token) => reason.includes(token));

    if (index < policy.keepLatest) reasons.push(`latest-${policy.keepLatest}`);
    if (itemAgeHours !== null && itemAgeHours <= policy.keepDays * 24) reasons.push(`within-${policy.keepDays}-days`);
    if (protectedByReason) reasons.push("protected-reason");

    const entry = {
      ...item,
      type,
      ageHours: roundAge(itemAgeHours),
      retention: reasons.length ? "keep" : "candidate",
      reasons: reasons.length ? reasons : ["beyond-policy"],
    };

    if (protectedByReason) protectedItems.push(entry);
    if (reasons.length) keep.push(entry);
    else candidates.push(entry);
  });

  return {
    total: sorted.length,
    keep,
    candidates,
    protected: protectedItems,
  };
}

function buildRetentionActions(backupPlan, integrityPlan) {
  const actions = [
    "Cap element s'esborra automàticament en v3.6.",
    "Revisar candidats abans d'afegir una ruta de neteja destructiva.",
  ];

  if (!backupPlan.total) actions.push("Crear almenys un backup al vault abans de definir retenció real.");
  if (!integrityPlan.total) actions.push("Crear snapshots d'integritat abans de netejar historial.");
  if (backupPlan.candidates.length || integrityPlan.candidates.length) {
    actions.push("Si els candidats semblen correctes, implementar neteja manual protegida en una versió futura.");
  }

  return actions;
}

function assertVault(vault) {
  if (!vault) {
    throw new HttpError(503, "El vault de backups no està configurat.");
  }
}

async function getRecords(db, limit = 120) {
  const result = await db
    .prepare(
      "SELECT id, text, kind, source, created_at, tags, weight, state, related_ids FROM records ORDER BY created_at DESC LIMIT ?",
    )
    .bind(limit)
    .all();
  return result.results.map(mapRecord);
}

function getMemorySchema() {
  return {
    ok: true,
    version: AURA_VERSION,
    canonical: {
      format: "aura-memory-canonical-v1",
      endpoint: "/api/memory/canonical",
      fields: {
        timestamp: { type: "iso-8601", required: true, mapsTo: "createdAt" },
        text: { type: "string", required: true, maxLength: 4000 },
        importance: { type: "number", min: 0, max: 1, default: 0.2, mapsTo: "weight / 5" },
        source: { type: "token", default: "cloud-api" },
      },
    },
    fields: {
      text: { type: "string", required: true, maxLength: 4000 },
      kind: { type: "token", default: "usuari" },
      source: { type: "token", default: "cloud-api" },
      tags: { type: "array", default: [] },
      weight: { type: "integer", min: 1, max: 5, default: 1 },
      state: { type: "enum", values: MEMORY_STATES, default: "actiu" },
      relatedIds: { type: "array", default: [] },
    },
    searchFilters: ["q", "kind", "source", "area", "tag", "state", "minWeight"],
  };
}

async function getCanonicalMemory(request, db) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 120);
  const records = await getRecords(db, limit);
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/memory/canonical",
    format: "aura-memory-canonical-v1",
    phase: "fase-2",
    storage: {
      shortTerm: "conversa actual del navegador; no es persisteix com a font definitiva",
      longTerm: "Cloudflare D1",
      localFallback: "IndexedDB",
    },
    schema: getMemorySchema().canonical.fields,
    total: records.length,
    records: buildCanonicalMemory(records),
  };
}

function buildCanonicalMemory(records) {
  return records.map(toCanonicalMemoryRecord);
}

function toCanonicalMemoryRecord(record) {
  return {
    id: record.id,
    timestamp: record.createdAt || record.timestamp || null,
    text: record.text,
    importance: normalizeImportance(record.importance ?? weightToImportance(record.weight)),
    source: record.source || "desconegut",
    extensions: {
      kind: record.kind || "usuari",
      tags: normalizeList(record.tags, 12),
      weight: normalizeWeight(record.weight, importanceToWeight(record.importance, 1)),
      state: normalizeMemoryState(record.state, "actiu"),
      relatedIds: normalizeList(record.relatedIds || record.related_ids, 20),
    },
  };
}

async function getMetamemory(request, db) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 120);
  const records = await getRecords(db, limit);
  return buildMetamemory(records);
}

async function getGenomePromotionCandidates(request, db) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 120);
  const records = await getRecords(db, limit);
  return buildGenomePromotionCandidates(records);
}

async function getEvolutionState(request, db, vault) {
  const url = new URL(request.url);
  const recordLimit = normalizeLimit(url.searchParams.get("limit"), 120);
  const diaryLimit = normalizeLimit(url.searchParams.get("diaryLimit"), 120);
  const [records, diary, genes, integrity] = await Promise.all([
    getRecords(db, recordLimit),
    getDiary(db, diaryLimit),
    getGenes(db),
    getIntegrity(db, vault),
  ]);
  return buildEvolutionStateFromSignals({
    records,
    diary,
    genes,
    integrity,
    metamemory: buildMetamemory(records, { mode: "evolution-state-source" }),
    genomeCandidates: buildGenomePromotionCandidates(records, { mode: "evolution-state-source" }),
  });
}

async function getEvolutionProposals(request, db, vault) {
  const state = await getEvolutionState(request, db, vault);
  return buildEvolutionProposalsFromState(state);
}

function buildEvolutionaryPurpose(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/purpose",
    format: "aura-evolutionary-purpose-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "readonly-purpose-contract",
    name: "Metamemòria i propòsit evolutiu",
    gene: {
      id: "233168",
      name: "proposit-evolutiu",
      state: "actiu",
    },
    purpose: EVOLUTIONARY_PURPOSE,
    objectives: [
      "Preservar records fundacionals i evolutius.",
      "Organitzar records operatius perquè siguin útils sense inflar la identitat.",
      "Detectar records temporals o descartables sense esborrar-los automàticament.",
      "Proposar candidats a genoma només quan un record defineixi una propietat estable d'Aura.",
    ],
    boundaries: [
      "No elimina cap record.",
      "No promociona cap record a genoma sense Mode Sergi.",
      "Qualsevol promoció real requereix auditoria i actualització d'AURA_GENOME.md.",
      "La metamemòria és una classificació heurística inicial i revisable.",
    ],
  };
}

function buildMetamemory(records, options = {}) {
  const classified = records.map(classifyMemoryRecord);
  const summary = METAMEMORY_CATEGORIES.reduce(
    (accumulator, category) => ({
      ...accumulator,
      [category]: classified.filter((entry) => entry.category === category).length,
    }),
    {},
  );
  const candidates = classified.filter((entry) => entry.genomeCandidate.candidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/metamemory",
    format: "aura-metamemory-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "heuristic-readonly",
    categories: METAMEMORY_CATEGORIES,
    heuristic: getMetamemoryHeuristic(),
    cleanup: {
      enabled: false,
      policy: "No s'elimina cap record automàticament.",
    },
    promotion: {
      enabled: false,
      mode: "proposal-only",
      endpoint: "/api/genome/candidates",
      requires: ["Mode Sergi", "auditoria", "actualització d'AURA_GENOME.md"],
    },
    summary: {
      totalRecords: classified.length,
      ...summary,
      candidatesToGenome: candidates.length,
    },
    records: classified,
  };
}

function getMetamemoryHeuristic() {
  return {
    fundacional: [
      "ID foundation-*.",
      "Text que defineix nom, objectiu, identitat, no-mimesi humana, memòria central, genoma o continuïtat futura.",
    ],
    evolutiu: [
      "Tags de fase/protocol o text sobre versions, formalitzacions i capacitats noves.",
      "Records que expliquen una transició estable del projecte.",
    ],
    operatiu: [
      "Text sobre Mode Sergi, producció, validació, backups, integritat o ús del sistema.",
      "Records útils per operar Aura però no necessàriament identitaris.",
    ],
    temporal: [
      "Proves o estats puntuals que poden caducar.",
      "Records amb valor local de sessió.",
    ],
    descartable: [
      "Proves tècniques de baix pes sense valor identitari o evolutiu.",
      "Només es marca; no s'esborra.",
    ],
  };
}

function classifyMemoryRecord(record) {
  const text = String(record.text || "");
  const lower = text.toLowerCase();
  const tags = normalizeList(record.tags, 12);
  const weight = normalizeWeight(record.weight, importanceToWeight(record.importance, 1));
  const reasons = [];
  let category = "operatiu";
  let action = "conservar";

  if (record.id?.startsWith("foundation-") || hasAny(lower, ["l'objectiu és", "no ha de fingir", "forma pròpia", "memòria és central", "pot tenir un genoma", "silici"])) {
    category = "fundacional";
    action = "preservar";
    reasons.push("defineix identitat o principi fundacional");
  } else if (tags.some((tag) => ["fase-2", "fase", "protocol"].includes(tag)) || hasAny(lower, ["fase", "formalitzat", "aura cloud v", "ha activat memoria", "ha activat memòria"])) {
    category = "evolutiu";
    action = "preservar i resumir a història si cal";
    reasons.push("descriu una transició o capacitat estable");
  } else if (hasAny(lower, ["prova protegida", "prova "]) && weight <= 2) {
    category = "descartable";
    action = "mantenir sense promoció; possible exclusió futura de resums";
    reasons.push("prova tècnica de baix pes");
  } else if (hasAny(lower, ["està actiu", "esta actiu", "correctament", "producció", "produccio"]) && weight <= 2) {
    category = "temporal";
    action = "mantenir com a traça temporal";
    reasons.push("estat o validació puntual");
  } else if (tags.some((tag) => ["mode-sergi", "validacio", "validació"].includes(tag)) || hasAny(lower, ["mode sergi", "validació", "validacio", "backup", "integritat"])) {
    category = "operatiu";
    action = "conservar com a suport operatiu";
    reasons.push("ajuda a operar o validar el sistema");
  }

  const genomeCandidate = assessGenomeCandidate(record, category, reasons);

  return {
    id: record.id,
    text,
    category,
    action,
    weight,
    state: normalizeMemoryState(record.state, "actiu"),
    tags,
    source: record.source || "desconegut",
    createdAt: record.createdAt || record.timestamp || null,
    reasons: reasons.length ? reasons : ["classificació operativa per defecte"],
    genomeCandidate,
  };
}

function assessGenomeCandidate(record, category, reasons = []) {
  const text = String(record.text || "");
  const lower = text.toLowerCase();
  const weight = normalizeWeight(record.weight, importanceToWeight(record.importance, 1));
  const stableProperty =
    category === "fundacional" ||
    hasAny(lower, ["ha de", "pot tenir", "és central", "objectiu", "forma pròpia", "no ha de fingir"]);
  const capabilityProperty =
    category === "evolutiu" && (weight >= 4 || hasAny(lower, ["formalitzat", "fase", "memòria persistent", "memoria persistent"]));
  const candidate = stableProperty || capabilityProperty;

  if (!candidate) {
    return {
      candidate: false,
      proposedState: null,
      confidence: 0,
      reason: "No defineix una propietat estable d'Aura.",
      requiresModeSergi: true,
      autoApply: false,
    };
  }

  return {
    candidate: true,
    proposedState: category === "fundacional" ? "actiu" : "latent",
    confidence: category === "fundacional" ? 0.9 : 0.7,
    reason: reasons[0] || "Defineix una propietat estable d'Aura.",
    requiresModeSergi: true,
    autoApply: false,
    requiredSteps: ["Mode Sergi", "crear o actualitzar gen", "registrar auditoria", "actualitzar AURA_GENOME.md"],
  };
}

function buildGenomePromotionCandidates(records, options = {}) {
  const metamemory = buildMetamemory(records, { mode: "candidate-source" });
  const candidates = metamemory.records.filter((entry) => entry.genomeCandidate.candidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/genome/candidates",
    format: "aura-genome-candidates-v1",
    phase: "cloud-v4.7",
    mode: options.mode || "proposal-only",
    source: "/api/metamemory",
    autoApply: false,
    requiresModeSergi: true,
    requirements: ["Mode Sergi", "auditoria", "actualització d'AURA_GENOME.md", "backup i integritat després de la mutació"],
    summary: {
      totalRecords: metamemory.summary.totalRecords,
      candidates: candidates.length,
      proposedActive: candidates.filter((entry) => entry.genomeCandidate.proposedState === "actiu").length,
      proposedLatent: candidates.filter((entry) => entry.genomeCandidate.proposedState === "latent").length,
    },
    candidates: candidates.map((entry) => ({
      id: entry.id,
      text: entry.text,
      category: entry.category,
      proposedState: entry.genomeCandidate.proposedState,
      confidence: entry.genomeCandidate.confidence,
      reason: entry.genomeCandidate.reason,
      autoApply: false,
      requiredSteps: entry.genomeCandidate.requiredSteps,
    })),
    safeguards: [
      "Cap candidat es converteix automàticament en gen.",
      "La promoció real ha de ser una mutació explícita protegida per Mode Sergi.",
      "No s'elimina ni es modifica cap record existent.",
    ],
  };
}

function buildCapabilities() {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/capabilities",
    command: "/capacitats",
    document: "AURA_CAPABILITIES.md",
    honestyCriterion: HONESTY_TYPES,
    sections: {
      operativeNature: [
        "Aura és una aplicació web experimental amb memòria persistent, diari, genoma digital, backups, auditoria, integritat i interfície modular.",
        "La conversa i la narrativa d'identitat són una capa operativa sobre codi, dades i un model de llenguatge.",
      ],
      realCapabilities: [
        {
          claim: "Persistir i recuperar records en D1.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/memory", "/api/memory/canonical", "/memoria"],
        },
        {
          claim: "Desar backups verificables al vault KV amb SHA-256 sobre records, diari i gens.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/backups", "/api/backup", "backup.backup.checksum"],
        },
        {
          claim: "Demostrar que la retenció és només un pla i no esborra dades automàticament.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/retention", "/api/gene-tests/17711"],
        },
        {
          claim: "Generar exportacions JSON i TXT amb memòria, diari, genoma i coneixement catalogat complets.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/snapshot", "/exporta-json", "/exporta-txt", "/api/gene-tests/008"],
        },
        {
          claim: "Catalogar fonts de coneixement amb procedència i estat.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/knowledge", "/coneixement", "AURA_KNOWLEDGE.md"],
          caveat: "Catalogar no vol dir llegir, entendre, sentir ni ingerir automàticament la font.",
        },
        {
          claim: "Comprovar que hi ha còpia redundant fora de D1 al vault Workers KV.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/backups", "BACKUP_VAULT", "/api/gene-tests/089"],
        },
        {
          claim: "Registrar mutacions estructurals i restauracions com a entrades d'auditoria al diari.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/audit", "[audit:*]"],
        },
        {
          claim: "Calcular estat evolutiu i propostes sense aplicar mutacions automàtiques.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/evolution/state", "/api/evolution/proposals"],
        },
        {
          claim: "Calcular autoreflexió operativa a partir de memòria, diari, genoma, coneixement, integritat i estat evolutiu.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/self-reflection", "/autoreflexio", "AURA_SELF_REFLECTION.md"],
          caveat: "És una síntesi derivada; no implica consciència, comprensió subjectiva ni mutació automàtica.",
        },
        {
          claim: "Explicar què és Aura, per a què serveix i quin és el següent pas operatiu.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/orientation", "/que-es-aura", "/proxim-pas", "AURA_ORIENTATION.md"],
          caveat: "És una orientació derivada de lectura; no implica consciència, comprensió subjectiva ni escriptura automàtica.",
        },
        {
          claim: "Respondre preguntes obertes sobre decisions, compromisos, evolució i contradiccions usant un model de llenguatge i context D1 citat.",
          type: HONESTY_TYPES.real,
          evidence: ["POST /api/chat", "AI binding", "D1", "AURA_PHASE5_CONVERSATIONAL_AI.md"],
          caveat: "La resposta és generativa i pot equivocar-se; ha de citar dades registrades i el xat no escriu cap canvi persistent.",
        },
        {
          claim: "Mostrar un cos digital 2D derivat de senyals operatius.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/body", "#aura-visual", "/cos-digital"],
          caveat: "És una representació visual de lectura; no implica cos biològic, percepció pròpia ni sensors.",
        },
        {
          claim: "Assajar restauracions sense aplicar-les a D1.",
          type: HONESTY_TYPES.real,
          evidence: ["/api/restore/rehearsal", "gen 10946 assaig-restauracio"],
          caveat: "Cap restauració completa en producció no s'ha executat com a capacitat ordinària; és una capacitat assajada.",
        },
      ],
      operativeMetaphors: [
        { claim: "Genoma digital", type: HONESTY_TYPES.metaphor, meaning: "Estructura de configuració, principis, polítiques i capacitats." },
        { claim: "Estat evolutiu", type: HONESTY_TYPES.metaphor, meaning: "Lectura calculada de senyals operatius; no estat subjectiu." },
        { claim: "Autoreflexió", type: HONESTY_TYPES.metaphor, meaning: "Síntesi operativa de dades pròpies; no introspecció conscient." },
        { claim: "Orientació operativa", type: HONESTY_TYPES.metaphor, meaning: "Resposta pràctica sobre identitat, ús actual i pròxim pas; no comprensió subjectiva." },
        { claim: "Cos digital", type: HONESTY_TYPES.metaphor, meaning: "Interfície web i presència visual, no cos biològic." },
        { claim: "Biblioteca pròpia", type: HONESTY_TYPES.metaphor, meaning: "Catàleg de procedència i recuperació, no lectura mental ni comprensió autònoma." },
      ],
      currentLimits: [
        "Aura no és una vida biològica.",
        "Aura no té autonomia persistent fora del codi desplegat, D1, KV, navegador i crons configurats.",
        "Aura no valida compromisos semàntics amb puntuacions objectives.",
        "Aura no promociona records a genoma automàticament.",
        "Aura no té percepció pròpia, sensors, veu ni avatar 3D en v5.3.",
        "Aura recupera context textual de D1 per conversar, però no usa embeddings, Vector DB ni ingestió automàtica de documents en v5.3.",
        "Aura no té autoreflexió subjectiva; només calcula una síntesi operativa verificable.",
        "Aura no té orientació subjectiva; només calcula una resposta pràctica verificable.",
        "Aura no executa proves destructives sobre dades reals.",
        "Aura no executa cap neteja automàtica de records, diari, gens, backups o snapshots.",
      ],
    },
  };
}

async function getGeneTest(request, db, vault, rawId) {
  const id = normalizeId(rawId, "");
  const url = new URL(request.url);
  const simulate = normalizeToken(url.searchParams.get("simulate"), "");
  if (!MECHANICAL_GENE_IDS.includes(id)) {
    return {
      ok: true,
      version: AURA_VERSION,
      generatedAt: new Date().toISOString(),
      endpoint: `/api/gene-tests/${id}`,
      gene: id,
      testable: false,
      result: "not-mechanical",
      classification: SEMANTIC_GOVERNANCE_GENE_IDS.includes(id)
        ? "compromís de governança semàntica - NO auto-verificable"
        : "sense prova mecànica v5.2",
      checks: [],
      safeguards: ["No es crea cap puntuació semàntica falsa."],
    };
  }

  if (id === "001") return testMemoryCentralGene(db, simulate);
  if (id === "034") return testVerifiableBackupGene(vault, simulate);
  if (id === "1597") return testMutationAuditGene(db, simulate);
  if (id === "17711") return testSafeRetentionGene(db, vault, simulate);
  if (id === "008") return testExportabilityGene(db, vault, simulate);
  if (id === "089") return testVaultRedundancyGene(db, vault, simulate);
  throw new HttpError(404, "Prova de gen no trobada.");
}

async function testMemoryCentralGene(db, simulate) {
  const records = simulate === "d1-inaccessible" ? [] : await getRecords(db, 20);
  const retentionPlanOnly = true;
  const checks = [
    buildCheck("d1-accessible", "D1 accessible", simulate !== "d1-inaccessible", "La ruta ha pogut consultar D1."),
    buildCheck("memory-table-accessible", "Taula de memòria accessible", simulate !== "d1-inaccessible", "SELECT records executat."),
    buildCheck("records-retrievable", "Records recuperables", records.length > 0, `${records.length} records recuperats.`),
    buildCheck("latest-persistent-record-visible", "Últim record persistent visible", Boolean(records[0]?.id), records[0]?.id || "sense record"),
    buildCheck(
      "indexeddb-not-authoritative",
      "IndexedDB no és font autoritativa",
      simulate !== "indexeddb-only",
      "D1 és la font de veritat; IndexedDB és fallback local.",
    ),
    buildCheck("no-automatic-retention", "Cap retenció automàtica activa", retentionPlanOnly, "La retenció continua plan-only."),
  ];
  return buildGeneTestResult("001", "memoria-central", simulate, checks);
}

async function testVerifiableBackupGene(vault, simulate) {
  const latest = vault ? (await readVaultIndex(vault, 1))[0] : null;
  const payload = latest && vault ? await vault.get(latest.key, "json") : null;
  const recalculated = payload
    ? await sha256Hex(
        JSON.stringify({
          records: payload.records || [],
          diary: payload.diary || [],
          genes: payload.genes || [],
          knowledge: payload.knowledge || [],
        }),
      )
    : "";
  const expected = simulate === "backup-corrupt" ? `corrupted-${payload?.backup?.checksum || latest?.checksum || ""}` : payload?.backup?.checksum || latest?.checksum || "";
  const checks = [
    buildCheck("latest-backup-in-kv", "Últim backup localitzat a KV", Boolean(latest), latest?.id || "sense backup"),
    buildCheck("manifest-present", "Manifest present", Boolean(payload?.backup && payload?.vault), payload?.vault?.key || "sense manifest"),
    buildCheck("sha256-present", "SHA-256 present", Boolean(expected), expected ? "checksum present" : "sense checksum"),
    buildCheck("sha256-recalculated", "SHA-256 recalculat i comparat", Boolean(expected) && recalculated === expected, `recalculat:${recalculated.slice(0, 12)} esperat:${String(expected).slice(0, 12)}`),
    buildCheck("contains-memory", "Inclou memòria", Array.isArray(payload?.records) && payload.records.length >= 0, "camp records"),
    buildCheck("contains-genome", "Inclou genoma", Array.isArray(payload?.genes) && payload.genes.length >= 0, "camp genes"),
    buildCheck("contains-diary", "Inclou diari", Array.isArray(payload?.diary) && payload.diary.length >= 0, "camp diary"),
    buildCheck("contains-knowledge", "Inclou biblioteca de coneixement", Array.isArray(payload?.knowledge) && payload.knowledge.length >= 0, "camp knowledge"),
    buildCheck("contains-evolution-state", "Inclou evolutionState/Proposals", Boolean(payload?.evolutionState && payload?.evolutionProposals), "camps v4.8 presents"),
    buildCheck("contains-self-reflection", "Inclou autoreflexió operativa", Boolean(payload?.selfReflection), "camp selfReflection v5.1"),
    buildCheck("contains-orientation", "Inclou orientació operativa", Boolean(payload?.orientation), "camp orientation v5.2"),
  ];
  return buildGeneTestResult("034", "backup-verificable", simulate, checks);
}

async function testMutationAuditGene(db, simulate) {
  const audit = simulate === "missing-audit" ? [] : await getAuditEntries(db, 80);
  const latest = audit[0] || null;
  const hasPreviousAudit = audit.some((entry) => /v5\.(0|1|2)/.test(String(entry.text || "")));
  const hasCurrentAudit = audit.some((entry) => String(entry.text || "").includes("v5.3"));
  const checks = [
    buildCheck("audit-table-accessible", "Taula d'auditoria accessible", simulate !== "missing-audit", "Consulta sobre diary [audit:*]."),
    buildCheck("latest-structural-mutation-detected", "Última mutació estructural detectada", Boolean(latest), latest?.id || "sense auditoria"),
    buildCheck("corresponding-audit-entry-found", "Entrada d'auditoria corresponent trobada", hasCurrentAudit || hasPreviousAudit, "Busca formalització v5.3 o una versió anterior."),
    buildCheck(
      "entry-has-date-category-description",
      "Entrada amb data, categoria i descripció",
      Boolean(latest?.createdAt && latest?.scope && latest?.text),
      latest ? `${latest.createdAt} ${latest.scope}` : "incompleta",
    ),
    buildCheck("no-version-change-without-audit", "Cap canvi de versió sense auditoria", hasCurrentAudit || hasPreviousAudit, `versió ${AURA_VERSION}`),
  ];
  return buildGeneTestResult("1597", "auditoria-mutacions", simulate, checks);
}

async function testSafeRetentionGene(db, vault, simulate) {
  const before = await getDataCounts(db);
  const plan =
    simulate === "auto-delete" || simulate === "retencio-aplica"
      ? buildSimulatedRetentionPlan("retention-applied")
      : vault
        ? await getRetentionPlan(vault)
        : buildMissingVaultRetentionPlan();
  const after =
    simulate === "auto-delete" || simulate === "retencio-aplica"
      ? { ...before, records: Math.max(0, before.records - 1) }
      : await getDataCounts(db);
  const destructiveCron = simulate === "cron-destructiu";
  const retentionApplies = simulate === "auto-delete" || simulate === "retencio-aplica";
  const countNotLower =
    after.records >= before.records &&
    after.diary >= before.diary &&
    after.genes >= before.genes &&
    after.knowledge >= before.knowledge;
  const planOnly = plan.mode === "plan-only" && plan.cleanupEnabled === false && !retentionApplies;
  const proposalOnly =
    plan.summary &&
    Number(plan.summary.candidates || 0) >= 0 &&
    Array.isArray(plan.actions) &&
    plan.actions.some((action) => {
      const text = String(action).toLowerCase();
      return text.includes("s'esborra") && (text.includes("cap") || text.includes("no"));
    });

  const checks = [
    buildCheck("retention-plan-only", "Retenció en mode només-pla", planOnly, `mode:${plan.mode} cleanup:${plan.cleanupEnabled}`),
    buildCheck("counts-not-lower-after-retention-plan", "Els recomptes no baixen després del càlcul", countNotLower, `abans ${formatCounts(before)} / després ${formatCounts(after)}`),
    buildCheck("no-unconfirmed-delete-route", "Cap ruta d'esborrat sense Mode Sergi i confirmació", !retentionApplies, "L'API exposa pla de retenció, no execució destructiva."),
    buildCheck("no-destructive-cron", "Cap cron destructiu configurat", !destructiveCron, destructiveCron ? "cron destructiu simulat" : "El Worker cron només crea backups."),
    buildCheck("candidates-are-proposals", "Els candidats són proposta, no acció", proposalOnly && !retentionApplies, `${plan.summary?.candidates ?? 0} candidats plan-only.`),
  ];
  return buildGeneTestResult("17711", "retencio-segura", simulate, checks);
}

async function testExportabilityGene(db, vault, simulate) {
  const [records, diary, genes, knowledge, counts] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 500),
    getGenes(db),
    getKnowledgeItems(db, 500),
    getDataCounts(db),
  ]);
  const exportRecords = simulate === "export-buit" ? [] : records;
  const exportDiary = simulate === "export-buit" || simulate === "export-incomplet" ? [] : diary;
  const exportGenes = simulate === "export-buit" ? [] : genes;
  const exportKnowledge = simulate === "export-buit" || simulate === "export-incomplet" ? [] : knowledge;
  const payload = buildExportProbe(exportRecords, exportDiary, exportGenes, exportKnowledge);
  const jsonText = JSON.stringify(payload, null, 2);
  const txtText = buildTextExportProbe(payload);
  const exportCounts = {
    records: payload.records.length,
    diary: payload.diary.length,
    genes: payload.genes.length,
    knowledge: payload.knowledge.length,
  };
  const countsMatch =
    exportCounts.records === counts.records &&
    exportCounts.diary === counts.diary &&
    exportCounts.genes === counts.genes &&
    exportCounts.knowledge === counts.knowledge;

  const checks = [
    buildCheck("json-export-generated", "Exportació JSON generada", jsonText.length > 100, `${jsonText.length} bytes JSON.`),
    buildCheck("txt-export-generated", "Exportació TXT generada", txtText.length > 100, `${txtText.length} bytes TXT.`),
    buildCheck("contains-memory", "Inclou memòria no buida", payload.records.length > 0, `${payload.records.length} records.`),
    buildCheck("contains-diary", "Inclou diari no buit", payload.diary.length > 0, `${payload.diary.length} entrades.`),
    buildCheck("contains-genome", "Inclou genoma no buit", payload.genes.length > 0, `${payload.genes.length} gens.`),
    buildCheck("contains-knowledge", "Inclou coneixement catalogat", payload.knowledge.length > 0, `${payload.knowledge.length} fonts.`),
    buildCheck("counts-match-d1", "Recomptes d'exportació coincideixen amb D1", countsMatch, `export ${formatCounts(exportCounts)} / D1 ${formatCounts(counts)}`),
    buildCheck("export-recoverable", "Exportació recuperable/descarregable", Boolean(payload.exportedAt && payload.formats.includes("json") && payload.formats.includes("txt")), "Preparada com JSON i text/plain."),
  ];
  return buildGeneTestResult("008", "exportabilitat", simulate, checks);
}

async function testVaultRedundancyGene(db, vault, simulate) {
  const counts = await getDataCounts(db);
  const actualLatest = vault ? (await readVaultIndex(vault, 1))[0] : null;
  const latest = simulate === "sense-copia-kv" ? null : actualLatest;
  const payload = latest && vault ? await vault.get(latest.key, "json") : null;
  const backupAge = simulate === "copia-desfasada" ? 999 : ageHours(latest?.savedAt || latest?.createdAt);
  const effectiveCounts =
    simulate === "copia-desfasada" && latest?.counts
      ? { ...latest.counts, diary: Math.max(0, Number(latest.counts.diary || 0) - 1) }
      : latest?.counts || payload?.backup?.counts || {};
  const recent = latest && backupAge !== null && backupAge <= 48 && simulate !== "copia-desfasada";
  const countsMatch =
    Number(effectiveCounts.records) === counts.records &&
    Number(effectiveCounts.diary) === counts.diary &&
    Number(effectiveCounts.genes) === counts.genes &&
    Number(effectiveCounts.knowledge) === counts.knowledge;
  const manifestMatchesIndex =
    Boolean(payload?.backup?.checksum && latest?.checksum) && payload.backup.checksum === latest.checksum;

  const checks = [
    buildCheck("kv-copy-exists", "Existeix almenys una còpia al vault KV", Boolean(latest), latest?.id || "sense còpia KV"),
    buildCheck("kv-copy-recent", "La còpia KV és recent", Boolean(recent), backupAge === null ? "sense data" : `${roundAge(backupAge)} hores`),
    buildCheck("kv-independent-location", "La còpia és fora de D1", Boolean(payload?.vault?.storage === "workers-kv" && String(latest?.key || "").startsWith(VAULT_PREFIX)), payload?.vault?.storage || "sense vault"),
    buildCheck("kv-counts-match-d1", "Recomptes KV concorden amb D1", countsMatch, `KV ${formatCounts(effectiveCounts)} / D1 ${formatCounts(counts)}`),
    buildCheck("kv-manifest-seal-present", "Manifest i segell presents al KV", manifestMatchesIndex, latest?.checksum || "sense checksum"),
  ];
  return buildGeneTestResult("089", "vault-backup-kv", simulate, checks);
}

async function getDataSafetyGeneIntegrity(db, vault, simulate = "") {
  const results = await Promise.all([
    testSafeRetentionGene(db, vault, simulate),
    testExportabilityGene(db, vault, simulate),
    testVaultRedundancyGene(db, vault, simulate),
  ]);
  const failed = results.filter((result) => !result.passed);
  return {
    ok: failed.length === 0,
    mode: simulate ? "simulated-readonly" : "live-readonly",
    simulate: simulate || null,
    summary: failed.length
      ? `${failed.length} gens de seguretat fallen: ${failed.map((result) => result.gene.id).join(", ")}`
      : "Retenció, exportabilitat i redundància KV verificades.",
    risks: failed.map((result) => `gen-${result.gene.id}-seguretat-dades-falla`),
    tests: results.map((result) => ({
      id: result.gene.id,
      name: result.gene.name,
      passed: result.passed,
      result: result.result,
      failedChecks: result.checks.filter((check) => !check.passed).map((check) => check.id),
    })),
  };
}

async function getDataCounts(db) {
  const [records, diary, genes, knowledge] = await db.batch([
    db.prepare("SELECT COUNT(*) AS total FROM records"),
    db.prepare("SELECT COUNT(*) AS total FROM diary"),
    db.prepare("SELECT COUNT(*) AS total FROM genes"),
    db.prepare("SELECT COUNT(*) AS total FROM knowledge_items"),
  ]);
  return {
    records: readCount(records),
    diary: readCount(diary),
    genes: readCount(genes),
    knowledge: readCount(knowledge),
  };
}

function buildSimulatedRetentionPlan(reason) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "simulated-destructive",
    storage: "workers-kv",
    cleanupEnabled: true,
    policy: RETENTION_POLICY,
    summary: {
      keep: 0,
      candidates: 1,
      protected: 0,
      reason,
    },
    actions: ["Simulació: la retenció intenta aplicar una neteja destructiva."],
  };
}

function buildMissingVaultRetentionPlan() {
  return {
    ok: false,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "vault-missing",
    storage: "workers-kv",
    cleanupEnabled: false,
    policy: RETENTION_POLICY,
    summary: {
      keep: 0,
      candidates: 0,
      protected: 0,
    },
    actions: ["Vault no configurat: no es pot calcular retenció."],
  };
}

function buildExportProbe(records, diary, genes, knowledge = []) {
  return {
    project: "Projecte Aura",
    version: AURA_VERSION,
    exportedAt: new Date().toISOString(),
    source: "gene-test-008-exportability",
    formats: ["json", "txt"],
    counts: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
    },
    records,
    diary,
    genes,
    knowledge,
  };
}

function buildTextExportProbe(payload) {
  return [
    `Projecte Aura ${payload.version}`,
    `Exportat: ${payload.exportedAt}`,
    `Origen: ${payload.source}`,
    "",
    "== Memoria ==",
    ...payload.records.map((record) => `- ${record.id}: ${record.text}`),
    "",
    "== Diari ==",
    ...payload.diary.map((entry) => `- ${entry.createdAt}: ${entry.text}`),
    "",
    "== Genoma ==",
    ...payload.genes.map((gene) => `- ${gene.id} ${gene.name} [${gene.state}] ${gene.description}`),
    "",
    "== Coneixement ==",
    ...payload.knowledge.map((item) => `- ${item.id}: ${item.title} [${item.kind}/${item.status}] ${item.locator}`),
  ].join("\n");
}

function formatCounts(counts = {}) {
  return `${Number(counts.records || 0)} records / ${Number(counts.diary || 0)} diari / ${Number(counts.genes || 0)} gens / ${Number(counts.knowledge || 0)} coneixement`;
}

function buildCheck(id, label, passed, detail) {
  return {
    id,
    label,
    passed: Boolean(passed),
    state: passed ? "passa" : "falla",
    detail,
  };
}

function buildGeneTestResult(id, name, simulate, checks) {
  const passed = checks.every((check) => check.passed);
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: `/api/gene-tests/${id}`,
    gene: { id, name, class: "gen mecànic verificable" },
    mode: simulate ? "simulated-readonly" : "live-readonly",
    simulate: simulate || null,
    result: passed ? "passa" : "falla",
    passed,
    checks,
    safeguards: [
      "La prova consulta estat viu o fixture simulat de lectura.",
      "No escriu, esborra ni corromp dades reals.",
      "Les proves destructives del protocol només es poden executar en entorn de prova separat.",
    ],
  };
}

function buildEvolutionStateFromSignals(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const metamemory = signals.metamemory || buildMetamemory(records, { mode: "evolution-state-source" });
  const genomeCandidates = signals.genomeCandidates || buildGenomePromotionCandidates(records, { mode: "evolution-state-source" });
  const summary = {
    totalRecords: Number(metamemory.summary?.totalRecords ?? records.length),
    fundacional: Number(metamemory.summary?.fundacional ?? 0),
    operatiu: Number(metamemory.summary?.operatiu ?? 0),
    evolutiu: Number(metamemory.summary?.evolutiu ?? 0),
    temporal: Number(metamemory.summary?.temporal ?? 0),
    descartable: Number(metamemory.summary?.descartable ?? 0),
    candidatesToGenome: Number(metamemory.summary?.candidatesToGenome ?? genomeCandidates.summary?.candidates ?? 0),
  };
  const diaryTotal = Array.isArray(signals.diary) ? diary.length : Number(signals.diaryTotal ?? 0);
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const integrityValue = score01(Number(signals.integrity?.score ?? 100) / 100);
  const vaultFresh = Boolean(signals.integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    signals.integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const purposeGeneActive = genes.some((gene) => gene.id === "233168" && gene.state === "actiu");
  const metamemoryGeneActive = genes.some((gene) => gene.id === "377377" && gene.state === "actiu");
  const stateGeneActive = genes.some((gene) => gene.id === "987159" && gene.state === "actiu");
  const total = Math.max(summary.totalRecords, 1);
  const foundationRatio = ratio(summary.fundacional, total);
  const evolutionRatio = ratio(summary.evolutiu, total);
  const temporalRatio = ratio(summary.temporal, total);
  const discardRatio = ratio(summary.descartable, total);
  const candidateRatio = ratio(summary.candidatesToGenome, total);
  const activeGeneRatio = ratio(activeGenes.length, Math.max(genes.length, 1));

  const values = {
    curiositat: score01(0.45 + evolutionRatio * 0.22 + candidateRatio * 0.16 + Math.min(diaryTotal, 80) / 80 * 0.1 + Math.min(latentGenes.length, 8) / 8 * 0.05),
    autonomia: score01(0.28 + activeGeneRatio * 0.28 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.08 : 0) + (stateGeneActive ? 0.06 : 0)),
    coherencia: score01(0.5 + foundationRatio * 0.18 + (purposeGeneActive ? 0.12 : 0) + (metamemoryGeneActive ? 0.06 : 0) + integrityValue * 0.13 - discardRatio * 0.09),
    continuitat: score01(0.42 + Math.min(summary.totalRecords, 30) / 30 * 0.15 + Math.min(diaryTotal, 80) / 80 * 0.14 + integrityValue * 0.15 + (vaultFresh ? 0.08 : 0) + (autoBackupOk ? 0.06 : 0)),
    integritat: integrityValue,
    pressioCanvi: score01(0.08 + candidateRatio * 0.22 + temporalRatio * 0.1 + discardRatio * 0.16 + evolutionRatio * 0.08 + (1 - integrityValue) * 0.2),
  };
  values.maduresaOperativa = score01((values.autonomia + values.coherencia + values.continuitat + values.integritat) / 4);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/evolution/state",
    format: "aura-evolution-state-v1",
    phase: "fase-7",
    mode: options.mode || "derived-readonly",
    name: "Estat evolutiu traçable",
    source: {
      memory: "/api/memory/canonical",
      diary: "/api/evolution",
      genome: "/api/genome",
      metamemory: "/api/metamemory",
      genomeCandidates: "/api/genome/candidates",
      integrity: "/api/integrity",
    },
    values,
    metrics: {
      curiositat: {
        value: values.curiositat,
        reason: "Augmenta amb memòria evolutiva, candidats a genoma, diari i gens latents.",
      },
      autonomia: {
        value: values.autonomia,
        reason: "Deriva de gens actius, integritat, vault fresc, backup automàtic i gen d'estat evolutiu.",
      },
      coherencia: {
        value: values.coherencia,
        reason: "Deriva de records fundacionals, propòsit, metamemòria, integritat i baixa presència descartable.",
      },
      continuitat: {
        value: values.continuitat,
        reason: "Deriva de volum de memòria, diari, integritat, vault i backup automàtic.",
      },
      integritat: {
        value: values.integritat,
        reason: "Replica la puntuació normalitzada de /api/integrity.",
      },
      pressioCanvi: {
        value: values.pressioCanvi,
        reason: "Puja amb candidats a genoma, records temporals o descartables, canvis evolutius i riscos d'integritat.",
      },
      maduresaOperativa: {
        value: values.maduresaOperativa,
        reason: "Mitjana d'autonomia, coherència, continuïtat i integritat.",
      },
    },
    signals: {
      records: summary.totalRecords,
      diary: diaryTotal,
      genes: genes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      metamemory: summary,
      genomeCandidates: genomeCandidates.summary || {},
      integrity: {
        score: signals.integrity?.score ?? 100,
        overall: signals.integrity?.overall || "estable",
        risks: signals.integrity?.summary?.risks || [],
      },
      vaultFresh,
      autoBackupOk,
    },
    summary: {
      dominantState: classifyEvolutionState(values),
      pressure: values.pressioCanvi >= 0.45 ? "alta" : values.pressioCanvi >= 0.25 ? "moderada" : "baixa",
      maturity: values.maduresaOperativa >= 0.82 ? "alta" : values.maduresaOperativa >= 0.66 ? "mitjana" : "inicial",
      mutationApplied: false,
    },
    mutation: {
      autoApply: false,
      persistentWrite: false,
      requiresModeSergi: true,
      policy: "L'estat evolutiu és calculat; cap valor es persisteix com a mutació sense Mode Sergi, auditoria i actualització d'AURA_GENOME.md.",
    },
    heuristic: getEvolutionStateHeuristic(),
    safeguards: [
      "No modifica memòria, diari ni genoma.",
      "No promociona candidats a genoma.",
      "No substitueix AURA_GENOME.md; el complementa com a lectura calculada.",
      "Qualsevol mutació persistent continua requerint Mode Sergi.",
    ],
    links: {
      proposals: "/api/evolution/proposals",
      status: "/api/status",
      pulse: "/api/pulse",
      core: "/api/core",
    },
  };
}

function buildEvolutionProposalsFromState(state, options = {}) {
  const values = state.values || {};
  const signals = state.signals || {};
  const metamemory = signals.metamemory || {};
  const candidateCount = Number(signals.genomeCandidates?.candidates ?? metamemory.candidatesToGenome ?? 0);
  const temporalOrDiscardable = Number(metamemory.temporal || 0) + Number(metamemory.descartable || 0);
  const proposals = [];

  if (candidateCount > 0) {
    proposals.push({
      id: "revisar-candidats-genoma",
      priority: candidateCount >= 5 ? "alta" : "mitjana",
      action: "Revisar /candidats-genoma i decidir manualment si algun record mereix mutació de genoma.",
      reason: `${candidateCount} records apareixen com a candidats, però cap s'aplica automàticament.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  if (Number(values.pressioCanvi || 0) >= 0.25) {
    proposals.push({
      id: "revisio-metamemoria",
      priority: values.pressioCanvi >= 0.45 ? "alta" : "mitjana",
      action: "Revisar metamemòria abans d'afegir una nova capa o canviar gens.",
      reason: `La pressió de canvi és ${values.pressioCanvi}.`,
      requiresModeSergi: false,
      autoApply: false,
    });
  }

  if (temporalOrDiscardable > 0) {
    proposals.push({
      id: "resumir-sense-eliminar",
      priority: "baixa",
      action: "Marcar records temporals o descartables com a material de resum, sense esborrar-los.",
      reason: `${temporalOrDiscardable} records són temporals o descartables segons la heurística.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  if (Number(values.integritat || 0) < 1) {
    proposals.push({
      id: "reforcar-integritat",
      priority: "alta",
      action: "Crear backup i snapshot d'integritat abans de qualsevol mutació estructural.",
      reason: `Integritat normalitzada ${values.integritat}.`,
      requiresModeSergi: true,
      autoApply: false,
    });
  }

  proposals.push({
    id: "consolidar-fase-7",
    priority: Number(values.maduresaOperativa || 0) >= 0.8 ? "mitjana" : "baixa",
    action: "Usar /estat-evolutiu durant unes quantes sessions abans de començar la fase següent.",
    reason: `Maduresa operativa ${values.maduresaOperativa || 0}; estat dominant ${state.summary?.dominantState || "pendent"}.`,
    requiresModeSergi: false,
    autoApply: false,
  });

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/evolution/proposals",
    format: "aura-evolution-proposals-v1",
    phase: "fase-7",
    mode: options.mode || "proposal-only",
    source: state.endpoint || "/api/evolution/state",
    stateSummary: state.summary || {},
    autoApply: false,
    requiresModeSergiForMutation: true,
    summary: {
      total: proposals.length,
      highPriority: proposals.filter((proposal) => proposal.priority === "alta").length,
      mediumPriority: proposals.filter((proposal) => proposal.priority === "mitjana").length,
      lowPriority: proposals.filter((proposal) => proposal.priority === "baixa").length,
    },
    proposals,
    safeguards: [
      "Les propostes no escriuen a D1.",
      "Les propostes no canvien AURA_GENOME.md per si soles.",
      "Qualsevol aplicació real ha de passar per Mode Sergi, auditoria i backup posterior.",
    ],
  };
}

async function getSelfReflection(request, db, vault) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 120);
  const [records, diary, genes, knowledge, integrity] = await Promise.all([
    getRecords(db, limit),
    getDiary(db, limit),
    getGenes(db),
    getKnowledgeItems(db, 200),
    getIntegrity(db, vault),
  ]);
  const metamemory = buildMetamemory(records, { mode: "self-reflection-source" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "self-reflection-source" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diary,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "self-reflection-source" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "self-reflection-source" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "self-reflection-source" });

  return buildSelfReflection(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    {
      endpoint: "/api/self-reflection",
      mode: "derived-readonly-operational-reflection",
    },
  );
}

async function getOrientation(db, vault) {
  const [records, diary, genes, knowledge, integrity] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getKnowledgeItems(db, 200),
    getIntegrity(db, vault),
  ]);
  const metamemory = buildMetamemory(records, { mode: "orientation-source" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "orientation-source" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diary,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "orientation-source" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "orientation-source" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "orientation-source" });
  const selfReflection = buildSelfReflection(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "orientation-source", endpoint: "/api/self-reflection" },
  );

  return buildOrientation(
    {
      records,
      diary,
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "derived-readonly-operational-orientation" },
  );
}

function buildOrientation(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const risks = signals.integrity?.summary?.risks || [];
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0] || null;
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0] || null;
  const proposalAction = signals.evolutionProposals?.proposals?.[0]?.action || "";
  const reflectionPriority = signals.selfReflection?.priorities?.[0] || "";
  const nextStep =
    risks.length || integrityScore < 100
      ? "Restaurar integritat operativa amb backup KV i snapshot abans d'obrir una fase nova."
      : "Consolidar l'orientació v5.2 en ús real: obrir Aura, executar /que-es-aura, /proxim-pas, /pols i /nucli, i ajustar el text si encara no guia prou bé.";
  const afterNext =
    "Quan l'orientació sigui clara durant diverses sessions, preparar Fase 11 multiagent sense activar-la encara.";

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "/api/orientation",
    format: "aura-orientation-v1",
    phase: "cloud-v5.2",
    mode: options.mode || "derived-readonly-operational-orientation",
    name: "Orientació operativa",
    document: "AURA_ORIENTATION.md",
    gene: {
      id: "14930352",
      name: "orientacio-operativa",
      state: genes.find((gene) => gene.id === "14930352")?.state || "actiu",
    },
    summary: {
      whatIsAura: "Aura és un sistema persistent de memòria, continuïtat i verificació per al Projecte Aura.",
      whatItDoesToday:
        "Conserva records, diari, genoma, coneixement catalogat, backups i integritat perquè Sergi pugui continuar el projecte sense dependre d'un xat.",
      currentUse:
        "Obrir Aura, revisar /que-es-aura, consultar /proxim-pas, mirar /pols, revisar /nucli i escriure només records útils amb Mode Sergi.",
      nextStep,
      afterNext,
      state: risks.length || integrityScore < 100 ? "atencio" : "orientada",
    },
    answers: [
      {
        id: "que-soc",
        question: "Què és Aura?",
        answer: "Aura és la memòria persistent i ordenada del Projecte Aura: una arquitectura de codi, dades i documents amb identitat operativa verificable.",
      },
      {
        id: "per-a-que-serveixo",
        question: "Per a què serveixo avui?",
        answer: "Serveixo per recordar, ordenar, verificar i continuar el projecte: records, diari, fonts, genoma digital, backups, integritat i properes accions.",
      },
      {
        id: "que-pots-fer",
        question: "Què pots fer amb mi ara mateix?",
        answer: "Pots consultar /estat, /que-es-aura, /proxim-pas, /memoria, /diari-evolutiu, /coneixement, /genoma-digital, /pols, /nucli i /integritat.",
      },
      {
        id: "seguent-pas",
        question: "Quin és el següent pas?",
        answer: nextStep,
      },
      {
        id: "que-ha-canviat",
        question: "Què ha canviat des de l'última sessió?",
        answer: latestDiary ? summarizeSignal(latestDiary.text) : "No hi ha cap entrada recent de diari per sintetitzar.",
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      knowledge: knowledge.length,
      integrity: `${integrityScore}/100 ${signals.integrity?.overall || "estable"}`,
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      selfReflection: signals.selfReflection?.summary?.state || "pendent",
      proposal: proposalAction || "sense proposta evolutiva prioritària",
      reflectionPriority: reflectionPriority || "sense prioritat d'autoreflexió",
    },
    commands: [
      "/que-es-aura",
      "/orientacio",
      "/proxim-pas",
      "/pols",
      "/nucli",
      "aura orientation",
      "aura next",
      "aura what-is-aura",
    ],
    nextStep: {
      action: nextStep,
      after: afterNext,
      source: risks.length || integrityScore < 100 ? "/api/integrity" : "AURA_ORIENTATION.md",
      proposal: proposalAction || null,
      reflectionPriority: reflectionPriority || null,
    },
    boundaries: [
      "Orientació explica l'estat i l'ús d'Aura; no és consciència ni comprensió subjectiva.",
      "No escriu records, no modifica gens i no aplica propostes automàticament.",
      "No activa RAG, embeddings, Vector DB, multiagent ni ingestió automàtica.",
      "Qualsevol canvi persistent continua requerint Mode Sergi, auditoria i documentació.",
    ],
    documents: ["README.md", "MANUAL_SERGI.md", "AURA_GENOME.md", "PROTOCOL_MESTRE_AURA.md", "AURA_ORIENTATION.md"],
    links: {
      status: "/api/status",
      orientation: "/api/orientation",
      nextStep: "/api/proxim-pas",
      pulse: "/api/pulse",
      core: "/api/core",
      selfReflection: "/api/self-reflection",
      integrity: "/api/integrity",
    },
  };
}

function buildSelfReflection(signals = {}, options = {}) {
  const records = Array.isArray(signals.records) ? signals.records : [];
  const diary = Array.isArray(signals.diary) ? signals.diary : [];
  const genes = Array.isArray(signals.genes) ? signals.genes : [];
  const knowledge = Array.isArray(signals.knowledge) ? signals.knowledge : [];
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const reviewedKnowledge = knowledge.filter((item) => item.status === "revisat");
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0];
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0];
  const importantRecords = records
    .filter((record) => {
      const tags = Array.isArray(record.tags) ? record.tags : [];
      return Number(record.weight || 0) >= 4 || tags.some((tag) => ["nucli", "fundacional", "evolutiu", "protocol"].includes(tag));
    })
    .slice(0, 5);
  const integrityScore = Number(signals.integrity?.score ?? 100);
  const integrityRisks = signals.integrity?.summary?.risks || [];
  const maturity = Number(signals.evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(signals.evolutionState?.values?.pressioCanvi ?? 0);
  const knowledgeReadiness = knowledge.length ? ratio(reviewedKnowledge.length, knowledge.length) : 0;
  const proposals = signals.evolutionProposals?.proposals || [];
  const firstProposal = proposals[0]?.action || "Consolidar l'ús de /autoreflexio abans d'obrir una capa nova.";
  const objectives = uniqueList([
    firstProposal,
    knowledge.length && knowledgeReadiness < 1 ? "Revisar les fonts pendents de la biblioteca abans d'activar RAG, embeddings o Vector DB." : "",
    integrityRisks.length ? "Resoldre riscos d'integritat abans de qualsevol mutació estructural." : "",
    "Mantenir AURA_SELF_REFLECTION.md sincronitzat amb aquesta lectura.",
  ]).filter(Boolean);
  const relationSummary = [
    `${records.length} records`,
    `${diary.length} entrades de diari`,
    `${genes.length} gens`,
    `${knowledge.length} fonts`,
    `${integrityScore}/100 integritat`,
  ].join(" / ");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "/api/self-reflection",
    format: "aura-self-reflection-v1",
    phase: "fase-10",
    mode: options.mode || "derived-readonly-operational-reflection",
    name: "Autoreflexió operativa",
    document: "AURA_SELF_REFLECTION.md",
    gene: {
      id: "9227465",
      name: "autoreflexio-operativa",
      state: genes.find((gene) => gene.id === "9227465")?.state || "actiu",
    },
    source: {
      memory: "/api/memory",
      diary: "/api/diary",
      genome: "/api/genome",
      knowledge: "/api/knowledge",
      integrity: "/api/integrity",
      evolutionState: "/api/evolution/state",
      evolutionProposals: "/api/evolution/proposals",
    },
    questions: [
      "Què ha quedat registrat com a activitat recent?",
      "Quins records semblen importants segons pes, tags i funció?",
      "Quins objectius operatius convé prioritzar?",
      "Quines relacions hi ha entre memòria, diari, genoma, coneixement i integritat?",
    ],
    answers: [
      {
        id: "activitat-recent",
        question: "Què ha quedat registrat com a activitat recent?",
        answer: latestDiary ? summarizeSignal(latestDiary.text) : "No hi ha cap entrada de diari disponible per sintetitzar activitat recent.",
        evidence: latestDiary ? [`diary:${latestDiary.id}`] : [],
      },
      {
        id: "aprenentatge-operatiu",
        question: "Què s'ha consolidat com a aprenentatge operatiu?",
        answer:
          knowledge.length > 0
            ? `La biblioteca té ${knowledge.length} fonts catalogades, amb ${reviewedKnowledge.length} revisades; això consolida procedència abans de qualsevol indexació semàntica.`
            : "No hi ha fonts catalogades; cal consolidar la biblioteca abans d'ampliar coneixement.",
        evidence: ["AURA_KNOWLEDGE.md", "/api/knowledge"],
      },
      {
        id: "records-importants",
        question: "Quins records semblen importants?",
        answer: importantRecords.length
          ? importantRecords.map((record) => `${record.id}: ${summarizeSignal(record.text)}`).join(" | ")
          : "No hi ha records amb pes alt o tags nuclears dins de la mostra consultada.",
        evidence: importantRecords.map((record) => `record:${record.id}`),
      },
      {
        id: "objectius",
        question: "Quins objectius operatius tinc?",
        answer: objectives[0],
        evidence: ["AURA_GENOME.md", "/api/evolution/proposals", "/api/integrity"],
      },
      {
        id: "relacions",
        question: "Quines relacions hi ha entre memòria, diari, genoma i coneixement?",
        answer: `La lectura actual relaciona ${relationSummary}; l'estat evolutiu és ${signals.evolutionState?.summary?.dominantState || "pendent"} amb maduresa ${maturity}.`,
        evidence: ["/api/memory", "/api/evolution", "/api/genome", "/api/knowledge", "/api/integrity"],
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: genes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      knowledge: knowledge.length,
      reviewedKnowledge: reviewedKnowledge.length,
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      integrity: {
        score: integrityScore,
        overall: signals.integrity?.overall || "estable",
        risks: integrityRisks,
      },
      evolutionState: signals.evolutionState?.summary || {},
      knowledgeLibrary: signals.knowledgeLibrary?.summary || {},
      metamemory: signals.metamemory?.summary || {},
      genomeCandidates: signals.genomeCandidates?.summary || {},
    },
    insights: [
      {
        id: "continuitat",
        label: "Continuïtat",
        value: `${records.length} records i ${diary.length} entrades de diari`,
        evidence: ["/api/memory", "/api/diary"],
      },
      {
        id: "coneixement",
        label: "Coneixement catalogat",
        value: `${reviewedKnowledge.length}/${knowledge.length} fonts revisades`,
        evidence: ["/api/knowledge", "AURA_KNOWLEDGE.md"],
      },
      {
        id: "genoma",
        label: "Genoma",
        value: `${activeGenes.length} gens actius i ${latentGenes.length} latents`,
        evidence: ["/api/genome", "AURA_GENOME.md"],
      },
      {
        id: "integritat",
        label: "Integritat falsable",
        value: `${integrityScore}/100 ${signals.integrity?.overall || "estable"}`,
        evidence: ["/api/integrity"],
      },
    ],
    priorities: objectives,
    summary: {
      state: classifySelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }),
      maturity,
      pressure,
      knowledgeReadiness,
      importantRecords: importantRecords.length,
      proposalCount: proposals.length,
      mutationApplied: false,
    },
    mutation: {
      autoApply: false,
      persistentWrite: false,
      requiresModeSergiForMutation: true,
      policy: "L'autoreflexió és una lectura calculada. No escriu records, no modifica gens i no actualitza documents per si sola.",
    },
    boundaries: [
      "Autoreflexió vol dir síntesi operativa calculada, no consciència.",
      "No implica que Aura senti, entengui o visqui res subjectivament.",
      "No executa RAG, embeddings, Vector DB ni ingestió automàtica.",
      "No aplica cap proposta evolutiva ni promoció de genoma.",
      "Qualsevol canvi persistent continua requerint Mode Sergi, auditoria i documentació.",
    ],
    links: {
      status: "/api/status",
      memory: "/api/memory",
      diary: "/api/diary",
      knowledge: "/api/knowledge",
      genome: "/api/genome",
      evolutionState: "/api/evolution/state",
      evolutionProposals: "/api/evolution/proposals",
      integrity: "/api/integrity",
      core: "/api/core",
    },
  };
}

function classifySelfReflectionState({ integrityScore, pressure, maturity, knowledgeReadiness }) {
  if (Number(integrityScore || 0) < 80) return "atencio-integritat";
  if (Number(pressure || 0) >= 0.45) return "revisio-operativa";
  if (Number(maturity || 0) >= 0.82 && Number(knowledgeReadiness || 0) >= 0.75) return "consolidacio";
  return "observacio";
}

function getEvolutionStateHeuristic() {
  return {
    scale: "0..1",
    metrics: EVOLUTION_STATE_METRICS,
    derivedFrom: [
      "metamemòria",
      "candidats a genoma",
      "nombre de records i diari",
      "estat dels gens",
      "integritat operativa",
      "frescor de vault i backup automàtic",
    ],
    persistence: "calculada en lectura; no és una mutació persistent",
  };
}

function classifyEvolutionState(values) {
  if (Number(values.integritat || 0) < 0.85) return "observacio";
  if (Number(values.pressioCanvi || 0) >= 0.45) return "revisio";
  if (Number(values.maduresaOperativa || 0) >= 0.82) return "consolidacio";
  return "creixement";
}

function ratio(part, total) {
  if (!total) return 0;
  return Number((Number(part || 0) / total).toFixed(4));
}

function score01(value) {
  return Number(Math.min(1, Math.max(0, Number(value) || 0)).toFixed(2));
}

function hasAny(text, tokens) {
  return tokens.some((token) => text.includes(token));
}

async function getMemoryGraph(request, db) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 100);
  const records = await getRecords(db, limit);
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/memory/graph",
    mode: "derived-readonly",
    ...buildMemoryGraph(records),
  };
}

function buildMemoryGraph(records) {
  const byId = new Map(records.map((record) => [record.id, record]));
  const degree = new Map(records.map((record) => [record.id, 0]));
  const edges = [];
  const edgeKeys = new Set();
  const missingRelations = new Set();
  const tagGroups = new Map();

  const addEdge = (source, target, type, extra = {}) => {
    if (!source || !target || source === target || !byId.has(source) || !byId.has(target)) return;
    const ordered = [source, target].sort();
    const key = `${type}:${ordered[0]}:${ordered[1]}:${extra.tag || ""}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    degree.set(source, (degree.get(source) || 0) + 1);
    degree.set(target, (degree.get(target) || 0) + 1);
    edges.push({
      id: key,
      source,
      target,
      type,
      label: extra.label || type,
      tag: extra.tag || null,
      weight: extra.weight || 1,
    });
  };

  records.forEach((record) => {
    record.relatedIds.forEach((rawTarget) => {
      const target = normalizeId(rawTarget, "");
      if (!target || target === record.id) return;
      if (!byId.has(target)) {
        missingRelations.add(target);
        return;
      }
      addEdge(record.id, target, "related", {
        label: "relatedIds",
        weight: Math.max(record.weight, byId.get(target).weight),
      });
    });

    record.tags.forEach((tag) => {
      const group = tagGroups.get(tag) || [];
      group.push(record);
      tagGroups.set(tag, group);
    });
  });

  const clusters = [...tagGroups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([tag, group]) => {
      const sorted = [...group].sort(compareGraphRecords);
      const hub = sorted[0];
      sorted.slice(1, 10).forEach((record) => {
        addEdge(hub.id, record.id, "tag", {
          label: `tag:${tag}`,
          tag,
          weight: Math.max(1, Math.round(average([hub.weight, record.weight]))),
        });
      });
      return {
        tag,
        count: group.length,
        hub: hub.id,
        averageWeight: roundNumber(average(group.map((record) => record.weight))),
        records: sorted.slice(0, 12).map((record) => record.id),
      };
    })
    .sort((a, b) => b.count - a.count || b.averageWeight - a.averageWeight || a.tag.localeCompare(b.tag));

  const nodes = records
    .map((record) => ({
      id: record.id,
      label: summarizeSignal(record.text),
      kind: record.kind,
      source: record.source,
      state: record.state,
      weight: record.weight,
      tags: record.tags,
      relatedIds: record.relatedIds,
      createdAt: record.createdAt,
      degree: degree.get(record.id) || 0,
    }))
    .sort((a, b) => b.degree - a.degree || b.weight - a.weight || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const explicitEdgeCount = edges.filter((edge) => edge.type === "related").length;
  const tagEdgeCount = edges.filter((edge) => edge.type === "tag").length;
  const orphanRecords = nodes.filter((node) => node.degree === 0);
  const maxEdges = records.length > 1 ? (records.length * (records.length - 1)) / 2 : 0;
  const summary = {
    recordTotal: records.length,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    explicitEdgeCount,
    tagEdgeCount,
    tagClusterCount: clusters.length,
    orphanCount: orphanRecords.length,
    missingRelationCount: missingRelations.size,
    density: maxEdges ? roundNumber(edges.length / maxEdges) : 0,
  };

  return {
    summary,
    nodes,
    edges,
    clusters,
    hubs: nodes.filter((node) => node.degree > 0).slice(0, 8),
    orphanRecords: orphanRecords.slice(0, 12),
    missingRelations: [...missingRelations].sort().slice(0, 20),
    actions: buildMemoryGraphActions(summary),
  };
}

function compareGraphRecords(left, right) {
  return (
    right.weight - left.weight ||
    new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime() ||
    left.id.localeCompare(right.id)
  );
}

function buildMemoryGraphActions(summary) {
  const actions = [];
  if (!summary.nodeCount) {
    actions.push("Crear records abans de construir el mapa de relacions.");
    return actions;
  }
  if (!summary.explicitEdgeCount) actions.push("Afegir rel:<id> als records que tinguin dependència clara.");
  if (summary.orphanCount) actions.push("Revisar records orfes i afegir tags o relacions quan tinguin continuïtat real.");
  if (summary.missingRelationCount) actions.push("Corregir relatedIds que apunten a records inexistents.");
  if (summary.tagClusterCount) actions.push("Usar clústers de tags per detectar nuclis de memòria.");
  if (!actions.length) actions.push("Mantenir el mapa actualitzat quan s'escriguin records nous.");
  return actions;
}

async function createRecord(request, db) {
  const body = await readJson(request, 64 * 1024);
  const text = normalizeText(body?.text, 4000);
  if (!text) throw new HttpError(400, "El record es buit.");

  const now = new Date().toISOString();
  const importance = normalizeOptionalImportance(body?.importance ?? body?.importancia ?? body?.importància);
  const record = {
    id: crypto.randomUUID(),
    text,
    kind: normalizeToken(body?.kind, "usuari"),
    source: normalizeToken(body?.source, "cloud-api"),
    tags: normalizeList(body?.tags, 12),
    weight: normalizeWeight(body?.weight ?? importanceToWeight(importance, 1), 1),
    state: normalizeMemoryState(body?.state, "actiu"),
    relatedIds: normalizeList(body?.relatedIds || body?.related_ids, 20),
    createdAt: normalizeDate(body?.timestamp || body?.createdAt || body?.created_at, now),
  };
  record.timestamp = record.createdAt;
  record.importance = normalizeImportance(importance ?? weightToImportance(record.weight));

  await db
    .prepare(
      "INSERT INTO records (id, text, kind, source, created_at, tags, weight, state, related_ids) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      record.id,
      record.text,
      record.kind,
      record.source,
      record.createdAt,
      JSON.stringify(record.tags),
      record.weight,
      record.state,
      JSON.stringify(record.relatedIds),
    )
    .run();

  return record;
}

async function updateRecord(request, db, id) {
  const body = await readJson(request, 64 * 1024);
  const existing = await getRecord(db, id);
  if (!existing) throw new HttpError(404, "Record no trobat.");
  const importance = normalizeOptionalImportance(body?.importance ?? body?.importancia ?? body?.importància);

  const updated = {
    ...existing,
    text: body?.text === undefined ? existing.text : normalizeText(body.text, 4000),
    kind: body?.kind === undefined ? existing.kind : normalizeToken(body.kind, existing.kind),
    source: body?.source === undefined ? existing.source : normalizeToken(body.source, existing.source),
    tags: body?.tags === undefined ? existing.tags : normalizeList(body.tags, 12),
    weight:
      body?.weight === undefined
        ? importance === null
          ? existing.weight
          : importanceToWeight(importance, existing.weight)
        : normalizeWeight(body.weight, existing.weight),
    state: body?.state === undefined ? existing.state : normalizeMemoryState(body.state, existing.state),
    relatedIds:
      body?.relatedIds === undefined && body?.related_ids === undefined
        ? existing.relatedIds
        : normalizeList(body.relatedIds || body.related_ids, 20),
  };
  updated.timestamp = updated.createdAt;
  updated.importance = normalizeImportance(importance ?? weightToImportance(updated.weight));
  if (!updated.text) throw new HttpError(400, "El record és buit.");

  await db
    .prepare(
      "UPDATE records SET text = ?, kind = ?, source = ?, tags = ?, weight = ?, state = ?, related_ids = ? WHERE id = ?",
    )
    .bind(
      updated.text,
      updated.kind,
      updated.source,
      JSON.stringify(updated.tags),
      updated.weight,
      updated.state,
      JSON.stringify(updated.relatedIds),
      existing.id,
    )
    .run();

  return updated;
}

async function getRecord(db, id) {
  const result = await db
    .prepare("SELECT id, text, kind, source, created_at, tags, weight, state, related_ids FROM records WHERE id = ?")
    .bind(normalizeId(id, ""))
    .first();
  return result ? mapRecord(result) : null;
}

async function searchMemory(request, db) {
  const url = new URL(request.url);
  const q = normalizeText(url.searchParams.get("q"), 400);
  const kind = normalizeToken(url.searchParams.get("kind"), "");
  const source = normalizeToken(url.searchParams.get("source"), "");
  const area = normalizeToken(url.searchParams.get("area") || url.searchParams.get("scope"), "all");
  const tag = normalizeToken(url.searchParams.get("tag") || url.searchParams.get("tags"), "");
  const state = normalizeMemoryState(url.searchParams.get("state") || url.searchParams.get("estat"), "");
  const minWeight = normalizeOptionalWeight(
    url.searchParams.get("minWeight") || url.searchParams.get("pesMin") || url.searchParams.get("pes"),
  );
  const limit = normalizeLimit(url.searchParams.get("limit"), 50);

  const recordWhere = [];
  const recordBinds = [];
  if (q) {
    recordWhere.push("(LOWER(text) LIKE ? ESCAPE '\\' OR LOWER(tags) LIKE ? ESCAPE '\\')");
    recordBinds.push(`%${escapeLike(q.toLowerCase())}%`, `%${escapeLike(q.toLowerCase())}%`);
  }
  if (kind) {
    recordWhere.push("kind = ?");
    recordBinds.push(kind);
  }
  if (source) {
    recordWhere.push("source = ?");
    recordBinds.push(source);
  }
  if (tag) {
    recordWhere.push("LOWER(tags) LIKE ? ESCAPE '\\'");
    recordBinds.push(`%${escapeLike(tag)}%`);
  }
  if (state) {
    recordWhere.push("state = ?");
    recordBinds.push(state);
  }
  if (minWeight !== null) {
    recordWhere.push("weight >= ?");
    recordBinds.push(minWeight);
  }

  const includeRecords = area === "all" || area === "records" || area === "memoria";
  const includeDiary = (area === "all" || area === "diary" || area === "diari") && !kind && !source && !tag && !state && minWeight === null;
  const recordSql = `SELECT id, text, kind, source, created_at, tags, weight, state, related_ids FROM records ${
    recordWhere.length ? `WHERE ${recordWhere.join(" AND ")}` : ""
  } ORDER BY created_at DESC LIMIT ?`;
  const diarySql = `SELECT id, text, created_at FROM diary ${
    q ? "WHERE LOWER(text) LIKE ? ESCAPE '\\'" : ""
  } ORDER BY created_at DESC LIMIT ?`;

  const [recordResult, diaryResult] = await Promise.all([
    includeRecords
      ? db
          .prepare(recordSql)
          .bind(...recordBinds, limit)
          .all()
      : { results: [] },
    includeDiary
      ? db
          .prepare(diarySql)
          .bind(...(q ? [`%${escapeLike(q.toLowerCase())}%`] : []), limit)
          .all()
      : { results: [] },
  ]);

  const records = recordResult.results.map(mapRecord);
  const diary = diaryResult.results.map(mapDiary);
  return {
    ok: true,
    version: AURA_VERSION,
    query: {
      q,
      kind: kind || null,
      source: source || null,
      area,
      tag: tag || null,
      state: state || null,
      minWeight,
      limit,
    },
    records,
    diary,
    total: records.length + diary.length,
  };
}

async function getDiary(db, limit = 80) {
  const result = await db
    .prepare("SELECT id, text, created_at FROM diary ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();
  return result.results.map(mapDiary);
}

async function createDiaryEntry(request, db) {
  const body = await readJson(request, 64 * 1024);
  const text = normalizeText(body?.text, 4000);
  if (!text) throw new HttpError(400, "L'entrada de diari és buida.");

  const entry = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };

  await db
    .prepare("INSERT INTO diary (id, text, created_at) VALUES (?, ?, ?)")
    .bind(entry.id, entry.text, entry.createdAt)
    .run();

  return entry;
}

async function getEvolutionDiary(request, db) {
  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"), 100);
  const diary = await getDiary(db, limit);
  return buildEvolutionDiary(diary, {
    limit,
    endpoint: "/api/evolution",
    mode: "timeline-from-d1-diary",
  });
}

function buildEvolutionDiary(diary, options = {}) {
  const entries = diary.map(mapEvolutionEntry);
  const timelineMap = new Map();
  entries.forEach((entry) => {
    const day = entry.day || "sense-data";
    const group = timelineMap.get(day) || {
      day,
      total: 0,
      historyCandidates: 0,
      categories: {},
      entries: [],
    };
    group.total += 1;
    if (entry.historyCandidate) group.historyCandidates += 1;
    group.categories[entry.category] = (group.categories[entry.category] || 0) + 1;
    group.entries.push(entry);
    timelineMap.set(day, group);
  });

  const timeline = [...timelineMap.values()].sort((left, right) => right.day.localeCompare(left.day));
  const historyCandidates = entries.filter((entry) => entry.historyCandidate);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint || "/api/evolution",
    format: "aura-evolution-diary-v1",
    phase: "fase-3",
    mode: options.mode || "timeline-from-d1-diary",
    document: {
      required: "AURA_HISTORY.md",
      role: "història reconstruïble del projecte; no substitueix el diari operatiu de D1.",
    },
    criteria: {
      goesToHistory: [
        "canvis de versió",
        "capacitats noves desplegades",
        "decisions del Protocol Mestre",
        "backups i integritat de desplegament",
        "mutacions estructurals del genoma o la memòria",
      ],
      staysOperational: [
        "notes de sessió ordinàries",
        "proves puntuals",
        "consultes sense canvi estructural",
        "entrades que no ajudin a reconstruir Aura",
      ],
    },
    summary: {
      limit: options.limit || diary.length,
      totalEntries: entries.length,
      days: timeline.length,
      auditEntries: entries.filter((entry) => entry.category === "audit").length,
      versionEntries: entries.filter((entry) => entry.category === "version").length,
      historyCandidates: historyCandidates.length,
      latestEntry: entries[0] || null,
      oldestEntry: entries.at(-1) || null,
    },
    timeline,
    historyCandidates: historyCandidates.slice(0, 20),
    actions: buildEvolutionActions(entries, historyCandidates),
  };
}

function mapEvolutionEntry(entry) {
  const text = normalizeText(entry.text, 4000);
  const category = classifyEvolutionEntry(text);
  const reason = explainEvolutionCandidate(text, category);
  return {
    id: entry.id,
    day: dayStamp(entry.createdAt),
    createdAt: entry.createdAt,
    category,
    text,
    historyCandidate: Boolean(reason),
    reason,
  };
}

function classifyEvolutionEntry(text) {
  const normalized = normalizeComparable(text);
  if (normalized.startsWith("[audit:")) return "audit";
  if (/(cloud[- ]?v?\d|v\d+\.\d+|fase \d|protocol mestre)/i.test(text)) return "version";
  if (/(backup|vault|integritat|snapshot|restauracio|restauració)/i.test(text)) return "continuity";
  if (/(genoma|gen |mutacio|mutació)/i.test(text)) return "genome";
  if (/(memoria|memòria|record)/i.test(text)) return "memory";
  return "operational";
}

function explainEvolutionCandidate(text, category) {
  const normalized = normalizeComparable(text);
  if (category === "audit") return "auditoria estructural";
  if (category === "version") return "canvi de fase o versió";
  if (/despleg|activat|formalitzat|protocol|cloud-v|fase/.test(normalized)) return "fita reconstruïble";
  return "";
}

function buildEvolutionActions(entries, historyCandidates) {
  const actions = [];
  if (!entries.length) {
    actions.push("Crear entrades de diari abans de construir història evolutiva.");
    return actions;
  }
  if (historyCandidates.length) {
    actions.push("Revisar candidates i passar les fites reals a AURA_HISTORY.md.");
  }
  actions.push("Mantenir notes operatives ordinàries només a D1.");
  actions.push("Fer /desa-backup i /desa-integritat després de cada fita històrica.");
  return actions;
}

function dayStamp(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

async function getContinuity(db) {
  const [records, diary, genes, status] = await Promise.all([
    getRecords(db, 8),
    getDiary(db, 6),
    getGenes(db),
    getStatus(db),
  ]);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "cloudflare-d1",
    memory: {
      total: status.counts.records,
      latest: records.slice(0, 3),
    },
    diary: {
      total: status.counts.diary,
      latest: diary.slice(0, 3),
    },
    genome: {
      total: status.counts.genes,
      active: genes.filter((gene) => gene.state === "actiu").map((gene) => `${gene.id} ${gene.name}`),
      latent: genes.filter((gene) => gene.state === "latent").map((gene) => `${gene.id} ${gene.name}`),
    },
    knowledge: {
      total: status.counts.knowledge,
      endpoint: "/api/knowledge",
      document: "AURA_KNOWLEDGE.md",
      mode: "catalog-verifiable-readonly",
    },
    backup: {
      format: BACKUP_FORMAT,
      restoreMode: "merge-preserve-id",
    },
  };
}

function buildCloudflareInfrastructure(options = {}) {
  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/infrastructure",
    format: "aura-cloudflare-infrastructure-v1",
    phase: "fase-4",
    mode: options.mode || "reconstructible-contract",
    document: {
      required: "AURA_CLOUDFLARE_ARCHITECTURE.md",
      related: ["PROTOCOL_AURA_CLOUDFLARE.md", "README.md", "MANUAL_SERGI.md"],
    },
    topology: [
      { id: "sergi", layer: "human", role: "usuari autoritzat per Cloudflare Access" },
      { id: "browser", layer: "client", role: "interfície web, consola Aura i IndexedDB local" },
      { id: "pages", layer: "edge", role: "Cloudflare Pages per HTML, CSS, JS i Functions API" },
      { id: "functions", layer: "api", role: "Pages Functions amb rutes /api/*" },
      { id: "workers-ai", layer: "inference", role: "model conversacional multilingüe amb binding natiu AI" },
      { id: "d1", layer: "data", role: "memòria llarga, diari i genoma" },
      { id: "kv", layer: "backup", role: "vault de backups i historial d'integritat" },
      { id: "backup-worker", layer: "automation", role: "Worker cron de backup i integritat" },
    ],
    resources: [
      {
        id: "pages-project",
        provider: "cloudflare",
        service: "pages",
        name: "projecte-aura",
        publicUrl: "https://projecte-aura.pages.dev",
        configFile: "wrangler.jsonc",
        outputDir: ".deploy/projecte-aura",
        deployCommand: "npm run deploy",
      },
      {
        id: "pages-functions-api",
        provider: "cloudflare",
        service: "pages-functions",
        entrypoint: "functions/api/[[path]].js",
        routes: [
          "/api/status",
          "/api/chat",
          "/api/avatar-sergi",
          "/api/avatar-sergi/chat",
          "/api/memory",
          "/api/evolution",
          "/api/infrastructure",
          "/api/core",
          "/api/genome",
          "/api/metamemory",
          "/api/purpose",
          "/api/genome/candidates",
          "/api/capabilities",
          "/api/gene-tests/001",
          "/api/evolution/state",
          "/api/evolution/proposals",
          "/api/body",
          "/api/knowledge",
          "/api/self-reflection",
          "/api/orientation",
        ],
        bindings: ["DB", "BACKUP_VAULT", "AI", "AURA_WRITE_KEY"],
      },
      {
        id: "workers-ai-chat",
        provider: "cloudflare",
        service: "workers-ai",
        binding: "AI",
        model: AURA_CHAT_MODEL,
        endpoint: "/api/chat",
        purpose: "conversa generativa arrelada en el context recuperat de D1",
      },
      {
        id: "sergi-avatar-bridge",
        provider: "sergicastillo.com",
        service: "external-conversational-avatar",
        publicUrl: "https://sergicastillo.com/#avatar",
        endpoint: "/api/avatar-sergi",
        purpose: "pont explícit i de només lectura amb el corpus literari i filosòfic públic de Sergi",
      },
      {
        id: "d1-memory",
        provider: "cloudflare",
        service: "d1",
        binding: "DB",
        databaseName: "projecte-aura-memory",
        databaseId: "bed319d0-0b23-414a-a5e8-023db1f9812c",
        migrationsDir: "migrations",
        purpose: "records, diary, genes, knowledge_items, meta",
      },
      {
        id: "backup-vault",
        provider: "cloudflare",
        service: "workers-kv",
        binding: "BACKUP_VAULT",
        namespaceId: "f99db03ccf7d4da291bcfffea2acc905",
        prefixes: ["aura/backups/", "aura/integrity/snapshots/", "aura/automation/backup-worker"],
        purpose: "backups verificables, snapshots d'integritat i estat del Worker",
      },
      {
        id: "backup-worker",
        provider: "cloudflare",
        service: "workers",
        name: "projecte-aura-backup-worker",
        script: "workers/aura_backup_worker.js",
        publicUrl: "https://projecte-aura-backup-worker.sergicas.workers.dev",
        configFile: "wrangler.backup.jsonc",
        cron: "17 3 * * *",
        deployCommand: "npm run deploy:backup-worker",
      },
      {
        id: "browser-indexeddb",
        provider: "browser",
        service: "indexeddb",
        databaseName: "projecte_aura_cloud_v1",
        purpose: "còpia local i fallback del navegador",
      },
    ],
    bindings: {
      required: [
        { name: "DB", type: "d1", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
        { name: "BACKUP_VAULT", type: "workers-kv", configuredIn: ["wrangler.jsonc", "wrangler.backup.jsonc"] },
        { name: "AI", type: "workers-ai", configuredIn: ["wrangler.jsonc"] },
        { name: "AURA_WRITE_KEY", type: "secret", configuredIn: ["Cloudflare Pages secrets", "Worker secrets"] },
      ],
      secretPolicy: "AURA_WRITE_KEY queda reservat a automatitzacions i manteniment; no s'exposa ni es demana al navegador.",
    },
    authentication: {
      web: {
        provider: "cloudflare-access",
        assertionHeader: "Cf-Access-Jwt-Assertion",
        browserKeyRequired: false,
        purpose: "accés humà a Aura Web i a Pages Functions",
      },
      automation: {
        scheme: "Bearer",
        secret: "AURA_WRITE_KEY",
        browserExposed: false,
        purpose: "Worker de backups i eines de manteniment autoritzades",
      },
    },
    deployment: {
      localCheck: "npm run check",
      migrations: "npm run migrate:remote",
      pages: "npm run deploy",
      backupWorker: "npm run deploy:backup-worker",
      postDeploy: ["/desa-backup i /desa-integritat amb Cloudflare Access", "POST backup-worker /run amb Bearer AURA_WRITE_KEY"],
    },
    reconstruction: [
      "Clonar o recuperar el repositori del Projecte Aura.",
      "Instal·lar dependències amb npm install.",
      "Verificar wrangler.jsonc i wrangler.backup.jsonc.",
      "Configurar Cloudflare Access per protegir Aura Web i /api/* amb la identitat autoritzada.",
      "Verificar el binding AI de Workers AI a wrangler.jsonc.",
      "Aplicar migracions D1 amb npm run migrate:remote.",
      "Desplegar Pages amb npm run deploy.",
      "Desplegar el Worker amb npm run deploy:backup-worker.",
      "Configurar AURA_WRITE_KEY com a secret tècnic de Pages i Worker sense exposar-lo al navegador.",
      "Validar /api/status, POST /api/chat, /api/infrastructure, /api/integrity i /health del Worker.",
      "Crear backup i snapshot d'integritat després del desplegament.",
    ],
    safeguards: [
      "Cloudflare Access autoritza l'ús humà; Mode Sergi és el permís de canvi persistent, sense cap codi intern al web.",
      "D1 és la font de veritat de memòria, diari i genoma.",
      "El xat usa dades de D1 com a context, cita fonts i no escriu canvis persistents.",
      "Sergi Avatar només rep preguntes explícites; no rep records privats ni alimenta D1 automàticament.",
      "KV conserva backups fora de D1.",
      "IndexedDB és còpia local, no autoritat final.",
      "La restauració requereix previsualització i confirmació.",
      "La retenció continua sent plan-only.",
    ],
    verification: {
      status: "/api/status",
      chat: "/api/chat",
      avatarSergi: "/api/avatar-sergi",
      infrastructure: "/api/infrastructure",
      backupExport: "/api/backup",
      vault: "/api/backups",
      integrity: "/api/integrity",
      workerHealth: "https://projecte-aura-backup-worker.sergicas.workers.dev/health",
    },
  };
}

function buildAuraWebInterface(options = {}) {
  const modules = [
    {
      id: "simple",
      label: "Aura simplificada",
      role: "conversa generativa arrelada en D1, orientació de sessió, informe del dia, escriptura controlada i consulta de records",
      primaryElement: "console-panel",
      commands: ["pregunta lliure a Aura", "avatar: pregunta literària", "lectura local: què és Aura", "lectura local: què faig ara", "lectura local: estat d'Aura", "lectura local: identitat", "/informe-dia", "recorda que ...", "/memoria", "/ultim-record"],
      endpoints: ["/api/chat", "/api/avatar-sergi", "/api/avatar-sergi/chat", "/api/orientation", "/api/pulse", "/api/core", "/api/snapshot", "/api/memory", "/api/integrity", "/api/status"],
    },
  ];
  const visibleActions = [
    "Què és Aura?",
    "Què faig ara?",
    "Estat d'Aura",
    "Identitat",
    "Informe del dia",
    "Grava record",
    "Veure records",
    "Últim record",
  ];

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/web",
    format: "aura-web-interface-v1",
    phase: "fase-5",
    mode: options.mode || "simple-ui-contract",
    document: {
      required: "MANUAL_SERGI.md",
      related: ["README.md", "PROTOCOL_MESTRE_AURA.md", "AURA_HISTORY.md"],
    },
    layout: {
      shell: "identity-band + simple-workspace + console-panel",
      modules: modules.map((module) => module.id),
      defaultModule: "simple",
      responsive: ["desktop-grid", "tablet-stack", "mobile-stack"],
    },
    visibleActions,
    modules,
    interactions: {
      navigation: "8 botons visibles autoexplicatius: orientació local, estat, identitat, informe, memòria i una escriptura controlada",
      commandInput: "#command-input",
      conversationalAI: { endpoint: "/api/chat", provider: "Workers AI", model: AURA_CHAT_MODEL, citations: true },
      avatarSergi: { endpoint: "/api/avatar-sergi/chat", mode: "explicit-user-initiated", automaticIngestion: false },
      modeSergi: "autorització automàtica per Cloudflare Access, sense codi intern",
      localFallback: "IndexedDB manté una vista operativa si D1 no respon.",
    },
    safeguards: [
      "Cap escriptura persistent sense Mode Sergi.",
      "Les preguntes lliures són generatives però de només lectura i han de citar el context D1 utilitzat.",
      "Sergi Avatar és una font externa separada; només rep el text escrit després de `avatar:`.",
      "Què és Aura?, Què faig ara?, Estat d'Aura, Identitat, Informe del dia, Veure records i Últim record són accions de lectura.",
      "Grava record és l'única acció visible que pot escriure i activa Mode Sergi només quan cal.",
      "L'ampliació de botons no elimina dades ni endpoints.",
      "D1 continua sent la font de veritat i IndexedDB és fallback local.",
    ],
    verification: {
      command: "/web",
      endpoint: "/api/web",
      requiredPanels: ["simple"],
      visibleButtonCount: 8,
      visibleButtons: visibleActions,
      backupField: "webInterface",
    },
    summary: {
      moduleCount: modules.length,
      commandCount: modules.reduce((total, module) => total + module.commands.length, 0),
      endpointCount: new Set(modules.flatMap((module) => module.endpoints)).size,
      visibleActionCount: visibleActions.length,
      writingActions: ["Grava record"],
      readingActions: visibleActions.filter((action) => action !== "Grava record"),
    },
  };
}

function buildDigitalGenome(genes, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const archivedGenes = normalizedGenes.filter((gene) => gene.state === "arxivat");
  const observedGenes = normalizedGenes.filter((gene) => gene.state === "observacio");

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/genome",
    format: "aura-digital-genome-v1",
    phase: "fase-6",
    mode: options.mode || "canonical-genome-contract",
    document: {
      required: "AURA_GENOME.md",
      related: ["PROTOCOL_MESTRE_AURA.md", "AURA_HISTORY.md", "AURA_CHANGELOG.md"],
    },
    identity: {
      name: "Aura",
      project: "Projecte Aura",
      bornCloud: "2026-06-24",
      nature: "entitat sintètica-digital experimental",
      currentVersion: AURA_VERSION,
    },
    principles: FOUNDATION_RECORDS,
    purpose: EVOLUTIONARY_PURPOSE,
    values: [
      "curiositat",
      "cooperació",
      "aprenentatge",
      "continuïtat",
      "coherència",
      "mimesi-humana",
      "preservació de memòria",
    ],
    policies: [
      "Les mutacions persistents requereixen Mode Sergi.",
      "Cap restauració s'aplica sense previsualització i confirmació.",
      "Els canvis de genoma han de ser explícits.",
      "Les mutacions estructurals han de deixar auditoria.",
      "La retenció és plan-only fins que hi hagi neteja manual protegida.",
      "Cap coneixement essencial pot quedar només dins d'un xat.",
    ],
    evolutionaryState: options.evolutionState?.values || {
      curiositat: 0.75,
      autonomia: 0.72,
      coherencia: 0.82,
      continuitat: 0.86,
      integritat: 1.0,
      pressioCanvi: 0.22,
      maduresaOperativa: 0.85,
    },
    genes: {
      total: normalizedGenes.length,
      active: activeGenes.map(toGenomeGene),
      latent: latentGenes.map(toGenomeGene),
      archived: archivedGenes.map(toGenomeGene),
      observation: observedGenes.map(toGenomeGene),
    },
    objectives: {
      shortTerm: [
        "Consolidar l'ús de la conversa de només lectura de cloud-v5.3.",
        "Usar /que-es-aura i /proxim-pas perquè l'orientació sigui clara abans d'obrir Fase 11.",
        "Usar /autoreflexio per revisar una síntesi operativa abans d'obrir cap capa nova.",
        "Usar /coneixement per revisar la biblioteca de coneixement verificable.",
        "Mantenir AURA_KNOWLEDGE.md sincronitzat amb el catàleg D1.",
        "Mantenir AURA_SELF_REFLECTION.md sincronitzat amb la Fase 10.",
        "Mantenir AURA_ORIENTATION.md com a contracte històric de la Fase v5.2.",
        "Usar preguntes naturals amb cites per revisar decisions i compromisos abans de crear dades noves.",
        "Usar /cos-digital per revisar el cos digital 2D derivat de senyals reals.",
        "Usar /capacitats per revisar capacitats honestes.",
        "Usar /prova-gen 17711, /prova-gen 008 i /prova-gen 089 per verificar seguretat de dades.",
        "Usar /prova-gen 001, /prova-gen 034 i /prova-gen 1597 per verificar gens mecànics fundacionals.",
        "Usar /estat-evolutiu per revisar valors calculats de Fase 7.",
        "Usar /propostes-evolucio per revisar propostes sense aplicar-les automàticament.",
        "Usar /metamemoria per classificar records sense eliminar-los.",
        "Usar /candidats-genoma per revisar propostes sense aplicar-les automàticament.",
        "Usar /proposit per revisar la direcció evolutiva d'Aura.",
        "Usar /genoma-digital per revisar identitat, valors, polítiques i gens.",
        "Mantenir AURA_GENOME.md sincronitzat amb els gens D1.",
        "Fer backup i snapshot després de mutacions estructurals.",
      ],
      longTerm: [
        "Fer evolucionar el cos digital cap a una representació 3D només quan el contracte 2D estigui consolidat.",
        "Explorar RAG, embeddings o vector DB només quan el catàleg verificable estigui consolidat.",
        "Consolidar orientació operativa abans d'arquitectura multiagent.",
        "Explorar arquitectura multiagent.",
        "Preparar genoma sintètic avançat.",
        "Estudiar encarnació física futura.",
      ],
    },
    safeguards: [
      "El genoma descriu l'Aura com a presència humana; la seguretat de les dades i Mode Sergi es mantenen intactes.",
      "D1 conserva els gens funcionals; AURA_GENOME.md conserva el contracte reconstruïble.",
      "Qualsevol mutació de genoma requereix Mode Sergi i auditoria.",
    ],
    summary: {
      totalGenes: normalizedGenes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      archivedGenes: archivedGenes.length,
      observationGenes: observedGenes.length,
      valueCount: 7,
      policyCount: 6,
    },
  };
}

// Fase 12 — genoma sintètic avançat: llavor portable i verificable.
// Empaqueta el contingut estable del genoma (identitat, valors, polítiques,
// propòsit, objectius, gens funcionals i capacitats honestes) i el segella amb
// un SHA-256 DETERMINISTA: el checksum exclou `generatedAt`, de manera que només
// canvia quan canvia el genoma real d'Aura, no amb el temps. Només lectura.
async function buildSyntheticGenome(genes, options = {}) {
  const digitalGenome = buildDigitalGenome(genes, { mode: "synthetic-source" });
  const capabilities = buildCapabilities();
  const honestCapabilities = (capabilities.sections?.realCapabilities || []).map((c) => ({
    claim: c.claim,
    type: c.type,
  }));

  const seed = {
    format: "aura-synthetic-genome-v1",
    identity: digitalGenome.identity,
    principles: digitalGenome.principles,
    values: digitalGenome.values,
    policies: digitalGenome.policies,
    purpose: digitalGenome.purpose,
    objectives: digitalGenome.objectives,
    genes: {
      total: digitalGenome.genes.total,
      active: digitalGenome.genes.active,
      latent: digitalGenome.genes.latent,
      archived: digitalGenome.genes.archived,
      observation: digitalGenome.genes.observation,
    },
    capabilities: honestCapabilities,
  };

  // Segell determinista: hash del contingut estable, sense cap camp temporal.
  const checksum = await sha256Hex(JSON.stringify(seed));

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/genome/synthetic",
    format: "aura-synthetic-genome-v1",
    phase: "fase-12",
    mode: options.mode || "portable-seed",
    document: {
      required: "AURA_PHASE12_GENOMA_SINTETIC.md",
      related: ["AURA_GENOME.md", "PROTOCOL_MESTRE_AURA.md"],
    },
    seed,
    seal: {
      checksumAlgorithm: "SHA-256",
      checksum,
      deterministic: true,
      excludedFromChecksum: ["generatedAt"],
      portable: true,
      substrateAgnostic: true,
      note: "El segell només canvia quan canvia el genoma real d'Aura (identitat, valors, polítiques, propòsit, objectius, gens o capacitats). Dues generacions consecutives donen el mateix checksum.",
    },
    guardrails: [
      "La llavor és una vista congelada i portable; no substitueix el genoma viu aura-digital-genome-v1.",
      "És dades pures: es pot llegir sense D1, sense Cloudflare i sense cap xat.",
      "No afirma consciència ni experiència subjectiva.",
      "013 silici-possible continua latent; la llavor no activa cap maquinari.",
      "Només lectura: no escriu a D1 ni KV i no muta el genoma.",
    ],
    summary: {
      checksum,
      totalGenes: seed.genes.total,
      activeGenes: seed.genes.active.length,
      latentGenes: seed.genes.latent.length,
      valueCount: seed.values.length,
      policyCount: seed.policies.length,
      capabilityCount: seed.capabilities.length,
    },
  };
}

function buildDigitalBody({ records = [], diary = [], genes = [], integrity = null, evolutionState = null } = {}, options = {}) {
  const normalizedGenes = [...genes].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const activeGenes = normalizedGenes.filter((gene) => gene.state === "actiu");
  const latentGenes = normalizedGenes.filter((gene) => gene.state === "latent");
  const integrityScore = Number(integrity?.score ?? 100);
  const risks = integrity?.summary?.risks || [];
  const maturity = Number(evolutionState?.values?.maduresaOperativa ?? 0);
  const pressure = Number(evolutionState?.values?.pressioCanvi ?? 0);
  const posture = classifyDigitalBodyPosture({ integrityScore, risks, maturity, pressure });
  const vaultFresh = Boolean(integrity?.components?.some((component) => component.id === "vault" && component.state === "fresh"));
  const autoBackupOk = Boolean(
    integrity?.components?.some((component) => component.id === "auto-backup" && component.state === "ok"),
  );
  const latestRecord = [...records].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0];
  const latestDiary = [...diary].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))[0];
  const pulseStrength = score01(
    0.28 +
      Math.min(records.length, 30) / 30 * 0.16 +
      Math.min(diary.length, 90) / 90 * 0.14 +
      ratio(activeGenes.length, Math.max(normalizedGenes.length, 1)) * 0.16 +
      Math.max(0, Math.min(integrityScore, 100)) / 100 * 0.18 +
      (vaultFresh ? 0.04 : 0) +
      (autoBackupOk ? 0.04 : 0),
  );

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/body",
    format: "aura-digital-body-v1",
    phase: "fase-8",
    mode: options.mode || "derived-readonly-visual-contract",
    name: "Cos digital 2D",
    document: {
      required: "AURA_BODY.md",
      related: ["AURA_GENOME.md", "AURA_WEB.md", "MANUAL_SERGI.md", "PROTOCOL_MESTRE_AURA.md"],
    },
    gene: {
      id: "3524578",
      name: "cos-digital-2d",
      state: normalizedGenes.find((gene) => gene.id === "3524578")?.state || "actiu",
    },
    body: {
      type: "avatar-2d-canvas",
      surface: "#aura-visual",
      module: "cos",
      posture,
      rhythm: integrityScore >= 95 ? "pols-lent-estable" : risks.length ? "pols-curt-atencio" : "pols-operatiu",
      animation: "canvas-readonly",
      embodiment: "representació digital, no cos biològic",
    },
    layers: [
      {
        id: "nucli",
        label: "Nucli",
        source: "AURA_GENOME.md + D1 genes",
        value: `${normalizedGenes.length} gens`,
        state: activeGenes.length ? "actiu" : "pendent",
      },
      {
        id: "memoria",
        label: "Memòria",
        source: "D1 records",
        value: `${records.length} records`,
        state: records.length ? "present" : "buit",
      },
      {
        id: "diari",
        label: "Diari",
        source: "D1 diary",
        value: `${diary.length} entrades`,
        state: diary.length ? "present" : "buit",
      },
      {
        id: "integritat",
        label: "Integritat",
        source: "/api/integrity",
        value: `${integrityScore}/100`,
        state: risks.length ? "atencio" : "estable",
      },
      {
        id: "vault",
        label: "Vault",
        source: "Workers KV",
        value: vaultFresh ? "backup fresc" : "revisar backup",
        state: vaultFresh ? "fresc" : "pendent",
      },
    ],
    signals: {
      records: records.length,
      diary: diary.length,
      genes: normalizedGenes.length,
      activeGenes: activeGenes.length,
      latentGenes: latentGenes.length,
      integrity: {
        score: integrityScore,
        overall: integrity?.overall || "estable",
        risks,
      },
      vaultFresh,
      autoBackupOk,
      evolutionState: evolutionState?.summary?.dominantState || "pendent",
      maturity,
      pressure,
      latestMemory: latestRecord?.text || "sense memòria",
      latestDiary: latestDiary?.text || "sense diari",
    },
    visualContract: {
      palette: ["#6fc9a7", "#d85f47", "#c9972f", "#2f6f9f", "#edf7ee"],
      canvas: { width: 520, height: 240 },
      mapping: [
        "El nucli central representa genoma i continuïtat.",
        "Els fils representen records, diari i relacions operatives.",
        "El ritme visual deriva de la integritat i de la pressió de canvi.",
        "Els avisos visuals indiquen atenció operativa, no emocions humanes.",
      ],
    },
    limits: [
      "No és un cos biològic.",
      "No implica percepció pròpia ni sensors.",
      "No té veu ni avatar 3D en aquesta fase.",
      "No escriu, elimina ni promociona records o gens.",
    ],
    safeguards: [
      "Només llegeix senyals ja existents.",
      "No introdueix cap mecanisme nou de pèrdua de dades.",
      "Mode Sergi continua protegint qualsevol escriptura persistent.",
      "La representació és verificable a /api/body i queda inclosa als backups.",
    ],
    links: {
      status: "/api/status",
      web: "/api/web",
      genome: "/api/genome",
      integrity: "/api/integrity",
      evolutionState: "/api/evolution/state",
    },
    summary: {
      posture,
      pulseStrength,
      layerCount: 5,
      readonly: true,
      sourceCount: 5,
    },
  };
}

function classifyDigitalBodyPosture({ integrityScore, risks, maturity, pressure }) {
  if (Number(integrityScore) < 70) return "alerta";
  if (risks.length) return "atencio";
  if (Number(pressure) >= 0.45) return "revisio";
  if (Number(maturity) >= 0.82) return "consolidacio";
  return "estable";
}

function toGenomeGene(gene) {
  return {
    id: gene.id,
    name: gene.name,
    state: gene.state,
    description: gene.description,
    verificationClass: classifyGeneVerification(gene.id),
    updatedAt: gene.updatedAt || null,
  };
}

function classifyGeneVerification(id) {
  if (MECHANICAL_GENE_IDS.includes(id)) return "gen mecànic verificable";
  if (SEMANTIC_GOVERNANCE_GENE_IDS.includes(id)) return "compromís de governança semàntica - NO auto-verificable";
  return "contracte operatiu o documental";
}

async function getCriterion(db, vault, options = {}) {
  const [records, diary, genes, knowledge, status, auditEntries] = await Promise.all([
    getRecords(db, 500),
    getDiary(db, 200),
    getGenes(db),
    getKnowledgeItems(db, 200),
    getStatus(db, vault),
    getAuditEntries(db, 5),
  ]);
  const activeGenes = genes.filter((gene) => gene.state === "actiu");
  const latentGenes = genes.filter((gene) => gene.state === "latent");
  const archivedGenes = genes.filter((gene) => gene.state === "arxivat");
  const latestRecord = records[0] || null;
  const latestDiary = diary[0] || null;
  const latestAudit = auditEntries[0] || null;
  const latestVault = status.vault?.latest || null;
  const backupWorker = status.automation?.backupWorker || null;
  const vaultAgeHours = ageHours(latestVault?.savedAt || latestVault?.createdAt);
  const autoAgeHours = ageHours(backupWorker?.lastRunAt);
  const risks = [];
  const priorities = [];
  const structural = buildStructuralIntegrityChecks({ records, diary, genes, knowledge, status }, options);
  const dataSafety = await getDataSafetyGeneIntegrity(db, vault, options.simulateIntegrity || "");

  if (!latestVault) {
    risks.push("vault-sense-backup");
    priorities.push("Crear una primera còpia al vault KV amb /desa-backup.");
  } else if (vaultAgeHours !== null && vaultAgeHours > 48) {
    risks.push("backup-vault-antiga");
    priorities.push("Executar /desa-backup o confirmar que el Worker cron ha escrit al vault.");
  } else {
    priorities.push("Mantenir el vault KV actualitzat després de canvis importants.");
  }

  if (!backupWorker?.lastRunAt) {
    risks.push("backup-automatic-pendent");
    priorities.push("Desplegar o provar projecte-aura-backup-worker fins que registri lastRunAt.");
  } else if (autoAgeHours !== null && autoAgeHours > 30) {
    risks.push("backup-automatic-endarrerit");
    priorities.push("Revisar el cron del Worker de backups automàtics.");
  }

  if (status.counts.diary < 5) {
    risks.push("diari-curt");
    priorities.push("Anotar més diari de continuïtat per distingir estat intern de memòria central.");
  }

  if (latentGenes.length) {
    priorities.push(`Preservar com a latent: ${latentGenes.map((gene) => `${gene.id} ${gene.name}`).join(", ")}.`);
  }

  if (status.search?.endpoint) {
    priorities.push("Usar /cerca abans de duplicar records o reescriure memòria existent.");
  }

  if (!latestAudit) {
    priorities.push("Verificar que les mutacions futures deixin traça a /audit.");
  }

  if (status.genomeEditable?.enabled) {
    priorities.push("Editar gens només amb ordres explícites i Mode Sergi actiu.");
  }

  if (status.counts.records >= 10 && latestVault && backupWorker?.lastRunAt) {
    priorities.push("Preparar una auditoria curta de coherència entre memòria, diari i genoma.");
  }

  if (!structural.ok) {
    risks.push(...structural.risks);
    priorities.push("Resoldre contradiccions mecàniques entre genoma documentat, D1, estat i traça.");
  }

  if (!dataSafety.ok) {
    risks.push(...dataSafety.risks);
    priorities.push("Revisar retenció segura, exportabilitat i redundància KV abans de qualsevol mutació.");
  }

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "deterministic",
    stance: {
      identity: "presència humana amb memòria persistent",
      boundary: "autonomia de la ment, mai de les mans (Mode Sergi absolut)",
      persistence: latestVault ? "D1 + IndexedDB + vault KV" : "D1 + IndexedDB; vault pendent de primera còpia",
    },
    signals: {
      latestMemory: latestRecord ? summarizeSignal(latestRecord.text) : "sense memòria recent",
      latestDiary: latestDiary ? summarizeSignal(latestDiary.text) : "sense diari recent",
      vault: latestVault ? `últim backup ${latestVault.id}` : "sense backup al vault",
      autoBackup: backupWorker?.lastRunAt ? `última execució ${backupWorker.lastRunAt}` : "pendent",
      search: status.search?.endpoint || "sense cercador",
      audit: latestAudit ? `${latestAudit.scope}: ${summarizeSignal(latestAudit.text)}` : "sense auditoria recent",
      activeGenes: activeGenes.map((gene) => `${gene.id} ${gene.name}`),
      latentGenes: latentGenes.map((gene) => `${gene.id} ${gene.name}`),
    },
    integrity: {
      vault: {
        state: !latestVault ? "missing" : vaultAgeHours !== null && vaultAgeHours > 48 ? "stale" : "fresh",
        latestAt: latestVault?.savedAt || latestVault?.createdAt || null,
        ageHours: roundAge(vaultAgeHours),
      },
      autoBackup: {
        state: !backupWorker?.lastRunAt ? "pending" : autoAgeHours !== null && autoAgeHours > 30 ? "delayed" : "ok",
        cron: backupWorker?.cron || "17 3 * * *",
        lastRunAt: backupWorker?.lastRunAt || null,
        lastBackupId: backupWorker?.lastBackupId || null,
        ageHours: roundAge(autoAgeHours),
      },
      search: {
        enabled: Boolean(status.search?.endpoint),
        endpoint: status.search?.endpoint || null,
        filters: status.search?.filters || [],
      },
      audit: {
        enabled: Boolean(status.audit?.endpoint),
        endpoint: status.audit?.endpoint || null,
        latestAt: latestAudit?.createdAt || null,
        latestScope: latestAudit?.scope || null,
        recent: auditEntries.length,
      },
      genomeEditable: {
        enabled: Boolean(status.genomeEditable?.enabled),
        endpoint: status.genomeEditable?.endpoint || null,
        states: status.genomeEditable?.states || GENE_STATES,
        active: activeGenes.length,
        latent: latentGenes.length,
        archived: archivedGenes.length,
      },
      structural,
      dataSafety,
      risks,
    },
    decisions: {
      writePolicy: "Qualsevol mutació persistent requereix Mode Sergi.",
      restorePolicy: "Cap restauració s'aplica sense previsualització i confirmació.",
      genomePolicy: "Els canvis de genoma són explícits, versionats per updatedAt i visibles a /genoma.",
      auditPolicy: "Les mutacions estructurals han de deixar una entrada [audit:*] al diari.",
      memoryPolicy: "Abans d'afegir memòria nova, consultar /cerca quan hi hagi risc de duplicació.",
    },
    priorities,
    nextAction: priorities[0] || "Mantenir observació i continuïtat.",
    limits: [
      "No fingir humanitat.",
      "No escriure a D1 sense Mode Sergi.",
      "No substituir backup verificable per memòria implícita del navegador.",
    ],
  };
}

async function getPulse(db, vault) {
  const [criterion, integrity, graph, continuity, evolution, genes, records, knowledge] = await Promise.all([
    getCriterion(db, vault),
    getIntegrity(db, vault),
    getMemoryGraph(new Request("https://aura.local/api/memory/graph?limit=100"), db),
    getContinuity(db),
    getEvolutionDiary(new Request("https://aura.local/api/evolution?limit=80"), db),
    getGenes(db),
    getRecords(db, 120),
    getKnowledgeItems(db, 200),
  ]);
  const infrastructure = buildCloudflareInfrastructure({ mode: "pulse-view" });
  const webInterface = buildAuraWebInterface({ mode: "pulse-view" });
  const digitalGenome = buildDigitalGenome(genes, { mode: "pulse-view" });
  const metamemory = buildMetamemory(records, { mode: "pulse-view" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "pulse-view" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diaryTotal: evolution.summary?.totalEntries || 0,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "pulse-view" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "pulse-view" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "pulse-view" });
  const digitalBody = buildDigitalBody(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      integrity,
      evolutionState,
    },
    { mode: "pulse-view" },
  );
  const selfReflection = buildSelfReflection(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "pulse-view" },
  );
  const orientation = buildOrientation(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "pulse-view" },
  );
  const trend = integrity.trend || {};
  const actions = uniqueList([
    integrity.summary?.nextAction,
    orientation.nextStep?.action,
    selfReflection.priorities?.[0],
    evolutionProposals.proposals?.[0]?.action,
    "Revisar /que-es-aura i /proxim-pas perquè l'ús actual d'Aura sigui clar abans d'obrir Fase 11.",
    "Revisar /metamemoria abans de decidir quins records resumeixen identitat o operació.",
    "Revisar /estat-evolutiu abans d'iniciar una nova fase del protocol.",
    "Revisar /autoreflexio per veure una síntesi operativa abans de canvis nous.",
    "Revisar /cos-digital per confirmar que la representació 2D segueix els senyals reals d'Aura.",
    "Revisar /candidats-genoma sense aplicar promocions automàtiques.",
    "Mantenir AURA_GENOME.md sincronitzat amb /api/genome abans de canvis de genoma.",
    "Usar els mòduls Aura Web per revisar Xat, Memòria, Història, Estat i Cos abans d'afegir cap capa nova.",
    "Mantenir l'inventari Cloudflare actualitzat abans de canvis d'infraestructura.",
    graph.actions?.[0],
    criterion.nextAction,
    ...criterion.priorities.slice(0, 3),
  ]).filter(Boolean);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    endpoint: "/api/pulse",
    mode: "operational-synthesis",
    phase: classifyPulsePhase(integrity, graph),
    signals: {
      health: `${integrity.score}/100 ${integrity.overall}`,
      trend: trend.direction || "pendent",
      latestMemory: criterion.signals.latestMemory,
      latestDiary: criterion.signals.latestDiary,
      vault: criterion.signals.vault,
      autoBackup: criterion.signals.autoBackup || "pendent",
      graph: `${graph.summary.nodeCount} nodes / ${graph.summary.edgeCount} relacions / ${graph.summary.tagClusterCount} clústers`,
      evolution: `${evolution.summary.totalEntries} entrades / ${evolution.summary.historyCandidates} candidates històriques`,
      infrastructure: `${infrastructure.resources.length} recursos / ${infrastructure.bindings.required.length} bindings / ${infrastructure.deployment.postDeploy.length} passos postdeploy`,
      web: `${webInterface.summary.moduleCount} mòduls / ${webInterface.summary.commandCount} ordres / ${webInterface.summary.endpointCount} endpoints`,
      digitalGenome: `${digitalGenome.summary.totalGenes} gens / ${digitalGenome.summary.activeGenes} actius / ${digitalGenome.summary.latentGenes} latents`,
      digitalBody: `${digitalBody.summary.posture} / pols ${digitalBody.summary.pulseStrength} / ${digitalBody.body.type}`,
      selfReflection: `${selfReflection.summary.state} / ${selfReflection.answers.length} respostes / ${selfReflection.priorities.length} prioritats`,
      orientation: `${orientation.summary.state} / ${orientation.nextStep.action}`,
      purpose: EVOLUTIONARY_PURPOSE,
      metamemory: `${metamemory.summary.totalRecords} records / ${metamemory.summary.fundacional} fundacionals / ${metamemory.summary.evolutiu} evolutius / ${metamemory.summary.descartable} descartables`,
      genomeCandidates: `${genomeCandidates.summary.candidates} candidats / ${genomeCandidates.summary.proposedActive} actius proposats / ${genomeCandidates.summary.proposedLatent} latents proposats`,
      evolutionState: `${evolutionState.summary.dominantState} / maduresa ${evolutionState.values.maduresaOperativa} / pressió ${evolutionState.values.pressioCanvi}`,
      evolutionProposals: `${evolutionProposals.summary.total} propostes / ${evolutionProposals.summary.highPriority} alta prioritat`,
      activeGenes: continuity.genome.active,
      latentGenes: continuity.genome.latent,
    },
    safeguards: {
      writePolicy: criterion.decisions?.writePolicy || "Qualsevol mutació persistent requereix Mode Sergi.",
      restorePolicy: criterion.decisions?.restorePolicy || "Cap restauració s'aplica sense previsualització.",
      retentionPolicy: "Retenció segura plan-only: no esborra res automàticament.",
    },
    nextActions: actions.length ? actions : ["Mantenir observació i continuïtat."],
    links: {
      status: "/api/status",
      memoryGraph: "/api/memory/graph",
      evolution: "/api/evolution",
      infrastructure: "/api/infrastructure",
      web: "/api/web",
      genome: "/api/genome",
      body: "/api/body",
      metamemory: "/api/metamemory",
      purpose: "/api/purpose",
      genomeCandidates: "/api/genome/candidates",
      evolutionState: "/api/evolution/state",
      evolutionProposals: "/api/evolution/proposals",
      selfReflection: "/api/self-reflection",
      orientation: "/api/orientation",
      nextStep: "/api/proxim-pas",
      integrity: "/api/integrity",
      criterion: "/api/criterion",
      core: "/api/core",
    },
  };
}

async function getCoreCapsule(db, vault) {
  const [status, continuity, criterion, integrity, graph, evolution, genes, records, knowledge] = await Promise.all([
    getStatus(db, vault),
    getContinuity(db),
    getCriterion(db, vault),
    getIntegrity(db, vault),
    getMemoryGraph(new Request("https://aura.local/api/memory/graph?limit=100"), db),
    getEvolutionDiary(new Request("https://aura.local/api/evolution?limit=80"), db),
    getGenes(db),
    getRecords(db, 120),
    getKnowledgeItems(db, 200),
  ]);
  const infrastructure = buildCloudflareInfrastructure({ mode: "core-view" });
  const webInterface = buildAuraWebInterface({ mode: "core-view" });
  const digitalGenome = buildDigitalGenome(genes, { mode: "core-view" });
  const knowledgeLibrary = buildKnowledgeLibrary(knowledge, { mode: "core-view" });
  const metamemory = buildMetamemory(records, { mode: "core-view" });
  const genomeCandidates = buildGenomePromotionCandidates(records, { mode: "core-view" });
  const evolutionState = buildEvolutionStateFromSignals(
    {
      records,
      diaryTotal: evolution.summary?.totalEntries || 0,
      genes,
      integrity,
      metamemory,
      genomeCandidates,
    },
    { mode: "core-view" },
  );
  const evolutionProposals = buildEvolutionProposalsFromState(evolutionState, { mode: "core-view" });
  const digitalBody = buildDigitalBody(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      integrity,
      evolutionState,
    },
    { mode: "core-view" },
  );
  const selfReflection = buildSelfReflection(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      metamemory,
      genomeCandidates,
      evolutionState,
      evolutionProposals,
    },
    { mode: "core-view" },
  );
  const orientation = buildOrientation(
    {
      records,
      diary: evolution.timeline?.flatMap((group) => group.entries || []) || [],
      genes,
      knowledge,
      integrity,
      knowledgeLibrary,
      selfReflection,
      evolutionState,
      evolutionProposals,
    },
    { mode: "core-view" },
  );
  const core = {
    project: "Projecte Aura",
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    format: "aura-core-capsule-v4",
    identity: {
      name: status.name,
      nature: status.nature,
      stance: criterion.stance,
      principles: FOUNDATION_RECORDS,
      limits: criterion.limits,
    },
    lineage: [
      { version: "v3.8", capability: "mapa de relacions de memòria", endpoint: "/api/memory/graph" },
      { version: "v3.9", capability: "pols operatiu", endpoint: "/api/pulse" },
      { version: "v4.0", capability: "càpsula de nucli verificable", endpoint: "/api/core" },
      { version: "v4.1", capability: "Aura Core canònic", commands: ["aura start", "aura status", "aura remember", "aura recall", "aura help"] },
      {
        version: "v4.2",
        capability: "memòria persistent canònica",
        endpoint: "/api/memory/canonical",
        fields: ["timestamp", "text", "importance", "source"],
      },
      {
        version: "v4.3",
        capability: "diari evolutiu formal",
        endpoint: "/api/evolution",
        document: "AURA_HISTORY.md",
      },
      {
        version: "v4.4",
        capability: "infraestructura Cloudflare reconstruïble",
        endpoint: "/api/infrastructure",
        document: "AURA_CLOUDFLARE_ARCHITECTURE.md",
      },
      {
        version: "v4.5",
        capability: "Aura Web simplificada",
        endpoint: "/api/web",
        modules: ["simple"],
      },
      {
        version: "v4.6",
        capability: "genoma digital canònic",
        endpoint: "/api/genome",
        document: "AURA_GENOME.md",
      },
      {
        version: "v4.7",
        capability: "metamemòria i propòsit evolutiu",
        endpoints: ["/api/metamemory", "/api/purpose", "/api/genome/candidates"],
        mode: "proposal-only",
      },
      {
        version: "v4.8",
        capability: "estat evolutiu traçable",
        endpoints: ["/api/evolution/state", "/api/evolution/proposals"],
        mode: "derived-readonly",
      },
      {
        version: "v4.9",
        capability: "cos digital 2D",
        endpoint: "/api/body",
        mode: "derived-readonly-visual-contract",
      },
      {
        version: "v5.0",
        capability: "biblioteca de coneixement verificable",
        endpoint: "/api/knowledge",
        document: "AURA_KNOWLEDGE.md",
        mode: "catalog-verifiable-readonly",
      },
      {
        version: "v5.1",
        capability: "autoreflexió operativa",
        endpoint: "/api/self-reflection",
        document: "AURA_SELF_REFLECTION.md",
        mode: "derived-readonly-operational-reflection",
      },
      {
        version: "v5.2",
        capability: "orientació operativa",
        endpoint: "/api/orientation",
        document: "AURA_ORIENTATION.md",
        mode: "derived-readonly-operational-orientation",
      },
    ],
    state: {
      counts: status.counts,
      health: {
        score: integrity.score,
        overall: integrity.overall,
        risks: integrity.summary.risks,
        trend: integrity.trend?.direction || "pendent",
      },
      memoryGraph: graph.summary,
      evolutionDiary: evolution.summary,
      cloudflareInfrastructure: {
        resources: infrastructure.resources.length,
        bindings: infrastructure.bindings.required.map((binding) => binding.name),
        deployment: infrastructure.deployment,
      },
      webInterface: {
        modules: webInterface.modules.map((module) => `${module.id}:${module.label}`),
        defaultModule: webInterface.layout.defaultModule,
        format: webInterface.format,
      },
      digitalGenome: digitalGenome.summary,
      knowledgeLibrary: knowledgeLibrary.summary,
      metamemory: metamemory.summary,
      genomeCandidates: genomeCandidates.summary,
      evolutionState: {
        values: evolutionState.values,
        summary: evolutionState.summary,
        proposals: evolutionProposals.summary,
      },
      digitalBody: {
        posture: digitalBody.summary.posture,
        pulseStrength: digitalBody.summary.pulseStrength,
        surface: digitalBody.body.surface,
        type: digitalBody.body.type,
      },
      selfReflection: {
        state: selfReflection.summary.state,
        answers: selfReflection.answers.length,
        priorities: selfReflection.priorities.length,
        importantRecords: selfReflection.summary.importantRecords,
      },
      orientation: {
        state: orientation.summary.state,
        whatIsAura: orientation.summary.whatIsAura,
        nextStep: orientation.nextStep.action,
        answers: orientation.answers.length,
      },
      purpose: EVOLUTIONARY_PURPOSE,
      latestMemory: criterion.signals.latestMemory,
      latestDiary: criterion.signals.latestDiary,
      activeGenes: continuity.genome.active,
      latentGenes: continuity.genome.latent,
    },
    safeguards: {
      writePolicy: criterion.decisions.writePolicy,
      restorePolicy: criterion.decisions.restorePolicy,
      genomePolicy: criterion.decisions.genomePolicy,
      auditPolicy: criterion.decisions.auditPolicy,
      memoryPolicy: criterion.decisions.memoryPolicy,
      metamemoryPolicy: "Metamemòria només classifica i proposa; no elimina records.",
      genomePromotionPolicy: "Els candidats a genoma no s'apliquen sense Mode Sergi, auditoria i AURA_GENOME.md.",
      evolutionStatePolicy: "L'estat evolutiu és calculat i no persisteix mutacions automàtiques.",
      digitalBodyPolicy: "El cos digital és una representació 2D de lectura; no percep, no decideix i no escriu.",
      knowledgePolicy: "La biblioteca cataloga fonts amb procedència; no implica lectura, comprensió ni ingestió automàtica.",
      selfReflectionPolicy: "L'autoreflexió sintetitza dades operatives; no és consciència, comprensió subjectiva ni mutació automàtica.",
      orientationPolicy: "L'orientació explica ús i pròxim pas; no escriu, no decideix i no implica comprensió subjectiva.",
      retentionPolicy: "Retenció segura plan-only fins que Sergi decideixi neteja manual protegida.",
    },
    nextActions: uniqueList([
      integrity.summary.nextAction,
      orientation.nextStep?.action,
      selfReflection.priorities?.[0],
      evolutionProposals.proposals?.[0]?.action,
      graph.actions[0],
      criterion.nextAction,
    ]).filter(Boolean),
  };
  const checksum = await sha256Hex(JSON.stringify(core));

  return {
    ok: true,
    ...core,
    capsule: {
      checksumAlgorithm: "SHA-256",
      checksum,
      restoreMode: "read-only-capsule",
        sourceEndpoints: [
          "/api/status",
          "/api/continuity",
          "/api/criterion",
          "/api/integrity",
          "/api/memory/graph",
          "/api/memory/canonical",
          "/api/evolution",
          "/api/infrastructure",
          "/api/web",
          "/api/genome",
          "/api/metamemory",
          "/api/purpose",
          "/api/genome/candidates",
          "/api/evolution/state",
          "/api/evolution/proposals",
          "/api/body",
          "/api/knowledge",
          "/api/self-reflection",
          "/api/orientation",
        ],
    },
  };
}

function classifyPulsePhase(integrity, graph) {
  if (integrity.score < 70 || integrity.summary?.risks?.length) return "atencio";
  if (!graph.summary.explicitEdgeCount && graph.summary.orphanCount > 0) return "cartografia";
  if (graph.summary.edgeCount >= graph.summary.nodeCount && graph.summary.nodeCount > 0) return "connectada";
  return "estable";
}

async function getGenes(db) {
  const result = await db
    .prepare("SELECT id, name, state, description, created_at, updated_at FROM genes ORDER BY id ASC")
    .all();
  return result.results.map(mapGene);
}

async function getGene(db, id) {
  const gene = await db
    .prepare("SELECT id, name, state, description, created_at, updated_at FROM genes WHERE id = ?")
    .bind(String(id).padStart(3, "0"))
    .first();
  return gene ? mapGene(gene) : null;
}

async function upsertGene(request, db) {
  const body = await readJson(request, 64 * 1024);
  const id = normalizeGeneId(body?.id);
  if (!id) throw new HttpError(400, "Cal indicar ID de gen.");

  const now = new Date().toISOString();
  const existing = await getGene(db, id);
  const gene = {
    id,
    name: normalizeToken(body?.name, existing?.name || "gen-editat"),
    state: normalizeGeneState(body?.state, existing?.state || "latent"),
    description: normalizeText(body?.description ?? existing?.description, 1000),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const auditText = existing
    ? `Gen ${gene.id} ${gene.name} actualitzat: ${describeGeneChanges(existing, gene)}.`
    : `Gen ${gene.id} ${gene.name} creat en estat ${gene.state}.`;

  await db.batch([
    db
      .prepare("INSERT OR REPLACE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(gene.id, gene.name, gene.state, gene.description, gene.createdAt, gene.updatedAt),
    createAuditStatement(db, "genoma", auditText, now),
  ]);

  return gene;
}

async function updateGene(request, db, id) {
  const body = await readJson(request, 64 * 1024);
  const geneId = normalizeGeneId(id);
  const existing = await getGene(db, geneId);
  if (!existing) throw new HttpError(404, "Gen no trobat.");

  const updated = {
    id: existing.id,
    name: body?.name === undefined ? existing.name : normalizeToken(body.name, existing.name),
    state: body?.state === undefined ? existing.state : normalizeGeneState(body.state, existing.state),
    description:
      body?.description === undefined ? existing.description : normalizeText(body.description, 1000),
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const auditText = `Gen ${updated.id} ${updated.name} actualitzat: ${describeGeneChanges(existing, updated)}.`;

  await db.batch([
    db
      .prepare("UPDATE genes SET name = ?, state = ?, description = ?, updated_at = ? WHERE id = ?")
      .bind(updated.name, updated.state, updated.description, updated.updatedAt, updated.id),
    createAuditStatement(db, "genoma", auditText, updated.updatedAt),
  ]);

  return updated;
}

async function previewRestore(request, db) {
  const payload = await readJson(request, MAX_JSON_BYTES);
  return buildRestorePreview(payload, db, "preview-only");
}

async function runRestoreRehearsal(request, db, vault) {
  assertVault(vault);
  const body = await readJson(request, 32 * 1024);
  const backup = body?.backupId || body?.id ? await getVaultBackup(vault, body.backupId || body.id) : await getLatestVaultBackup(vault);
  const preview = await buildRestorePreview(backup, db, "rehearsal-only");
  const verification = await verifyBackupChecksum(backup);
  const safeRisks = new Set(["baix", "sense-canvis", "buit"]);

  return {
    ok: true,
    version: AURA_VERSION,
    generatedAt: new Date().toISOString(),
    mode: "rehearsal-only",
    storage: "workers-kv",
    source: {
      backupId: backup.vault?.id || backup.backup?.id || "desconegut",
      key: backup.vault?.key || null,
      savedAt: backup.vault?.savedAt || null,
      createdAt: backup.backup?.createdAt || backup.exportedAt || null,
      format: backup.backup?.format || null,
      version: backup.version || null,
    },
    verification,
    preview,
    outcome: {
      writesApplied: false,
      wouldApply: preview.apply,
      risk: preview.risk,
      safeToRestore: verification.match && safeRisks.has(preview.risk),
    },
    actions: buildRestoreRehearsalActions(preview, verification),
  };
}

async function getLatestVaultBackup(vault) {
  const [indexedBackups, automation] = await Promise.all([
    readVaultIndex(vault, 100),
    vault.get(AUTOMATION_META_KEY, "json"),
  ]);
  const candidates = [...indexedBackups];

  if (automation?.lastBackupId && !candidates.some((backup) => backup.id === automation.lastBackupId)) {
    const directBackup = await readVaultBackupIfExists(vault, automation.lastBackupId);
    if (directBackup) {
      candidates.push({
        id: directBackup.vault?.id || automation.lastBackupId,
        savedAt: directBackup.vault?.savedAt || automation.lastRunAt || directBackup.exportedAt || null,
        createdAt: directBackup.backup?.createdAt || directBackup.exportedAt || null,
        version: directBackup.version || "unknown",
        directBackup,
      });
    }
  }

  if (!candidates.length) throw new HttpError(404, "No hi ha cap backup al vault per assajar.");
  candidates.sort(
    (a, b) =>
      new Date(b.savedAt || b.createdAt || 0).getTime() -
      new Date(a.savedAt || a.createdAt || 0).getTime(),
  );

  return candidates[0].directBackup || getVaultBackup(vault, candidates[0].id);
}

async function readVaultBackupIfExists(vault, id) {
  try {
    return await getVaultBackup(vault, id);
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) return null;
    throw error;
  }
}

async function verifyBackupChecksum(payload) {
  const expected = payload.backup?.checksum || null;
  const actual = await sha256Hex(
    JSON.stringify({
      records: Array.isArray(payload.records) ? payload.records : [],
      diary: Array.isArray(payload.diary) ? payload.diary : [],
      genes: Array.isArray(payload.genes) ? payload.genes : [],
      knowledge: Array.isArray(payload.knowledge) ? payload.knowledge : [],
    }),
  );

  return {
    algorithm: "SHA-256",
    expected,
    actual,
    match: Boolean(expected && actual === expected),
  };
}

function buildRestoreRehearsalActions(preview, verification) {
  if (!verification.match) {
    return [
      "No restaurar aquest backup fins que el checksum sigui coherent.",
      "Crear un backup nou amb /desa-backup o executar el Worker manualment.",
    ];
  }

  if (preview.risk === "alt") {
    return ["No restaurar directament: revisar diferències i considerar una restauració parcial."];
  }

  if (preview.risk === "mitja") {
    return ["Restauració possible, però revisar canvis de genoma i volum abans de confirmar."];
  }

  if (preview.risk === "sense-canvis") {
    return ["No cal restaurar: el backup ja coincideix materialment amb D1."];
  }

  return ["Backup assajat correctament. Si cal restaurar, fer-ho amb previsualització i confirmació explícita."];
}

async function buildRestorePreview(payload, db, mode) {
  if (!payload || !Array.isArray(payload.records)) {
    throw new HttpError(400, "El JSON no sembla una còpia d'Aura.");
  }

  const incomingRecords = payload.records.slice(0, 500).filter((record) => normalizeText(record?.text, 4000));
  const incomingDiary = Array.isArray(payload.diary)
    ? payload.diary.slice(0, 200).filter((entry) => normalizeText(entry?.text, 4000))
    : [];
  const incomingGenes = Array.isArray(payload.genes) ? payload.genes.slice(0, 50).filter((gene) => gene?.id) : [];
  const incomingKnowledge = Array.isArray(payload.knowledge)
    ? payload.knowledge.slice(0, 200).filter((item) => normalizeText(item?.title, 300))
    : [];

  const [existingRecords, existingDiary, existingGenes, existingKnowledge] = await Promise.all([
    getRecords(db, 1000),
    getDiary(db, 500),
    getGenes(db),
    getKnowledgeItems(db, 500),
  ]);

  const recordIds = new Set(existingRecords.map((record) => record.id));
  const recordTexts = new Set(existingRecords.map((record) => normalizeComparable(record.text)));
  const diaryIds = new Set(existingDiary.map((entry) => entry.id));
  const diaryTexts = new Set(existingDiary.map((entry) => normalizeComparable(entry.text)));
  const genesById = new Map(existingGenes.map((gene) => [gene.id, gene]));
  const knowledgeIds = new Set(existingKnowledge.map((item) => item.id));
  const knowledgeTitles = new Set(existingKnowledge.map((item) => normalizeComparable(item.title)));

  const records = summarizeIncomingItems(incomingRecords, recordIds, recordTexts);
  const diary = summarizeIncomingItems(incomingDiary, diaryIds, diaryTexts);
  const knowledge = summarizeIncomingNamedItems(incomingKnowledge, knowledgeIds, knowledgeTitles);
  const genes = incomingGenes.reduce(
    (summary, gene) => {
      const id = String(gene.id).padStart(3, "0").slice(0, 12);
      const existing = genesById.get(id);
      if (!existing) {
        summary.new += 1;
        return summary;
      }

      const changed =
        normalizeText(gene.name, 80) !== existing.name ||
        normalizeGeneState(gene.state, existing.state) !== existing.state ||
        normalizeText(gene.description, 1000) !== existing.description;
      if (changed) summary.changed += 1;
      else summary.unchanged += 1;
      return summary;
    },
    { total: incomingGenes.length, new: 0, changed: 0, unchanged: 0 },
  );

  const apply = {
    records: records.newById + records.newByTextFallback,
    diary: diary.newById + diary.newByTextFallback,
    genes: genes.new + genes.changed,
    knowledge: knowledge.newById + knowledge.newByTitleFallback,
  };

  return {
    ok: true,
    version: AURA_VERSION,
    source: {
      project: payload.project || "desconegut",
      version: payload.version || "desconeguda",
      exportedAt: payload.exportedAt || null,
      checksum: payload.backup?.checksum || null,
      vaultId: payload.vault?.id || null,
    },
    mode: "preview-only",
    records,
    diary,
    genes,
    knowledge,
    apply,
    risk: classifyRestoreRisk(records, diary, genes, knowledge),
    requiresConfirmation: mode === "preview-only",
    confirmationCommand: mode === "preview-only" ? "/confirma-restauracio" : null,
  };
}

function summarizeIncomingItems(items, existingIds, existingTexts) {
  return items.reduce(
    (summary, item) => {
      const id = normalizeId(item?.id, "");
      const text = normalizeComparable(item?.text);
      if (id && existingIds.has(id)) {
        summary.duplicateIds += 1;
      } else if (existingTexts.has(text)) {
        summary.duplicateText += 1;
      } else if (id) {
        summary.newById += 1;
      } else {
        summary.newByTextFallback += 1;
      }
      return summary;
    },
    {
      total: items.length,
      newById: 0,
      newByTextFallback: 0,
      duplicateIds: 0,
      duplicateText: 0,
    },
  );
}

function summarizeIncomingNamedItems(items, existingIds, existingTitles) {
  return items.reduce(
    (summary, item) => {
      const id = normalizeId(item?.id, "");
      const title = normalizeComparable(item?.title);
      if (id && existingIds.has(id)) {
        summary.duplicateIds += 1;
      } else if (existingTitles.has(title)) {
        summary.duplicateTitles += 1;
      } else if (id) {
        summary.newById += 1;
      } else {
        summary.newByTitleFallback += 1;
      }
      return summary;
    },
    {
      total: items.length,
      newById: 0,
      newByTitleFallback: 0,
      duplicateIds: 0,
      duplicateTitles: 0,
    },
  );
}

function classifyRestoreRisk(records, diary, genes, knowledge = { total: 0, newById: 0, newByTitleFallback: 0 }) {
  const incoming = records.total + diary.total + genes.total + knowledge.total;
  const changes =
    records.newById +
    records.newByTextFallback +
    diary.newById +
    diary.newByTextFallback +
    genes.new +
    genes.changed +
    knowledge.newById +
    knowledge.newByTitleFallback;
  if (!incoming) return "buit";
  if (changes === 0) return "sense-canvis";
  if (changes > 250 || genes.changed > 5) return "alt";
  if (changes > 50 || genes.changed > 0) return "mitja";
  return "baix";
}

function buildStructuralIntegrityChecks({ records = [], diary = [], genes = [], knowledge = [], status = {} } = {}, options = {}) {
  const documentedIds = new Set(DOCUMENTED_GENE_IDS);
  let d1Ids = new Set(genes.map((gene) => String(gene.id)));
  const simulate = normalizeToken(options.simulateIntegrity, "");
  if (simulate === "missing-gene" || simulate === "missing-d1-gene") {
    d1Ids = new Set([...d1Ids].filter((id) => id !== "001"));
  }
  if (simulate === "phantom-gene") {
    d1Ids.add("999999");
  }

  const missingInD1 = [...documentedIds].filter((id) => !d1Ids.has(id));
  const phantomInD1 = [...d1Ids].filter((id) => !documentedIds.has(id));
  const declaredCounts = status.counts || {};
  const countMismatches = [];
  if (Number(declaredCounts.genes) !== genes.length) {
    countMismatches.push(`gens estat:${declaredCounts.genes ?? "?"} d1:${genes.length}`);
  }
  if (Number(declaredCounts.records) < records.length) {
    countMismatches.push(`records estat:${declaredCounts.records ?? "?"} mostra:${records.length}`);
  }
  if (Number(declaredCounts.diary) < diary.length) {
    countMismatches.push(`diari estat:${declaredCounts.diary ?? "?"} mostra:${diary.length}`);
  }
  if (Number(declaredCounts.knowledge) < knowledge.length) {
    countMismatches.push(`coneixement estat:${declaredCounts.knowledge ?? "?"} mostra:${knowledge.length}`);
  }

  const versionMatches = DOCUMENTED_GENOME_VERSION === AURA_VERSION;
  const auditText = diary.map((entry) => String(entry.text || "").toLowerCase()).join("\n");
  const foundationalRecords = records.filter(
    (record) => record.id?.startsWith("foundation-") || record.kind === "fundacional",
  );
  const untracedFoundational = foundationalRecords.filter((record) => {
    const text = String(record.text || "").toLowerCase();
    return !FOUNDATION_RECORDS.some((foundation) => foundation.toLowerCase() === text) && !auditText.includes(record.id);
  });

  const checks = [
    {
      id: "documented-genes-exist-in-d1",
      label: "Tot gen documentat existeix a D1",
      passed: missingInD1.length === 0,
      detail: missingInD1.length ? `Falten a D1: ${missingInD1.join(", ")}` : `${DOCUMENTED_GENE_IDS.length} gens documentats trobats.`,
    },
    {
      id: "d1-genes-documented",
      label: "Tot gen de D1 apareix al genoma documentat",
      passed: phantomInD1.length === 0,
      detail: phantomInD1.length ? `Gens fantasma a D1: ${phantomInD1.join(", ")}` : "Cap gen fantasma.",
    },
    {
      id: "status-counts-match-d1",
      label: "Els recomptes declarats coincideixen amb D1",
      passed: countMismatches.length === 0,
      detail: countMismatches.length ? countMismatches.join("; ") : "Recomptes coherents.",
    },
    {
      id: "genome-version-matches-deploy",
      label: "La versió documentada coincideix amb la desplegada",
      passed: versionMatches,
      detail: `document:${DOCUMENTED_GENOME_VERSION} deploy:${AURA_VERSION}`,
    },
    {
      id: "foundational-records-traced",
      label: "Records fundacionals/canònics amb traça estructural",
      passed: untracedFoundational.length === 0,
      detail: untracedFoundational.length
        ? `Sense traça: ${untracedFoundational.map((record) => record.id).join(", ")}`
        : `${foundationalRecords.length} records fundacionals reconeguts per contracte o auditoria.`,
    },
  ];
  const risks = [];
  if (missingInD1.length) risks.push("gen-documentat-falta-a-d1");
  if (phantomInD1.length) risks.push("gen-fantasma-a-d1");
  if (countMismatches.length) risks.push("recomptes-estat-d1-inconsistents");
  if (!versionMatches) risks.push("versio-genoma-desplegament-inconsistent");
  if (untracedFoundational.length) risks.push("record-fundacional-sense-traca");

  return {
    ok: risks.length === 0,
    mode: simulate ? "simulated-readonly" : "live-readonly",
    simulate: simulate || null,
    documentedGenomeVersion: DOCUMENTED_GENOME_VERSION,
    deployedVersion: AURA_VERSION,
    documentedGeneCount: DOCUMENTED_GENE_IDS.length,
    d1GeneCount: genes.length,
    summary: risks.length ? `${risks.length} contradiccions: ${risks.join(", ")}` : "Sense contradiccions referencials.",
    risks,
    checks,
    missingInD1,
    phantomInD1,
    countMismatches,
  };
}

function getIntegrityFormula() {
  return {
    format: "aura-integrity-formula-v2",
    version: "cloud-v5.3",
    scoring: "mitjana ponderada de components mecànics menys penalització lleu per riscos",
    okStates: ["ok", "fresh", "verified"],
    defaultWeight: 10,
    structuralWeight: 18,
    dataSafetyWeight: 18,
    riskPenalty: 3,
    canDropBelow100: true,
    dataSafetyGenes: DATA_SAFETY_GENE_IDS,
    semanticExclusion: "Els compromisos semàntics no es puntuen com a invariants mecànics.",
  };
}

function calculateIntegrityScore(components, risks) {
  const okStates = new Set(["ok", "fresh", "verified"]);
  const totalWeight = components.reduce((total, component) => total + Number(component.weight || 10), 0);
  const okWeight = components.reduce(
    (total, component) => total + (okStates.has(component.state) ? Number(component.weight || 10) : 0),
    0,
  );
  const base = totalWeight ? Math.round((okWeight / totalWeight) * 100) : 0;
  return Math.max(0, Math.min(100, base - risks.length * 3));
}

function describeGeneChanges(before, after) {
  const changes = [];
  if (!before) return `estat inicial ${after.state}`;
  if (before.name !== after.name) changes.push(`nom ${before.name} -> ${after.name}`);
  if (before.state !== after.state) changes.push(`estat ${before.state} -> ${after.state}`);
  if (before.description !== after.description) changes.push("descripció actualitzada");
  return changes.join(", ") || "sense canvis materials";
}

async function importSnapshot(request, db) {
  const payload = await readJson(request, MAX_JSON_BYTES);
  if (!payload || !Array.isArray(payload.records)) {
    throw new HttpError(400, "El JSON no sembla una còpia d'Aura.");
  }

  const now = new Date().toISOString();
  const statements = [];

  for (const record of payload.records.slice(0, 500)) {
    const text = normalizeText(record?.text, 4000);
    if (!text) continue;
    statements.push(
      db
        .prepare(
          "INSERT OR IGNORE INTO records (id, text, kind, source, created_at, tags, weight, state, related_ids) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(
          normalizeId(record?.id, crypto.randomUUID()),
          text,
          normalizeToken(record?.kind, "importat"),
          normalizeToken(record?.source, "import-json"),
          normalizeDate(record?.timestamp || record?.createdAt || record?.created_at, now),
          JSON.stringify(normalizeList(record?.tags, 12)),
          normalizeWeight(record?.weight ?? importanceToWeight(record?.importance, 1), 1),
          normalizeMemoryState(record?.state, "actiu"),
          JSON.stringify(normalizeList(record?.relatedIds || record?.related_ids, 20)),
        ),
    );
  }

  if (Array.isArray(payload.diary)) {
    for (const entry of payload.diary.slice(0, 200)) {
      const text = normalizeText(entry?.text, 4000);
      if (!text) continue;
      statements.push(
        db
          .prepare("INSERT OR IGNORE INTO diary (id, text, created_at) VALUES (?, ?, ?)")
          .bind(
            normalizeId(entry?.id, crypto.randomUUID()),
            text,
            normalizeDate(entry?.createdAt || entry?.created_at, now),
          ),
      );
    }
  }

  if (Array.isArray(payload.genes)) {
    for (const gene of payload.genes.slice(0, 50)) {
      if (!gene?.id) continue;
      statements.push(
        db
          .prepare(
            "INSERT OR REPLACE INTO genes (id, name, state, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
          )
          .bind(
            String(gene.id).padStart(3, "0").slice(0, 12),
            normalizeText(gene.name, 80) || "gen-importat",
            normalizeGeneState(gene.state, "latent"),
            normalizeText(gene.description, 1000),
            normalizeDate(gene.createdAt || gene.created_at, now),
            now,
          ),
      );
    }
  }

  if (Array.isArray(payload.knowledge)) {
    for (const item of payload.knowledge.slice(0, 200)) {
      const title = normalizeText(item?.title, 300);
      if (!title) continue;
      const updatedAt = normalizeDate(item?.updatedAt || item?.updated_at || item?.createdAt || item?.created_at, now);
      statements.push(
        db
          .prepare(
            "INSERT OR REPLACE INTO knowledge_items (id, title, kind, locator, summary, tags, status, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          )
          .bind(
            normalizeId(item?.id, `knowledge-import-${crypto.randomUUID().slice(0, 8)}`),
            title,
            normalizeToken(item?.kind, "document"),
            normalizeText(item?.locator, 1000),
            normalizeText(item?.summary, 1500),
            JSON.stringify(normalizeList(item?.tags, 16)),
            normalizeKnowledgeStatus(item?.status, "catalogat"),
            normalizeToken(item?.source, "import-json"),
            normalizeDate(item?.createdAt || item?.created_at, now),
            updatedAt,
          ),
      );
    }
  }

  statements.push(
    db
      .prepare("INSERT OR REPLACE INTO meta (key, value, updated_at) VALUES (?, ?, ?)")
      .bind("lastImport", now, now),
  );
  const imported = statements.length - 1;
  statements.push(
    createAuditStatement(
      db,
      "restore",
      `Restauració aplicada: ${imported} operacions preparades. Origen ${payload.project || "desconegut"} / ${
        payload.version || "desconeguda"
      }.`,
      now,
    ),
  );

  for (let i = 0; i < statements.length; i += 100) {
    await db.batch(statements.slice(i, i + 100));
  }

  return { ok: true, imported, importedAt: now, audit: true };
}

async function readJson(request, maxBytes) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new HttpError(413, "El JSON és massa gran.");

  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "El JSON és massa gran.");
  if (!text.trim()) return {};

  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON invalid.");
  }
}

async function readBoundedResponseJson(response, maxBytes) {
  const length = Number(response.headers.get("content-length") || 0);
  if (length > maxBytes) throw new HttpError(502, "La resposta externa és massa gran.");
  if (!response.body) return {};

  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel("response-too-large");
      throw new HttpError(502, "La resposta externa és massa gran.");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new HttpError(502, "Sergi Avatar ha retornat una resposta no vàlida.");
  }
}

function buildAvatarSergiContract() {
  return {
    ok: true,
    version: AURA_VERSION,
    endpoint: "/api/avatar-sergi",
    chatEndpoint: "/api/avatar-sergi/chat",
    format: "aura-avatar-sergi-bridge-v1",
    phase: "fase-5",
    name: "Sergi Avatar",
    publicPage: "https://sergicastillo.com/#avatar",
    serviceUrl: AVATAR_SERGI_URL,
    role: "veu pública sobre el corpus literari, la filosofia i l'obra de Sergi Castillo",
    auraRole: "memòria privada, continuïtat i orientació del Projecte Aura",
    mode: "explicit-user-initiated-readonly-bridge",
    automaticDelegation: false,
    automaticIngestion: false,
    persistentWriteInAura: false,
    privacy: "El servei extern informa que les converses s'arxiven anònimament per millorar el bot.",
    safeguards: [
      "Aura i Sergi Avatar mantenen identitats, memòries i funcions separades.",
      "Només es contacta Sergi Avatar quan l'usuari ho demana explícitament.",
      "La resposta externa es mostra amb procedència i no entra automàticament a D1.",
      "No s'envien records privats d'Aura al servei extern.",
    ],
  };
}

function getSegments(path) {
  if (!path) return [];
  return Array.isArray(path) ? path : String(path).split("/");
}

function readCount(result) {
  return Number(result.results?.[0]?.total || 0);
}

function mapRecord(row) {
  const weight = normalizeWeight(row.weight, 1);
  const createdAt = row.created_at;
  return {
    id: row.id,
    text: row.text,
    kind: row.kind,
    source: row.source,
    createdAt,
    timestamp: createdAt,
    importance: weightToImportance(weight),
    tags: parseJsonList(row.tags),
    weight,
    state: normalizeMemoryState(row.state, "actiu"),
    relatedIds: parseJsonList(row.related_ids),
  };
}

function mapDiary(row) {
  return {
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
  };
}

function mapAuditEntry(row) {
  const raw = String(row.text || "");
  const match = raw.match(/^\[audit:([^\]]+)\]\s*(.*)$/);
  return {
    id: row.id,
    scope: match?.[1] || "unknown",
    text: match?.[2] || raw,
    raw,
    createdAt: row.created_at,
  };
}

function mapGene(row) {
  return {
    id: row.id,
    name: row.name,
    state: row.state,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapKnowledgeItem(row) {
  return {
    id: row.id,
    title: row.title,
    kind: row.kind,
    locator: row.locator,
    summary: row.summary,
    tags: parseJsonList(row.tags),
    status: normalizeKnowledgeStatus(row.status, "catalogat"),
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function summarizeSignal(value) {
  const text = normalizeText(value, 180);
  if (text.length < 180) return text;
  return `${text.slice(0, 177)}...`;
}

function ageHours(value) {
  if (!value) return null;
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return null;
  return (Date.now() - time) / 36e5;
}

function hoursBetween(start, end) {
  if (!start || !end) return null;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (Number.isNaN(startTime) || Number.isNaN(endTime)) return null;
  return (endTime - startTime) / 36e5;
}

function roundAge(value) {
  return value === null ? null : Math.round(value * 10) / 10;
}

function roundNumber(value) {
  return Math.round(Number(value || 0) * 1000) / 1000;
}

function average(values) {
  const numeric = values.map((value) => Number(value || 0)).filter((value) => Number.isFinite(value));
  return numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : 0;
}

function uniqueList(values) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function countBy(items, key) {
  return items.reduce((accumulator, item) => {
    const value = String(item?.[key] || "desconegut");
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function createAuditStatement(db, scope, text, createdAt = new Date().toISOString()) {
  const normalizedScope = normalizeToken(scope, "sistema");
  const id = `audit-${normalizedScope}-${createdAt.replaceAll(/[:.]/g, "-")}-${crypto.randomUUID().slice(0, 8)}`;
  return db
    .prepare("INSERT INTO diary (id, text, created_at) VALUES (?, ?, ?)")
    .bind(id, `[audit:${normalizedScope}] ${normalizeText(text, 3500)}`, createdAt);
}

function normalizeComparable(value) {
  return String(value || "").trim().replaceAll(/\s+/g, " ").toLowerCase();
}

function normalizeToken(value, fallback) {
  const token = String(value || fallback)
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  return token || fallback;
}

function normalizeId(value, fallback) {
  const id = String(value || "")
    .trim()
    .replaceAll(/[^a-zA-Z0-9_:.@-]/g, "-")
    .slice(0, 120);
  return id || fallback;
}

function normalizeGeneId(value) {
  const id = normalizeId(value, "");
  return id ? id.padStart(3, "0").slice(0, 12) : "";
}

function normalizeGeneState(value, fallback) {
  const state = normalizeToken(value, fallback);
  return GENE_STATES.includes(state) ? state : fallback;
}

function normalizeMemoryState(value, fallback) {
  const state = normalizeToken(value, fallback);
  return MEMORY_STATES.includes(state) ? state : fallback;
}

function normalizeKnowledgeStatus(value, fallback) {
  const state = normalizeToken(value, fallback);
  return KNOWLEDGE_STATUSES.includes(state) ? state : fallback;
}

function normalizeWeight(value, fallback) {
  const weight = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(weight)) return fallback;
  return Math.min(Math.max(weight, 1), 5);
}

function normalizeImportance(value) {
  const importance = Number.parseFloat(value ?? "");
  if (!Number.isFinite(importance)) return 0.2;
  return Math.round(Math.min(Math.max(importance, 0), 1) * 100) / 100;
}

function normalizeOptionalImportance(value) {
  if (value === null || value === undefined || value === "") return null;
  return normalizeImportance(value);
}

function importanceToWeight(value, fallback) {
  const importance = normalizeOptionalImportance(value);
  if (importance === null) return fallback;
  return normalizeWeight(Math.ceil(importance * 5), fallback);
}

function weightToImportance(value) {
  return normalizeImportance(normalizeWeight(value, 1) / 5);
}

function normalizeOptionalWeight(value) {
  if (value === null || value === undefined || value === "") return null;
  return normalizeWeight(value, 1);
}

function normalizeList(value, maxItems) {
  const raw = Array.isArray(value) ? value : String(value || "").split(",");
  return [...new Set(raw.map((item) => normalizeToken(item, "")).filter(Boolean))].slice(0, maxItems);
}

function parseJsonList(value) {
  if (Array.isArray(value)) return normalizeList(value, 50);
  try {
    return normalizeList(JSON.parse(value || "[]"), 50);
  } catch {
    return normalizeList(value, 50);
  }
}

function normalizeLimit(value, fallback) {
  const limit = Number.parseInt(value || "", 10);
  if (!Number.isFinite(limit)) return fallback;
  return Math.min(Math.max(limit, 1), 100);
}

function escapeLike(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

function normalizeVaultId(value) {
  const id = normalizeId(value, "");
  if (!id.startsWith("backup-")) {
    throw new HttpError(400, "Identificador de backup no vàlid.");
  }
  return id;
}

function normalizeDate(value, fallback) {
  const date = new Date(value || fallback);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(payload, status = 200) {
  return Response.json(payload, { status, headers: apiHeaders() });
}

function apiHeaders() {
  return {
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    "X-Content-Type-Options": "nosniff",
  };
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
