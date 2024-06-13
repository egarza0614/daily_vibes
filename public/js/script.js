
async function handleLogin() {
  console.log("HANDLE LOGIN")

  try {

    // Making an API request 
    fetch('/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'jane', // here you would get the info from the UI aka document.querySelector
        password: 'password456'
      })
    })     
 .then(async (res) => {
      console.log(res)
      const json = await res.json()
      if (json.success) {
        window.location.href = '/posts'
        }
    })  

  } catch(e){
    console.error(e)
  }
}



async function createPost() {
  try {
    const title = document.getElementById('userTitle').value;
    const content = document.getElementById('userInput').value;

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    console.log("response", response)
    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error(error);
  }
}
