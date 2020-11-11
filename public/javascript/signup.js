const form = document.querySelector("form");
const usernameError = document.querySelector(".username.error");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
        passwordError.textContent = "The passwords must match";
        form.removeEventListener();
    }

    try {
        const res = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json();

        if (data.user) {
            location.assign("/")
        }

        if(data.errors) {
            usernameError.textContent = data.errors.username;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }

    }
    catch (err) {
        console.log(err);
    }
})