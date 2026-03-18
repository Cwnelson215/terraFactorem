export default function Header() {
  return (
    <header
      style={{
        height: 48,
        background: "#16162a",
        borderBottom: "1px solid #2a2a3e",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        flexShrink: 0,
      }}
    >
      <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
        Terrafactorem
      </h1>
      <span style={{ fontSize: 12, opacity: 0.5 }}>Generative Map Maker</span>
    </header>
  );
}
