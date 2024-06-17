document.addEventListener('DOMContentLoaded', function() {
    // Constants for navigation
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');

    // Check if constants exist before adding event listeners
    if (navToggle && navMenu && navClose) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });

        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Remove menu mobile when a nav__link is clicked
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Accordion for skills section
    const skillsHeaders = document.querySelectorAll('.skills__header');
    skillsHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const skillContent = this.parentNode;
            skillContent.classList.toggle('skills__open');
            skillContent.classList.toggle('skills__close');
        });
    });

    // Tabs for qualification section
    const tabs = document.querySelectorAll('[data-target]');
    const tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);

            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualification__active');
            });

            tabs.forEach(tab => {
                tab.classList.remove('qualification__active');
            });

            tab.classList.add('qualification__active');
            target.classList.add('qualification__active');
        });
    });

    // Modal functionality for services section
    const modalBtns = document.querySelectorAll('.services__button');
    const modalCloses = document.querySelectorAll('.services__modal-close');
    const modalViews = document.querySelectorAll('.services__modal');

    modalBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            modalViews[index].classList.add('active-modal');
        });
    });

    modalCloses.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
            modalViews.forEach(view => view.classList.remove('active-modal'));
        });
    });

    // Initialize Swiper for portfolio section
    const swiperPortfolio = new Swiper('.portfolio__container', {
        cssMode: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        mousewheel: true,
        keyboard: true,
    });

    // Initialize Swiper for testimonial section
    const testimonialContainer = document.querySelector('.testimonial__container');
    if (testimonialContainer) {
        try {
            const swiperTestimonial = new Swiper('.testimonial__container', {
                loop: true,
                grabCursor: true,
                spaceBetween: 48,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    568: {
                        slidesPerView: 2,
                    }
                }
            });
        } catch (error) {
            console.error('Failed to initialize Swiper for testimonial section:', error);
        }
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add('active-link');
            } else {
                document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove('active-link');
            }
        });
    });

    // Change background header on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });

    // Show scroll up button on scroll
    const scrollUp = document.getElementById('scroll-up');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 560) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    });

    // Dark/light theme functionality
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
});