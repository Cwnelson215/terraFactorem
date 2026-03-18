import { useMapStore } from "../../hooks/useMapStore";

export default function ViewToggle() {
  const viewMode = useMapStore((s) => s.viewMode);
  const setViewMode = useMapStore((s) => s.setViewMode);

  return (
    <div style={{ display: "flex", gap: 4, padding: "8px 16px" }}>
      {(["2d", "3d"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          style={{
            padding: "4px 14px",
            fontSize: 13,
            border: "1px solid",
            borderColor: viewMode === mode ? "#6c8cf5" : "#444",
            background: viewMode === mode ? "#3a4a7e" : "#2a2a3e",
            color: "#e0e0e0",
            borderRadius: 4,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
