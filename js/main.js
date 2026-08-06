// Shared nav behaviour for index.html and servicios.html
(function () {
  const navbar = document.getElementById('navbar');
  const navWrap = document.getElementById('navWrap');
  if (navbar && navWrap) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 40;
      navbar.classList.toggle('scrolled', scrolled);
      navWrap.classList.toggle('hide-util', scrolled);
    });
  }

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (hamburger && mobileMenu) {
    function closeMobile() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    mobileClose?.addEventListener('click', closeMobile);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  }
})();
