import { VercelRequest, VercelResponse } from "@vercel/node";
import * as fs from "fs";
import * as path from "path";

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  try {
    // Handle static asset requests
    if (
      req.url?.startsWith("/assets/") ||
      req.url?.includes(".js") ||
      req.url?.includes(".css") ||
      req.url?.includes(".json")
    ) {
      const filePath = req.url.startsWith("/") ? req.url.slice(1) : req.url;
      const fullPath = path.join(process.cwd(), "public", filePath);

      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath);

        // Set appropriate content type
        if (filePath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (filePath.endsWith(".json")) {
          res.setHeader("Content-Type", "application/json");
        }

        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.status(200).send(content);
        return;
      } 
        console.warn("Static file not found:", fullPath);
        res.status(404).json({ error: "File not found", path: filePath });
        return;
      
    }
    // Read the webpack assets to get the correct hashed filenames
    let mainCss = "/assets/main.css";
    let mainJs = "/assets/main.js";
    let vendorsJs = "/assets/vendors.js";

    try {
      const assetsPath = path.join(
        process.cwd(),
        "public",
        "webpack-assets.json"
      );
      if (fs.existsSync(assetsPath)) {
        const assets = JSON.parse(fs.readFileSync(assetsPath, "utf-8"));
        mainCss = assets["main.css"] || mainCss;
        mainJs = assets["main.js"] || mainJs;
        vendorsJs = assets["vendors.js"] || vendorsJs;
        console.log("Loaded assets:", { mainCss, mainJs, vendorsJs });
      } else {
        console.warn("webpack-assets.json not found at:", assetsPath);
        // Fallback: try to find files in the assets directory
        try {
          const assetsDir = path.join(process.cwd(), "public", "assets");
          if (fs.existsSync(assetsDir)) {
            const files = fs.readdirSync(assetsDir);
            const mainCssFile = files.find(
              (f) => f.startsWith("main.") && f.endsWith(".css")
            );
            const mainJsFile = files.find(
              (f) => f.startsWith("main.") && f.endsWith(".js")
            );
            const vendorsJsFile = files.find(
              (f) => f.startsWith("vendors.") && f.endsWith(".js")
            );

            if (mainCssFile) mainCss = `/assets/${mainCssFile}`;
            if (mainJsFile) mainJs = `/assets/${mainJsFile}`;
            if (vendorsJsFile) vendorsJs = `/assets/${vendorsJsFile}`;

            console.log("Using fallback assets:", {
              mainCss,
              mainJs,
              vendorsJs,
            });
          }
        } catch (fallbackError) {
          console.warn("Fallback asset detection failed:", fallbackError);
        }
      }
    } catch (assetsError) {
      console.warn("Could not read webpack-assets.json:", assetsError);
    }

    // Serve the main React application HTML
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000" />
          <title>Healura - Patient Session Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          
          <!-- Load bundled CSS -->
          <link rel="stylesheet" href="${mainCss}" />
        </head>
        <body>
          <div id="react-view">
            <div style="
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background-color: #f9fafb;
            ">
              <div style="text-align: center;">
                <div style="
                  width: 40px; 
                  height: 40px; 
                  border: 4px solid #e5e7eb; 
                  border-top: 4px solid #3b82f6; 
                  border-radius: 50%; 
                  animation: spin 1s linear infinite; 
                  margin: 0 auto 16px;
                "></div>
                <h1 style="color: #1f2937; margin: 0 0 8px;">Healura</h1>
                <p style="color: #6b7280; margin: 0;">Loading your dashboard...</p>
              </div>
            </div>
          </div>
          
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
          
          <!-- Load bundled JavaScript -->
          <script>
            window.__INITIAL_STATE__ = {};
            console.log("Loading assets:", {
              css: "${mainCss}",
              vendors: "${vendorsJs}",
              main: "${mainJs}"
            });
          </script>
          <script src="${vendorsJs}" onerror="console.error('Failed to load vendors.js')"></script>
          <script src="${mainJs}" onerror="console.error('Failed to load main.js')"></script>
        </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).send(html);
  } catch (error) {
    console.error("Serverless function error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
};
