import { VercelRequest, VercelResponse } from "@vercel/node";
import * as fs from "fs";
import * as path from "path";

export default async (
  _req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  try {
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
          </script>
          <script src="${vendorsJs}"></script>
          <script src="${mainJs}"></script>
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
