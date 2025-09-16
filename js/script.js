
/* Main JS for navigation, form validation, and small interactions */

// Mobile nav toggle
const navToggle = document.querySelectorAll('.nav-toggle');
navToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    const nav = document.getElementById('primary-nav');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (nav) nav.setAttribute('aria-hidden', String(expanded));
  });
});

// Set copyright years
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Simple form validation + fake submit
const contactForm = document.getElementById('contactForm');
if (contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const status = document.getElementById('formStatus');

    // basic validation
    if (!name.value.trim() || name.value.trim().length < 2){
      status.textContent = 'Please enter a valid name (min 2 characters).';
      status.classList.add('error');
      name.focus();
      setTimeout(() => {
        status.textContent = '';
        status.classList.remove('error');
      }, 3000);
      return;
    }
    if (!email.checkValidity()){
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      email.focus();
      setTimeout(() => {
        status.textContent = '';
        status.classList.remove('error');
      }, 3000);
      return;
    }
    if (!message.value.trim() || message.value.trim().length < 10){
      status.textContent = 'Message should be at least 10 characters.';
      status.classList.add('error');
      message.focus();
      setTimeout(() => {
        status.textContent = '';
        status.classList.remove('error');
      }, 3000);
      return;
    }

    // simulate submission
    status.textContent = 'Sending...';
    status.classList.remove('error');
    status.classList.add('success');
    setTimeout(()=>{
      status.textContent = 'Thanks — your message has been received.';
      contactForm.reset();
    }, 800);
  });
}

// Small intersection observer for fade-up animation
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});

document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));