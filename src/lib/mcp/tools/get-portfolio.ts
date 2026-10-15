import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_portfolio",
  title: "Get portfolio content",
  description:
    "Return the verified text of Govardhanan P's official portfolio (about, education, experience, skills, projects, certifications, FAQ, contact) with section links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const { loadPortfolio } = await import("@/lib/ai/portfolio-ask.server");
    const text = await loadPortfolio("https://www.govardhanan.com");
    return { content: [{ type: "text", text: text || "Portfolio content is temporarily unavailable." }] };
  },
});
