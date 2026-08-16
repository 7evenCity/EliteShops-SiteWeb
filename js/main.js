/* ELITE SHOPS — interactions */
(function () {
  'use strict';

  /* ============================================================
     CHECKOUT LINKS (Sellix on-site modal)
     Paste your Sellix product IDs below, e.g. "AbC123XyZ"
     (find them in Sellix Dashboard -> Products -> product ID)
     When an ID is filled in, the Buy button opens Sellix's
     payment modal directly on this page — no redirect.
     ============================================================ */
  var SELLIX_PRODUCT_IDS = {
    elitecleaner: '',
    icarus: '',
    elitetweak: ''
  };

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
    var key = btn.getAttribute('data-checkout') || '';
    var productId = (SELLIX_PRODUCT_IDS[key] || '').trim();

    if (productId) {
      btn.setAttribute('data-sellix-product-id', productId);
      btn.setAttribute('data-sellix-custom-total', 'true');
      btn.classList.add('sellix-checkout');
    }

    btn.addEventListener('click', function (e) {
      if (!productId) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showToast('Checkout not configured yet — paste your Sellix product ID in js/main.js');
      }
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