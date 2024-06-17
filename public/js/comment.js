async function submitComment() {
  try {
    const comment = document.getElementById('comment').value
    const postId = comment.dataset.postid;
    console.log(postId)

    const response = await fetch(`/api/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, comment })
    });
    console.log("response", response)
    if (!response.ok) {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error(error);
  }
  // window.location.reload()
  // temp fix to re-rendering
};

async function retrieveComments() {
  const response = await fetch(`/api/comments/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
