async function logoutHandler() {
    await fetch("/api/users/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(() => { document.location.replace("/"); })
    .catch(err => console.log(err));
}

document.querySelector("#logout").addEventListener("click", logoutHandler);