const form = document.getElementById('access-form');
const paymentSection = document.getElementById('payment-section');

// --- Pricing Configuration ---
const PRICING = {
  IN: { amount: 100, currency: '₹', link: 'https://razorpay.me/@novelcia?amount=ZFm4ghdmeB6pF5PK8Ki64w%3D%3D' },  // India
  US: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // USA
  FR: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // France
  AU: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Australia
  CA: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Canada
  GB: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // UK
  DE: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Germany
  BR: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Brazil
  PH: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Philippines
  ID: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' },   // Indonesia
  DEFAULT: { amount: 20, currency: '$', link: 'https://rzp.io/l/intl-link' } // Rest of world
};

// --- Country Detection ---
let userCountry = 'IN'; // fallback
fetch("https://ipapi.co/json")
  .then(res => res.json())
  .then(data => {
    if (data && data.country_code) {
      userCountry = data.country_code.toUpperCase();
    }
  })
  .catch(() => {
    console.warn("Country detection failed, using default.");
  });

// --- Form Submission Handler ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const payload = {
    username: data.get('username'),
    email: data.get('email')
  };

  // Save to Google Sheet
  fetch('https://script.google.com/macros/s/AKfycbyTLg-mTnFG2eVgTAOMF4SDJbnnr71WQM1mKgBTIu5wVoPlqesLYpFdYRTw8jY-4rkJvA/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // Show payment section
  const config = PRICING[userCountry] || PRICING.DEFAULT;
  const payBtn = document.querySelector('.btn-pay');
  payBtn.href = config.link;
  payBtn.innerHTML = `<i class="bi bi-wallet2"></i> Pay ${config.currency}${config.amount}`;

  form.classList.add('hidden');
  paymentSection.classList.remove('hidden');
});
