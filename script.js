/* Woven Expert - site interactions */

// Update the copyright year automatically.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
});

// Smooth-scroll in-page links and close the mobile menu after selection.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    const menu = document.getElementById("mainNavbar");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Validate each form and prepare an email to Woven Expert.
// This opens the visitor's default email application; it does not send silently.
document.querySelectorAll(".contact-email-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const serviceOrSubject = String(data.get("service") || data.get("subject") || "Website inquiry").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Woven Expert inquiry: ${serviceOrSubject}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService / Subject: ${serviceOrSubject}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:wovenexpert@gmail.com?subject=${subject}&body=${body}`;
  });
});

// Reveal sections and service cards when they enter the viewport.
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  items.forEach((item) => observer.observe(item));
});

// Attempt muted autoplay. If playback is blocked, the poster image remains visible.
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video");
  if (!video) return;
  const playback = video.play();
  if (playback && typeof playback.catch === "function") playback.catch(() => {});
});
