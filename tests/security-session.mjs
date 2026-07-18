import assert from "node:assert/strict";

import { onRequest } from "../functions/api/[[path]].js";

const TEST_KEY = "aura-security-test-key";
const ACCESS_ASSERTION = "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InNlcmdpQGV4YW1wbGUuY29tIn0.signature1234";
const BASE_URL = "https://aura.test/api";
const env = { AURA_WRITE_KEY: TEST_KEY };

function context(path, init = {}, accessAssertion = "") {
  const headers = new Headers(init.headers);
  if (accessAssertion) headers.set("Cf-Access-Jwt-Assertion", accessAssertion);
  return {
    request: new Request(`${BASE_URL}/${path}`, { ...init, headers }),
    env,
    params: { path: path.split("/") },
  };
}

const anonymousMemory = await onRequest(context("memory"));
assert.equal(anonymousMemory.status, 401, "La memòria ha de rebutjar accessos que no hagin passat per Access");
assert.equal(
  anonymousMemory.headers.get("Access-Control-Allow-Origin"),
  null,
  "L'API no ha d'exposar CORS wildcard",
);

const malformedAccess = await onRequest(context("session", {}, "not-a-jwt"));
assert.equal(malformedAccess.status, 401, "Una assertion malformada no s'ha d'acceptar");

const legacyCookieOnly = await onRequest(
  context("session", { headers: { Cookie: "__Host-aura_session=legacy.fake" } }),
);
assert.equal(legacyCookieOnly.status, 401, "La cookie interna antiga no ha de substituir Cloudflare Access");

const keyOnlyLogin = await onRequest(
  context("session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: TEST_KEY }),
  }),
);
assert.equal(keyOnlyLogin.status, 401, "El navegador no ha de poder crear una sessió amb una clau interna");

const accessSession = await onRequest(context("session", {}, ACCESS_ASSERTION));
assert.equal(accessSession.status, 200, "Cloudflare Access ha d'autoritzar la sessió web");
const accessPayload = await accessSession.json();
assert.equal(accessPayload.method, "cloudflare-access");
assert.match(
  accessSession.headers.get("Set-Cookie") || "",
  /__Host-aura_session=;.*Max-Age=0/iu,
  "La migració ha d'eliminar la cookie interna antiga",
);

const accessPostSession = await onRequest(
  context("session", { method: "POST" }, ACCESS_ASSERTION),
);
assert.equal(accessPostSession.status, 200, "POST /session no ha de demanar cap codi intern després d'Access");

const bearerSession = await onRequest(
  context("session", {
    headers: { Authorization: `Bearer ${TEST_KEY}` },
  }),
);
assert.equal(bearerSession.status, 200, "La compatibilitat Bearer s'ha de conservar per a l'automatització");

const logout = await onRequest(context("session/logout", { method: "POST" }));
assert.equal(logout.status, 200);
assert.match(logout.headers.get("Set-Cookie") || "", /Max-Age=0/iu, "La ruta antiga ha de netejar la cookie");

console.log("Aura Cloudflare Access security tests: OK");
