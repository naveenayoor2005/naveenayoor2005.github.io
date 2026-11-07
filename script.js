
// ======================================
// NAVEEN A. PORTFOLIO ANIMATIONS
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // Select elements to animate
    const animatedElements = document.querySelectorAll(
        ".hero-content, .hero-image, .section-heading, " +
        ".project-card, .contact-item, .resume-download, " +
        ".skill-card, .education-card"
    );

    // Respect reduced-motion accessibility settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    document.documentElement.classList.add("js");
    }

    // Add animation classes
    animatedElements.forEach((element, index) => {
        element.classList.add("reveal");

        const delay = (index % 4) * 100;
        element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    // Reveal elements when they enter the screen
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});

// ======================================
// TYPING ANIMATION
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const typingText = document.getElementById("typing-text");

    if (!typingText) return;

    const roles = [
        "Data Analyst",
        "Python Developer",
        "SQL Enthusiast",
        "Power BI Developer"
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingText.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        typingText.textContent = currentRole.substring(0, charIndex);

        let delay = deleting ? 55 : 100;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        } else {
            charIndex += deleting ? -1 : 1;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();

});
