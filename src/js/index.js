import FormControl from './FormControl';

//Initial function to set up DOM event listeners and form control
(() => {
    const arrowDown = document.querySelector(".circle");
    const anchor = document.querySelector("#scroll");
    const mobileMenu = document.querySelector(".main-nav");
    const mobileMenuIcon = document.querySelector(".mobile-menu");
    const mobileMenuItems = document.querySelectorAll(".main-nav a");
    const formSubmit = document.querySelector("#contact-form");

    //Arrow down scroll effect
    arrowDown.addEventListener("click", () => {
        anchor.scrollIntoView({behavior: "smooth"});
    });

    //Mobile menu events to show/hide
    mobileMenu.addEventListener("click", event => {
        mobileMenuIcon.classList.toggle("active");
        mobileMenuItems.forEach(item => item.classList.toggle("active"));
        mobileMenu.classList.toggle("active");
    })

    //Setting up form control to create form events and handling submit
    const Form = new FormControl();
    Form.initEvents();

    formSubmit.addEventListener("submit", event => {
        event.preventDefault();
        Form.handleSubmit();
    })
})();