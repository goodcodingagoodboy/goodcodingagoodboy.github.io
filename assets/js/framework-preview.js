(function () {
  "use strict";

  function initFrameworkPreview() {
    const frameworkImages = document.querySelectorAll(".paper-box-image img");
    if (!frameworkImages.length) return;

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

    let triggerImage = null;

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.classList.remove("framework-modal-open");
      if (triggerImage) triggerImage.focus();
    }

    function openModal(image) {
      triggerImage = image;
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt || "Framework image";
      modal.classList.add("is-open");
      document.body.classList.add("framework-modal-open");
      closeButton.focus();
    }

    frameworkImages.forEach(function (image) {
      image.classList.add("framework-preview-trigger");
      image.setAttribute("tabindex", "0");
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", "Open enlarged framework image");

      image.addEventListener("click", function () {
        openModal(image);
      });

      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(image);
        }
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
