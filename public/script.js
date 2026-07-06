(function () {
  "use strict";

  // ---------- Theme ----------
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("gp-theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }
  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("gp-theme", next); } catch (e) {}
    });
  }

  // ---------- Mobile nav ----------
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var nav = document.getElementById("primary-nav");
  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    menuBtn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") setOpen(false);
    });
  }

  // ---------- Typing effect ----------
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var typeEl = document.querySelector("[data-typing]");
  if (typeEl) {
    var full = typeEl.getAttribute("data-words") || typeEl.textContent || "";
    if (prefersReduced) {
      typeEl.textContent = full;
    } else {
      typeEl.textContent = "";
      var i = 0;
      var tick = function () {
        if (i <= full.length) {
          typeEl.textContent = full.slice(0, i);
          i++;
          setTimeout(tick, 42);
        }
      };
      setTimeout(tick, 300);
    }
  }

  // ---------- Reveal on scroll ----------
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ---------- Resume availability ----------
  // If /assets/resume.pdf exists, enable all download-resume links.
  fetch("/assets/resume.pdf", { method: "HEAD" }).then(function (r) {
    if (r && r.ok) {
      document.querySelectorAll("[data-resume]").forEach(function (a) {
        a.removeAttribute("aria-disabled");
        a.removeAttribute("tabindex");
        a.removeAttribute("title");
      });
    }
  }).catch(function () {});
})();