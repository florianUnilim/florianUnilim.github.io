const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

// 1. Mouvement du curseur
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

// 2. Effet au survol des liens et boutons
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '5px'; cursor.style.height = '5px';
    ring.style.width = '54px'; ring.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    ring.style.width = '36px'; ring.style.height = '36px';
  });
});

// 3. LA NOUVELLE LOGIQUE : Changement de couleur sur fond vert
// Remplace '.section-verte' par la classe de tes blocs à fond vert (ex: .hero-green)
document.querySelectorAll('.section-verte').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('sur-fond-vert');
    ring.classList.add('sur-fond-vert');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('sur-fond-vert');
    ring.classList.remove('sur-fond-vert');
  });
});

// 4. Animation des éléments au défilement (Fade-in)
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight) el.classList.add('visible');
  else obs.observe(el);
});