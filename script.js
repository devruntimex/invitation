// Replace your existing script.js with this file (keeps navbar, countdown, animations and adds mailto RSVP)
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

    // --- RSVP Form Handling (mailto) ---
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

            // Disable submit button to prevent duplicates
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Preparing email...';
            }

            // Build subject and body
            const subject = encodeURIComponent(`RSVP from ${name}`);
            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Number of Guests: ${guests}`,
                `Attending: ${attending}`,
                `Message: ${message}`
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));

            // mailto target (requested)
            const to = 'ramdevnofficial@gmail.com';
            const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

            // Open the user's email client with the populated email
            // Using location.href will open the default handler; window.open may be blocked by some browsers
            window.location.href = mailtoLink;

            // Show success message UI immediately (user still needs to send from their mail client)
            rsvpForm.style.display = 'none';
            if (formMessage) formMessage.classList.remove('hidden');

            // Re-enable button after a short delay in case they return and need to submit again
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send RSVP';
                }
            }, 3000);
        });
    }
});
