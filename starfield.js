window.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.site-header__menu-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const closeTargets = document.querySelectorAll('[data-sidebar-close]');
  const mobileSidebarLinks = document.querySelectorAll('.mobile-sidebar__link');

  function openSidebar() {
    if (!menuToggle || !mobileSidebar) return;
    document.body.classList.add('sidebar-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileSidebar.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    if (!menuToggle || !mobileSidebar) return;
    document.body.classList.remove('sidebar-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileSidebar.setAttribute('aria-hidden', 'true');
  }

  if (menuToggle && mobileSidebar) {
    menuToggle.addEventListener('click', openSidebar);

    closeTargets.forEach(function (node) {
      node.addEventListener('click', closeSidebar);
    });

    mobileSidebarLinks.forEach(function (link) {
      link.addEventListener('click', closeSidebar);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeSidebar();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeSidebar();
    });
  }

  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const STAR_COUNT = 120;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    o: Math.random() * 0.5 + 0.5,
    s: Math.random() * 0.2 + 0.05,
  }));

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      ctx.save();
      ctx.globalAlpha = star.o;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      star.x += star.s;
      if (star.x > canvas.width) {
        star.x = 0;
        star.y = Math.random() * canvas.height;
      }
    }
  }

  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }
  animate();
});
