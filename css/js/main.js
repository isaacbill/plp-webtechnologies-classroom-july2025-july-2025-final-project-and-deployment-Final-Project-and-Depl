// main.js - handles nav toggle, filters, gallery lightbox, form validation, and small helpers

document.addEventListener('DOMContentLoaded', function () {
  // year in footer(s)
  const year = new Date().getFullYear();
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('year' + (i === 1 ? '' : i));
    if (el) el.textContent = year;
  }
  if (document.getElementById('year')) document.getElementById('year').textContent = year;

  // Nav toggle for mobile (single control on page)
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // Use aria-hidden on nav to control display in CSS
      const hidden = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!hidden));
    });
    // init
    nav.setAttribute('aria-hidden', 'true');
  }

  // Projects filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Gallery lightbox
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (galleryGrid && lightbox && lightboxImg) {
    galleryGrid.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.setAttribute('aria-hidden', 'false');
    });
    lightboxClose.addEventListener('click', () => {
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    });
    lightbox.addEventListener('click', (evt) => {
      if (evt.target === lightbox) {
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
      }
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') lightbox.setAttribute('aria-hidden', 'true');
    });
  }

 // Contact form validation and fake submit
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const status = document.getElementById('form-status');
    const btn = form.querySelector('button[type="submit"]');

    // reset status
    status.className = 'form-status';

    // simple client-side checks
    if (!name.value || name.value.length < 2) {
      status.textContent = '⚠️ Please enter your name (2+ characters).';
      status.classList.add('error');
      name.focus();
      return;
    }
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
      status.textContent = '⚠️ Please provide a valid email.';
      status.classList.add('error');
      email.focus();
      return;
    }
    if (!message.value || message.value.length < 10) {
      status.textContent = '⚠️ Message is too short (10+ characters).';
      status.classList.add('error');
      message.focus();
      return;
    }

    // simulate sending
    status.textContent = '⏳ Sending…';
    btn.disabled = true;

    setTimeout(() => {
      status.textContent = '✅ Thanks! Your message was sent (simulated). We will reach out shortly.';
      status.classList.add('success');
      form.reset();
      btn.disabled = false;
    }, 1000);
  });
}


  // Simple smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
      }
    });
  });

});
