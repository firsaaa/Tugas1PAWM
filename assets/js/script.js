
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

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight;

        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        window.scrollTo({
            top: targetSection.offsetTop - headerHeight, 
            behavior: 'smooth'
        });
    });
});

// Function to add 'active' class to the current section's link
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

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50, // Adjust to align with the header
            behavior: 'smooth'
        });
    });
});

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


/*=============== LOGIN ===============*/
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();  // Prevent the form from submitting the traditional way
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (validateEmail(email) && password.length >= 8) {
        // Redirect to homepage if validation passes
        window.location.href = "index.html";  
        alert("Please enter a valid email and a password with at least 8 characters.");
    }
});

// Basic email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/*=============== SHOW PASSWORD ===============*/
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


document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.slide-in'); // Target all elements with slide-in class

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Element in view:", entry.target); // Check if element is in view
                entry.target.classList.add('slide-in-visible'); // Add visibility class when element is in view
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    });

    elements.forEach(el => observer.observe(el)); // Observe each element
});


sr.reveal(`.home__header, .section__title`,{delay: 600})
sr.reveal(`.home__footer`,{delay: 700})
sr.reveal(`.home__img`,{delay: 900, origin: 'top'})

sr.reveal(`.slide_in, .slide-in-visible`, {delay: 900})