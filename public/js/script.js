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
