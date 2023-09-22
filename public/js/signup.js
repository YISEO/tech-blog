async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#name-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && password) {
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(() => {
            alert("Welcome!")
            document.location.replace("/dashboard");
        })
        .catch(() => alert("Try again"));
    }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);