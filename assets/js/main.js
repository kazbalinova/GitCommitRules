"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Элементтер
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    // Ағымдағы жыл
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Мобильді мәзірді ашу және жабу
    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            navLinks.classList.toggle("open", !isOpen);
            document.body.classList.toggle("menu-open", !isOpen);
        });

        // Мәзірдегі сілтемені басқанда мәзір жабылады
        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Escape батырмасымен жабу
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Мәзірден тыс жерді басқанда жабу
        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMenu();
            }
        });

        // Экран үлкейгенде мобильді мәзірді жабу
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // Қай бөлімде тұрғанымызды мәзірден көрсету
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Жоғарыға оралу батырмасы
    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 450
            );
        };

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Консольдегі хабарлама
    console.log(
        "%c GitCommitRules 💜 ",
        "background: #6D3BE8; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold;"
    );

    console.log("Қош келдіңіз! Жоба сәтті іске қосылды.");
});