// ============================================================
// Sudheesh S S — Portfolio scripts
// ============================================================

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => {
  setMenu(!navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) setMenu(false);
});

// ---------- Nav shadow on scroll ----------
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Highlight active section link ----------
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// ---------- Profile photo fallback ----------
// If images/profile.jpg is missing, show initials instead of a broken image.
const profileImg = document.getElementById('profileImg');
const photoFrame = profileImg.closest('.photo-frame');

function showFallback() {
  photoFrame.classList.add('no-photo');
}

profileImg.addEventListener('error', showFallback);
if (profileImg.complete && profileImg.naturalWidth === 0) showFallback();