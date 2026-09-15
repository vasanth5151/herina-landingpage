// ---------- Hamburger menu toggle ----------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.querySelector('.nav');

if (hamburgerBtn && nav) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq-a').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---------- Symptom self-check counter ----------
const checks = document.querySelectorAll('.symptom-check');
const scoreCount = document.getElementById('scoreCount');
const scoreHint = document.getElementById('scoreHint');

function updateScore() {
  const n = [...checks].filter(c => c.checked).length;
  scoreCount.textContent = n;
  if (n === 0) {
    scoreHint.textContent = 'Tick what applies above to see whether an assessment is worth your time.';
  } else if (n <= 2) {
    scoreHint.textContent = 'Even one persistent symptom is worth a proper explanation.';
  } else {
    scoreHint.textContent = 'Several symptoms together — a focused consultation is strongly worth booking.';
  }
}
checks.forEach(c => c.addEventListener('change', updateScore));
updateScore();

// ---------- Marquee: duplicate items for seamless loop ----------
const track = document.getElementById('marqueeTrack');
if (track) track.innerHTML += track.innerHTML;

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Countdown urgency timer ----------
let secs = 11 * 60 + 52;
const cd = document.getElementById('countdown');
setInterval(() => {
  secs = secs > 0 ? secs - 1 : 11 * 60 + 52;
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  if (cd) cd.textContent = m + ':' + s;
}, 1000);

// ---------- Booking form (demo submit) ----------
const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const condition = form.condition.value;

    if (!name || !phone || !condition) {
      alert('Please fill your name, phone number and condition so the team can call you.');
      return;
    }
    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    // TODO: replace with your real endpoint / Google Form / WhatsApp API
    document.getElementById('formSuccess').hidden = false;
    form.reset();
  });
}

// ---------- Video topic buttons ----------
document.querySelectorAll('.topic').forEach(topic => {
  topic.addEventListener('click', () => {
    document.querySelectorAll('.topic').forEach(t => t.classList.remove('active'));
    topic.classList.add('active');
    // TODO: swap the video source here when you wire in real videos
  });
});

// ---------- Play buttons (placeholder) ----------
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Replace this placeholder with your embedded video (YouTube iframe or <video> tag).');
  });
});
