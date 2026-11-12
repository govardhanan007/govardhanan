import { createFileRoute, Navigate } from "@tanstack/react-router";

// Old/alternate address "/index" — send visitors to the homepage (works in the preview too).
export const Route = createFileRoute("/index")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.govardhanan.com/" }],
  }),
  component: () => <Navigate to="/" replace />,
});
