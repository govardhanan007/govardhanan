import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getPortfolio from "./tools/get-portfolio";
import searchPortfolio from "./tools/search-portfolio";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "govardhanan-s-professional-presence",
  title: "Govardhanan's Professional Presence",
  version: "0.1.0",
  instructions:
    "Read-only access to Govardhanan P's verified portfolio. Use get_portfolio for the full content or search_portfolio to find sections by keyword. Only state facts present in the returned content.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
    requireOAuthClientClaim: true,
  }),
  tools: [getPortfolio, searchPortfolio],
});
