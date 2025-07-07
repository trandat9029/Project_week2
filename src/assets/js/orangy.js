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

/* function  toggle Answer */ 
function toggleAnswer(){
    const contents = document.querySelectorAll(".faq__content-item");

    contents.forEach((item) =>{
        const question = item.querySelector(".faq__question");
        const answer = item.querySelector(".faq__answer");

        question.addEventListener('click', () =>{
            const isActive = item.classList.contains("--active");

            contents.forEach((i) => {
                const ans = i.querySelector(".faq__answer");
                if (i.classList.contains("--active")) {
                    ans.style.height = ans.scrollHeight + "px"; 
                    requestAnimationFrame(() => {
                        i.classList.remove("--active");
                        ans.style.height = "0";
                    });
                } else {
                    i.classList.remove("--active");
                    ans.style.height = "0";
                }
            });

            if(!isActive){
                item.classList.add("--active");
                const fullHeight = answer.scrollHeight;
                answer.style.height = fullHeight + "px";

                answer.addEventListener("transitionend", function handleTransitionEnd() {
                    answer.style.height = "auto";
                    answer.removeEventListener("transitionend", handleTransitionEnd);
                });
            }
        })
    })
}
toggleAnswer();



/* function close popup */
/* set cookie */ 
function setCookie(name, value, minutes) {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function closePopup() {
    const popup = document.querySelector(".popup-sales");
    popup.classList.add("popup--hidden");
    setCookie("popupClosed", "true", 1); 
}

function triggerPopup() {
    const popup = document.querySelector(".popup-sales");

    
    if (!getCookie("popupClosed")) {
        setTimeout(() => {
        popup.classList.remove("popup--hidden");
        }, 3000);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Đảm bảo có thể kích hoạt popup lại sau khi cookie hết
    window.addEventListener("mousemove", triggerPopup);
    window.addEventListener("touchstart", triggerPopup);

    document.querySelector(".btn-close").addEventListener("click", closePopup);
});

// Đóng popup nếu click ra ngoài nội dung
document.querySelector(".popup-sales").addEventListener("click", function (event) {
    const popupContent = document.querySelector(".popup__content");

    // Nếu click vào chính .popup-sales nhưng KHÔNG phải bên trong nội dung
    if (!popupContent.contains(event.target)) {
        closePopup(); // Gọi hàm đóng
    }
});




