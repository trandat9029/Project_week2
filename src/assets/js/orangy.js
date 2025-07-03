/* update image */ 

function updateHeroImg(){
    const img = document.querySelector('.hero-banner__background-img');

    if(!img) return;

    const isMobile = window.innerWidth <= 768;
    img.src =isMobile ? "/src/assets/img/hero-banner-mobile.png" : "/src/assets/img/hero-banner.png"
}
window.addEventListener('load', updateHeroImg);
window.addEventListener('resize', updateHeroImg);

