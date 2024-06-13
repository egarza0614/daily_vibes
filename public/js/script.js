
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
  window.location.replace('/posts')
};

const matchAlertBox = document.getElementById('matchAlertBox')

const handleSignUp = (event) => {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };


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

  // ^^ this is not working as intended

  const success = confirm('Account Created!')
  if (success === true) {
    window.location.replace('/')
  }
}

function clearAlert() {
  matchAlertBox.innerHTML = null
}

function checkPasswordMatch(formData) {
  const confirmPassword = document.getElementById('confirmPassword').value
  matchAlertBox.innerHTML = null
  if (confirmPassword !== formData.password) {
    const matchAlert = document.createElement('p')
    matchAlert.innerHTML = "Passwords don't match!"
    matchAlertBox.appendChild(matchAlert)
    return
  }
  return
}