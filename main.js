// ============================================================
//   Portfolio scripts
//   Mobile menu · nav scroll state · scroll progress ·
//   reveal-on-scroll · footer year
//   No dependencies. Everything degrades gracefully.
// ============================================================
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mobile menu ----------
  var btn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');

  if (btn && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    };

    btn.addEventListener('click', function () {
      setMenu(btn.getAttribute('aria-expanded') !== 'true');
    });

    // Close after tapping a link
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close on Escape, return focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        btn.focus();
      }
    });

    // Close when tapping outside the header
    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') === 'true' && !e.target.closest('header.nav')) {
        setMenu(false);
      }
    });

    // Reset when resizing back to desktop
    var desktop = window.matchMedia('(min-width: 761px)');
    var onBreakpoint = function (e) { if (e.matches) setMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  // ---------- Nav shadow + scroll progress ----------
  var nav = document.querySelector('header.nav');
  var bar = null;

  if (nav) {
    var progress = document.createElement('div');
    progress.className = 'progress';
    progress.setAttribute('aria-hidden', 'true');
    bar = document.createElement('span');
    progress.appendChild(bar);
    document.body.appendChild(progress);
  }

  var ticking = false;

  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;

    if (nav) nav.classList.toggle('scrolled', y > 20);

    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';
    }

    ticking = false;
  };

  if (nav) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Reveal on scroll ----------
  // .reveal starts hidden only when <html class="js"> is set, so the page
  // stays fully readable if this script never runs.
  var revealables = document.querySelectorAll('.reveal');

  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      for (var i = 0; i < revealables.length; i++) revealables[i].classList.add('in');
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  // ---------- Footer year ----------
  var year = String(new Date().getFullYear());
  document.querySelectorAll('.yr').forEach(function (el) { el.textContent = year; });
})();
