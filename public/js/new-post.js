async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

    await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            content,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => { document.location.replace("/dashboard"); })
    .catch(() => alert("Try again!"));
}

document.querySelector(".new-post-form").addEventListener("submit", newPostHandler);