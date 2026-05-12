// ===================================================
// PASTE YOUR GOOGLE APPS SCRIPT URL ON THE LINE BELOW
const GOOGLE_SCRIPT_URL = https://script.google.com/macros/s/AKfycbzldW0zt532L4DpTKO5BZBEfB8A8tNHew94WomA1lcw2Px1SF-p2ierXcjvRMnxs2gg3Q/exec;
// ===================================================

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}
 document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

document.querySelectorAll('form[data-form-type]').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn          = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;
    const formType     = form.getAttribute('data-form-type');

    btn.innerHTML = '⏳ Submitting...';
    btn.disabled  = true;

    const formData = { formType };
    new FormData(form).forEach((value, key) => {
      formData[key] = value;
    });

    fetch(GOOGLE_SCRIPT_URL, {
      method : 'POST',
      mode   : 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(formData)
    })
    .then(() => {
      btn.innerHTML = '✅ Submitted! We\'ll be in touch within 48 hours.';
      btn.style.background = '#1a8a1a';
      form.reset();
    })
    .catch(() => {
      btn.innerHTML = '❌ Network error. Please try again.';
      btn.disabled  = false;
    });

    setTimeout(() => {
      btn.innerHTML        = originalText;
      btn.style.background = '';
      btn.disabled         = false;
    }, 7000);
  });
});
