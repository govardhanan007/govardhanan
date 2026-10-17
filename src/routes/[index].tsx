import { createFileRoute, redirect } from "@tanstack/react-router";

// Old/alternate address "/index" — always send visitors to the homepage.
export const Route = createFileRoute("/index")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
