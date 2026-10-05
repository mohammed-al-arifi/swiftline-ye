/**
 * Swift Line Shipping & Stevedoring
 * Main JavaScript — Bilingual (AR/EN), Dark/Light Mode,
 * Mobile Nav, Scroll Animations, Contact Form
 */

'use strict';

/* =========================================================
   CONSTANTS & STATE
   ========================================================= */
const STORAGE_LANG  = 'sl_lang';
const STORAGE_THEME = 'sl_theme';

let currentLang  = 'ar';
let currentTheme = 'light';

/* =========================================================
   1. LANGUAGE SYSTEM
   ========================================================= */

/**
 * All bilingual text content (Arabic / English).
 * Attributes on elements (data-ar / data-en) handle most content.
 * This section handles meta tags, title, and any programmatic text.
 */
const metaContent = {
  ar: {
    title: 'سويفت لاين للشحن والتفريغ والخدمات الملاحية | الحديدة اليمن',
    desc:  'سويفت لاين للشحن والتفريغ والخدمات الملاحية — شركة يمنية متخصصة في أعمال التفريغ ومناولة البضائع والخدمات المينائية في ميناء الحديدة وميناء الصليف وميناء رأس عيسى.',
    ogTitle: 'سويفت لاين للشحن والتفريغ والخدمات الملاحية | الحديدة اليمن',
    ogDesc:  'شركة يمنية متخصصة في أعمال التفريغ ومناولة البضائع والخدمات المينائية في موانئ الحديدة.'
  },
  en: {
    title: 'Swift Line Shipping & Stevedoring | Al Hudaydah, Yemen',
    desc:  'Swift Line Shipping & Stevedoring — A Yemeni company specialized in stevedoring, cargo handling, and port services at Al Hudaydah Port, Al Salif Port, and Ras Isa Port.',
    ogTitle: 'Swift Line Shipping & Stevedoring | Al Hudaydah, Yemen',
    ogDesc:  'Yemeni company specialized in stevedoring, cargo handling, and port-related services in Al Hudaydah.'
  }
};

function setLang(lang) {
  if (lang !== 'ar' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem(STORAGE_LANG, lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const html = document.documentElement;
  const body = document.body;

  // Direction & lang attribute
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  body.setAttribute('data-lang', lang);

  // Update all data-ar / data-en elements
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    const text = lang === 'ar' ? el.dataset.ar : el.dataset.en;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // handled below via placeholder
    } else {
      el.textContent = text;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'ar' ? el.dataset.arPlaceholder : el.dataset.enPlaceholder;
  });

  // Update <select> options
  document.querySelectorAll('select option[data-ar][data-en]').forEach(opt => {
    opt.textContent = lang === 'ar' ? opt.dataset.ar : opt.dataset.en;
  });

  // Update meta
  const mc = metaContent[lang];
  document.getElementById('meta-title').textContent = mc.title;
  document.title = mc.title;

  const metaDesc = document.getElementById('meta-desc');
  if (metaDesc) metaDesc.setAttribute('content', mc.desc);

  const ogTitle = document.getElementById('og-title');
  if (ogTitle) ogTitle.setAttribute('content', mc.ogTitle);

  const ogDesc = document.getElementById('og-desc');
  if (ogDesc) ogDesc.setAttribute('content', mc.ogDesc);

  // Update language switcher buttons
  updateLangButtons(lang);

  // Update mobile lang button
  const mobileLangBtn = document.getElementById('mobile-lang-btn');
  if (mobileLangBtn) {
    mobileLangBtn.textContent = lang === 'ar' ? 'EN' : 'عر';
  }
}

function updateLangButtons(lang) {
  // Header lang buttons
  const btnAr = document.getElementById('btn-ar');
  const btnEn = document.getElementById('btn-en');
  if (btnAr && btnEn) {
    btnAr.classList.toggle('active', lang === 'ar');
    btnAr.setAttribute('aria-pressed', String(lang === 'ar'));
    btnEn.classList.toggle('active', lang === 'en');
    btnEn.setAttribute('aria-pressed', String(lang === 'en'));
  }

  // Footer lang buttons
  const fBtnAr = document.getElementById('footer-btn-ar');
  const fBtnEn = document.getElementById('footer-btn-en');
  if (fBtnAr && fBtnEn) {
    fBtnAr.classList.toggle('active', lang === 'ar');
    fBtnEn.classList.toggle('active', lang === 'en');
  }
}

function toggleMobileLang() {
  setLang(currentLang === 'ar' ? 'en' : 'ar');
}

/* =========================================================
   2. THEME SYSTEM
   ========================================================= */

function toggleTheme() {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem(STORAGE_THEME, theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(`theme-${theme}`);

  // Update all theme icon buttons
  document.querySelectorAll('.theme-icon').forEach(icon => {
    icon.textContent = theme === 'light' ? '☾' : '☀';
    icon.closest('.theme-btn').setAttribute('aria-label',
      theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
    );
  });
}

function detectInitialTheme() {
  const saved = localStorage.getItem(STORAGE_THEME);
  if (saved) return saved;
  // System preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/* =========================================================
   3. MOBILE NAVIGATION
   ========================================================= */

let mobileMenuOpen = false;

function toggleMobileMenu() {
  mobileMenuOpen ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
  mobileMenuOpen = true;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  mobileNav?.classList.add('open');
  mobileNav?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenuOpen = false;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileNav?.classList.remove('open');
  mobileNav?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOpen) closeMobileMenu();
});

