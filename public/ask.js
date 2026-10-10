/* Recruiter assistant: answers questions using only verified portfolio content. */
(function () {
  if (window.__gpAskInit) return;
  window.__gpAskInit = true;

  var KEY = "gp-ask-chat-v1";
  var SITE = "https://www.govardhanan.com";
  var messages = [];
  try { messages = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { messages = []; }
  var busy = false;

  function save() { try { localStorage.setItem(KEY, JSON.stringify(messages.slice(-30))); } catch (e) {} }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function localHref(url) {
    if (url.indexOf(SITE) === 0) return url.slice(SITE.length) || "/";
    return url;
  }
  function md(text) {
    var lines = esc(text).split("\n"), out = "", inList = false;
    lines.forEach(function (l) {
      l = l
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*|#[^)\s]*)\)/g, function (_, t, u) {
          var href = localHref(u);
          var ext = /^https?:/.test(href);
          return '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + t + "</a>";
        })
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      var m = l.match(/^\s*[-*•]\s+(.*)/);
      if (m) { if (!inList) { out += "<ul>"; inList = true; } out += "<li>" + m[1] + "</li>"; return; }
      if (inList) { out += "</ul>"; inList = false; }
      if (l.trim()) out += "<p>" + l + "</p>";
    });
    if (inList) out += "</ul>";
    return out;
  }

  var root = document.createElement("div");
  root.className = "gp-ask";
  root.innerHTML =
    '<button type="button" class="gp-ask-fab" aria-expanded="false" aria-controls="gp-ask-panel">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      "<span>Ask about Govardhanan</span></button>" +
    '<section id="gp-ask-panel" class="gp-ask-panel" role="dialog" aria-label="Ask about Govardhanan P" hidden>' +
      '<header class="gp-ask-head"><div><strong>Ask about Govardhanan P</strong><small>AI answers from verified portfolio content only</small></div>' +
        '<div class="gp-ask-head-actions"><button type="button" class="gp-ask-clear">Clear</button>' +
        '<button type="button" class="gp-ask-close" aria-label="Close">×</button></div></header>' +
      '<div class="gp-ask-log" aria-live="polite"></div>' +
      '<div class="gp-ask-suggest"></div>' +
      '<form class="gp-ask-form"><textarea rows="1" maxlength="1000" placeholder="e.g. What HR experience does he have?" aria-label="Your question"></textarea>' +
        '<button type="submit" aria-label="Send">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg></button></form>' +
    "</section>";
  document.body.appendChild(root);

  var fab = root.querySelector(".gp-ask-fab");
  var panel = root.querySelector(".gp-ask-panel");
  var log = root.querySelector(".gp-ask-log");
  var form = root.querySelector(".gp-ask-form");
  var input = form.querySelector("textarea");
  var sendBtn = form.querySelector("button");
  var suggest = root.querySelector(".gp-ask-suggest");

  ["What is his education?", "Describe his HR experience", "Which certifications does he hold?", "How can I contact him?"].forEach(function (q) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = q;
    b.addEventListener("click", function () { ask(q); });
    suggest.appendChild(b);
  });

  function render() {
    log.innerHTML = "";
    if (!messages.length) {
      log.innerHTML = '<div class="gp-ask-msg bot"><p>Hi! Ask me anything about Govardhanan P’s education, experience, skills, projects or certifications. Answers come only from this website and include links to the source sections.</p></div>';
    }
    messages.forEach(function (m) {
      var d = document.createElement("div");
      d.className = "gp-ask-msg " + (m.role === "user" ? "user" : "bot") + (m.error ? " error" : "");
      d.innerHTML = m.role === "user" ? "<p>" + esc(m.content) + "</p>" : md(m.content || "");
      log.appendChild(d);
    });
    suggest.hidden = messages.length > 0;
    log.scrollTop = log.scrollHeight;
  }

  function open(state) {
    panel.hidden = !state;
    fab.setAttribute("aria-expanded", String(state));
    root.classList.toggle("is-open", state);
    if (state) { render(); setTimeout(function () { input.focus(); }, 30); }
  }
  fab.addEventListener("click", function () { open(panel.hidden); });
  root.querySelector(".gp-ask-close").addEventListener("click", function () { open(false); fab.focus(); });
  root.querySelector(".gp-ask-clear").addEventListener("click", function () { if (busy) return; messages = []; save(); render(); input.focus(); });
  panel.addEventListener("keydown", function (e) { if (e.key === "Escape") { open(false); fab.focus(); } });
  log.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (a && a.getAttribute("href").charAt(0) === "/" && a.getAttribute("href").indexOf("/#") === 0 && location.pathname === "/") {
      if (window.matchMedia("(max-width: 640px)").matches) open(false);
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });

  function ask(q) {
    q = (q || "").trim();
    if (!q || busy) return;
    busy = true; sendBtn.disabled = true; input.value = "";
    messages.push({ role: "user", content: q });
    var history = messages.filter(function (m) { return !m.error; }).slice(-12).map(function (m) { return { role: m.role, content: m.content }; });
    var reply = { role: "assistant", content: "" };
    messages.push(reply);
    render();
    var last = log.lastChild;
    last.innerHTML = '<p class="gp-ask-typing"><span></span><span></span><span></span></p>';

    fetch("/api/public/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) })
      .then(function (res) {
        if (!res.ok) {
          return res.json().catch(function () { return {}; }).then(function (j) {
            var msg = res.status === 429 ? "Too many questions right now — please try again in a moment." :
              res.status === 402 ? "The assistant is temporarily unavailable." :
              (j && j.error) || "Sorry, something went wrong. Please try again.";
            throw new Error(msg);
          });
        }
        var reader = res.body.getReader(), dec = new TextDecoder();
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            reply.content += dec.decode(r.value, { stream: true });
            last.innerHTML = md(reply.content);
            log.scrollTop = log.scrollHeight;
            return pump();
          });
        }
        return pump();
      })
      .then(function () {
        if (!reply.content.trim()) throw new Error("No answer was returned. Please try rephrasing or contact Govardhanan P directly.");
      })
      .catch(function (err) {
        reply.content = err.message || "Sorry, something went wrong.";
        reply.error = true;
      })
      .then(function () {
        busy = false; sendBtn.disabled = false;
        save(); render(); input.focus();
      });
  }
})();
