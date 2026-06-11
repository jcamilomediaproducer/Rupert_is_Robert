// ─── Nav scroll state ───
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // sticky nav bg
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// ─── Mobile menu ───
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ─── Hero parallax & load ───
const heroBg = document.querySelector('.hero__bg');
const hero = document.querySelector('.hero');

// Trigger bg zoom animation
setTimeout(() => hero.classList.add('loaded'), 100);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

// ─── Scroll reveal ───
const reveals = document.querySelectorAll('.section__eyebrow, .section__title, .bio__photo-wrap, .bio__genres, .bio__body, .setup__list, .setup__note, .setup__diagram, .links__grid, .link-card, .setup__item');

// Add reveal class to eligible elements
const revealTargets = [
  ...document.querySelectorAll('.bio__photo-wrap'),
  ...document.querySelectorAll('.bio__genres'),
  ...document.querySelectorAll('.bio__body'),
  ...document.querySelectorAll('.setup__list'),
  ...document.querySelectorAll('.setup__diagram'),
  ...document.querySelectorAll('.setup__note'),
  ...document.querySelectorAll('.links__grid'),
  ...document.querySelectorAll('.section__eyebrow'),
  ...document.querySelectorAll('.section__title'),
];

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Link cards stagger ───
document.querySelectorAll('.link-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  card.classList.add('reveal');
  observer.observe(card);
});
