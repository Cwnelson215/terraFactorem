import { useMapStore } from "../../hooks/useMapStore";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 12, display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span style={{ opacity: 0.7 }}>{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />
    </label>
  );
}

export default function GenerationPanel() {
  const params = useMapStore((s) => s.params);
  const setParams = useMapStore((s) => s.setParams);
  const randomizeSeed = useMapStore((s) => s.randomizeSeed);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3 style={{ margin: 0, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
        Generation
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <label style={{ fontSize: 12 }}>Seed</label>
          <input
            type="number"
            value={params.seed}
            onChange={(e) => setParams({ seed: parseInt(e.target.value) || 0 })}
            style={{
              flex: 1,
              background: "#2a2a3e",
              border: "1px solid #444",
              color: "#e0e0e0",
              borderRadius: 4,
              padding: "4px 8px",
              fontSize: 13,
            }}
          />
        </div>
        <button
          onClick={randomizeSeed}
          style={{
            background: "#3a3a5e",
            border: "1px solid #555",
            color: "#e0e0e0",
            borderRadius: 4,
            padding: "4px 10px",
            cursor: "pointer",
            fontSize: 13,
            width: "100%",
          }}
        >
          Random
        </button>
      </div>

      <Slider
        label="Scale"
        value={params.scale}
        min={20}
        max={500}
        step={10}
        onChange={(v) => setParams({ scale: v })}
      />
      <Slider
        label="Octaves"
        value={params.octaves}
        min={1}
        max={10}
        step={1}
        onChange={(v) => setParams({ octaves: v })}
      />
      <Slider
        label="Persistence"
        value={params.persistence}
        min={0.1}
        max={0.9}
        step={0.05}
        onChange={(v) => setParams({ persistence: v })}
      />
      <Slider
        label="Lacunarity"
        value={params.lacunarity}
        min={1}
        max={4}
        step={0.1}
        onChange={(v) => setParams({ lacunarity: v })}
      />

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
        <input
          type="checkbox"
          checked={params.islandMask}
          onChange={(e) => setParams({ islandMask: e.target.checked })}
        />
        Island mask
      </label>
    </div>
  );
}
