
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

// ======================================
// GOLDEN SCROLL PROGRESS ANIMATION
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.getElementById("scroll-progress");

    if (!progressBar) return;

    function updateScrollProgress() {

        const scrollTop = window.scrollY ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);

    updateScrollProgress();

});

// ======================================
// BACK TO TOP FUNCTIONALITY
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.getElementById("back-to-top");

    if (!backToTop) return;

    // Show button after scrolling down

    function toggleBackToTop() {
        if (window.scrollY > 350) {
            backToTop.classList.add("is-visible");
        } else {
            backToTop.classList.remove("is-visible");
        }
    }

    window.addEventListener("scroll", toggleBackToTop, {
        passive: true
    });

    // Return smoothly to the top

    backToTop.addEventListener("click", () => {

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });

    });

    toggleBackToTop();

});

/* ==========================================
   SALES DATA ANALYSIS - ANIMATED CHARTS
   Naveen A. Portfolio
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Check Chart.js library
    if (typeof Chart === "undefined") {
        console.error("Chart.js library was not loaded.");
        return;
    }

    // Find chart elements
    const revenueCanvas = document.getElementById("monthlyRevenueChart");
    const productCanvas = document.getElementById("productQuantityChart");

    // Stop if chart HTML is missing
    if (!revenueCanvas || !productCanvas) {
        console.warn("Project chart elements were not found.");
        return;
    }

    // Prevent duplicate chart instances
    if (Chart.getChart(revenueCanvas)) {
        Chart.getChart(revenueCanvas).destroy();
    }

    if (Chart.getChart(productCanvas)) {
        Chart.getChart(productCanvas).destroy();
    }

    // Portfolio theme
    Chart.defaults.color = "#AEB2BA";
    Chart.defaults.font.family = "Arial, sans-serif";
    Chart.defaults.font.size = 11;

    // Indian currency formatting
    const formatINR = (value) => {
        return "₹" + Number(value).toLocaleString("en-IN");
    };

    // Create golden vertical gradient
    function goldGradient(context) {

        const chart = context.chart;
        const chartArea = chart.chartArea;

        if (!chartArea) {
            return "#C9A76A";
        }

        const gradient = chart.ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
        );

        gradient.addColorStop(0, "#94703C");
        gradient.addColorStop(0.5, "#C9A76A");
        gradient.addColorStop(1, "#F0D49B");

        return gradient;
    }

    // ======================================
    // CHART 1: MONTHLY REVENUE
    // ======================================

    new Chart(revenueCanvas, {

        type: "bar",

        data: {

            labels: [
                "January 2026",
                "February 2026",
                "March 2026"
            ],

            datasets: [{

                label: "Monthly Revenue",

                data: [
                    106100,
                    79000,
                    144800
                ],

                backgroundColor: goldGradient,

                borderColor: "#E3C58C",

                borderWidth: 1,

                borderRadius: 9,

                borderSkipped: false,

                maxBarThickness: 65,

                hoverBackgroundColor: "#F0D49B"

            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {
                duration: 1500,
                easing: "easeOutQuart"
            },

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#20242C",

                    titleColor: "#F0D49B",

                    bodyColor: "#FFFFFF",

                    borderColor: "#C9A76A",

                    borderWidth: 1,

                    padding: 12,

                    displayColors: false,

                    callbacks: {

                        label: function (context) {
                            return "Revenue: " +
                                formatINR(context.parsed.y);
                        }

                    }
                }
            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#C9A76A"
                    },

                    border: {
                        color: "rgba(201,167,106,0.2)"
                    }
                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "rgba(255,255,255,0.07)"
                    },

                    ticks: {

                        maxTicksLimit: 6,

                        callback: function (value) {
                            return "₹" +
                                Number(value).toLocaleString("en-IN");
                        }

                    }
                }

            }
        }

    });


    // ======================================
    // CHART 2: PRODUCT QUANTITY ANALYSIS
    // ======================================

    new Chart(productCanvas, {

        type: "bar",

        data: {

            labels: [
                "Keyboard",
                "Laptop",
                "Monitor",
                "Mouse"
            ],

            datasets: [{

                label: "Units Sold",

                data: [
                    7,
                    5,
                    5,
                    23
                ],

                backgroundColor: [
                    "#A98243",
                    "#C9A76A",
                    "#D9BA83",
                    "#F0D49B"
                ],

                borderColor: "#E3C58C",

                borderWidth: 1,

                borderRadius: 8,

                borderSkipped: false,

                barThickness: 25,

                hoverBackgroundColor: "#F0D49B"

            }]
        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1300,

                easing: "easeOutQuart",

                delay: function (context) {
                    return context.dataIndex * 150;
                }

            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#20242C",

                    titleColor: "#F0D49B",

                    bodyColor: "#FFFFFF",

                    borderColor: "#C9A76A",

                    borderWidth: 1,

                    padding: 12,

                    displayColors: false,

                    callbacks: {

                        label: function (context) {
                            return "Units Sold: " +
                                context.parsed.x;
                        }

                    }
                }
            },

            scales: {

                x: {

                    beginAtZero: true,

                    grid: {
                        color: "rgba(255,255,255,0.07)"
                    },

                    ticks: {
                        precision: 0,
                        stepSize: 5
                    }

                },

                y: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#C9A76A"
                    }

                }

            }

        }

    });

    console.log("Sales analytics charts initialized successfully.");

});

// ======================================
// CHART SCROLL REVEAL EFFECT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const chartCards = document.querySelectorAll(
        ".project-chart-card"
    );

    if (!("IntersectionObserver" in window)) {
        chartCards.forEach(card => {
            card.classList.add("chart-visible");
        });
        return;
    }

    const chartObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("chart-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    chartCards.forEach(card => {
        chartObserver.observe(card);
    });

});

/* ======================================
   BUSINESS INSIGHTS SCROLL ANIMATION
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const panel = document.querySelector(
        ".business-insights-panel"
    );

    if (!panel) return;

    const cards = panel.querySelectorAll(".insight-card");

    if (!cards.length) return;

    // Respect visitors who prefer reduced motion
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fallback: keep cards visible if animation is unavailable
    if (!("IntersectionObserver" in window) || reduceMotion) {
        cards.forEach(card => {
            card.classList.add("insight-visible");
        });
        return;
    }

    try {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "insight-visible"
                        );

                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        // Activate hidden starting state only after observer is ready
        panel.classList.add("reveal-ready");

        cards.forEach(card => {
            observer.observe(card);
        });

    } catch (error) {

        // Keep all insight cards visible if animation fails
        panel.classList.remove("reveal-ready");

        cards.forEach(card => {
            card.classList.add("insight-visible");
        });

        console.warn(
            "Business insights animation unavailable:",
            error
        );

    }

});

// ======================================
// PROJECT ANALYSIS REVEAL ANIMATION
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const analysis = document.querySelector(".project-analysis");

    if (!analysis) return;

    const panels = analysis.querySelectorAll(".analysis-block");

    if (!panels.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Keep panels visible when animation is unavailable
    if (!("IntersectionObserver" in window) || reducedMotion) {
        panels.forEach(panel => {
            panel.classList.add("analysis-visible");
        });
        return;
    }

    try {
        const observer = new IntersectionObserver((entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("analysis-visible");
                    observerInstance.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        analysis.classList.add("reveal-ready");

        panels.forEach(panel => {
            observer.observe(panel);
        });

    } catch (error) {

        analysis.classList.remove("reveal-ready");

        panels.forEach(panel => {
            panel.classList.add("analysis-visible");
        });

        console.warn("Project analysis animation unavailable:", error);
    }

});

/* ======================================
   ANIMATED SALES NUMBER COUNTERS
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".count-up");

    if (!counters.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function formatCounter(element, value) {

        const decimals = Number(
            element.dataset.countDecimals || 0
        );

        const formatted = new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);

        const prefix =
            element.dataset.countType === "currency" ? "₹" : "";

        const suffix = element.dataset.countSuffix || "";

        return prefix + formatted + suffix;
    }

    function animateCounter(element) {

        if (element.dataset.counted === "true") return;

        const target = Number(element.dataset.count);

        if (!Number.isFinite(target) || target < 0) return;

        element.dataset.counted = "true";

        if (reducedMotion) {
            element.textContent = formatCounter(element, target);
            return;
        }

        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = target * eased;

            element.textContent = formatCounter(
                element,
                progress === 1 ? target : currentValue
            );

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        element.textContent = formatCounter(element, 0);

        requestAnimationFrame(updateCounter);
    }

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

});


