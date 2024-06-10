// const profileBtn = document.getElementById('submit');

//   async function handleSubmit(event) {
//     event.preventDefault(); 

//     const formData = {
//         Name: document.getElementById('name').value,
//         Passowrd: document.getElementById('pass').value,
//     };

//     try {
//         const response = await fetch('/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const formData = await response.json();
//         window.location.href = '../../views/layouts/social.handlebars';
 
//     } catch (err) {
//         console.error(err);
// };

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('#name').value.trim();
    const password = document.qgetElementById('#pass').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
//   document
//     .querySelector('.login-form')
//     .addEventListener('submit', loginFormHandler);
  
//   document
//     .querySelector('.signup-form')
//     .addEventListener('submit', signupFormHandler);
  
