import { createFileRoute } from "@tanstack/react-router";
import { handlePortfolioAsk } from "@/lib/ai/portfolio-ask.server";

export const Route = createFileRoute("/api/public/ask")({
  server: { handlers: { POST: ({ request }) => handlePortfolioAsk(request) } },
});
