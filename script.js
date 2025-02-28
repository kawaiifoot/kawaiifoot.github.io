// Import AOS library
import AOS from 'aos';

// Initialize AOS
AOS.init();

// Add animation to the About Us section
document.addEventListener('scroll', () => {
  const aboutUsSection = document.getElementById('about-us');
  const scrollPosition = window.scrollY;
  const sectionTop = aboutUsSection.offsetTop;

  if (scrollPosition >= sectionTop - 200) {
    aboutUsSection.classList.add('animate');
  }
});