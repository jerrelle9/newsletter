/**
 * Orchestrates land-dot generation via Web Worker + IndexedDB cache.
 * First call hits the cache; on miss it spins up the worker off-main-thread.
 * Result is cached in IndexedDB so subsequent page loads are instant.
 */

type Dot = { lat: number; lng: number; size: number };

const DB_NAME = "globe-dots-cache";
const STORE = "dots";
const CACHE_KEY = "land-dots-v1";

/* ─── IndexedDB helpers ──────────────────────────────────────────── */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getFromCache(): Promise<Dot[] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(CACHE_KEY);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function saveToCache(dots: Dot[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(dots, CACHE_KEY);
  } catch {
    // Caching is best-effort
  }
}

/* ─── Main entry point ───────────────────────────────────────────── */
let _promise: Promise<Dot[]> | null = null;

export function getLandDots(): Promise<Dot[]> {
  if (_promise) return _promise;

  _promise = (async () => {
    // 1. Try IndexedDB cache first (instant on reload)
    const cached = await getFromCache();

    if (cached && cached.length > 0) {
      return cached;
    }

    // 2. Cache miss — compute in Web Worker (off main thread)

    const dots = await new Promise<Dot[]>((resolve, reject) => {
      const worker = new Worker(
        new URL("./land-dots.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (e) => {
        reject(e);
        worker.terminate();
      };
      worker.postMessage("go");
    });

    // 3. Persist to IndexedDB for next reload
    saveToCache(dots);

    return dots;
  })();

  return _promise;
}
