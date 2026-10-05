(function () {
  "use strict";
  var cfg = window.VERONA || {};

  /* ---------- Links e textos vindos de config.js ---------- */
  function external(a, href) {
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
  }

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var item = cfg.whatsapp && cfg.whatsapp[a.dataset.wa];
    if (!item) return;
    external(a, "https://wa.me/" + item.phone + "?text=" + encodeURIComponent(item.message));
  });

  document.querySelectorAll("[data-link]").forEach(function (a) {
    var href = cfg[a.dataset.link];
    if (href) external(a, href);
  });

  document.querySelectorAll("[data-text]").forEach(function (el) {
    var text = cfg[el.dataset.text];
    if (text) el.textContent = text;
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Barra de navegação aparece depois do cartão principal ---------- */
  var bar = document.getElementById("bar");
  var hero = document.getElementById("inicio");
  if (bar && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-on", !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  }

  /* ---------- Visualizador de fotos ---------- */
  var box = document.getElementById("lightbox");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  if (!box || !shots.length) return;

  var img = document.getElementById("lightbox-img");
  var cap = document.getElementById("lightbox-cap");
  var current = 0;

  function show(i) {
    current = (i + shots.length) % shots.length;
    var src = shots[current].querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = shots[current].querySelector(".shot__cap").textContent;
  }

  function open(i) {
    show(i);
    if (typeof box.showModal === "function") box.showModal();
    else box.setAttribute("open", "");
  }

  shots.forEach(function (b, i) {
    b.addEventListener("click", function () { open(i); });
  });

  box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });

  // clique fora da foto fecha
  box.addEventListener("click", function (e) {
    if (e.target === box) box.close();
  });

  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
