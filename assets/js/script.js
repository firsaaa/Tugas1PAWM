/*=============== LOGIN ===============*/
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
        window.location.href = "homepage.html"; // Redirect to homepage
    } else {
        alert("Please enter a valid email.");
    }
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function removeActiveClass() {
    document.querySelectorAll('.navbar a').forEach(function(link) {
        link.classList.remove('active');
    });
}

// Function to add 'active' class based on section visibility
function setActiveSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 50) { // Adjust threshold for accuracy
            currentSection = section.getAttribute('id');
        }
    });

    removeActiveClass();

    // Add active class to the current section's link
    if (currentSection) {
        document.querySelector(`a[href="#${currentSection}"]`).classList.add('active');
    }
}

// Event listener for scrolling
window.addEventListener('scroll', setActiveSection);

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Function to add the 'show' class when the section is in view
function handleScroll() {
    const overviewSection = document.querySelector('.overview');
    if (isInViewport(overviewSection)) {
        overviewSection.classList.add('show');
    }
}

// Listen for the scroll event
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const toggleButton = this;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'Show';
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation for email and password
    if (validateEmail(email) && password.length >= 8) {
        // Redirect to homepage if email is valid and password is long enough
        window.location.href = "index.html";
    } else {
        alert("Please enter a valid email and a password with at least 8 characters.");
    }
});

// Basic email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

sr.reveal(`.home__header, .section__title`,{delay: 600})
sr.reveal(`.home__footer`,{delay: 700})
sr.reveal(`.home__img`,{delay: 900, origin: 'top'})

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`,{origin: 'top', interval: 100})
sr.reveal(`.specs__data, .discount__animate`,{origin: 'left', interval: 100})
sr.reveal(`.specs__img, .discount__img`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)