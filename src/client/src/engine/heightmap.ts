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
 * Generate a heightmap as a Float32Array with values in [0, 1].
 */
export function generateHeightmap(params: GenerationParams): Float32Array {
  const { width, height, seed, scale, octaves, persistence, lacunarity } =
    params;
  const noise2D = createSeededNoise(seed);
  const data = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // FBM noise in [-1, 1], normalize to [0, 1]
      let h = fbm(noise2D, x, y, octaves, persistence, lacunarity, scale);
      h = (h + 1) / 2;

      if (params.islandMask) {
        h *= islandMask(x, y, width, height);
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
