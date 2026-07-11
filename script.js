const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const syncHeader = () => {
  const hasScrolled = window.scrollY > 12;
  if (header) {
    header.classList.toggle("is-scrolled", hasScrolled);
  }
  document.body.classList.toggle("has-scrolled", hasScrolled);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-faq]").forEach((faq) => {
  const tabs = [...faq.querySelectorAll(".faq-tab")];
  const section = faq.closest(".faq-section");
  const panels = [...(section || document).querySelectorAll(".faq-panel")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("aria-controls");

      tabs.forEach((item) => {
        const isCurrent = item === tab;
        item.classList.toggle("is-active", isCurrent);
        item.setAttribute("aria-expanded", String(isCurrent));
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === target);
      });
    });
  });
});

document.querySelectorAll("[data-faq-toggle]").forEach((toggle) => {
  const accordion = toggle.closest("[data-faq-more]").querySelector("[data-faq-accordion]");
  const label = toggle.querySelector("[data-faq-toggle-label]");
  toggle.addEventListener("click", () => {
    const isOpen = accordion.hasAttribute("hidden");
    if (isOpen) {
      accordion.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      if (label) label.textContent = "Read less";
    } else {
      accordion.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      if (label) label.textContent = "Read more";
    }
  });
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    form.reset();

    if (status) {
      status.textContent = "Thank you. Your note is ready for the Acoustic States team.";
    }
  });
});
