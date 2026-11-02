// GET  /api/data  — catalogue and saved SKUs, shared by every device
// POST /api/data  — { action: "saveCatalog", rows, fileName }
//                   { action: "remember", key, entry }
//                   { action: "forget", key }
import { json, checkAuth, store } from "../lib/shared.mjs";
import { SEED_KNOWN as seed } from "../lib/seed-known.mjs";

export default async (req) => {
  const denied = checkAuth(req); if (denied) return denied;
  const s = store();

  if (req.method === "GET") {
    let known = await s.get("known", { type: "json" });
    if (!known) { known = seed; await s.setJSON("known", known); }
    const catalog = (await s.get("catalog", { type: "json" })) || { rows: [], fileName: "", updatedAt: "" };
    return json({ catalog, known });
  }

  if (req.method !== "POST") return json({ error: "Use GET or POST." }, 405);
  let b;
  try { b = await req.json(); } catch { return json({ error: "Bad request." }, 400); }

  if (b.action === "saveCatalog") {
    if (!Array.isArray(b.rows)) return json({ error: "No rows." }, 400);
    const rows = b.rows
      .filter((r) => Array.isArray(r) && r[0] && r[1])
      .map((r) => [String(r[0]).slice(0, 40), String(r[1]).slice(0, 300), String(r[2] || "").slice(0, 80)]);
    const cat = { rows, fileName: String(b.fileName || ""), updatedAt: new Date().toISOString() };
    await s.setJSON("catalog", cat);
    return json({ ok: true, count: rows.length, updatedAt: cat.updatedAt });
  }

  if (b.action === "remember" || b.action === "forget") {
    if (!b.key) return json({ error: "Missing key." }, 400);
    const known = (await s.get("known", { type: "json" })) || seed;
    if (b.action === "remember") {
      const e = b.entry || {};
      if (!e.sku) return json({ error: "Missing SKU." }, 400);
      known[b.key] = { title: String(e.title || ""), sku: String(e.sku), publisher: String(e.publisher || ""),
        matched: String(e.matched || ""), source: String(e.source || "manual"), updatedAt: new Date().toISOString() };
    } else delete known[b.key];
    await s.setJSON("known", known);
    return json({ ok: true });
  }

  return json({ error: "Unknown action." }, 400);
};

export const config = { path: "/api/data" };
