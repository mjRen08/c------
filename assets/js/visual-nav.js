document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelector('.nav-container .nav-links');
    if (!navLinks || navLinks.querySelector('a[href*="visual-demo.html"]')) return;

    const link = document.createElement('a');
    link.href = '../visual-demo.html';
    link.textContent = '可视化演示';

    const item = document.createElement('li');
    item.appendChild(link);
    const quizItem = Array.from(navLinks.querySelectorAll('li')).find(function (li) {
        return li.querySelector('a[href*="quiz.html"]');
    });
    navLinks.insertBefore(item, quizItem || null);
});
