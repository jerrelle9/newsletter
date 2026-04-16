/**
 * Web Worker — generates landmass dot grid off the main thread.
 * Posts back an array of { lat, lng, size } objects.
 */

import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

/* ─── Point-in-polygon (ray-casting) ─────────────────────────────── */
function pointInPoly(lng: number, lat: number, ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointOnLand(lng: number, lat: number, polygons: number[][][][]) {
  for (const poly of polygons) {
    if (pointInPoly(lng, lat, poly[0])) {
      let inHole = false;
      for (let h = 1; h < poly.length; h++) {
        if (pointInPoly(lng, lat, poly[h])) { inHole = true; break; }
      }
      if (!inHole) return true;
    }
  }
  return false;
}

/* ─── Seeded PRNG (mulberry32) for deterministic jitter ──────────── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function generateDots() {
  const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json");
  const topo = (await res.json()) as Topology<{ land: GeometryCollection }>;

  const landGeo = feature(topo, topo.objects.land) as any;

  const allPolys: number[][][][] = [];
  const geoms = landGeo.type === "FeatureCollection"
    ? landGeo.features.map((f: any) => f.geometry)
    : [landGeo.geometry ?? landGeo];

  for (const g of geoms) {
    if (g.type === "MultiPolygon") {
      for (const p of g.coordinates) allPolys.push(p as number[][][]);
    } else if (g.type === "Polygon") {
      allPolys.push(g.coordinates as number[][][]);
    }
  }

  const rng = mulberry32(42); // deterministic so cache is stable
  const dots: { lat: number; lng: number; size: number }[] = [];
  const STEP = 1.8;

  for (let lat = -60; lat <= 75; lat += STEP) {
    const phi = (90 - lat) * (Math.PI / 180);
    const lngStep = STEP / Math.max(Math.sin(phi), 0.3);
    for (let lng = -180; lng < 180; lng += lngStep) {
      if (pointOnLand(lng, lat, allPolys)) {
        const jLat = lat + (rng() - 0.5) * 0.3;
        const jLng = lng + (rng() - 0.5) * 0.3;
        dots.push({ lat: jLat, lng: jLng, size: 0.14 + rng() * 0.04 });
      }
    }
  }

  return dots;
}

self.onmessage = async () => {
  const dots = await generateDots();
  self.postMessage(dots);
};
