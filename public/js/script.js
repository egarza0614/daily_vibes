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

    if (response.ok) {
      window.location.href = 'views/partialsprofile.handlebars'; 
      alert('Failed to sign up.');
    }
  }})
    .catch(error => {
      console.error('Error:', error);
    });
  
  document.getElementById('signupForm').addEventListener('submit', handleSubmit);
  