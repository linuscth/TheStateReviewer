const addReview = async (event) => {
    event.preventDefault();
    // get the comment from the comment form
    const review_topic = document.querySelector('.inputReviewTopic').value;

    const review_details = document.querySelector('.reviewDetails').value;

    const rating = document.querySelector('input[name="rating"]:checked').value;

    const state_id = document.querySelector('.addReviewForm').id;
    console.log(rating);
    console.log(review_topic);
    console.log(review_details);

    if (review_topic && review_details && rating) {
        const response = await fetch(`/api/reviews/${state_id}`, {
            method: 'POST',
            body: JSON.stringify({ rating, review_topic, review_details, state_id }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            // If successful, redirect the browser to the addcomment page
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }

    }

}
document.querySelector('.addReviewForm').addEventListener('submit', addReview)
