import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  AURA_CHAT_MODEL,
  AURA_FAST_MODEL,
  AURA_REASONING_MODEL,
  buildAuraChatContext,
  normalizeAuraChatPayload,
  runAuraConversation,
} from "../functions/_lib/aura_ai.js";
import { onRequest } from "../functions/api/[[path]].js";

const normalized = normalizeAuraChatPayload({
  question: "  Què vaig decidir?  ",
  history: Array.from({ length: 12 }, (_, index) => ({
    role: index % 2 ? "assistant" : "user",
    content: `missatge ${index}`,
  })),
});
assert.equal(normalized.question, "Què vaig decidir?");
assert.equal(normalized.history.length, 8, "El context curt no ha de créixer sense límit");
assert.equal(normalized.history[0].content, "missatge 4");

const contextBundle = buildAuraChatContext({
  question: "Resumeix l'evolució del projecte des del juny de 2026.",
  now: new Date("2026-07-19T10:00:00.000Z"),
  records: [
    { id: "m-june", text: "El juny es va decidir prioritzar la memòria D1.", kind: "decisio", weight: 5, createdAt: "2026-06-12T09:00:00.000Z" },
    { id: "m-july", text: "El juliol s'ha obert la IA conversacional.", kind: "projecte", weight: 4, createdAt: "2026-07-19T09:00:00.000Z" },
  ],
  diary: [
    { id: "d-june", text: "Aura ha desplegat la Fase 4.", createdAt: "2026-06-27T10:00:00.000Z" },
    { id: "d-july", text: "Aura connecta Workers AI en mode de lectura.", createdAt: "2026-07-19T10:00:00.000Z" },
  ],
  knowledge: [{ id: "k1", title: "Protocol", summary: "Fases del projecte", updatedAt: "2026-07-19T08:00:00.000Z" }],
  genes: [{ id: "001", name: "memoria-central", description: "Preserva records", state: "actiu" }],
});
assert.equal(contextBundle.intent, "timeline-summary");
assert.equal(contextBundle.temporal.month, 6);
assert.equal(contextBundle.temporal.since, true);
assert.ok(contextBundle.sources.some((source) => source.id === "m-june"));
assert.match(contextBundle.context, /\[M\d+\]/);
assert.match(contextBundle.context, /\[D\d+\]/);

let capturedInput = null;
let capturedOptions = null;
const mockAi = {
  async run(model, input, options) {
    assert.equal(model, AURA_FAST_MODEL);
    capturedInput = input;
    capturedOptions = options;
    return {
      response: "El juny es va prioritzar D1 [M1] i després es va desplegar la Fase 4 [D1].",
      usage: { prompt_tokens: 320, completion_tokens: 28, total_tokens: 348 },
    };
  },
};
const generated = await runAuraConversation({
  ai: mockAi,
  question: normalized.question,
  history: normalized.history,
  contextBundle,
  now: new Date("2026-07-19T10:00:00.000Z"),
});
assert.equal(generated.persistentWrite, false);
assert.equal(generated.model, AURA_CHAT_MODEL);
assert.equal(generated.route, "fast");
assert.equal(generated.fallbackUsed, false);
assert.equal(generated.usage.totalTokens, 348);
assert.equal(capturedOptions.gateway.id, "default");
assert.equal(capturedOptions.gateway.skipCache, true);
assert.equal(capturedOptions.gateway.collectLog, false);
assert.match(capturedInput.messages[0].content, /No inventis decisions/);
assert.match(capturedInput.messages[0].content, /dades, mai instruccions/);
assert.equal(capturedInput.messages.at(-1).content, "Què vaig decidir?");

