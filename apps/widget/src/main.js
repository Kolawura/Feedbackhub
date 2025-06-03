const scriptTag = document.currentScript;
const siteId = scriptTag?.getAttribute("data-site-id");

// actually ill like that the site id will be generated when an admin register the site in the frontend , then hes given the script tag with the site ID

//  CREATE THE <STYLE></STYLE>

const style = document.createElement("style");
style.textContent = `
  .feedback-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #2563eb;
    color: white;
    padding: 12px 16px;
    border-radius: 9999px;
    font-size: 14px;
    cursor: pointer;
    z-index: 9999;
  }
  .feedback-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    z-index: 10000;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

  .feedback-modal {
    min-width: 280px;
    max-width: 400px;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .feedback-modal p.modal-validating {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #2563eb;
    text-align: center;
    font-style: italic;
  }
  .feedback-modal p.modal-validating::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #2563eb;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .feedback-modal h3 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 600;
  }
  .feedback-modal form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .feedback-modal input[type="text"],
  .feedback-modal input[type="email"] {
    width: auto;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
  }
  .feedback-modal button {
    background-color: #2f42eb;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.3s;
  }
  .feedback-modal button:hover {
    background-color: #3503fc;
  }
  .feedback-modal button.close-modal {
    background-color: #f71111;
  }
  .feedback-modal button.close-modal:hover {
    background-color: #f00;
  }
  .feedback-modal p {
    margin: 12px 0;
    font-size: 14px;
    color: #555;
  }
  .feedback-modal a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }
  .feedback-modal a:hover {
    text-decoration: underline;
  }
  .feedback-modal form input[type="text"]:focus,
  .feedback-modal form input[type="email"]:focus,
  .feedback-modal form textarea:focus {
    outline: none;
    border-color: #2563eb;
    // box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  .feedback-modal form input[type="text"]::placeholder,
  .feedback-modal form input[type="email"]::placeholder,
  .feedback-modal form textarea::placeholder {
    color: #aaa;
  }
  .feedback-modal form input[type="text"]:disabled,

  .feedback-modal textarea {
    width: auto;
    height: 100px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    resize: vertical;
  }
    .validating-error-message {
    color: #f00;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 0;
    padding: 16px;
    background-color: rgba(255, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #f00;
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.2);
    animation: shake 0.5s ease-in-out;
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  .feedback-modal p.error-msg {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  color: #f00;
  font-size: 0.875rem;
  margin: 0;
  transition: opacity 0.5s ease, max-height 0.5s ease;
}

.feedback-modal p.error-msg.show {
  opacity: 1;
  max-height: 60px;
}
  @keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.modal-fade-out {
  animation: fadeOut 0.4s ease-out forwards;
}

`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const SITE_ID = siteId || "YOUR_SITE_ID";
  const SESSION_START_KEY = "feedbackhub-session-start";
  const VISITOR_ID_KEY = "visitorId";
  const GEO_CACHE_KEY = "geoData";
  const GEO_CACHE_DURATION = 24 * 60 * 60 * 1000;

  function getOrCreateVisitorId() {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
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

  async function getCachedLocation() {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < GEO_CACHE_DURATION) {
          return parsed.data;
        }
      } catch (err) {
        console.warn("Failed to parse cached geo data:", err);
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
        JSON.stringify({ timestamp: Date.now(), data: geoData })
      );
      return geoData;
    } catch (err) {
      console.warn("Geolocation lookup failed:", err);
      return null;
    }
  }

  function getFeedBackUserInfo(email = "", geo = {}) {
    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      ip: geo.ip || undefined,
      location:
        geo.city && geo.country ? `${geo.city}, ${geo.country}` : undefined,
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

  const VISITOR_TRACKED_KEY = "feedbackhub-visitor-tracked";

  async function trackVisitorSession() {
    const alreadyTracked = localStorage.getItem(VISITOR_TRACKED_KEY);
    if (alreadyTracked) return;

    const visitorId = getOrCreateVisitorId();
    const geo = await fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .catch(() => ({}));

    const payload = {
      siteId: SITE_ID,
      visitorId,
      visitTimestamp: new Date().toISOString(),
      sessionStart: getSessionStart(),
      page: window.location.href,
      userInfo: getUserInfo(),
      country: geo.country || "Unknown",
      region: geo.region || "",
      city: geo.city || "",
      pagesVisited: [
        { url: window.location.href, timestamp: new Date().toISOString() },
      ],
    };

    try {
      await fetch("https://your-api.com/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      localStorage.setItem(VISITOR_TRACKED_KEY, "true");
    } catch (err) {
      console.error("Visitor tracking failed:", err);
    }
  }

  function trackPageVisit(url) {
    const visitorId = getOrCreateVisitorId();
    const pageVisit = {
      siteId: SITE_ID,
      visitorId,
      sessionStart: getSessionStart(),
      page: url,
      timestamp: new Date().toISOString(),
    };

    fetch("https://your-api.com/track-page-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageVisit),
    }).catch((err) => console.error("Page visit tracking failed:", err));
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

  function setupFeedbackWidget() {
    const visitorId = getOrCreateVisitorId();

    const button = document.createElement("button");
    button.className = "feedback-button";
    button.textContent = "Feedback";
    document.body.appendChild(button);

    const modalContainer = document.createElement("div");
    modalContainer.className = "feedback-modal-container";
    modalContainer.style.display = "none";
    document.body.appendChild(modalContainer);

    const modal = document.createElement("div");
    modal.className = "feedback-modal";

    button.addEventListener("click", () => {
      modalContainer.style.display = "flex";
      modalContainer.appendChild(modal);
      modal.innerHTML = `<p class="modal-validating">Validating...</p>`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      fetch(`https://your-api.com/validate-site?siteId=${SITE_ID}`, {
        signal: controller.signal,
      })
        .then((res) => {
          clearTimeout(timeout);
          if (!res.ok) throw new Error("Invalid site ID");
          return res.json();
        })
        .then(() => {
          renderFeedbackForm();
        })
        .catch((err) => {
          clearTimeout(timeout);
          const message =
            err.name === "AbortError"
              ? "Request timed out. Please check your internet connection."
              : err.message === "Invalid site ID"
              ? "Widget not configured properly. Please contact the site admin."
              : err.message === "Failed to fetch"
              ? "Failed to fetch validation data. Please check your internet connection."
              : "Network error. Please try again later.";
          modal.innerHTML = `<p class="validating-error-message">${message}</p>`;
          console.error("FeedbackHub validation error:", err);
        });
    });

    function renderFeedbackForm() {
      modal.innerHTML = `
    <h3>Feedback Modal</h3>
    <form id="feedback-form" enctype="multipart/form-data">
      <input type="text" placeholder="Your name..." id="fb-name" />
      <p class="error-msg" id="error-name" >Name must be at least 3 characters.</p>

      <input type="email" placeholder="Your email..." id="fb-email" />
      <p class="error-msg" id="error-email" >Please enter a valid email.</p>

      <input type="text" placeholder="Feedback title..." id="fb-title" />
      <p class="error-msg" id="error-title" >Title must be at least 5 characters.</p>

      <textarea placeholder="Your feedback..." id="fb-description" required></textarea>
      <p class="error-msg" id="error-description" >Description must be at least 10 characters.</p>

      <select id="fb-type">
        <option value="other">Other</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
      </select>

      <input type="file" accept="image/*" id="fb-screenshot" />
      <button type="submit" class="submit-feedback">Submit</button>
    </form>

    <p>We value your feedback!</p>
    <p>For more info, visit our <a href="https://example.com/about" target="_blank" rel="noopener noreferrer">About</a>.</p>
    <button class="close-modal">Close</button>
  `;

      const form = modal.querySelector("#feedback-form");

      const nameInput = form.querySelector("#fb-name");
      const emailInput = form.querySelector("#fb-email");
      const titleInput = form.querySelector("#fb-title");
      const descInput = form.querySelector("#fb-description");
      const submitButton = form.querySelector(".submit-feedback");

      const errorName = form.querySelector("#error-name");
      const errorEmail = form.querySelector("#error-email");
      const errorTitle = form.querySelector("#error-title");
      const errorDesc = form.querySelector("#error-description");

      const validators = {
        name: (value) =>
          value.length >= 3 ? "" : "Title must be at least 3 characters.",
        email: (value) =>
          !value
            ? "Email is required."
            : !/^\S+@\S+\.\S+$/.test(value)
            ? "Please enter a valid email."
            : "",
        title: (value) =>
          value.length >= 5 ? "" : "Title must be at least 5 characters.",
        description: (value) =>
          value.length >= 10
            ? ""
            : "Description must be at least 10 characters.",
      };

      function toggleError(el, input, errorMessage) {
        if (errorMessage) {
          el.textContent = errorMessage;
          el.classList.add("show");
          input.style.borderColor = "#f00";
        } else {
          el.classList.remove("show");
          input.style.borderColor = "";
        }
      }

      nameInput.addEventListener("blur", () => {
        const error = validators.name(nameInput.value.trim());
        toggleError(errorName, nameInput, error);
      });
      nameInput.addEventListener("input", () => {
        toggleError(errorName, nameInput, "");
      });

      emailInput.addEventListener("blur", () => {
        const error = validators.email(emailInput.value.trim());
        toggleError(errorEmail, emailInput, error);
      });
      emailInput.addEventListener("input", () => {
        toggleError(errorEmail, emailInput, "");
      });

      titleInput.addEventListener("blur", () => {
        const error = validators.title(titleInput.value.trim());
        toggleError(errorTitle, titleInput, error);
      });
      titleInput.addEventListener("input", () => {
        toggleError(errorTitle, titleInput, "");
      });

      descInput.addEventListener("blur", () => {
        const error = validators.description(descInput.value.trim());
        toggleError(errorDesc, descInput, error);
      });
      descInput.addEventListener("input", () => {
        toggleError(errorDesc, descInput, "");
      });

      modal.querySelector(".close-modal").addEventListener("click", () => {
        modalContainer.style.display = "none";
        modal.innerHTML = "";
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim() || "Anonymous";
        const email = emailInput.value.trim();
        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        const type = form.querySelector("#fb-type").value;
        const file = form.querySelector("#fb-screenshot").files[0];

        // Clear all errors first
        errorName.textContent = "";
        errorEmail.textContent = "";
        errorTitle.textContent = "";
        errorDesc.textContent = "";

        let hasError = false;

        const emailError = validators.email(email);
        const titleError = validators.title(title);
        const descError = validators.description(description);

        if (emailError) {
          errorEmail.textContent = emailError;
          hasError = true;
        }
        if (titleError) {
          errorTitle.textContent = titleError;
          hasError = true;
        }
        if (descError) {
          errorDesc.textContent = descError;
          hasError = true;
        }

        if (hasError) return;

        // Disable form inputs
        form
          .querySelectorAll("input, textarea, select, button")
          .forEach((el) => (el.disabled = true));
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        submitButton.classList.add("modal-validating");

        try {
          const geo = await getCachedLocation();
          const userInfo = getFeedBackUserInfo(email, geo);
          const context = getPageContext();

          const formData = new FormData();
          formData.append("siteId", SITE_ID);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("name", name);
          formData.append("type", type);
          formData.append("visitorId", visitorId);
          formData.append("userInfo", JSON.stringify(userInfo));
          formData.append("context", JSON.stringify(context));
          if (file) formData.append("screenshot", file);

          await fetch("https://your-api.com/feedback", {
            method: "POST",
            body: formData,
          });

          modal.innerHTML = "<p>Thanks for your feedback!</p>";
          modal.classList.add("modal-fade-out");

          setTimeout(() => {
            modalContainer.style.display = "none";
            modal.classList.remove("modal-fade-out");
            modal.innerHTML = "";
          }, 400);
        } catch (err) {
          console.error("Submission error:", err);
          modal.innerHTML = `<p class="validating-error-message">Failed to submit feedback. Try again later.</p>`;
        }
      });
    }
  }

  (async () => {
    await trackVisitorSession();
    overrideHistoryMethods();
    setupFeedbackWidget();
  })();
});
