// Tier-1 technique: scroll-driven mask reveal on the hero word.
// Reduced motion: word stays static at scale(1) — see the CSS override too.
(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wrap = document.getElementById("hero-wrap");
  var word = document.getElementById("hero-word");

  if (!prefersReduced && wrap && word) {
    var raf = 0;
    var onScroll = function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var rect = wrap.getBoundingClientRect();
        var total = rect.height - window.innerHeight;
        var progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        var scale = 1 + progress * 4.2;
        word.style.transform = "scale(" + scale + ")";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Magnetic pull on the "Réserver" buttons.
  ["reserve-btn", "reserve-btn-2"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("pointermove", function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = "translate(" + x * 0.18 + "px, " + y * 0.3 + "px)";
    });
    el.addEventListener("pointerleave", function () {
      el.style.transform = "translate(0, 0)";
    });
  });
})();
