/* ============================================================
   nav.js — Shared navigation logic for all ATLA pages
   ============================================================ */

(function () {
  /* ── Inject nav HTML ──────────────────────────────────── */
  const pages = [
    { href: 'index.html',    label: 'Journey',      id: 'home'     },
    { href: 'elements.html', label: 'Elements & Nations', id: 'elements' },
    { href: 'legends.html',  label: 'Legends',      id: 'legends'  },
    { href: 'gallery.html',  label: 'Archives',     id: 'gallery'  },
    { href: 'blog.html',     label: 'History',      id: 'blog'     },
    { href: 'creator.html',  label: "Creator's Corner", id: 'creator'  },
  ];

  const currentFile = location.pathname.split('/').pop() || 'index.html';

  const linksHtml = pages.map(p =>
    `<li><a href="${p.href}" class="${currentFile === p.href ? 'active' : ''}">${p.label}</a></li>`
  ).join('');

  const mobileLinksHtml = pages.map(p =>
    `<a href="${p.href}" class="${currentFile === p.href ? 'active' : ''}">${p.label}</a>`
  ).join('');

  const navHtml = `
    <nav class="nav" id="main-nav">
      <div class="nav__logo">
        <span class="nav__logo-main">Avatar</span>
        <span class="nav__logo-sub">The Animation Chronicles</span>
      </div>
      <ul class="nav__links">${linksHtml}</ul>
      <button class="nav__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav__mobile" id="mobile-nav">
      ${mobileLinksHtml}
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHtml);

  /* ── Hamburger toggle ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll: add .scrolled class ─────────────────────── */
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Spirit Particles ─────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(135,206,235,', 'rgba(93,173,226,', 'rgba(212,175,55,', 'rgba(245,230,200,'];

    function spawn() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.6 + 0.2,
        dx: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 300 + 200,
      };
    }

    for (let i = 0; i < 60; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y -= p.speed;
        p.life++;
        const fade = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30 ? (p.maxLife - p.life) / 30 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * fade) + ')';
        ctx.fill();
        if (p.life >= p.maxLife || p.y < -10) particles[idx] = spawn();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── Scroll reveal ───────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Footer inject ───────────────────────────────────── */
  const footerHtml = `
    <footer class="footer">
      <div class="footer__logo">Avatar: The Animation Chronicles</div>
      <p class="footer__tagline">A Legend, Masterfully Told</p>
      <div class="footer__elements">
        <div class="footer__el air"   title="Air Nomads">🌬️</div>
        <div class="footer__el water" title="Water Tribe">🌊</div>
        <div class="footer__el earth" title="Earth Kingdom">🪨</div>
        <div class="footer__el fire"  title="Fire Nation">🔥</div>
      </div>
      <p class="footer__copy">© 2024 The Animation Chronicles · Fan Tribute · All characters © Nickelodeon</p>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHtml);
})();
