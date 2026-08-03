// Replace your existing script.js with this file (keeps navbar, countdown, animations and uses a minimal RSVP flow showing a simple thank-you message)
document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Countdown Timer ---
    const countDownDate = new Date("Sep 06, 2026 17:00:00").getTime();
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if (elDays) elDays.innerHTML = days < 10 ? '0' + days : days;
        if (elHours) elHours.innerHTML = hours < 10 ? '0' + hours : hours;
        if (elMinutes) elMinutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        if (elSeconds) elSeconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(x);
            const countdown = document.getElementById("countdown");
            if (countdown) countdown.innerHTML = "<h2>The big day is here!</h2>";
        }
    }, 1000);

    // --- Scroll Animations (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- RSVP Form Handling (Minimal thank-you message) ---
    // On submit the form is hidden and a simple thank you message is shown: "Thank you for your response"
    const rsvpForm = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation (name/email required to proceed)
            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';

            if (!name.trim()) {
                alert('Please enter your full name.');
                return;
            }
            if (!email.trim()) {
                alert('Please enter your email address.');
                return;
            }

            // Disable submit button to give immediate feedback
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.origText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
            }

            // Short delay to simulate processing, then show the single-line thank-you message
            setTimeout(() => {
                rsvpForm.style.display = 'none';
                if (formMessage) {
                    formMessage.classList.remove('hidden');
                    // Show only the exact requested text
                    formMessage.textContent = 'Thank you for your response';
                }

                // Re-enable button text in case user navigates back
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.origText || 'Send RSVP';
                }
            }, 700);
        });
    }
});
