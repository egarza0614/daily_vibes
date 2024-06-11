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



const handleSubmit = (event) => {
  event.preventDefault();


  const formData = {
    name: document.getElementById('nameSubmission').value,
    email: document.getElementById('emailSubmission').value,
    password: document.getElementById('passwordSubmission').value
  };


  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {

      if (data.errors) {

        const errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = '';

        data.errors.forEach(error => {
          console.error(error.msg);

          const errorMessage = document.createElement('p');
          errorMessage.textContent = error.msg;
          errorContainer.appendChild(errorMessage);
        });
      } else {
        console.log('Form submitted successfully');

      }
      alert('Congratulations, you are signed up!');
      console.log('Form submitted successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  if (response.ok) {
    window.location.href = 'views/partialsprofile.handlebars';
    alert('Failed to sign up.');
  }
}

document.getElementById('signupForm').addEventListener('submit', handleSubmit);
