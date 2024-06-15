
async function handleLogin() {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  try {
    await fetch('/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        console.log(res)
        const json = await res.json()
        if (json.success) {
          window.location.href = '/profile'
        }
      })
  } catch (e) {
    console.error(e);
  }
};

const matchAlertBox = document.getElementById('matchAlertBox')

const handleSignUp = async (event) => {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value
  };
  const response = await fetch('/api/users/signup', {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log(response)
  checkPasswordMatch(formData)
  if (!response.ok) {
    return
  } else {
    const success = confirm('Account Created!')
    if (success === true) {
      window.location.replace('/');
    }
  }
};

function clearAlert() {
  matchAlertBox.innerHTML = null
};

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
};

async function createPost() {
  try {
    const title = document.getElementById('userTitle').value;
    const content = document.getElementById('userInput').value;

    const response = await fetch('/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    console.log("response", response)
    if (!response.ok) {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error(error);
  }
};