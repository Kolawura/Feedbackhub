// Read config from the script tag
const scriptTag = document.currentScript;
const SITE_ID = scriptTag?.getAttribute("data-site-id") || "YOUR_SITE_ID";
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://feedbackhub-myce.onrender.com";

// ─── Styles ───────────────────────────────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  .fh-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #f5a623;
    color: #fff;
    padding: 12px 20px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    font-family: sans-serif;
    border: none;
    cursor: pointer;
    z-index: 99999;
    box-shadow: 0 4px 14px rgba(0,0,0,0.22);
    transition: opacity 0.2s, transform 0.15s;
  }
  .fh-button:hover { opacity: 0.88; transform: scale(1.04); }

  .fh-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.38);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100000;
  }
  .fh-modal {
    position: relative;
    width: 90%;
    min-width: 280px;
    max-width: 420px;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    font-family: sans-serif;
    color: #111827;
    max-height: 90vh;
    overflow-y: auto;
  }
  .fh-modal.fh-dark {
    background: #1e1e21;
    color: #e8e6e0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }
  .fh-modal h3 { margin: 0 0 16px; font-size: 17px; font-weight: 600; }
  .fh-modal form { display: flex; flex-direction: column; gap: 10px; }
  .fh-modal label { display: block; font-size: 12px; font-weight: 500; margin-bottom: 3px; color: #6b7280; }
  .fh-modal.fh-dark label { color: #9ca3af; }
  .fh-modal input[type=text],
  .fh-modal input[type=email],
  .fh-modal textarea,
  .fh-modal select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 8px 11px;
    font-size: 14px;
    font-family: sans-serif;
    color: #111827;
    background: #fff;
    transition: border-color 0.15s;
  }
  .fh-modal.fh-dark input[type=text],
  .fh-modal.fh-dark input[type=email],
  .fh-modal.fh-dark textarea,
  .fh-modal.fh-dark select {
    background: #0e0e0f;
    border-color: #2a2a2e;
    color: #e8e6e0;
  }
  .fh-modal input:focus,
  .fh-modal textarea:focus,
  .fh-modal select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }
  .fh-modal input::placeholder,
  .fh-modal textarea::placeholder { color: #9ca3af; }
  .fh-modal textarea { height: 90px; resize: vertical; }
  .fh-modal .fh-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .fh-modal .fh-field { display: flex; flex-direction: column; }
  .fh-modal .fh-err {
    font-size: 11px;
    color: #dc2626;
    margin: 2px 0 0;
    min-height: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.2s, opacity 0.2s;
  }
  .fh-modal .fh-err.show { max-height: 32px; opacity: 1; }
  .fh-modal .fh-submit {
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: sans-serif;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 2px;
  }
  .fh-modal .fh-submit:hover:not(:disabled) { background: #1d4ed8; }
  .fh-modal .fh-submit:disabled { opacity: 0.55; cursor: not-allowed; }
  .fh-modal .fh-close {
    position: absolute;
    top: 14px; right: 14px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #9ca3af;
    line-height: 1;
    padding: 2px 6px;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
  }
  .fh-modal .fh-close:hover { color: #374151; background: #f3f4f6; }
  .fh-modal.fh-dark .fh-close:hover { color: #e8e6e0; background: #2a2a2e; }
  .fh-modal .fh-footer {
    margin: 12px 0 0;
    font-size: 11px;
    color: #9ca3af;
    text-align: center;
  }
  .fh-modal .fh-footer a { color: #2563eb; text-decoration: none; font-weight: 500; }
  .fh-modal .fh-footer a:hover { text-decoration: underline; }
  .fh-modal .fh-success {
    text-align: center;
    padding: 24px 0;
    font-size: 16px;
    font-weight: 600;
    color: #16a34a;
  }
  .fh-modal .fh-error-banner {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 12px;
    font-size: 13px;
    color: #dc2626;
    text-align: center;
    animation: fh-shake 0.35s ease;
  }
  @keyframes fh-shake {
    0%,100% { transform: translateX(0); }
    25%      { transform: translateX(-5px); }
    75%      { transform: translateX(5px); }
  }
  @keyframes fh-fadeout {
    to { opacity: 0; transform: scale(0.97); }
  }
  .fh-fadeout { animation: fh-fadeout 0.3s ease forwards; }
`;
document.head.appendChild(style);

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // ── Storage keys (namespaced to avoid collisions with host site) ────────────
  const KEY_VISITOR_ID = `fh_vid_${SITE_ID}`;
  const KEY_SESSION_ID = `fh_sid_${SITE_ID}`; // sessionStorage — clears on tab close
  const KEY_SESSION_START = `fh_ss_${SITE_ID}`; // sessionStorage
  const KEY_GEO = `fh_geo`; // localStorage — shared across sites
  const KEY_GEO_TS = `fh_geo_ts`;
  const GEO_TTL = 24 * 60 * 60 * 1000; // 24h
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30min inactivity = new session

  // ── Visitor ID: persists forever in localStorage (same device = same ID) ───
  function getOrCreateVisitorId() {
    let id = localStorage.getItem(KEY_VISITOR_ID);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY_VISITOR_ID, id);
    }
    return id;
  }

  // ── Session ID: new session if tab is fresh OR last activity > 30 min ago ──
  // Stored in sessionStorage so it clears when browser/tab closes.
  // We also track last activity time so long idle gaps create new sessions.
  const KEY_LAST_ACTIVITY = `fh_la_${SITE_ID}`;

  function getOrCreateSession() {
    const now = Date.now();
    let sessionId = sessionStorage.getItem(KEY_SESSION_ID);
    let sessionStart = sessionStorage.getItem(KEY_SESSION_START);
    const lastActivity = parseInt(
      localStorage.getItem(KEY_LAST_ACTIVITY) || "0",
      10,
    );

    // If last activity was more than SESSION_TIMEOUT ago, start a fresh session
    const timedOut = lastActivity && now - lastActivity > SESSION_TIMEOUT;

    if (!sessionId || timedOut) {
      sessionId = crypto.randomUUID();
      sessionStart = new Date().toISOString();
      sessionStorage.setItem(KEY_SESSION_ID, sessionId);
      sessionStorage.setItem(KEY_SESSION_START, sessionStart);
    }

    // Update last activity timestamp on every page load
    localStorage.setItem(KEY_LAST_ACTIVITY, String(now));

    return { sessionId, sessionStart };
  }

  function getUserInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: screen.width, // use screen.width not innerWidth (viewport can vary)
      screenHeight: screen.height,
      timezoneOffset: new Date().getTimezoneOffset(),
    };
  }

  async function getCachedGeo() {
    const cached = localStorage.getItem(KEY_GEO);
    const ts = parseInt(localStorage.getItem(KEY_GEO_TS) || "0", 10);
    if (cached && Date.now() - ts < GEO_TTL) {
      try {
        return JSON.parse(cached);
      } catch {
        /* corrupt */
      }
    }
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const geo = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
      };
      localStorage.setItem(KEY_GEO, JSON.stringify(geo));
      localStorage.setItem(KEY_GEO_TS, String(Date.now()));
      return geo;
    } catch {
      return null;
    }
  }

  // ── Visitor session tracking ────────────────────────────────────────────────
  // Called once per session (not once ever).
  // Creates a new Visitor document each session so we track return visits.
  async function trackSession() {
    const visitorId = getOrCreateVisitorId();
    const { sessionId, sessionStart } = getOrCreateSession();

    // Check if this specific session has already been tracked
    // (handles page refreshes within the same session)
    const KEY_SESSION_TRACKED = `fh_st_${sessionId}`;
    if (sessionStorage.getItem(KEY_SESSION_TRACKED)) return;

    const geo = await getCachedGeo();

    const payload = {
      siteId: SITE_ID,
      visitorId,
      sessionId, // unique per session
      visitTimestamp: new Date().toISOString(),
      sessionStart,
      page: window.location.href,
      userInfo: getUserInfo(),
      country: geo?.country || "Unknown",
      region: geo?.region || "",
      city: geo?.city || "",
      pagesVisited: [
        {
          url: window.location.href,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const res = await fetch(`${API_BASE}/api/visitor/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Mark this session as tracked (sessionStorage clears on tab close)
        sessionStorage.setItem(KEY_SESSION_TRACKED, "1");
      }
    } catch (err) {
      console.error("FeedbackHub: session tracking failed", err.message || err);
    }
  }

  // ── Page visit tracking ─────────────────────────────────────────────────────
  // Appends each navigation to the current session's pagesVisited array.
  function trackPageVisit(url) {
    const visitorId = getOrCreateVisitorId();
    const { sessionStart } = getOrCreateSession();

    // Update last activity on every navigation
    localStorage.setItem(KEY_LAST_ACTIVITY, String(Date.now()));

    fetch(`${API_BASE}/api/visitor/track-page-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: SITE_ID,
        visitorId,
        sessionStart,
        page: url,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {}); // silent — don't break the host site on failure
  }

  // ── SPA navigation interception ─────────────────────────────────────────────
  function interceptNavigation() {
    const orig_push = history.pushState.bind(history);
    const orig_replace = history.replaceState.bind(history);

    history.pushState = function (...args) {
      orig_push(...args);
      setTimeout(() => trackPageVisit(window.location.href), 0);
    };
    history.replaceState = function (...args) {
      orig_replace(...args);
      setTimeout(() => trackPageVisit(window.location.href), 0);
    };
    window.addEventListener("popstate", () => {
      trackPageVisit(window.location.href);
    });
  }

  // ── Site validation ─────────────────────────────────────────────────────────
  async function validateSite() {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(`${API_BASE}/api/site/${SITE_ID}`, {
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return { valid: false, config: null };
      const data = await res.json();
      return { valid: true, config: data.widgetConfig ?? null };
    } catch {
      clearTimeout(timeout);
      return { valid: false, config: null };
    }
  }

  // ── Feedback widget UI ──────────────────────────────────────────────────────
  function buildWidget(siteValid, config) {
    const visitorId = getOrCreateVisitorId();

    const cfg = {
      buttonText: config?.buttonText || "Feedback",
      buttonColor: config?.buttonColor || "#f5a623",
      position: config?.position || "bottom-right",
      theme: config?.theme || "auto",
    };

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark =
      cfg.theme === "dark" || (cfg.theme === "auto" && prefersDark);

    // Position map
    const pos = {
      "bottom-right": "bottom:24px;right:24px;top:auto;left:auto;",
      "bottom-left": "bottom:24px;left:24px;top:auto;right:auto;",
      "top-right": "top:24px;right:24px;bottom:auto;left:auto;",
      "top-left": "top:24px;left:24px;bottom:auto;right:auto;",
    };

    // Button
    const btn = document.createElement("button");
    btn.className = "fh-button";
    btn.textContent = cfg.buttonText;
    btn.setAttribute("aria-label", "Open feedback form");
    btn.style.cssText = `background-color:${cfg.buttonColor};${pos[cfg.position] || pos["bottom-right"]}`;
    document.body.appendChild(btn);

    // Overlay + modal
    const overlay = document.createElement("div");
    overlay.className = "fh-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Feedback");
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.className = "fh-modal" + (isDark ? " fh-dark" : "");
    overlay.appendChild(modal);

    function open() {
      overlay.style.display = "flex";
      if (!siteValid) {
        modal.innerHTML = `<div class="fh-error-banner">Widget not configured. Please contact the site admin.</div>`;
        return;
      }
      renderForm();
    }

    function close() {
      modal.classList.add("fh-fadeout");
      setTimeout(() => {
        overlay.style.display = "none";
        modal.classList.remove("fh-fadeout");
        modal.innerHTML = "";
      }, 300);
    }

    btn.addEventListener("click", open);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.style.display === "flex") close();
    });

    function renderForm() {
      modal.innerHTML = `
        <button class="fh-close" aria-label="Close">&times;</button>
        <h3>Share your feedback</h3>
        <form id="fh-form" novalidate>
          <div class="fh-row">
            <div class="fh-field">
              <label for="fh-name">Name</label>
              <input type="text" id="fh-name" placeholder="Your name (optional)" autocomplete="name"/>
              <span class="fh-err" id="fh-err-name"></span>
            </div>
            <div class="fh-field">
              <label for="fh-email">Email</label>
              <input type="email" id="fh-email" placeholder="you@example.com" autocomplete="email"/>
              <span class="fh-err" id="fh-err-email"></span>
            </div>
          </div>
          <div class="fh-field">
            <label for="fh-title">Title <span style="color:#dc2626">*</span></label>
            <input type="text" id="fh-title" placeholder="Brief summary..."/>
            <span class="fh-err" id="fh-err-title"></span>
          </div>
          <div class="fh-field">
            <label for="fh-desc">Description <span style="color:#dc2626">*</span></label>
            <textarea id="fh-desc" placeholder="Describe your feedback..."></textarea>
            <span class="fh-err" id="fh-err-desc"></span>
          </div>
          <div class="fh-row">
            <div class="fh-field">
              <label for="fh-cat">Category</label>
              <select id="fh-cat">
                <option value="other">Other</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature request</option>
                <option value="improvement">Improvement</option>
              </select>
            </div>
            <div class="fh-field">
              <label for="fh-pri">Priority</label>
              <select id="fh-pri">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <button type="submit" class="fh-submit">Submit feedback</button>
        </form>
        <p class="fh-footer">
          Powered by <a href="https://feedbackhub-kappa.vercel.app" target="_blank" rel="noopener noreferrer">FeedbackHub</a>
        </p>
      `;

      modal.querySelector(".fh-close").addEventListener("click", close);

      const form = modal.querySelector("#fh-form");
      const f_name = form.querySelector("#fh-name");
      const f_email = form.querySelector("#fh-email");
      const f_title = form.querySelector("#fh-title");
      const f_desc = form.querySelector("#fh-desc");
      const f_cat = form.querySelector("#fh-cat");
      const f_pri = form.querySelector("#fh-pri");
      const f_sub = form.querySelector(".fh-submit");

      const e_name = form.querySelector("#fh-err-name");
      const e_email = form.querySelector("#fh-err-email");
      const e_title = form.querySelector("#fh-err-title");
      const e_desc = form.querySelector("#fh-err-desc");

      const validate = {
        name: (v) =>
          !v || v.length >= 3 ? "" : "Name must be at least 3 characters.",
        email: (v) =>
          !v || /^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email address.",
        title: (v) =>
          v.length >= 5 ? "" : "Title must be at least 5 characters.",
        desc: (v) =>
          v.length >= 10 ? "" : "Description must be at least 10 characters.",
      };

      function setErr(el, input, msg) {
        el.textContent = msg;
        el.classList.toggle("show", !!msg);
        input.style.borderColor = msg ? "#dc2626" : "";
      }

      [
        [f_name, e_name, "name"],
        [f_email, e_email, "email"],
        [f_title, e_title, "title"],
        [f_desc, e_desc, "desc"],
      ].forEach(([inp, err, key]) => {
        inp.addEventListener("blur", () =>
          setErr(err, inp, validate[key](inp.value.trim())),
        );
        inp.addEventListener("input", () => setErr(err, inp, ""));
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = f_name.value.trim();
        const email = f_email.value.trim();
        const title = f_title.value.trim();
        const desc = f_desc.value.trim();

        const errs = {
          name: validate.name(name),
          email: validate.email(email),
          title: validate.title(title),
          desc: validate.desc(desc),
        };
        setErr(e_name, f_name, errs.name);
        setErr(e_email, f_email, errs.email);
        setErr(e_title, f_title, errs.title);
        setErr(e_desc, f_desc, errs.desc);
        if (Object.values(errs).some(Boolean)) return;

        form
          .querySelectorAll("input,textarea,select,button")
          .forEach((el) => (el.disabled = true));
        f_sub.textContent = "Submitting...";

        try {
          const geo = await getCachedGeo();
          const userInfo = {
            browser: navigator.userAgent,
            os: navigator.platform,
            ip: geo?.ip || undefined,
            location:
              geo?.city && geo?.country
                ? `${geo.city}, ${geo.country}`
                : undefined,
            email: email || undefined,
          };

          const res = await fetch(`${API_BASE}/api/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              siteId: SITE_ID,
              title,
              description: desc,
              name: name || "Anonymous",
              category: f_cat.value,
              priority: f_pri.value,
              visitorId,
              userInfo,
            }),
          });

          if (!res.ok) throw new Error(`${res.status}`);

          modal.innerHTML = `<div class="fh-success">Thanks for your feedback! ✓</div>`;
          setTimeout(close, 1800);
        } catch {
          form
            .querySelectorAll("input,textarea,select,button")
            .forEach((el) => (el.disabled = false));
          f_sub.textContent = "Submit feedback";
          const existing = modal.querySelector(".fh-error-banner");
          if (!existing) {
            const banner = document.createElement("p");
            banner.className = "fh-error-banner";
            banner.textContent = "Submission failed. Please try again.";
            form.after(banner);
          }
        }
      });
    }
  }

  // ── Boot sequence ───────────────────────────────────────────────────────────
  (async () => {
    const { valid, config } = await validateSite();
    await trackSession(); // creates a new session doc for each visit
    interceptNavigation(); // tracks SPA page changes
    buildWidget(valid, config); // mounts the feedback button + modal
  })();
});
