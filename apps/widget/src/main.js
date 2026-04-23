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
  .feedback-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    color: white;
    padding: 12px 20px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    transition: opacity 0.2s, transform 0.1s;
  }
  .feedback-button:hover {
    opacity: 0.88;
    transform: scale(1.03);
  }
  .feedback-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background-color: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .feedback-modal {
    min-width: 280px;
    max-width: 420px;
    width: 90%;
    background-color: #fff;
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    position: relative;
  }
  .feedback-modal h3 {
    margin: 0 0 16px;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
  .feedback-modal form {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .feedback-modal input[type="text"],
  .feedback-modal input[type="email"],
  .feedback-modal textarea,
  .feedback-modal select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 9px 12px;
    font-size: 14px;
    color: #111827;
    background: #fff;
    transition: border-color 0.15s;
  }
  .feedback-modal input[type="text"]:focus,
  .feedback-modal input[type="email"]:focus,
  .feedback-modal textarea:focus,
  .feedback-modal select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
  .feedback-modal input::placeholder,
  .feedback-modal textarea::placeholder {
    color: #9ca3af;
  }
  .feedback-modal textarea {
    height: 100px;
    resize: vertical;
  }
  .feedback-modal input[type="file"] {
    font-size: 13px;
    color: #6b7280;
    padding: 6px 0;
  }
  .feedback-modal label {
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 2px;
    display: block;
  }
  .feedback-modal .field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-bottom: 6px;
  }
  .feedback-modal p.error-msg {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    color: #dc2626;
    font-size: 12px;
    margin: 0;
    transition: opacity 0.25s ease, max-height 0.25s ease;
  }
  .feedback-modal p.error-msg.show {
    opacity: 1;
    max-height: 40px;
  }
  .feedback-modal .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .feedback-modal .btn-submit {
    background-color: #2563eb;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: background-color 0.2s;
    margin-top: 4px;
    width: 100%;
  }
  .feedback-modal .btn-submit:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
  .feedback-modal .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .feedback-modal .btn-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #9ca3af;
    line-height: 1;
    padding: 2px 6px;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
  }
  .feedback-modal .btn-close:hover {
    color: #374151;
    background: #f3f4f6;
  }
  .feedback-modal--dark {
    background-color: #1e1e21;
    border-color: #2a2a2e;
    color: #e8e6e0;
  }
  .feedback-modal--dark h3 { color: #e8e6e0; }
  .feedback-modal--dark label { color: #7a7870; }
  .feedback-modal--dark input,
  .feedback-modal--dark textarea,
  .feedback-modal--dark select {
    background-color: #0e0e0f;
    border-color: #2a2a2e;
    color: #e8e6e0;
  }
  .feedback-modal--dark .footer-note { color: #3d3d42; }
  .feedback-modal--dark .footer-note a { color: #f5a623; }
  .feedback-modal--dark .btn-close { color: #3d3d42; }
  .feedback-modal--dark .btn-close:hover { color: #7a7870; background:#2a2a2e; }
    margin: 12px 0 0;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
  }
  .feedback-modal .footer-note a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
  }
  .feedback-modal .footer-note a:hover {
    text-decoration: underline;
  }
  .feedback-modal p.modal-status {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #2563eb;
    text-align: center;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .feedback-modal .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #2563eb;
    border-top-color: transparent;
    animation: fh-spin 0.8s linear infinite;
  }
  @keyframes fh-spin {
    to { transform: rotate(360deg); }
  }
  .feedback-modal p.success-msg {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #16a34a;
    text-align: center;
    padding: 24px 0;
  }
  .validating-error-message {
    color: #dc2626;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    margin: 16px 0 0;
    padding: 12px 16px;
    background-color: #fef2f2;
    border-radius: 8px;
    border: 1px solid #fecaca;
    animation: fh-shake 0.4s ease-in-out;
  }
  @keyframes fh-shake {
    0%,100% { transform: translateX(0); }
    25%      { transform: translateX(-5px); }
    75%      { transform: translateX(5px); }
  }
  @keyframes fh-fadeOut {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.97); }
  }
  .modal-fade-out {
    animation: fh-fadeOut 0.35s ease-out forwards;
  }
`;
document.head.appendChild(style);

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const SESSION_START_KEY = "feedbackhub-session-start";
  const VISITOR_ID_KEY = "feedbackhub-visitor-id";
  const GEO_CACHE_KEY = "feedbackhub-geo";
  const VISITOR_TRACKED_KEY = "feedbackhub-tracked";
  const GEO_CACHE_DURATION = 24 * 60 * 60 * 1000;

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function getOrCreateVisitorId() {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  }

  function getSessionStart() {
    let session = sessionStorage.getItem(SESSION_START_KEY);
    if (!session) {
      session = new Date().toISOString();
      sessionStorage.setItem(SESSION_START_KEY, session);
    }
    return session;
  }

  function getUserInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      timezoneOffset: new Date().getTimezoneOffset(),
    };
  }

  // Single geo fetch — always uses cache when fresh
  async function getCachedLocation() {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < GEO_CACHE_DURATION) {
          return parsed.data;
        }
      } catch {
        // stale or corrupt cache, fall through
      }
    }
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const geoData = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        org: data.org,
      };
      localStorage.setItem(
        GEO_CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: geoData }),
      );
      return geoData;
    } catch {
      return null;
    }
  }

  function getFeedbackUserInfo(email = "", geo = null) {
    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      ip: geo?.ip || undefined,
      location:
        geo?.city && geo?.country ? `${geo.city}, ${geo.country}` : undefined,
      email: email || undefined,
    };
  }

  function getPageContext() {
    const component =
      document.body.getAttribute("data-component") ||
      document.documentElement.getAttribute("data-component") ||
      "unknown";
    return {
      url: window.location.href,
      title: document.title,
      component,
    };
  }

  // ─── Visitor tracking ──────────────────────────────────────────────────────

  async function trackVisitorSession() {
    if (localStorage.getItem(VISITOR_TRACKED_KEY)) return;

    const visitorId = getOrCreateVisitorId();
    // Reuse getCachedLocation — no second geo fetch
    const geo = await getCachedLocation();

    const payload = {
      siteId: SITE_ID,
      visitorId,
      visitTimestamp: new Date().toISOString(),
      sessionStart: getSessionStart(),
      page: window.location.href,
      userInfo: getUserInfo(),
      country: geo?.country || "Unknown",
      region: geo?.region || "",
      city: geo?.city || "",
      pagesVisited: [
        { url: window.location.href, timestamp: new Date().toISOString() },
      ],
    };

    try {
      await fetch(`${API_BASE}/api/visitor/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      localStorage.setItem(VISITOR_TRACKED_KEY, "true");
    } catch (err) {
      console.error("FeedbackHub: visitor tracking failed", err);
    }
  }

  function trackPageVisit(url) {
    const visitorId = getOrCreateVisitorId();
    fetch(`${API_BASE}/api/visitor/track-page-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: SITE_ID,
        visitorId,
        sessionStart: getSessionStart(),
        page: url,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) =>
      console.error("FeedbackHub: page visit tracking failed", err),
    );
  }

  function overrideHistoryMethods() {
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      setTimeout(() => trackPageVisit(window.location.href), 0);
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      setTimeout(() => trackPageVisit(window.location.href), 0);
    };
    window.addEventListener("popstate", () => {
      trackPageVisit(window.location.href);
    });
  }

  // ─── Widget ────────────────────────────────────────────────────────────────

  function setupFeedbackWidget(siteValid, widgetConfig) {
    const visitorId = getOrCreateVisitorId();

    // Apply widget config from server (falls back to defaults)
    const cfg = {
      buttonText: widgetConfig?.buttonText || "Feedback",
      buttonColor: widgetConfig?.buttonColor || "#f5a623",
      position: widgetConfig?.position || "bottom-right",
      theme: widgetConfig?.theme || "auto",
    };

    // Resolve position to CSS
    const posStyles = {
      "bottom-right": "bottom:24px;right:24px;",
      "bottom-left": "bottom:24px;left:24px;",
      "top-right": "top:24px;right:24px;",
      "top-left": "top:24px;left:24px;",
    };

    // Resolve theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark =
      cfg.theme === "dark" || (cfg.theme === "auto" && prefersDark);

    // Floating button
    const button = document.createElement("button");
    button.className = "feedback-button";
    button.textContent = cfg.buttonText;
    button.setAttribute("aria-label", "Open feedback form");
    // Apply dynamic color + position via inline style (overrides the CSS class defaults)
    button.style.cssText = `
      background-color:${cfg.buttonColor};
      ${posStyles[cfg.position] || posStyles["bottom-right"]}
    `;
    document.body.appendChild(button);

    // Overlay
    const modalContainer = document.createElement("div");
    modalContainer.className = "feedback-modal-container";
    modalContainer.setAttribute("role", "dialog");
    modalContainer.setAttribute("aria-modal", "true");
    modalContainer.setAttribute("aria-label", "Feedback form");
    document.body.appendChild(modalContainer);

    // Modal card
    const modal = document.createElement("div");
    modal.className = "feedback-modal";
    if (isDark) modal.classList.add("feedback-modal--dark");
    modalContainer.appendChild(modal);

    function openModal() {
      modalContainer.style.display = "flex";
      if (!siteValid) {
        modal.innerHTML = `
          <p class="validating-error-message">
            Widget not configured properly. Please contact the site admin.
          </p>`;
        return;
      }
      renderFeedbackForm();
    }

    function closeModal() {
      modal.classList.add("modal-fade-out");
      setTimeout(() => {
        modalContainer.style.display = "none";
        modal.classList.remove("modal-fade-out");
        modal.innerHTML = "";
      }, 350);
    }

    button.addEventListener("click", openModal);

    // Close on backdrop click
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) closeModal();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.style.display === "flex") {
        closeModal();
      }
    });

    function renderFeedbackForm() {
      modal.innerHTML = `
        <button class="btn-close" aria-label="Close feedback form">&times;</button>
        <h3>Share your feedback</h3>
        <form id="fh-feedback-form" novalidate>

          <div class="form-row">
            <div class="field">
              <label for="fb-name">Name</label>
              <input type="text" id="fb-name" placeholder="Your name (optional)" autocomplete="name" />
              <p class="error-msg" id="error-name" role="alert"></p>
            </div>
            <div class="field">
              <label for="fb-email">Email</label>
              <input type="email" id="fb-email" placeholder="you@example.com" autocomplete="email" />
              <p class="error-msg" id="error-email" role="alert"></p>
            </div>
          </div>

          <div class="field">
            <label for="fb-title">Title <span style="color:#dc2626">*</span></label>
            <input type="text" id="fb-title" placeholder="Brief summary..." />
            <p class="error-msg" id="error-title" role="alert"></p>
          </div>

          <div class="field">
            <label for="fb-description">Description <span style="color:#dc2626">*</span></label>
            <textarea id="fb-description" placeholder="Describe your feedback..."></textarea>
            <p class="error-msg" id="error-description" role="alert"></p>
          </div>

          <div class="form-row">
            <div class="field">
              <label for="fb-category">Category</label>
              <select id="fb-category">
                <option value="other">Other</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature request</option>
                <option value="improvement">Improvement</option>
              </select>
            </div>
            <div class="field">
              <label for="fb-priority">Priority</label>
              <select id="fb-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="fb-screenshot">Screenshot (optional)</label>
            <input type="file" id="fb-screenshot" accept="image/*" />
          </div>

          <button type="submit" class="btn-submit">Submit feedback</button>
        </form>

        <p class="footer-note">
          Powered by <a href="https://feedbackhub-kappa.vercel.app" target="_blank" rel="noopener noreferrer">FeedbackHub</a>
        </p>
      `;

      modal.querySelector(".btn-close").addEventListener("click", closeModal);

      const form = modal.querySelector("#fh-feedback-form");
      const nameInput = form.querySelector("#fb-name");
      const emailInput = form.querySelector("#fb-email");
      const titleInput = form.querySelector("#fb-title");
      const descInput = form.querySelector("#fb-description");
      const submitBtn = form.querySelector(".btn-submit");

      const errorName = form.querySelector("#error-name");
      const errorEmail = form.querySelector("#error-email");
      const errorTitle = form.querySelector("#error-title");
      const errorDesc = form.querySelector("#error-description");

      const validators = {
        name: (v) =>
          !v || v.length >= 3 ? "" : "Name must be at least 3 characters.",
        email: (v) =>
          !v
            ? "" // email is optional
            : !/^\S+@\S+\.\S+$/.test(v)
              ? "Please enter a valid email address."
              : "",
        title: (v) =>
          v.length >= 5 ? "" : "Title must be at least 5 characters.",
        description: (v) =>
          v.length >= 10 ? "" : "Description must be at least 10 characters.",
      };

      function toggleError(el, input, message) {
        if (message) {
          el.textContent = message;
          el.classList.add("show");
          input.style.borderColor = "#dc2626";
        } else {
          el.classList.remove("show");
          input.style.borderColor = "";
        }
      }

      // Validate on blur, clear on input
      [
        [nameInput, errorName, "name"],
        [emailInput, errorEmail, "email"],
        [titleInput, errorTitle, "title"],
        [descInput, errorDesc, "description"],
      ].forEach(([input, errorEl, key]) => {
        input.addEventListener("blur", () =>
          toggleError(errorEl, input, validators[key](input.value.trim())),
        );
        input.addEventListener("input", () => toggleError(errorEl, input, ""));
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        const category = form.querySelector("#fb-category").value;
        const priority = form.querySelector("#fb-priority").value;

        // Run all validators
        const errors = {
          name: validators.name(name),
          email: validators.email(email),
          title: validators.title(title),
          description: validators.description(description),
        };

        toggleError(errorName, nameInput, errors.name);
        toggleError(errorEmail, emailInput, errors.email);
        toggleError(errorTitle, titleInput, errors.title);
        toggleError(errorDesc, descInput, errors.description);

        if (Object.values(errors).some(Boolean)) return;

        // Disable form while submitting
        form
          .querySelectorAll("input, textarea, select, button")
          .forEach((el) => (el.disabled = true));
        submitBtn.textContent = "Submitting...";

        try {
          const geo = await getCachedLocation();
          const userInfo = getFeedbackUserInfo(email, geo);
          const context = getPageContext();

          // Send as JSON — matches the backend feedbackSchema (req.body)
          const payload = {
            siteId: SITE_ID,
            title,
            description,
            name: name || "Anonymous",
            category, // fixed: was "type" — backend expects "category"
            priority,
            visitorId,
            userInfo,
            context,
          };

          const res = await fetch(`${API_BASE}/api/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) throw new Error(`Server error: ${res.status}`);

          modal.innerHTML = `<p class="success-msg">Thanks for your feedback! ✓</p>`;
          setTimeout(closeModal, 1800);
        } catch (err) {
          console.error("FeedbackHub: submission failed", err);
          // Re-enable form so user can retry
          form
            .querySelectorAll("input, textarea, select, button")
            .forEach((el) => (el.disabled = false));
          submitBtn.textContent = "Submit feedback";

          const existing = modal.querySelector(".validating-error-message");
          if (!existing) {
            const errMsg = document.createElement("p");
            errMsg.className = "validating-error-message";
            errMsg.textContent = "Submission failed. Please try again.";
            form.appendChild(errMsg);
          }
        }
      });
    }
  }

  // ─── Validate site ID once on load, then boot ──────────────────────────────

  // Returns { valid: boolean, widgetConfig: object|null }
  async function validateSite() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${API_BASE}/api/site/${SITE_ID}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return { valid: false, widgetConfig: null };
      const data = await res.json();
      return { valid: true, widgetConfig: data.widgetConfig ?? null };
    } catch {
      clearTimeout(timeout);
      return { valid: false, widgetConfig: null };
    }
  }

  (async () => {
    const { valid, widgetConfig } = await validateSite();
    await trackVisitorSession();
    overrideHistoryMethods();
    setupFeedbackWidget(valid, widgetConfig);
  })();
});
