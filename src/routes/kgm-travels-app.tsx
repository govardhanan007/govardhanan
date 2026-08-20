import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const TITLE = "KGM TRAVELS Mobile App — Coming Soon";
const DESC =
  "The KGM TRAVELS mobile app for school transportation is under development and will be available soon.";
const URL = "https://govardhanan.com/kgm-travels-app";

export const Route = createFileRoute("/kgm-travels-app")({
  component: KgmApp,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "stylesheet", href: "/styles.css" },
    ],
  }),
});

function KgmApp() {
  useEffect(() => {
    let cancelled = false;
    fetch("/kgm-travels-app/index.html")
      .then((r) => r.text())
      .then((html) => {
        if (cancelled) return;
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const mount = document.getElementById("kgm-app-mount");
        if (bodyMatch && mount) {
          mount.innerHTML = bodyMatch[1];
          const boot = document.createElement("script");
          boot.src = "/script.js";
          boot.defer = true;
          document.body.appendChild(boot);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <div id="kgm-app-mount" />;
}
