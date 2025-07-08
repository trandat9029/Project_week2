
// validate email
function isValidEmail(email){
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

//validate phone
function isValidPhone(phone){
    return /^[0-9]{10,11}$/.test(phone);  
}

// show error
function showError(id, message){
    const input = document.getElementById(id);
    const errorElement = document.querySelector(`.${id}Error`);
    input.classList.add("error");
    errorElement.textContent = message;
}

 // delete error
function clearError(id) {
    const input = document.getElementById(id);
    const errorElement = document.querySelector(`.${id}Error`);
    input.classList.remove("error");
    errorElement.textContent = "";
}

// save to localStorage
function saveToLocalStorage(data){
    Object.keys(data).forEach((key) =>{
        localStorage.setItem(`contact_${key}`, data[key]);
    });
}

//auto fill Form
function autofillForm(){
    ["name", "email", "phone", "address"].forEach((filed) =>{
        const val = localStorage.getItem(`contact_${filed}`);
        if(val) document.getElementById(filed).value = val;
    });
}

//show text of popup notification
function showPopup(mainText, descText){
    const popupNoti = document.querySelector(".popup-noti");
    popupNoti.querySelector(".popup-noti__main").textContent = mainText;
    popupNoti.querySelector(".popup-noti__desc").textContent = descText;
    popupNoti.classList.remove("popup--hidden");
}

// submit form
document.addEventListener("DOMContentLoaded", function(){
    autofillForm();

    const form = document.querySelector('.contactForm__form');
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const message = document.getElementById("message").value.trim();

        let valid = true;

        if(!name){
            showError("name", "Name is required");
            return false;
        }else{
            clearError("name");
        }

        if(!email || !isValidEmail(email)){
            showError("email", "Invalid email");
            return false;
        }else{
            clearError("email");
        }

        if(!phone || !isValidPhone(phone)){
            showError("phone", "Invalid phone");
            return false;
        }else{
            clearError("phone");
        }

        if(!valid) return;

        try {
            const response = await fetch("https://testapi.demo.wgentech.com/notify.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, phone, address, message})
            });

            if (response.ok) {
                saveToLocalStorage({ name, email, phone, address });
                form.reset();
                showPopup("Thank you!", "Data has been sent successfully.");
            }
            else {
                showPopup("Oops! An error occurred.", "Please check your information and try again.");
            }
        } catch (error) {
            showPopup("Oops! A network error occurred.", "Please check your connection and try again.");
        }
    });
});

// Newsletter Form
document.addEventListener("DOMContentLoaded", function(){
    const form = document.querySelector(".footer__form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("emailFooter").value.trim();
        if (!email || !isValidEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        // Gửi request không cần chờ phản hồi (no-cors)
        fetch("https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec", {
            method: "POST",
            mode: "no-cors", // bắt buộc để tránh lỗi CORS
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}`
        });

        // Reset form và hiển thị popup ngay sau khi gửi
        form.reset();
        showPopup("Thank you!", "Your email has been sent.");
    });
});


/*close popup */ 
document.addEventListener("DOMContentLoaded", () => {
    const popupNoti = document.querySelector(".popup-noti");

    // Tìm nút đóng nằm bên trong popup
    const popupCloseBtn = popupNoti.querySelector(".btn-close");

    popupCloseBtn.addEventListener("click", () => {
        popupNoti.classList.add("popup--hidden");
    });
});

