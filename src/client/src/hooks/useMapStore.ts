import { create } from "zustand";
import type { GenerationParams, MapData } from "../engine/types";
import { DEFAULT_PARAMS } from "../engine/types";
import { generateMap } from "../engine/biomes";

type ViewMode = "2d" | "3d";

interface MapStore {
  params: GenerationParams;
  mapData: MapData | null;
  viewMode: ViewMode;
  setParams: (update: Partial<GenerationParams>) => void;
  setViewMode: (mode: ViewMode) => void;
  generate: () => void;
  randomizeSeed: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  params: DEFAULT_PARAMS,
  mapData: null,
  viewMode: "2d",

  setParams: (update) => {
    set((state) => ({ params: { ...state.params, ...update } }));
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  generate: () => {
    const { params } = get();
    const mapData = generateMap(params);
    set({ mapData });
  },

  randomizeSeed: () => {
    const seed = Math.floor(Math.random() * 999999);
    set((state) => ({ params: { ...state.params, seed } }));
  },
}));
