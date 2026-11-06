import { createFileRoute } from "@tanstack/react-router";

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
      OPTIONS: () => new Response(null, { status: 204 }),
      POST: () => Response.json({ error: "The assistant is unavailable." }, { status: 410 }),
    },
  },
});
