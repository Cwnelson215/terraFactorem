import express from "express";
import path from "path";

const port = parseInt(process.env.PORT || "3000");
const app = express();

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

// Serve static files from Vite build output
const clientDist = path.join(__dirname, "public");
app.use(express.static(clientDist));

// SPA fallback — serve index.html for all non-API routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(port, () => {
  console.log(`terrafactorem listening on port ${port}`);
});
