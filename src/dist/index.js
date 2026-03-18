"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const port = parseInt(process.env.PORT || "3000");
const app = (0, express_1.default)();
app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});
// Serve static files from Vite build output
const clientDist = path_1.default.join(__dirname, "public");
app.use(express_1.default.static(clientDist));
// SPA fallback — serve index.html for all non-API routes
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(clientDist, "index.html"));
});
app.listen(port, () => {
    console.log(`terrafactorem listening on port ${port}`);
});
