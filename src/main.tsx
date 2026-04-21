import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "../app/globals.css";
import "../app/page.module.css";
import "./gsap-init";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ── Lightweight page-view beacon ────────────────────────────────────────────
try {
  navigator.sendBeacon("/api/track", JSON.stringify({ path: location.pathname }));
} catch { /* silent */ }
