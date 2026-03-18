import GenerationPanel from "../controls/GenerationPanel";
import MapTypeSelector from "../controls/MapTypeSelector";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        background: "#1e1e34",
        borderRight: "1px solid #2a2a3e",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
      <MapTypeSelector />
      <GenerationPanel />
    </aside>
  );
}
