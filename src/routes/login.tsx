import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { oauthReturnPath } from "@/lib/oauth-return-path";
import "@lovable.dev/cloud-auth-js/styles.css";

const KEY = "gp-login-next";

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in | Govardhanan P Portfolio" },
      { name: "description", content: "Sign in to connect an AI assistant to the Govardhanan P portfolio." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Sign in | Govardhanan P Portfolio" },
      { property: "og:description", content: "Sign in to connect an AI assistant to the Govardhanan P portfolio." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (next) sessionStorage.setItem(KEY, oauthReturnPath(next));
    const go = () => {
      const target = oauthReturnPath(sessionStorage.getItem(KEY) ?? next ?? "/");
      sessionStorage.removeItem(KEY);
      window.location.replace(target);
    };
    supabase.auth.getSession().then(({ data }) => data.session && go());
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => session && go());
    return () => sub.subscription.unsubscribe();
  }, [next]);

  async function signIn() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("lovable", {
      redirect_uri: `${window.location.origin}/login`,
    });
    if (result.error) setError(result.error.message ?? "Sign-in failed. Please try again.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to connect an AI assistant to Govardhanan P's portfolio.</p>
        <button type="button" className="lovable-auth-button mt-6 w-full" onClick={signIn}>
          Sign in with Lovable
        </button>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    </main>
  );
}