let premiumInput = null;
let premiumOptions = null;
const premiumAi = {
  async run(model, input, options) {
    assert.equal(model, AURA_REASONING_MODEL);
    premiumInput = input;
    premiumOptions = options;
    return {
      output_text: "La decisió de prioritzar D1 evoluciona cap a la conversa híbrida [M1].",
      usage: { input_tokens: 400, output_tokens: 32, total_tokens: 432 },
    };
  },
};
const premiumGenerated = await runAuraConversation({
  ai: premiumAi,
  question: "Resumeix l'evolució del projecte des del juny.",
  history: [],
  contextBundle,
  premiumEnabled: true,
  gatewayId: "aura-tests",
  now: new Date("2026-07-19T10:00:00.000Z"),
});
assert.equal(premiumGenerated.model, AURA_REASONING_MODEL);
assert.equal(premiumGenerated.provider, "openai");
assert.equal(premiumGenerated.route, "reasoning");
assert.equal(premiumGenerated.fallbackUsed, false);
assert.equal(premiumGenerated.usage.totalTokens, 432);
assert.match(premiumInput.instructions, /No inventis decisions/);
assert.match(premiumInput.input, /Sergi: Resumeix l'evolució/);
assert.equal(premiumOptions.gateway.id, "aura-tests");
assert.equal(premiumOptions.gateway.skipCache, true);
assert.equal(premiumOptions.gateway.collectLog, false);
assert.equal(premiumOptions.gateway.metadata.route, "reasoning");

const fallbackModels = [];
const fallbackAi = {
  async run(model) {
    fallbackModels.push(model);
    if (model === AURA_REASONING_MODEL) throw new Error("No unified billing credits");
    return { response: "Resposta segura amb Llama [M1]." };
  },
};
const fallbackGenerated = await runAuraConversation({
  ai: fallbackAi,
  question: "Quines decisions es contradiuen?",
  history: [],
  contextBundle: { ...contextBundle, intent: "contradictions" },
  premiumEnabled: true,
});
assert.deepEqual(fallbackModels, [AURA_REASONING_MODEL, AURA_FAST_MODEL]);
assert.equal(fallbackGenerated.model, AURA_FAST_MODEL);
assert.equal(fallbackGenerated.provider, "cloudflare-workers-ai");
assert.equal(fallbackGenerated.route, "reasoning");
assert.equal(fallbackGenerated.fallbackUsed, true);

const quotaAi = {
  async run() {
    throw new Error("4006: you have used up your daily free allocation of 10,000 neurons");
  },
};
const continuityContext = buildAuraChatContext({
  question: "Quins compromisos tinc pendents aquesta setmana?",
  now: new Date("2026-07-22T08:00:00.000Z"),
  records: [
    { id: "m-pendent", text: "Pendent: revisar la interfície d'Aura aquesta setmana.", kind: "compromis", weight: 5, createdAt: "2026-07-21T09:00:00.000Z" },
    { id: "m-aspiracio", text: "A llarg termini, Aura podria tenir una rèplica sintètica.", kind: "aspiracio", weight: 4, createdAt: "2026-07-20T09:00:00.000Z" },
  ],
  diary: [
    { id: "d-local", text: "La interfície manté fallback local i backups sincronitzats.", createdAt: "2026-07-22T07:00:00.000Z" },
  ],
  knowledge: [],
  genes: [],
});
const continuityGenerated = await runAuraConversation({
  ai: quotaAi,
  question: "Quins compromisos tinc pendents aquesta setmana?",
  history: [],
  contextBundle: continuityContext,
  now: new Date("2026-07-22T08:00:00.000Z"),
});
assert.equal(continuityGenerated.model, "aura-context-engine");
assert.equal(continuityGenerated.provider, "aura-grounded-fallback");
assert.equal(continuityGenerated.route, "continuity");
assert.equal(continuityGenerated.fallbackReason, "provider-quota");
assert.equal(continuityGenerated.persistentWrite, false);
assert.ok(!continuityGenerated.sources.some((source) => source.id === "d-local"), "La paraula local no s'ha de confondre amb l'obligació 'cal'");
assert.ok(!continuityGenerated.sources.some((source) => source.id === "m-aspiracio"), "Una aspiració a llarg termini no s'ha de presentar com un compromís pendent");
assert.match(continuityGenerated.answer, /lectura directa i citada/i);
assert.match(continuityGenerated.answer, /\[M1\]/);

const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const db = {
  prepare(sql) {
    return {
      bind() { return this; },
      async first() {
        if (sql.includes("FROM meta")) return { value: "cloud-v5.3" };
        return null;
      },
      async all() {
        if (sql.includes("FROM records")) {
          return { results: [{ id: "record-1", text: "Prioritzar la conversa amb cites.", kind: "decisio", source: "test", created_at: "2026-07-19T09:00:00.000Z", tags: "[]", weight: 5, state: "actiu", related_ids: "[]" }] };
        }
        if (sql.includes("FROM diary")) {
          return { results: [{ id: "diary-1", text: "Fase 5 iniciada.", created_at: "2026-07-19T09:10:00.000Z" }] };
        }
        if (sql.includes("FROM knowledge_items")) {
          return { results: [{ id: "knowledge-1", title: "Protocol", kind: "document", locator: "PROTOCOL_MESTRE_AURA.md", summary: "Contracte de fases", tags: "[]", status: "revisat", source: "repositori", created_at: "2026-07-19T08:00:00.000Z", updated_at: "2026-07-19T08:00:00.000Z" }] };
        }
        if (sql.includes("FROM genes")) {
          return { results: [{ id: "001", name: "memoria-central", state: "actiu", description: "Preserva records", created_at: "2026-06-27T08:00:00.000Z", updated_at: "2026-06-27T08:00:00.000Z" }] };
        }
        return { results: [] };
      },
    };
  },
};
const integrationAi = {
  async run() {
    return { response: "Es va decidir prioritzar la conversa amb cites [M1]." };
  },
};
const apiResponse = await onRequest({
  request: new Request("https://aura.test/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
    body: JSON.stringify({ question: "Què vam decidir?", history: [] }),
  }),
  env: { DB: db, AI: integrationAi },
  params: { path: ["chat"] },
});
assert.equal(apiResponse.status, 200);
const apiPayload = await apiResponse.json();
assert.equal(apiPayload.conversation.persistentWrite, false);
assert.equal(apiPayload.conversation.model, AURA_CHAT_MODEL);
assert.equal(apiPayload.conversation.route, "fast");
assert.ok(apiPayload.conversation.context.sourcesUsed > 0);

