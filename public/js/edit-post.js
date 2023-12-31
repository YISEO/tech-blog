async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            post_id: id,
            title,
            content,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => { document.location.replace("/dashboard"); })
    .catch(() => alert("Try again"));
}

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            post_id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => { document.location.replace("/dashboard"); })
    .catch(() => alert("Try again"));
}


document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);
document.querySelector(".delete-btn").addEventListener("click", deleteFormHandler);