/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SMOOTH SCROLL FOR NAVIGATION LINKS ===============*/
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Find the target section

        // Smooth scroll to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

/*=============== ACTIVE LINK BASED ON SCROLL POSITION ===============*/
function setActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + window.innerHeight / 3; // Adjusting for better accuracy

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);

        // Add or remove 'active' class based on scroll position
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}

// Run the setActiveSection function on scroll
window.addEventListener('scroll', setActiveSection);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__header, .section__title`, { delay: 600 })
sr.reveal(`.home__footer`, { delay: 700 })
sr.reveal(`.home__img`, { delay: 900, origin: 'top' })

/*=============== SLIDE-IN ANIMATION ===============*/
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.slide-in'); // Target all elements with slide-in class

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-visible'); // Add visibility class when element is in view
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    });

    elements.forEach(el => observer.observe(el)); // Observe each element
});

document.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('h1, p');
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight / 1.3) {
            el.classList.add('active');
        }
    });
});

const sideToolbar = document.getElementById('sideToolbar');
const navLogo = document.getElementById('nav-logo');

// Add click event to "BERBAHASA" to toggle the sidebar
navLogo.addEventListener('click', function() {
  if (sideToolbar.style.width === "250px") {
    sideToolbar.style.width = "0";  // Close sidebar
  } else {
    sideToolbar.style.width = "250px";  // Open sidebar
  }
});
