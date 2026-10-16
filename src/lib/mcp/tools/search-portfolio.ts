import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "search_portfolio",
  title: "Search portfolio",
  description: "Find portfolio sections of Govardhanan P's website that mention a keyword, returning matching sections with links.",
  inputSchema: { query: z.string().min(2).max(100).describe("Keyword to search for, e.g. 'HR', 'Coursera', 'MBA'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query }: { query: string }) => {
    const { loadPortfolio } = await import("@/lib/ai/portfolio-ask.server");
    const text = await loadPortfolio("https://www.govardhanan.com");
    const q = query.toLowerCase();
    const hits = text.split(/(?=### )/).filter((s) => s.toLowerCase().includes(q));
    return {
      content: [{ type: "text", text: hits.length ? hits.join("\n\n") : `No portfolio sections mention "${query}".` }],
    };
  },
});
