import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthResult = { data: any; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails(id: string): Promise<OAuthResult>;
  approveAuthorization(id: string): Promise<OAuthResult>;
  denyAuthorization(id: string): Promise<OAuthResult>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  head: () => ({
    meta: [
      { title: "Connect an assistant | Govardhanan P Portfolio" },
      { name: "description", content: "Approve or deny an AI assistant's access to the Govardhanan P portfolio tools." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Connect an assistant | Govardhanan P Portfolio" },
      { property: "og:description", content: "Approve or deny an AI assistant's access to the portfolio tools." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("This authorization link is missing or invalid.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login", search: { next: location.pathname + location.searchStr } });
  },
  loaderDeps: ({ search }) => ({ id: search.authorization_id }),
  loader: async ({ deps }) => {
    const { data, error } = await oauth().getAuthorizationDetails(deps.id);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    const { data: u } = await supabase.auth.getUser();
    return { details: data, email: u.user?.email ?? "" };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="max-w-md text-center text-foreground">
        Could not load this authorization request: {error instanceof Error ? error.message : String(error)}
      </p>
    </main>
  ),
});

function Consent() {
  const { details, email } = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = details?.client?.name ?? "An assistant";
  const scopes: string[] = String(details?.scope ?? "").split(" ").filter(Boolean);
  const label = (s: string) =>
    s === "openid" ? "Confirm your identity" : s === "email" ? "Share your email address" : s === "profile" ? "Share your basic profile" : `Additional permission requested: ${s}`;

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) { setBusy(false); setError(error.message); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("No redirect was returned. Please try again."); return; }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8">
        <h1 className="text-xl font-semibold text-foreground">Connect {client} to Govardhanan P's Portfolio</h1>
        {email && <p className="mt-1 text-sm text-muted-foreground">Signed in as {email}</p>}
        {details?.redirect_uri && <p className="mt-1 break-all text-xs text-muted-foreground">Returns to {details.redirect_uri}</p>}
        <p className="mt-4 text-sm text-foreground">{client} will be able to read verified portfolio content (profile, education, skills, projects, certifications) through this app's tools.</p>
        {scopes.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            {scopes.map((s) => <li key={s}>{label(s)}</li>)}
          </ul>
        )}
        <p className="mt-3 text-xs text-muted-foreground">This does not bypass this app's permissions.</p>
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex gap-2">
          <button disabled={busy} onClick={() => decide(true)} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">Approve</button>
          <button disabled={busy} onClick={() => decide(false)} className="flex-1 rounded-md border border-input px-4 py-2 text-sm font-medium text-foreground disabled:opacity-50">Cancel connection</button>
        </div>
      </div>
    </main>
  );
}
