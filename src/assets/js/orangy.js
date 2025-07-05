/* update image hero-banner */ 
function updateHeroImg(){
    const img = document.querySelector('.hero-banner__background-img');

    if(!img) return;

    const isMobile = window.innerWidth <= 768;
    img.src =isMobile ? "/src/assets/img/hero-banner-mobile.png" : "/src/assets/img/hero-banner.png"
}
window.addEventListener('load', updateHeroImg);
window.addEventListener('resize', updateHeroImg);

/*slider*/ 
document.addEventListener('DOMContentLoaded', function () {
    new Splide('.slider', {
    type: 'slide',
    perPage: 4, 
    gap: '1rem',
    pagination: false,
    arrows: false,
    breakpoints: {
        1280: {
        perPage: 3,
        },
        1024: {
        perPage: 2,
        },
        768: {
        perPage: 1.5, // vuốt 1.5 item
        },
    },
    }).mount();
});


/* update image single-banner */ 
function updateSingImg(){
    const img = document.querySelector('.single-banner__background-img');

    if(!img) return;

    const isMobile = window.innerWidth <= 768;
    img.src =isMobile ? "/src/assets/img/single-banner-reponsive.png" : "/src/assets/img/single-banner.png"
}
window.addEventListener('load', updateSingImg);
window.addEventListener('resize', updateSingImg);

/* submit form and check validate email */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".footer__form");
  const emailInput = form.querySelector(".input-email");

  form.addEventListener("submit", function (e) {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      e.preventDefault(); 
      alert("Vui lòng nhập đúng định dạng email!");
      emailInput.focus();
    }
  });
});

