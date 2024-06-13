async function handleLogin() {
    console.log("HANDLE LOGIN");
  
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {

        window.location.href = '/posts';
      } else {

        console.error('Login failed:', data.message);
       
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  }
  