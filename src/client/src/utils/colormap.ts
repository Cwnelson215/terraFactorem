import type { BiomeType } from "../engine/types";

const BIOME_COLORS: Record<BiomeType, [number, number, number]> = {
  deep_water: [30, 60, 130],
  shallow_water: [50, 100, 180],
  beach: [210, 200, 160],
  grassland: [100, 170, 60],
  forest: [40, 120, 40],
  dark_forest: [20, 80, 25],
  desert: [210, 190, 120],
  savanna: [180, 170, 80],
  tundra: [160, 170, 180],
  snow: [220, 225, 230],
  mountain: [130, 120, 110],
  snow_peak: [245, 248, 252],
};

export function biomeToColor(biome: BiomeType): [number, number, number] {
  return BIOME_COLORS[biome];
}
