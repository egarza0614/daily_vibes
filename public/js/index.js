// script.js

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
   
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      posts
    
    };

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      window.location.href = '../../views/layouts/main.handlebars';
    })
    .catch((err) => {
      console.error(err)
    })
  };
