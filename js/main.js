/* ========= Year ========= */
document.getElementById('year').textContent = new Date().getFullYear();

/* ========= Mobile sidebar toggle ========= */
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('menuToggle');
toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => sidebar.classList.remove('open'))
);

/* ========= Typing effect ========= */
const phrases = [
  'Aspiring Backend Developer',
  'Python & Django Enthusiast',
  'API Craftsman',
  'Database Explorer',
  'Lifelong Learner'
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typedEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 80); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}
type();

/* ========= Reveal on scroll ========= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // trigger skill bars & counters inside
      e.target.querySelectorAll('.skill-card').forEach(s => s.classList.add('in'));
      e.target.querySelectorAll('.num').forEach(runCounter);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========= Counters ========= */
function runCounter(el){
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = +el.dataset.count;
  const dur = 1400, start = performance.now();
  function step(t){
    const p = Math.min(1, (t - start) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ========= Scrollspy ========= */
const sections = [...document.querySelectorAll('main .section')];
const links = [...document.querySelectorAll('.nav-link')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spy.observe(s));

/* ========= Contact form ========= */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !subject || !message) {
    note.textContent = 'Please fill in every field.';
    note.classList.add('err'); return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    note.textContent = 'That email looks off.';
    note.classList.add('err'); return;
  }
  note.classList.remove('err');
  note.textContent = 'Thanks! Your message is ready — opening your email client…';
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  form.reset();
});

/* ========= Placeholder trick for floating labels ========= */
document.querySelectorAll('.field input, .field textarea').forEach(i => i.setAttribute('placeholder',' '));
