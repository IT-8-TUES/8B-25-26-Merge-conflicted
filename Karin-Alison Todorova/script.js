const appName = "Merge-conflicted";
let isLogged = false;

console.log(`${appName} system active`);

const loginForm = document.getElementById("login_form");

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (usernameInput !== "" && passwordInput !== "") {
            isLogged = true;
            alert(`Добре дошли в ${appName}, ${usernameInput}!`);
            
            window.location.href = "dashboard.html"; 
        } 
        else {
            alert("Моля попълнете всички полета.");
        }
    });
} 
else {
    const allFields = document.querySelectorAll("#schedule_table input, #notes, #homework");

    allFields.forEach((field, index) => {
        const savedData = localStorage.getItem(`input_field_${index}`);
        if (savedData) {
            field.value = savedData;
        }
        field.addEventListener("input", (event) => {
            localStorage.setItem(`input_field_${index}`, event.target.value);
        });
    });
    const footerParagraph = document.querySelector("footer p");
    
    if (footerParagraph) {
        setInterval(() => {
            const now = new Date();
            footerParagraph.innerText = `© 2026 ${appName} | Час: ${now.toLocaleTimeString()}`;
        }, 1000);
    }
}