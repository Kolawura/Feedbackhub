const scriptTag = document.currentScript;
const siteId = scriptTag?.getAttribute("data-site-id");

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
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.className = "feedback-button";
  button.textContent = "Feedback";
  document.body.appendChild(button);

  // Create the modal
  const modalContainer = document.createElement("div");
  modalContainer.className = "feedback-modal-container";
  document.body.appendChild(modalContainer);
  const modal = document.createElement("div");
  modal.className = "feedback-modal";

  button.addEventListener("click", () => {
    modalContainer.style.display = "flex";

    modal.innerHTML = `<p class="modal-validating">Validating...</p>`;
    modalContainer.appendChild(modal);

    // CHECK IF SITE IS REGISTERED

    // SET A 5s TIMEOUT FOR THE REQUEST
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // fetch(`https://your-api.com/validate-site?siteId=${siteId}`, {
    //   signal: controller.signal,
    // })
    //   .then((res) => {
    //     clearTimeout(timeout);
    //     if (!res.ok) throw new Error("Invalid site ID");
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    modal.innerHTML = `
            <h3>Feedback Modal</h3>
            <form id="feedback-form">
            <input type="text" placeholder="Your name..." />
            <input type="email" placeholder="Your email..." />
            <textarea placeholder="Your feedback..."></textarea>
            <button class="submit-feedback">Submit</button>
            </form>
            <p>We value your feedback!</p>
            <p>For more information, visit our <a href="https://example.com/about" target="_blank">About</a>.</p>   
            <button class="close-modal">Close</button>
          `;

    modal.querySelector(".close-modal").addEventListener("click", () => {
      modalContainer.style.display = "none";
    });

    modal.querySelector("button").onclick = () => {
      const Name = modal.querySelector('input[type="text"]').value;
      const Email = modal.querySelector('input[type="email"]').value;
      const Feedback = modal.querySelector("textarea").value;
      if (Feedback) {
        fetch("https://your-api.com/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: Name,
            email: Email,
            feedback: Feedback,
            siteId: siteId,
          }),
        }).then(() => {
          modal.innerHTML = "<p >Thanks for your feedback!</p>";
          setTimeout(() => {
            modalContainer.style.display = "none";
          }, 2000);
        });
      }
    };
    // })
    // .catch((err) => {
    //   clearTimeout(timeout); // CLEAR TIMEOUT
    //   const message =
    //     err.name === "AbortError"
    //       ? "Request timed out. Please check your internet connection."
    //       : err.message === "Invalid site ID"
    //       ? "Widget not configured properly. Please contact the site admin."
    //       : "Network error. Please try again later.";
    //   modal.innerHTML = `<p class="validating-error-message">${message}</p>`;
    //   console.error("FeedbackHub validation error:", err);
    // });
  });
});
