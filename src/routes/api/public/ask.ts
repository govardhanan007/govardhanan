import { createFileRoute } from "@tanstack/react-router";
import { handlePortfolioAsk } from "@/lib/ai/portfolio-ask.server";

const ALLOWED = new Set([
  "https://www.govardhanan.com",
  "https://govardhanan.com",
  "https://govardhanan.lovable.app",
]);

function cors(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  if (!ALLOWED.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export const Route = createFileRoute("/api/public/ask")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => new Response(null, { status: 204, headers: cors(request) }),
      POST: async ({ request }) => {
        const res = await handlePortfolioAsk(request);
        const headers = new Headers(res.headers);
        for (const [k, v] of Object.entries(cors(request))) headers.set(k, v);
        return new Response(res.body, { status: res.status, headers });
      },
    },
  },
});
