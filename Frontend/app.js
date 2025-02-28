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
  
  
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}