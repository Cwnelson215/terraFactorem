import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ViewToggle from "./components/layout/ViewToggle";
import Canvas2DView from "./components/map2d/Canvas2DView";
import { useMapGeneration } from "./hooks/useMapGeneration";
import { useMapStore } from "./hooks/useMapStore";

export default function App() {
  useMapGeneration();
  const viewMode = useMapStore((s) => s.viewMode);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ViewToggle />
          <div style={{ flex: 1, position: "relative" }}>
            {viewMode === "2d" && <Canvas2DView />}
            {viewMode === "3d" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  opacity: 0.5,
                }}
              >
                3D view coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