/* =========================================================
   4. HEADER SCROLL BEHAVIOR
   ========================================================= */

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        // Compact header
        header.classList.toggle('scrolled', scrollY > 60);

        // Back to top button
        if (backToTop) {
          backToTop.classList.toggle('visible', scrollY > 400);
        }

        lastScrollY = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial call
}

/* =========================================================
   5. ACTIVE NAV LINK (Scroll Spy)
   ========================================================= */

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(s => observer.observe(s));
}

/* =========================================================
   6. SCROLL REVEAL ANIMATIONS
   ========================================================= */

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* =========================================================
   7. SMOOTH SCROLL (for older browsers / edge cases)
   ========================================================= */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72'
      );
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =========================================================
   8. CONTACT FORM (mailto fallback)
   ========================================================= */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    // Build email body
    const name    = form.name.value.trim();
    const company = form.company.value.trim();
    const email   = form.email.value.trim();
    const phone   = form.phone.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    const isAr = currentLang === 'ar';

    // Get service label
    const serviceOption = form.service.options[form.service.selectedIndex];
    const serviceLabel = serviceOption ? serviceOption.textContent : service;

    let subject, body;
    if (isAr) {
      subject = `استفسار من ${name} — سويفت لاين`;
      body = [
        `الاسم: ${name}`,
        company ? `الشركة: ${company}` : '',
        `البريد الإلكتروني: ${email}`,
        phone ? `الهاتف: ${phone}` : '',
        `الخدمة المطلوبة: ${serviceLabel}`,
        '',
        `الرسالة:`,
        message,
        '',
        '---',
        'تم الإرسال عبر موقع سويفت لاين'
      ].filter(Boolean).join('\n');
    } else {
      subject = `Inquiry from ${name} — Swift Line`;
      body = [
        `Name: ${name}`,
        company ? `Company: ${company}` : '',
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        `Service: ${serviceLabel}`,
        '',
        `Message:`,
        message,
        '',
        '---',
        'Sent via swiftline-ye.com'
      ].filter(Boolean).join('\n');
    }

    const mailto = `mailto:contact@swiftline-ye.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

function validateForm(form) {
  let valid = true;

  // Name
  const name    = form.name.value.trim();
  const nameErr = document.getElementById('fname-error');
  if (!name) {
    showError(nameErr, form.name, currentLang === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name');
    valid = false;
  } else {
    clearError(nameErr, form.name);
  }

  // Email
  const email    = form.email.value.trim();
  const emailErr = document.getElementById('femail-error');
  if (!email || !isValidEmail(email)) {
    showError(emailErr, form.email, currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
    valid = false;
  } else {
    clearError(emailErr, form.email);
  }

  // Service
  const service    = form.service.value;
  const serviceErr = document.getElementById('fservice-error');
  if (!service) {
    showError(serviceErr, form.service, currentLang === 'ar' ? 'يرجى اختيار الخدمة المطلوبة' : 'Please select a service');
    valid = false;
  } else {
    clearError(serviceErr, form.service);
  }

  // Message
  const message    = form.message.value.trim();
  const messageErr = document.getElementById('fmessage-error');
  if (!message || message.length < 10) {
    showError(messageErr, form.message, currentLang === 'ar' ? 'يرجى كتابة رسالتك (10 أحرف على الأقل)' : 'Please write your message (at least 10 characters)');
    valid = false;
  } else {
    clearError(messageErr, form.message);
  }

  return valid;
}

function showError(errorEl, inputEl, msg) {
  if (errorEl) errorEl.textContent = msg;
  if (inputEl) inputEl.classList.add('error');
}

function clearError(errorEl, inputEl) {
  if (errorEl) errorEl.textContent = '';
  if (inputEl) inputEl.classList.remove('error');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear errors on input
function initFormInputClear() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errId = input.id + '-error';
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    });
  });
}

/* =========================================================
   9. LOGO FALLBACK (if logo.png not yet placed)
   ========================================================= */

function initLogoFallback() {
  const logos = document.querySelectorAll('img[src="images/logo.png"]');
  logos.forEach(img => {
    img.addEventListener('error', () => {
      // Replace broken logo img with styled text fallback
      const span = document.createElement('span');
      span.className = 'logo-text-fallback';
      span.innerHTML = '<span class="logo-sl">SL</span><span class="logo-name">Swift Line</span>';
      img.parentNode.replaceChild(span, img);
    });
  });
}

/* =========================================================
   10. INIT
   ========================================================= */

function init() {
  // 1. Theme — apply before paint to avoid flash
  const savedTheme = detectInitialTheme();
  applyTheme(savedTheme);
  currentTheme = savedTheme;

  // 2. Language
  const savedLang = localStorage.getItem(STORAGE_LANG) || 'ar';
  applyLanguage(savedLang);
  currentLang = savedLang;

  // 3. Header scroll
  initHeaderScroll();

  // 4. Scroll spy
  initScrollSpy();

  // 5. Scroll reveal
  initScrollReveal();

  // 6. Smooth scroll
  initSmoothScroll();

  // 7. Contact form
  initContactForm();
  initFormInputClear();

  // 8. Logo fallback
  initLogoFallback();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* =========================================================
   11. THEME TRANSITION SAFETY
   ========================================================= */
// Apply theme class immediately to prevent flash on load
(function() {
  const saved = localStorage.getItem('sl_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.body.classList.add(`theme-${theme}`);
})();
