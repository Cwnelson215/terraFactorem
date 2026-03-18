import http from "http";

const port = parseInt(process.env.PORT || "3000");

const server = http.createServer((req, res) => {
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from terrafactorem!");
});

server.listen(port, () => {
  console.log(`terrafactorem listening on port ${port}`);
});
