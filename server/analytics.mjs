import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "analytics-data");
const LOG_FILE = join(DATA_DIR, "page-views.json");

/** @type {{ views: Array<{ path: string; ip: string; ua: string; ts: string }> }} */
let store = { views: [] };

// Flush interval (write to disk every 30 s to reduce I/O)
let dirty = false;

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function load() {
  await ensureDir();
  try {
    const raw = await readFile(LOG_FILE, "utf-8");
    store = JSON.parse(raw);
  } catch {
    store = { views: [] };
  }
}

async function flush() {
  if (!dirty) return;
  await ensureDir();
  await writeFile(LOG_FILE, JSON.stringify(store, null, 2));
  dirty = false;
}

// Periodic flush
setInterval(flush, 30_000);

// Flush on exit
process.on("SIGINT", async () => { await flush(); process.exit(0); });
process.on("SIGTERM", async () => { await flush(); process.exit(0); });

/**
 * Record a page view.
 * @param {{ path: string; ip: string; ua: string }} entry
 */
export function recordView(entry) {
  store.views.push({
    path: entry.path,
    ip: entry.ip,
    ua: entry.ua,
    ts: new Date().toISOString(),
  });
  dirty = true;
}

/**
 * Return summary stats.
 */
export function getStats() {
  const total = store.views.length;
  const uniqueIps = new Set(store.views.map((v) => v.ip)).size;

  // Views per day (last 30 days)
  const now = Date.now();
  const dailyCounts = {};
  for (const v of store.views) {
    const day = v.ts.slice(0, 10);
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  }

  // Top pages
  const pageCounts = {};
  for (const v of store.views) {
    pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return { total, uniqueIps, dailyCounts, topPages };
}

export async function init() {
  await load();
}
