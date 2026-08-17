import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const TITLE = "Eddy Current Brake: Automatic Electromagnetic Braking System Case Study";
const DESC =
  "How an eddy current brake works — a technical case study of an automatic electromagnetic braking system built with an electromagnet, steel disc, ultrasonic sensing and an Arduino controller.";
const URL = "https://govardhanan.com/projects/electromagnetic-braking";

export const Route = createFileRoute("/projects/electromagnetic-braking")({
  component: CaseStudy,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://govardhanan.com/assets/photo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "https://govardhanan.com/assets/photo.jpg" },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "stylesheet", href: "/styles.css" },
    ],
  }),
});

function CaseStudy() {
  useEffect(() => {
    let cancelled = false;
    fetch("/projects/electromagnetic-braking/index.html")
      .then((r) => r.text())
      .then((html) => {
        if (cancelled) return;
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const mount = document.getElementById("gp-case-mount");
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

  return <div id="gp-case-mount" />;
}
