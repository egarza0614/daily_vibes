const handleLogin = async (event) => {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  const response = await fetch('/api/authentication/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    alert('Failed to sign in.');
    return
  }
  window.location.replace('/profile')
};



const matchAlertBox = document.getElementById('matchAlertBox')

const handeSignUp = (event) => {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  checkPasswordMatch(formData)

  const response = fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  console.log(!response.ok)
  if (!response.ok === false) {
    alert('Username is taken!')
    return
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