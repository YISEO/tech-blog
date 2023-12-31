async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    if (comment_text) {
        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                comment_text,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(() => {
            alert("Success!");
            document.location.reload(); 
        })
        .catch(() => alert("Try again!"));
        
    }
}

document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);