/* update image hero-banner */ 
function updateHeroImg(){
    const img = document.querySelector('.hero-banner__background-img');

    if(!img) return;

    const isMobile = window.innerWidth <= 768;
    img.src =isMobile ? "src/assets/img/hero-banner-mobile.png" : "src/assets/img/hero-banner.png"
}
window.addEventListener('load', updateHeroImg);
window.addEventListener('resize', updateHeroImg);

/*slider*/ 
document.addEventListener('DOMContentLoaded', function () {
    new Splide('.slider', {
    type: 'slide',
    perPage: 4,             // Default: 4 items
    gap: '1rem',            // Space between slides
    pagination: false,      // Hide pagination dots
    arrows: false,          // Hide navigation arrows
    breakpoints: {
        1280: {
        perPage: 3,     // 3 items on screen ≤ 1280px
        },
        1024: {
        perPage: 2,     // 2 items on screen ≤ 1024px
        },
        768: {
        perPage: 1.5,   // 1.5 items on screen ≤ 768px (shows partially next item)
        },
    },
    }).mount();
});


/* update image single-banner */ 
function updateSingImg(){
    const img = document.querySelector('.single-banner__background-img');

    if(!img) return;

    const isMobile = window.innerWidth <= 768;
    img.src =isMobile ? "src/assets/img/single-banner-reponsive.png" : "src/assets/img/single-banner.png"
}
window.addEventListener('load', updateSingImg);
window.addEventListener('resize', updateSingImg);

/* submit form and check validate email */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".footer__form");
    const emailInput = form.querySelector(".input-email");

    form.addEventListener("submit", function (e) {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // Simple email format check

        if (!emailRegex.test(emailValue)) {
        e.preventDefault();     // Stop form from submitting
        alert("Vui lòng nhập đúng định dạng email!");
        emailInput.focus();     // Focus back to the input
        }
    });
});

