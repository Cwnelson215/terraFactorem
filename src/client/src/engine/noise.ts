import { createNoise2D } from "simplex-noise";
import alea from "../../alea";

/**
 * Create a seeded 2D noise function.
 */
export function createSeededNoise(seed: number) {
  const prng = alea(seed);
  return createNoise2D(prng);
}

/**
 * Fractal Brownian Motion — layer multiple octaves of noise.
 * Returns a value roughly in [-1, 1].
 */
export function fbm(
  noise2D: ReturnType<typeof createNoise2D>,
  x: number,
  y: number,
  octaves: number,
  persistence: number,
  lacunarity: number,
  scale: number
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1 / scale;
  let maxAmplitude = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    maxAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return value / maxAmplitude;
}
