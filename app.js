/* Freelance Painters Marlborough — shared behaviour */
(function () {
  "use strict";

  // Intro overlay fade out
  function reveal() { document.body.classList.add("loaded"); }
  if (document.readyState === "complete") { setTimeout(reveal, 350); }
  else { window.addEventListener("load", function () { setTimeout(reveal, 350); }); }
  // safety fallback
  setTimeout(reveal, 2200);

  document.addEventListener("DOMContentLoaded", function () {
    // Nav scrolled state
    var nav = document.querySelector(".nav");
    function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    var burger = document.querySelector(".burger");
    var links = document.querySelector(".nav-links");
    if (burger && links) {
      burger.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
          burger.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Hero slideshow crossfade
    var slides = document.querySelectorAll(".hero-slides .slide");
    if (slides.length > 1) {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        var i = 0;
        setInterval(function () {
          slides[i].classList.remove("active");
          i = (i + 1) % slides.length;
          slides[i].classList.add("active");
        }, 5200);
      }
    }

    // Scroll reveal
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in"); });
    }

    // Build Gmail compose links from parts (avoids Cloudflare email obfuscation)
    document.querySelectorAll("a[data-gmail]").forEach(function (a) {
      var to = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
      a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) +
        "&su=" + (a.getAttribute("data-su") || "") +
        "&body=" + (a.getAttribute("data-body") || "");
      a.target = "_blank";
      a.rel = "noopener";
    });
  });
})();
