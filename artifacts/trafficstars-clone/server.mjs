import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import { readFileSync, statSync, existsSync } from "fs";
import routeSeo from "./route-seo.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4173;

const META_TAGS = routeSeo;

const MIME_TYPES = {
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

function injectMetaTags(html, route) {
  const meta = META_TAGS[route] || META_TAGS["/"];
  
  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /name="description" content="[^"]*"/,
      `name="description" content="${meta.description}"`
    )
    .replace(
      /property="og:title" content="[^"]*"/g,
      `property="og:title" content="${meta.title}"`
    )
    .replace(
      /property="og:description" content="[^"]*"/g,
      `property="og:description" content="${meta.description}"`
    )
    .replace(
      /name="twitter:title" content="[^"]*"/g,
      `name="twitter:title" content="${meta.title}"`
    )
    .replace(
      /name="twitter:description" content="[^"]*"/g,
      `name="twitter:description" content="${meta.description}"`
    );
}

const server = createServer((req, res) => {
  try {
    const url = req.url || "/";
    const pathname = url.split("?")[0];

    const publicDir = join(__dirname, "dist", "public");
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const prerenderedRoutePath = normalizedPath === "/"
      ? join(publicDir, "index.html")
      : join(publicDir, normalizedPath.slice(1), "index.html");
    
    // Check if it's a static file request
    if (pathname.includes(".") && !pathname.includes("/index")) {
      const filesToCheck = [
        join(publicDir, pathname),
        join(__dirname, pathname),
      ];

      for (const filePath of filesToCheck) {
        if (existsSync(filePath)) {
          try {
            const stat = statSync(filePath);
            if (stat.isFile()) {
              const content = readFileSync(filePath);
              res.writeHead(200, { "Content-Type": getMimeType(filePath) });
              res.end(content);
              return;
            }
          } catch (e) {
            // Continue to next check
          }
        }
      }
    }

    if (existsSync(prerenderedRoutePath)) {
      const html = readFileSync(prerenderedRoutePath, "utf8");
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      });
      res.end(html);
      return;
    }

    // Serve fallback index.html with injected meta tags for SPA routes
    const indexPaths = [
      join(publicDir, "index.html"),
      join(__dirname, "index.html"),
    ];

    let html = null;
    for (const indexPath of indexPaths) {
      if (existsSync(indexPath)) {
        html = readFileSync(indexPath, "utf8");
        break;
      }
    }

    if (!html) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Not Found");
      return;
    }

    // Extract route for meta tags
    const route = pathname === "/" ? "/" : pathname.split("?")[0];
    html = injectMetaTags(html, route);

    res.writeHead(200, { 
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    });
    res.end(html);
  } catch (error) {
    console.error("Error serving request:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
