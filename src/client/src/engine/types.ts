export type BiomeType =
  | "deep_water"
  | "shallow_water"
  | "beach"
  | "grassland"
  | "forest"
  | "dark_forest"
  | "desert"
  | "savanna"
  | "tundra"
  | "snow"
  | "mountain"
  | "snow_peak";

export interface GenerationParams {
  seed: number;
  width: number;
  height: number;
  scale: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  islandMask: boolean;
  mapType: "continent" | "archipelago" | "pangaea";
}

export interface MapData {
  width: number;
  height: number;
  heightmap: Float32Array;
  moisture: Float32Array;
  biomes: BiomeType[];
}

export const DEFAULT_PARAMS: GenerationParams = {
  seed: 42,
  width: 512,
  height: 512,
  scale: 200,
  octaves: 6,
  persistence: 0.5,
  lacunarity: 2.0,
  islandMask: true,
  mapType: "continent",
};
