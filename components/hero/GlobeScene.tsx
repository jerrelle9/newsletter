import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { getLandDots } from "./land-dots-loader";

/* ─── Cloud content for hover cards ──────────────────────────────── */
const CLOUD_CARDS = [
  { title: "Azure", subtitle: "Cloud Platform", color: "#00b4d8", fact: "Enterprise-grade hybrid cloud" },
  { title: "AWS", subtitle: "Cloud Services", color: "#00b4d8", fact: "200+ fully featured services" },
  { title: "Kubernetes", subtitle: "Orchestration", color: "#06d6a0", fact: "Container deployment at scale" },
  { title: "Docker", subtitle: "Containers", color: "#06d6a0", fact: "Lightweight & portable runtime" },
  { title: "Terraform", subtitle: "IaC", color: "#a78bfa", fact: "Infrastructure as Code" },
  { title: "CI/CD", subtitle: "Pipelines", color: "#00b4d8", fact: "Automated build & deploy" },
  { title: "Monitoring", subtitle: "Observability", color: "#8b5cf6", fact: "Real-time system insights" },
  { title: "Security", subtitle: "Zero Trust", color: "#06d6a0", fact: "Defence in depth strategy" },
];

/* ─── Hotspot globe positions ────────────────────────────────────── */
const HOTSPOTS = [
  { lat: 33, lng: -80, idx: 0 },
  { lat: 50, lng: 20, idx: 1 },
  { lat: 38, lng: -100, idx: 2 },
  { lat: 45, lng: 70, idx: 3 },
  { lat: 55, lng: -70, idx: 4 },
  { lat: 44, lng: 130, idx: 5 },
  { lat: 40, lng: 60, idx: 6 },
  { lat: 40, lng: 8, idx: 7 },
];

/* ─── Arc connection data ────────────────────────────────────────── */
const ARCS_DATA = [
  { startLat: 30, startLng: -40, endLat: -20, endLng: 80, color: ["rgba(0,180,216,0.6)", "rgba(0,180,216,0.15)"] },
  { startLat: 50, startLng: 10, endLat: -30, endLng: 160, color: ["rgba(192,132,252,0.6)", "rgba(192,132,252,0.15)"] },
  { startLat: 10, startLng: -120, endLat: 40, endLng: 40, color: ["rgba(0,212,255,0.6)", "rgba(0,212,255,0.15)"] },
  { startLat: -15, startLng: 60, endLat: 45, endLng: -70, color: ["rgba(167,139,250,0.6)", "rgba(167,139,250,0.15)"] },
  { startLat: 60, startLng: -80, endLat: -10, endLng: 120, color: ["rgba(6,214,160,0.6)", "rgba(6,214,160,0.15)"] },
  { startLat: 25, startLng: 140, endLat: -35, endLng: -20, color: ["rgba(56,189,248,0.6)", "rgba(56,189,248,0.15)"] },
];

/* ─── Hex → "r,g,b" string ──────────────────────────────────────── */
function hexToRgb(hex: string): string {
  const c = parseInt(hex.replace("#", ""), 16);
  return `${(c >> 16) & 255},${(c >> 8) & 255},${c & 255}`;
}

/* ═══════════════════════════════════════════════════════════════════ */

