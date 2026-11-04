/* =============================================================
   1920×1080 固定舞台
   每一屏始终按 16:9 等比缩放，不随窗口比例重排。
   ============================================================= */
(function () {
  var W = 1920;
  var H = 1080;
  var root = document.documentElement;
  var raf = 0;

  function apply() {
    raf = 0;
    var vw = window.innerWidth || W;
    var vh = window.innerHeight || H;
    var s = Math.min(vw / W, vh / H);
    // 避免 0.9999 这类浮点误差导致 1px 缝隙
    s = Math.round(s * 10000) / 10000;
    root.style.setProperty('--stage-s', String(s));
    root.setAttribute('data-stage', 'on');
  }

  function schedule() {
    if (raf) return;
    raf = window.requestAnimationFrame(apply);
  }

  /* ---------------------------------------------------------------
     滚轮翻屏
     画布用 zoom 缩放后，Chrome 会忽略 CSS scroll-snap，于是这里补一层
     整屏翻页：一次滚轮手势前进/后退一屏，带冷却避免连跳。
     --------------------------------------------------------------- */
  function initSnap() {
    var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    if (slides.length < 2 && document.querySelector('main')) {
      // GigsMesh 这类用 main > section 分屏的项目
      slides = Array.prototype.slice.call(document.querySelectorAll('main > section'));
    }
    if (slides.length < 2) return;

    var lockedUntil = 0;

    function nearest() {
      var mid = window.innerHeight / 2;
      var best = 0;
      var bestGap = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var r = slides[i].getBoundingClientRect();
        var gap = Math.abs((r.top + r.bottom) / 2 - mid);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      }
      return best;
    }

    function step(dir) {
      var now = Date.now();
      if (now < lockedUntil) return true;
      var next = nearest() + dir;
      if (next < 0 || next >= slides.length) return false;
      lockedUntil = now + 640;
      slides[next].scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
      return true;
    }

    window.addEventListener(
      'wheel',
      function (e) {
        if (e.ctrlKey || e.metaKey) return;
        if (Math.abs(e.deltaY) < 3) return;
        if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
      },
      { passive: false }
    );
  }

  apply();
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  window.addEventListener('load', initSnap, { once: true });
})();
