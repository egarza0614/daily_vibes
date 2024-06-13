

async function createPost() {
  try {
    const title = document.getElementById('userTitle').value;
    const content = document.getElementById('userInput').value;
    // const userId = await getSessionUserId();

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title:title, content:content })
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error(error);
  }
}