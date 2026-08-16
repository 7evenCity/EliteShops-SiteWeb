/* ELITE SHOPS — interactions */
(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  document.querySelectorAll('.buy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Checkout coming soon — join the Discord for early access!');
    });
  });

  var revealEls = document.querySelectorAll('.product-card, .trust-card, .discord-inner, .hero-logo-wrap');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10 ? '0 10px 40px rgba(0,0,0,.45)' : 'none';
    }
  }, { passive: true });
})();