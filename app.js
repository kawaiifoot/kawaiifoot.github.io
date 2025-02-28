const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// Signup Form Handling
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Clear previous errors
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';

  // Validation
  if (!username || !email || !password) {
    errorMessage.textContent = 'All fields are required';
    errorMessage.style.display = 'block';
    return;
  }

  if (!validateEmail(email)) {
    errorMessage.textContent = 'Please enter a valid email address';
    errorMessage.style.display = 'block';
    return;
  }

  if (password.length < 8) {
    errorMessage.textContent = 'Password must be at least 8 characters';
    errorMessage.style.display = 'block';
    return;
  }

  // If validation passes
  console.log('Form submitted successfully!');
  console.log('Username:', username);
  console.log('Email:', email);
  
  // Send data to Google Apps Script
  const scriptURL = 'https://script.google.com/macros/s/AKfycbx-TaSOD_IxAVjFhouEUkX6SYgJZTC2u1W2JNjsdCc6I62KZ-AM4bgfufRO63F0o41k/exec';
  const formData = new FormData();
  formData.append('action', 'signup');
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.text())
    .then(result => {
      errorMessage.style.color = 'green';
      errorMessage.textContent = result;
      errorMessage.style.display = 'block';
    })
    .catch(error => {
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Error: ' + error.message;
      errorMessage.style.display = 'block';
    });
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}