// Shared helpers for the SKU Matcher functions (free version: storage only, no paid APIs).
import { getStore } from "@netlify/blobs";

export function store() {
  return getStore({ name: "sku-matcher", consistency: "strong" });
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

// Checks the shared staff passcode (set APP_PASSCODE in Netlify). If it isn't set, the site is open.
export function checkAuth(req) {
  const need = process.env.APP_PASSCODE;
  if (!need) return null;
  const got = req.headers.get("x-passcode") || "";
  if (got !== need) return json({ error: "Wrong or missing passcode." }, 401);
  return null;
}
