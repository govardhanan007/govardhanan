import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Govardhanan P — MBA General Student & Mechanical Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Govardhanan P — MBA General student and Mechanical Engineer focused on leadership, strategy, marketing, sales, HR and business innovation.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: "Govardhanan P — MBA General Student & Mechanical Engineer" },
      { property: "og:description", content: "Leadership • Strategy • Innovation • Growth." },
      { property: "og:url", content: "https://govardhanan.com/" },
      { property: "og:image", content: "https://govardhanan.com/assets/photo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Govardhanan P — MBA General Student & Mechanical Engineer" },
      { name: "twitter:description", content: "Leadership • Strategy • Innovation • Growth." },
      { name: "twitter:image", content: "https://govardhanan.com/assets/photo.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://govardhanan.com/" },
      { rel: "stylesheet", href: "/styles.css" },
      { rel: "preload", as: "image", href: "/assets/photo.jpg" },
    ],
    scripts: [
      { src: "/script.js", defer: true },
    ],
  }),
});

function Index() {
  // The full static site lives in /public/index.html. In the Lovable preview
  // (SSR/React shell), fetch that same HTML and inject its <body> here so
  // there is exactly one source of truth — the deployable static site.
  useEffect(() => {
    let cancelled = false;
    fetch("/index.html")
      .then((r) => r.text())
      .then((html) => {
        if (cancelled) return;
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const mount = document.getElementById("gp-static-mount");
        if (bodyMatch && mount) {
          mount.innerHTML = bodyMatch[1];
          // Re-execute scripts inside the injected markup.
          mount.querySelectorAll("script").forEach((old) => {
            const s = document.createElement("script");
            for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
            s.text = old.textContent || "";
            old.replaceWith(s);
          });
          // Kick off /script.js behavior manually (it's loaded via <script src> in head).
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

  return <div id="gp-static-mount" />;
}
