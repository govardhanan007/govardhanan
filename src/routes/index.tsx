import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Govardhanan P | MBA Student & Mechanical Engineer | Official Portfolio" },
      {
        name: "description",
        content:
          "Official portfolio of Govardhanan P, an MBA student and Mechanical Engineering graduate showcasing education, skills, projects, certifications, achievements, and professional journey.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: "Govardhanan P | MBA Student & Mechanical Engineer | Official Portfolio" },
      { property: "og:description", content: "Official portfolio of Govardhanan P — MBA student and Mechanical Engineering graduate." },
      { property: "og:url", content: "https://govardhanan.com/" },
      { property: "og:image", content: "https://govardhanan.com/assets/photo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Govardhanan P | MBA Student & Mechanical Engineer | Official Portfolio" },
      { name: "twitter:description", content: "Official portfolio of Govardhanan P — MBA student and Mechanical Engineering graduate." },
      { name: "twitter:image", content: "https://govardhanan.com/assets/photo.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://govardhanan.com/" },
      { rel: "stylesheet", href: "/styles.css" },
      { rel: "preload", as: "image", href: "/assets/photo.jpg" },
    ],
    scripts: [
      { src: "/script.js", defer: true },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://govardhanan.com/#website",
              "name": "Govardhanan",
              "alternateName": "Govardhanan P",
              "url": "https://govardhanan.com/",
              "inLanguage": "en",
              "publisher": {
                "@id": "https://govardhanan.com/#person"
              }
            },
            {
              "@type": "ProfilePage",
              "@id": "https://govardhanan.com/#profilepage",
              "url": "https://govardhanan.com/",
              "name": "Govardhanan P | Official Portfolio",
              "isPartOf": {
                "@id": "https://govardhanan.com/#website"
              },
              "mainEntity": {
                "@id": "https://govardhanan.com/#person"
              }
            },
            {
              "@type": "Person",
              "@id": "https://govardhanan.com/#person",
              "name": "Govardhanan P",
              "url": "https://govardhanan.com/",
              "image": "https://govardhanan.com/assets/photo.jpg",
              "jobTitle": "MBA Student and Mechanical Engineer",
              "description": "Govardhanan P is an MBA (General) student and Mechanical Engineering graduate from Chennai, India, with interests in human resources, business management, marketing and operations.",
              "email": "mailto:govardhanan1723@govardhanan.com",
              "telephone": "+91-86103-91303",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "alumniOf": [
                {
                  "@type": "CollegeOrUniversity",
                  "name": "Dr. M.G.R. Educational and Research Institute"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "NTTF, Vellore"
                }
              ],
              "knowsAbout": [
                "Human Resource Management",
                "Recruitment",
                "Talent Acquisition",
                "Marketing",
                "Business Management",
                "Business Development",
                "Operations Management",
                "Customer Relationship Management",
                "Leadership",
                "Entrepreneurship",
                "Mechanical Engineering",
                "Tool Engineering",
                "Digital Manufacturing",
                "CAD",
                "CAM",
                "Project Management",
                "Business Communication"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/pgovardhanan",
                "https://www.instagram.com/govardhanan1723",
                "https://www.facebook.com/share/17dsqmsyUM/",
                "https://x.com/Govardhanan007",
                "https://t.me/govardhanan1723",
                "https://github.com/govardhanan007",
                "https://vk.ru/govardhanan1723",
                "https://www.threads.com/@govardhanan1723",
                "https://youtube.com/@mass__tamilan__yt"
              ]
            }
          ]
        }),
      },
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
