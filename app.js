const questions = document.querySelectorAll('.faq-question');
questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const arrow = question.querySelector('.arrow');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        arrow.style.transform = answer.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});


const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});
