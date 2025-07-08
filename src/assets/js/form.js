

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
                console.log("Form submitted successfully!");
                alert("✅ Your message has been sent successfully.");
                saveToLocalStorage({ name, email, phone, address });
                form.reset();
            } else {
                alert("❌ Failed to send. Please try again later.");
            }
        } catch (error) {
            alert("⚠️ Network error. Please check your connection.");
        }
    })
})




/*close popup */ 
document.addEventListener("DOMContentLoaded", () => {
    const popupNoti = document.querySelector(".popup-noti");

    // Tìm nút đóng nằm bên trong popup
    const popupCloseBtn = popupNoti.querySelector(".btn-close");

    popupCloseBtn.addEventListener("click", () => {
        popupNoti.classList.add("popup--hidden");
    });
});

