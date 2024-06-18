
async function handleLogin() {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  try {
    const response = await fetch('/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) { // Check if the response was successful
      const json = await response.json();
      window.location.href = '/posts';
    } else {
      const json = await response.json();
      // Display a user-friendly error message based on the server response
      const errorMessage = json.message || "An error occurred during login.";
      const errorElement = document.getElementById('loginError'); // Get the error message element
      if (errorElement) {
        errorElement.textContent = errorMessage; // Show the error message in the UI
      } else {
        alert(errorMessage); // Fallback to an alert if the error element is not found
      }
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during login."); // Generic error message for network/fetch issues
  }
};

const handleSignUp = async (event) => {
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value
  };
  checkPasswordMatch(formData)
  try {
    const response = await fetch('/api/users/signup', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        window.location.replace('/');
        return;
      }
      // Handle validation errors or other errors
      const errorMessage = json.error || "An error occurred during signup.";
      const errorElement = document.getElementById('signupError'); // Get the error message element
      if (errorElement) {
        errorElement.textContent = errorMessage; // Show the error message in the UI
      } else {
        alert(errorMessage); // Fallback to an alert
      }
    } else {
     // Attempt to parse JSON for a potentially more detailed error message
     try {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Signup failed with status: ${response.status} ${response.statusText}`;
        alert(errorMessage);
      } catch (parseError) {
        // If parsing fails, display a generic error message
        alert("Signup failed. Please try again.");
      }
    }

  } catch (error) {
    console.error(error);
    alert("An unexpected error occurred during signup."); // Generic error message for network/fetch issues
  }
};

function clearAlert() {
  matchAlertBox.innerHTML = null
}

function checkPasswordMatch(formData) {
  const confirmPassword = document.getElementById('confirmPassword').value
  const matchAlertBox = document.getElementById('matchAlertBox')
  matchAlertBox.innerHTML = null
  if (confirmPassword !== formData.password) {
    const matchAlert = document.createElement('p')
    matchAlert.innerHTML = "Passwords don't match!"
    matchAlertBox.appendChild(matchAlert)
    return
  }
  return
};

// Inside script.js

async function createPost() {
  const title = document.getElementById('userTitle').value.trim();
  const content = document.getElementById('userInput').value.trim();

  if (!title || !content) {
    alert('Please fill in both title and content fields.');
    return;
  }

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // Post created successfully, reload the page
      window.location.reload(); // Refresh the page to get the updated posts
    } else {
      // Handle errors (display error message from backend)
      const errorData = await response.json();
      alert(errorData.error || 'Failed to create post.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post. Please try again.');
  }
}

