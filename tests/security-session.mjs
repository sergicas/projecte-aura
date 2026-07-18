import assert from "node:assert/strict";

import { onRequest } from "../functions/api/[[path]].js";

const TEST_KEY = "aura-security-test-key";
const BASE_URL = "https://aura.test/api";
const env = { AURA_WRITE_KEY: TEST_KEY };

function context(path, init = {}) {
  return {
    request: new Request(`${BASE_URL}/${path}`, init),
    env,
    params: { path: path.split("/") },
  };
}

const anonymousMemory = await onRequest(context("memory"));
assert.equal(anonymousMemory.status, 401, "La memòria ha de rebutjar accessos anònims");
assert.equal(
  anonymousMemory.headers.get("Access-Control-Allow-Origin"),
  null,
  "L'API no ha d'exposar CORS wildcard",
);

const anonymousBackup = await onRequest(context("backup"));
assert.equal(anonymousBackup.status, 401, "L'exportació de backup ha de rebutjar accessos anònims");

const invalidLogin = await onRequest(
  context("session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "incorrecta" }),
  }),
);
assert.equal(invalidLogin.status, 401, "Una clau incorrecta no ha de crear sessió");
assert.equal(invalidLogin.headers.get("Set-Cookie"), null, "Una clau incorrecta no ha de fixar cap cookie");

const validLogin = await onRequest(
  context("session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: TEST_KEY }),
  }),
);
assert.equal(validLogin.status, 201, "Una clau correcta ha de crear sessió");

const setCookie = validLogin.headers.get("Set-Cookie");
assert.ok(setCookie, "La sessió ha d'incloure una cookie");
assert.match(setCookie, /^__Host-aura_session=/u);
assert.match(setCookie, /HttpOnly/iu);
assert.match(setCookie, /Secure/iu);
assert.match(setCookie, /SameSite=Strict/iu);
assert.match(setCookie, /Path=\//iu);

const sessionCookie = setCookie.split(";", 1)[0];
const validSession = await onRequest(
  context("session", {
    headers: { Cookie: sessionCookie },
  }),
);
assert.equal(validSession.status, 200, "La cookie signada ha de validar la sessió");

const tamperedSession = await onRequest(
  context("session", {
    headers: { Cookie: `${sessionCookie}x` },
  }),
);
assert.equal(tamperedSession.status, 401, "Una cookie manipulada s'ha de rebutjar");

const foreignHostSession = await onRequest({
  request: new Request("https://altre-host.test/api/session", {
    headers: { Cookie: sessionCookie },
  }),
  env,
  params: { path: ["session"] },
});
assert.equal(foreignHostSession.status, 401, "La sessió ha d'estar vinculada al host que l'ha emès");

const bearerSession = await onRequest(
  context("session", {
    headers: { Authorization: `Bearer ${TEST_KEY}` },
  }),
);
assert.equal(bearerSession.status, 200, "La compatibilitat Bearer s'ha de conservar");

const logout = await onRequest(context("session/logout", { method: "POST" }));
assert.equal(logout.status, 200);
assert.match(logout.headers.get("Set-Cookie") || "", /Max-Age=0/iu, "Sortir ha d'eliminar la cookie");

console.log("Aura security session tests: OK");
