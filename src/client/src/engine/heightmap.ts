import alea from "../../alea";
import { createSeededNoise, fbm } from "./noise";
import type { GenerationParams } from "./types";

/**
 * Compute a circular island mask gradient — 1.0 at center, 0.0 at edges.
 */
function islandMask(x: number, y: number, w: number, h: number): number {
  const nx = (2 * x) / w - 1;
  const ny = (2 * y) / h - 1;
  const d = Math.sqrt(nx * nx + ny * ny);
  // Smooth falloff: 1 at center, 0 at distance ~1
  return Math.max(0, 1 - d * d);
}

/**
 * Multi-center mask for archipelago: max of several offset island masks.
 */
function archipelagoMask(
  x: number,
  y: number,
  w: number,
  h: number,
  centers: { cx: number; cy: number; r: number }[]
): number {
  let best = 0;
  for (const { cx, cy, r } of centers) {
    const nx = (x - cx) / (w * r);
    const ny = (y - cy) / (h * r);
    const d = Math.sqrt(nx * nx + ny * ny);
    best = Math.max(best, Math.max(0, 1 - d * d));
  }
  return best;
}

/**
 * Wide gentle falloff for pangaea: mostly land with soft edges.
 */
function pangaeaMask(x: number, y: number, w: number, h: number): number {
  const nx = (2 * x) / w - 1;
  const ny = (2 * y) / h - 1;
  const d = Math.sqrt(nx * nx + ny * ny);
  // Very gentle falloff — only fades near the very edge
  return Math.max(0, 1 - d * d * d * d);
}

/**
 * Generate a heightmap as a Float32Array with values in [0, 1].
 */
export function generateHeightmap(params: GenerationParams): Float32Array {
  const { width, height, seed, scale, octaves, persistence, lacunarity, mapType } =
    params;
  const noise2D = createSeededNoise(seed);
  const data = new Float32Array(width * height);

  // Pre-compute archipelago island centers from the seed
  let archCenters: { cx: number; cy: number; r: number }[] = [];
  if (mapType === "archipelago") {
    const rng = alea(seed + 777);
    const count = 4 + Math.floor(rng() * 3); // 4-6 islands
    for (let i = 0; i < count; i++) {
      archCenters.push({
        cx: width * (0.15 + rng() * 0.7),
        cy: height * (0.15 + rng() * 0.7),
        r: 0.15 + rng() * 0.1,
      });
    }
  }

  const effectiveScale = mapType === "archipelago" ? scale * 0.7 : scale;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // FBM noise in [-1, 1], normalize to [0, 1]
      let h = fbm(noise2D, x, y, octaves, persistence, lacunarity, effectiveScale);
      h = (h + 1) / 2;

      if (params.islandMask) {
        switch (mapType) {
          case "archipelago":
            h *= archipelagoMask(x, y, width, height, archCenters);
            break;
          case "pangaea":
            // Boost height and use gentle falloff for large landmass
            h = h * 0.6 + 0.4;
            h *= pangaeaMask(x, y, width, height);
            break;
          case "continent":
          default:
            h *= islandMask(x, y, width, height);
            break;
        }
      }

      data[y * width + x] = Math.max(0, Math.min(1, h));
    }
  }

  return data;
}

/**
 * Generate a moisture map (separate noise seed offset).
 */
export function generateMoisture(params: GenerationParams): Float32Array {
  const { width, height, seed, scale, octaves, persistence, lacunarity } =
    params;
  const noise2D = createSeededNoise(seed + 31337);
  const data = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let m = fbm(
        noise2D,
        x,
        y,
        octaves,
        persistence,
        lacunarity,
        scale * 1.5
      );
      m = (m + 1) / 2;
      data[y * width + x] = Math.max(0, Math.min(1, m));
    }
  }

  return data;
}
