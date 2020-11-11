const form = document.querySelector("form");
const usernameError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    usernameError.textContent = "";
    passwordError.textContent = "";

    const username = form.username.value.toLowerCase();
    const password = form.password.value;


    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json();

        if (data.user) {
            location.assign("/dashboard")
        }

        if(data.errors) {
            usernameError.textContent = data.errors.username;
            passwordError.textContent = data.errors.password;
        }

    }
    catch (err) {
        console.log(err);
    }
})