import type { BiomeType, MapData, GenerationParams } from "./types";
import { generateHeightmap, generateMoisture } from "./heightmap";

/**
 * Whittaker-style biome assignment from height and moisture.
 */
function assignBiome(height: number, moisture: number): BiomeType {
  // Water
  if (height < 0.25) return "deep_water";
  if (height < 0.35) return "shallow_water";
  if (height < 0.38) return "beach";

  // High elevation
  if (height > 0.85) return "snow_peak";
  if (height > 0.75) return "mountain";
  if (height > 0.65) return moisture > 0.5 ? "tundra" : "snow";

  // Mid elevation — moisture determines biome
  if (moisture < 0.2) return "desert";
  if (moisture < 0.4) return "savanna";
  if (moisture < 0.6) return "grassland";
  if (moisture < 0.8) return "forest";
  return "dark_forest";
}

/**
 * Generate a complete map (heightmap + moisture + biomes).
 */
export function generateMap(params: GenerationParams): MapData {
  const heightmap = generateHeightmap(params);
  const moisture = generateMoisture(params);
  const biomes: BiomeType[] = new Array(params.width * params.height);

  for (let i = 0; i < biomes.length; i++) {
    biomes[i] = assignBiome(heightmap[i], moisture[i]);
  }

  return {
    width: params.width,
    height: params.height,
    heightmap,
    moisture,
    biomes,
  };
}
