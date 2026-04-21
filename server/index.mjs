import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { init, recordView, getStats } from "./analytics.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = parseInt(process.env.PORT || "3000", 10);

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".mp4":  "video/mp4",
  ".gif":  "image/gif",
};

await init();

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // ── Track endpoint ──────────────────────────────────────────────────────
  if (url.pathname === "/api/track" && req.method === "POST") {
    let body = "";
    req.on("data", (c) => { body += c; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0] ?? req.socket.remoteAddress) || "unknown";
        recordView({
          path: typeof data.path === "string" ? data.path.slice(0, 200) : "/",
          ip,
          ua: (req.headers["user-agent"] || "").slice(0, 300),
        });
      } catch { /* ignore malformed */ }
      res.writeHead(204);
      res.end();
    });
    return;
  }

  // ── Stats endpoint (optional, for quick checks) ─────────────────────────
  if (url.pathname === "/api/stats") {
    const stats = getStats();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(stats, null, 2));
    return;
  }

  // ── Static file serving ─────────────────────────────────────────────────
  let filePath = join(DIST, url.pathname === "/" ? "index.html" : url.pathname);
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, "index.html");
    const data = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    // SPA fallback — serve index.html for client-side routing
    try {
      const html = await readFile(join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
