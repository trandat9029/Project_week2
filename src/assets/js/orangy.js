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
        });
    });
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

/*close popup */ 
function closePopup() {
  const popup = document.querySelector(".popup-sales");
  popup.classList.add("popup--hidden");
  setCookie("popupClosed", "true", 240)
}

/* set display popup after 3 second */ 
window.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup-sales");

  // Nếu chưa từng tắt popup
  if (!getCookie("popupClosed")) {
    const triggerPopup = () => {
      setTimeout(() => {
        popup.classList.remove("popup--hidden");
      }, 3000);

      // Gỡ bỏ listener sau khi đã bắt đầu
      window.removeEventListener("mousemove", triggerPopup);
      window.removeEventListener("touchstart", triggerPopup);
    };

    window.addEventListener("mousemove", triggerPopup);
    window.addEventListener("touchstart", triggerPopup);
  }

  document.querySelector(".btn-close").addEventListener("click", closePopup);
});


// cookie bar
document.addEventListener("DOMContentLoaded", function () {
    const cookieBar = document.querySelector(".cookie-bar");
    const cookieAccepted = localStorage.getItem("cookieConsent");

    // Kiểm tra nếu đã accept và chưa hết hạn
    if (cookieAccepted) {
        const expireDate = new Date(cookieAccepted);
        const now = new Date();

        if (now < expireDate) {
            cookieBar.style.display = "none"; // đã accept và chưa hết hạn
            return;
        } else {
            // nếu hết hạn thì xóa khỏi localStorage
            localStorage.removeItem("cookieConsent");
        }
    }

    // Nếu chưa accept hoặc hết hạn
    cookieBar.style.display = "block";
});

// Khi người dùng Accept
document.querySelector(".btn-accept").addEventListener("click", function () {
    const expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + 6); // 6 tháng

    localStorage.setItem("cookieConsent", expireDate.toISOString());
    document.querySelector(".cookie-bar").style.display = "none";
});

// Khi người dùng Ignore
document.querySelector(".btn-ignore").addEventListener("click", function () {
    // Không lưu vào localStorage
    document.querySelector(".cookie-bar").style.display = "none";
});



AOS.init();

