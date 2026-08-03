// Replace your existing script.js with this file (keeps navbar, countdown, animations and uses a dummy RSVP flow for demo)
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

    // --- Helper: escape HTML for safe insertion ---
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // --- RSVP Form Handling (Dummy / client-only) ---
    // The form behaves like it's sending (disabled, "Sending..."), then shows a success message.
    // No external services or emails are used — suitable for demo or offline previews.
    const rsvpForm = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form fields
            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const guests = (document.getElementById('guests') || {}).value || '';
            const message = (document.getElementById('message') || {}).value || '';
            const attendingRadio = rsvpForm.querySelector('input[name="attending"]:checked');
            const attending = attendingRadio ? attendingRadio.value : '';

            // Basic validation
            if (!name.trim()) {
                alert('Please enter your full name.');
                return;
            }
            if (!email.trim()) {
                alert('Please enter your email address.');
                return;
            }

            // Disable submit button to prevent duplicates and show progress
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.origText = submitBtn.textContent;
                submitBtn.textContent = 'Sending... ⏳';
            }

            // Simulate network/send delay so it "feels" real to the user
            setTimeout(() => {
                // Hide form and show a friendly success message with submitted summary
                rsvpForm.style.display = 'none';

                if (formMessage) {
                    formMessage.classList.remove('hidden');
                    formMessage.innerHTML = `\n                        <h3>Thanks, ${escapeHtml(name)}!</h3>\n                        <p>Your RSVP was recorded (demo mode). Here is what we received:</p>\n                        <ul>\n                            <li><strong>Attending:</strong> ${escapeHtml(attending || 'Not specified')}</li>\n                            <li><strong>Guests:</strong> ${escapeHtml(guests || '0')}</li>\n                            <li><strong>Email:</strong> ${escapeHtml(email)}</li>\n                        </ul>\n                        <p class=\"muted\">(This is a demo submission — no email was sent.)</p>\n                    `;
                }

                // Optionally log to console for developer preview
                console.info('RSVP (demo):', { name, email, guests, attending, message });

                // Re-enable the button text if user navigates back
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = submitBtn.dataset.origText || 'Send RSVP';
                    }
                }, 1500);
            }, 1200);
        });
    }
});
