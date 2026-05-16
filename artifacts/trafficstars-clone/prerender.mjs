import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routeSeo from "./route-seo.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_ROUTE = "/";
const ROUTE_SEO = routeSeo;
const CMS_BASE_URL = "https://click.creditsdeal.com";

function injectMetaTags(html, title, description) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /name="description" content="[^"]*"/,
      `name="description" content="${description}"`
    )
    .replace(
      /property="og:title" content="[^"]*"/g,
      `property="og:title" content="${title}"`
    )
    .replace(
      /property="og:description" content="[^"]*"/g,
      `property="og:description" content="${description}"`
    )
    .replace(
      /name="twitter:title" content="[^"]*"/g,
      `name="twitter:title" content="${title}"`
    )
    .replace(
      /name="twitter:description" content="[^"]*"/g,
      `name="twitter:description" content="${description}"`
    );
}

async function fetchBlogs() {
  try {
    const response = await fetch(
      `${CMS_BASE_URL}/admin/listBlogs?page=1&search=&category=&websiteName=adomobi.net&location=`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn("Could not fetch blogs for pre-rendering:", error.message);
    return [];
  }
}

async function generatePrerenderedHTML() {
  try {
    const distPath = join(__dirname, "dist", "public");
    const indexPath = join(distPath, "index.html");
    
    // Read the base index.html
    let baseHTML = readFileSync(indexPath, "utf8");
    
    // Generate HTML for static routes
    for (const route of Object.keys(ROUTE_SEO)) {
      const meta = ROUTE_SEO[route];
      let html = injectMetaTags(baseHTML, meta.title, meta.description);
      
      if (route === "/") {
        writeFileSync(indexPath, html);
      } else {
        const routePath = join(distPath, route);
        mkdirSync(routePath, { recursive: true });
        writeFileSync(join(routePath, "index.html"), html);
      }
      
      console.log(`✓ Generated ${route}`);
    }
    
    // Generate pre-rendered pages for blog posts
    console.log("\nFetching blog posts for pre-rendering...");
    const blogs = await fetchBlogs();
    
    if (blogs.length > 0) {
      for (const blog of blogs) {
        const slug = blog.slug || blog._id;
        const title = blog.seoTitle || blog.title;
        const description = blog.metaDescription || blog.excerpt || "";
        
        let html = injectMetaTags(baseHTML, title, description);
        
        const blogPath = join(distPath, "blog", slug);
        mkdirSync(blogPath, { recursive: true });
        writeFileSync(join(blogPath, "index.html"), html);
        
        console.log(`✓ Generated /blog/${slug}`);
      }
    }
    
    console.log("\n✓ Pre-rendering complete!");
  } catch (error) {
    console.error("Error during pre-rendering:", error);
    process.exit(1);
  }
}

generatePrerenderedHTML();
