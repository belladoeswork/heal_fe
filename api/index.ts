import { VercelRequest, VercelResponse } from "@vercel/node";
import ssr from "../src/server/ssr";

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => ssr(req as any, res as any, () => {
    // No-op callback for SSR middleware
  });