export function GlobeScene({ className = "" }: { className?: string }) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [landDots, setLandDots] = useState<{ lat: number; lng: number; size: number }[]>([]);

  /* ── Load landmass dots on mount (cached across re-mounts) ──── */
  useEffect(() => {
    getLandDots().then(setLandDots);
  }, []);

  /* ── Memoised datasets ──────────────────────────────────────── */
  const ringsData = useMemo(
    () =>
      HOTSPOTS.map((h) => ({
        lat: h.lat,
        lng: h.lng,
        maxR: 3,
        propagationSpeed: 1.5,
        repeatPeriod: 1400,
        color: CLOUD_CARDS[h.idx].color,
      })),
    [],
  );

  const htmlData = useMemo(
    () =>
      HOTSPOTS.map((h) => ({
        lat: h.lat,
        lng: h.lng,
        card: CLOUD_CARDS[h.idx],
        idx: h.idx,
      })),
    [],
  );

  /* ── Custom globe material (translucent white) ──────────────── */
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xccccdd),
        emissive: new THREE.Color(0x222233),
        shininess: 12,
        transparent: true,
        opacity: 0.18,
      }),
    [],
  );

  /* ── Container size tracking ────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Fixed globe vertical offset ──────────────────────────── */
  // Positive = push globe center downward (increase to show less globe)
  const GLOBE_Y_OFFSET = dims.h * 0.8;

  /* ── Globe ready → camera, controls, lights ─────────────────── */
  const onGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;

    g.pointOfView({ lat: 20, lng: -30, altitude: 0.8 });

    const ctrl = g.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.6;
    ctrl.enableZoom = false;
    ctrl.enablePan = false;
    ctrl.enableRotate = true;

    g.lights([
      new THREE.AmbientLight(0xffffff, Math.PI * 0.7),
      (() => {
        const d = new THREE.DirectionalLight(0x8888cc, Math.PI * 0.15);
        d.position.set(5, 8, 5);
        return d;
      })(),
    ]);
  }, []);

  /* ── HTML element factory for hotspot markers + hover cards ── */
  const createHotspotEl = useCallback((d: any) => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position:relative;cursor:pointer;";

    const dot = document.createElement("div");
    dot.style.cssText = `
      width:8px;height:8px;border-radius:50%;
      background:${d.card.color};
      box-shadow:0 0 6px ${d.card.color}88,0 0 14px ${d.card.color}44;
      transition:transform 0.2s;
    `;
    wrapper.appendChild(dot);

    const card = document.createElement("div");
    const rot = -8 + d.idx * 4;
    card.style.cssText = `
      position:absolute;bottom:calc(100% + 14px);left:50%;
      transform:translateX(-50%) rotate(${rot}deg) scale(1);
      opacity:1;pointer-events:none;z-index:50;white-space:nowrap;
      transition:opacity 0.3s;
    `;
    card.innerHTML = `
      <div style="padding:3px;border-radius:8px;background:linear-gradient(135deg,${d.card.color},${d.card.color}88);box-shadow:0 20px 60px rgba(0,0,0,0.6)">
        <div style="border-radius:6px;background:rgba(8,20,32,0.95);padding:12px 16px;min-width:160px;backdrop-filter:blur(20px)">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <div style="width:32px;height:32px;border-radius:6px;background:${d.card.color};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:white">${d.card.title.charAt(0)}</div>
            <div>
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:white">${d.card.title}</div>
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.16em;color:rgba(255,255,255,0.45)">${d.card.subtitle}</div>
            </div>
          </div>
          <div style="font-size:10px;line-height:1.6;color:rgba(255,255,255,0.7)">${d.card.fact}</div>
        </div>
      </div>
    `;
    wrapper.appendChild(card);

    return wrapper;
  }, []);

  /* ── Visibility modifier — show/hide entire element (dot + card) ─ */
  const htmlVisibility = useCallback((el: HTMLElement, isVisible: boolean) => {
    el.style.opacity = isVisible ? "1" : "0";
    el.style.pointerEvents = isVisible ? "auto" : "none";
    el.style.transition = "opacity 0.4s";
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {dims.w > 0 && (
        <Globe
          ref={globeRef}
          width={dims.w}
          height={dims.h}
          backgroundColor="rgba(0,0,0,0)"
          globeOffset={[0, GLOBE_Y_OFFSET]}
          animateIn={false}
          showGraticules={true}
          globeMaterial={globeMaterial}
          showAtmosphere={true}
          atmosphereColor="#c5b6e4"
          atmosphereAltitude={0.25}
          /* ── Landmass dots (kontenta-style) ──────────────── */
          pointsData={landDots}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "rgb(255, 255, 255)"}
          pointAltitude={0.005}
          pointRadius="size"
          pointResolution={4}
          pointsMerge={true}
          /* ── Animated arcs ────────────────────────────────── */
          arcsData={ARCS_DATA}
          arcColor="color"
          arcStroke={0.4}
          arcDashLength={0.6}
          arcDashGap={0.25}
          arcDashAnimateTime={4000}
          arcAltitudeAutoScale={0.35}
          /* ── Ripple rings at hotspots ─────────────────────── */
          ringsData={ringsData}
          ringColor={(d: any) => (t: number) =>
            `rgba(${hexToRgb(d.color)},${Math.max(0, 1 - t).toFixed(2)})`
          }
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          /* ── Hotspot HTML markers + hover cards ──────────── */
          htmlElementsData={htmlData}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.015}
          htmlElement={createHotspotEl}
          htmlElementVisibilityModifier={htmlVisibility}
          onGlobeReady={onGlobeReady}
        />
      )}
    </div>
  );
}
