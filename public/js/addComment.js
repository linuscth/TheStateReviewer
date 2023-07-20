const addComment = async (event) => {
    event.preventDefault();
    // get the comment from the comment form
    const user_comment = document.querySelector('.commentText').value;
    console.log(user_comment);

    const review_id = document.querySelector('.reviewCard').id
    console.log(user_comment);
    console.log(review_id);
    if (user_comment && review_id) {
        const response = await fetch(`/api/comments/${review_id}`, {
            method: 'POST',
            body: JSON.stringify({ user_comment }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            // If successful, redirect the browser to the addcomment page
            document.location.replace(`/addcomment/${review_id}`);
        } else {
            alert(response.statusText);
        }

    }
}
document.querySelector('.addCommentDiv').addEventListener('submit', addComment)
