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
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;

        [nameError, emailError, messageError].forEach(err => err.classList.remove('active'));
        successMessage.style.display = 'none';

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            nameError.classList.add('active');
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            emailError.classList.add('active');
            valid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Invalid email format.";
            emailError.classList.add('active');
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter your message.";
            messageError.classList.add('active');
            valid = false;
        }

        if (valid) {
            successMessage.textContent = "Message sent successfully!";
            successMessage.style.display = 'block';
            contactForm.reset();

            successMessage.animate([
                { opacity: 0, transform: 'scale(0.8)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: 400, easing: 'ease-out' });
        }
    });

    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                card.style.display = 'block';
                card.animate(
                    [{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }],
                    { duration: 300, easing: 'ease-out' }
                );
            } else {
                card.style.display = 'none';
            }
        });
});


});