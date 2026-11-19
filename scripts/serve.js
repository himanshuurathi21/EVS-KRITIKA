const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT) || 4173;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const requestedPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.resolve(root, "." + requestedPath);
  const insideRoot = filePath === root || filePath.startsWith(root + path.sep);

  let file = insideRoot ? filePath : root;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    // Single-page app fallback for client-side routes.
    file = path.join(root, "index.html");
  }

  res.writeHead(200, {
    "Content-Type": mimeTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`Pollution Hotspot Mapping System running at http://localhost:${port}`);
});