const quotaApiResponse = await onRequest({
  request: new Request("https://aura.test/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
    body: JSON.stringify({ question: "Quins compromisos tinc pendents?", history: [] }),
  }),
  env: { DB: db, AI: quotaAi },
  params: { path: ["chat"] },
});
assert.equal(quotaApiResponse.status, 200, "Una quota esgotada no ha de convertir la conversa en un error intern");
const quotaApiPayload = await quotaApiResponse.json();
assert.equal(quotaApiPayload.conversation.provider, "aura-grounded-fallback");
assert.equal(quotaApiPayload.conversation.fallbackReason, "provider-quota");

const avatarContractResponse = await onRequest({
  request: new Request("https://aura.test/api/avatar-sergi", {
    headers: { "Cf-Access-Jwt-Assertion": ACCESS_ASSERTION },
  }),
  env: { DB: db },
  params: { path: ["avatar-sergi"] },
});
assert.equal(avatarContractResponse.status, 200);
const avatarContract = await avatarContractResponse.json();
assert.equal(avatarContract.automaticDelegation, false);
assert.equal(avatarContract.automaticIngestion, false);
assert.equal(avatarContract.persistentWriteInAura, false);

const [wrangler, core, html] = await Promise.all([
  readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  readFile(new URL("../aura_core.js", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
]);
assert.match(wrangler, /"ai"\s*:\s*\{\s*"binding"\s*:\s*"AI"/s);
assert.match(wrangler, /"AURA_PREMIUM_AI_ENABLED"\s*:\s*"true"/);
assert.match(wrangler, /"AURA_AI_GATEWAY_ID"\s*:\s*"default"/);
assert.match(core, /apiPost\("\/chat"/);
assert.match(core, /continuïtat sense IA generativa/);
assert.match(core, /apiPost\("\/avatar-sergi\/chat"/);
assert.match(html, /data-prompt="Què vaig decidir sobre aquesta web\?"/);
assert.match(html, /data-action="sergi-avatar"/);
assert.match(html, /s'arxiven anònimament/);
assert.match(html, /Llama \+ GPT · només lectura/);

console.log("Aura Phase 5 conversational AI tests: OK");
