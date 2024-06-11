// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.getElementById('nameSubmission').value.trim();
//   const password = document.getElementById('passwordSubmission').value.trim();

//   if (username && password) {
//     const response = await fetch('/submit', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       window.location.href = 'views/partialsprofile.handlebars'; 
//       alert('Failed to sign up.');
//     }
//   }
// };

// document.getElementById('signup2').addEventListener('click', loginFormHandler);


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