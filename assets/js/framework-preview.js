(function () {
  "use strict";

  function initFrameworkPreview() {
    const triggers = document.querySelectorAll("[data-framework-preview]");
    if (!triggers.length) return;

    const modal = document.createElement("div");
    modal.className = "framework-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Enlarged framework image");

    const content = document.createElement("div");
    content.className = "framework-modal__content";

    const modalImage = document.createElement("img");
    modalImage.className = "framework-modal__image";
    modalImage.alt = "";

    const closeButton = document.createElement("button");
    closeButton.className = "framework-modal__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close enlarged framework image");
    closeButton.textContent = "×";

    content.appendChild(modalImage);
    content.appendChild(closeButton);
    modal.appendChild(content);
    document.body.appendChild(modal);

    let trigger = null;

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.classList.remove("framework-modal-open");
      if (trigger) trigger.focus();
    }

    function openModal(nextTrigger) {
      const image = nextTrigger.querySelector("img");
      if (!image) return;

      trigger = nextTrigger;
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt || "Framework image";
      modal.classList.add("is-open");
      document.body.classList.add("framework-modal-open");
      closeButton.focus();
    }

    triggers.forEach(function (preview) {
      preview.addEventListener("click", function () {
        openModal(preview);
      });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFrameworkPreview);
  } else {
    initFrameworkPreview();
  }
})();
