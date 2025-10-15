document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const modal = document.getElementById('infoModal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        darkModeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    });

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalText.textContent = button.dataset.info;
            modal.style.display = 'flex';
        });
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});