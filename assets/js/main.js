// Portfolio : menu mobile, en-tête au défilement, apparition des blocs.
(function () {
  "use strict";
  document.getElementById("annee").textContent = new Date().getFullYear();

  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  var top = document.querySelector(".top");
  function onScroll() { top.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".section .eyebrow, .section h2, .section-lead, .skill, .case, .project, .fam, .contact-card");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  targets.forEach(function (el) {
    el.classList.add("reveal");
    var same = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.tagName === el.tagName; });
    var i = same.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i, 4) * 0.09 + "s";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  targets.forEach(function (el) { io.observe(el); });
  // Filet de sécurité : tout bloc déjà à l'écran est affiché
  var pending = false;
  function revealVisible() {
    pending = false;
    targets.forEach(function (el) {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add("in");
    });
  }
  window.addEventListener("scroll", function () { if (!pending) { pending = true; requestAnimationFrame(revealVisible); } }, { passive: true });
  window.addEventListener("load", revealVisible);
  window.addEventListener("hashchange", function () { setTimeout(revealVisible, 50); });
  setTimeout(revealVisible, 600);
  setTimeout(revealVisible, 1500);
})();
