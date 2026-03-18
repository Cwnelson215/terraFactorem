import { useMapStore } from "../../hooks/useMapStore";
import type { GenerationParams } from "../../engine/types";

const MAP_TYPES: { value: GenerationParams["mapType"]; label: string }[] = [
  { value: "continent", label: "Continent" },
  { value: "archipelago", label: "Archipelago" },
  { value: "pangaea", label: "Pangaea" },
];

export default function MapTypeSelector() {
  const mapType = useMapStore((s) => s.params.mapType);
  const setParams = useMapStore((s) => s.setParams);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <h3 style={{ margin: 0, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
        Map Type
      </h3>
      <div style={{ display: "flex", gap: 4 }}>
        {MAP_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setParams({ mapType: t.value })}
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: 12,
              border: "1px solid",
              borderColor: mapType === t.value ? "#6c8cf5" : "#444",
              background: mapType === t.value ? "#3a4a7e" : "#2a2a3e",
              color: "#e0e0e0",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
