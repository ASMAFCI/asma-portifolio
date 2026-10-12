(() => {
  const header = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const allNavLinks = document.querySelectorAll('.nav-links a');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!toggle || !navLinks) return;
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  allNavLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.querySelectorAll('[aria-disabled="true"]').forEach((item) => {
    item.addEventListener('click', (event) => event.preventDefault());
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  const sectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sectionId = entry.target.id;
      allNavLinks.forEach((link) => {
        const target = link.getAttribute('href');
        link.classList.toggle('active', target === `#${sectionId}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' }) : null;
  sections.forEach((section) => sectionObserver?.observe(section));

  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }
})();
