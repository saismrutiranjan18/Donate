// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Count-up stats on scroll
function animateCount(el){
  const target = Number(el.getAttribute('data-count-to') || 0);
  const duration = 1200;
  const start = performance.now();
  function tick(now){
    const p = Math.min(1, (now - start) / duration);
    const value = Math.floor(target * (0.5 - Math.cos(Math.PI * p)/2));
    el.textContent = value.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statEls = document.querySelectorAll('.stat-number');
let counted = false;
function onScroll(){
  if (counted) return;
  const trigger = window.scrollY + window.innerHeight;
  statEls.forEach(el => {
    if (el.getBoundingClientRect().top + window.scrollY < trigger) {
      animateCount(el);
      counted = true;
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

// Donation form handler (demo only)
const form = document.getElementById('donation-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    let amount = Number(fd.get('amount') || 0);
    const custom = Number(fd.get('customAmount') || 0);
    if (custom) amount = custom;

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const agreed = fd.get('terms') === 'on';

    const msgEl = document.getElementById('donation-message');
    if (!amount || amount < 100) {
      msgEl.hidden = false;
      msgEl.textContent = 'Please choose or enter an amount of at least ₹100.';
      return;
    }
    if (!name || !email || !agreed) {
      msgEl.hidden = false;
      msgEl.textContent = 'Please complete your details and accept the terms.';
      return;
    }

    // In production, call your payment gateway here.
    // Example: Razorpay/Stripe SDK, server endpoint, etc.
    msgEl.hidden = false;
    msgEl.textContent = `Thank you, ${name}! Your pledge of ₹${amount.toLocaleString()} has been recorded (demo).`;
    form.reset();
  });
}