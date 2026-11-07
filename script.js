
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
