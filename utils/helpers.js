const Filter = require('bad-words');
const fs = require('fs');

const filter = new Filter();

fs.readFile('./words.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const badWords = JSON.parse(data).badWords;
  filter.addWords(...badWords);

  console.log(filter.clean("This is a dumb message."));
});

module.exports = {
  filter: filter
};


  function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;

    if (!name) {
      alert('Name is required');
      isValid = false;
    }

    if (!email) {
      alert('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Invalid email');
      isValid = false;
    }

    if (!password) {
      alert('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      alert('Password must be at least 8 characters');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
      alert('Password must contain at least one uppercase letter and one digit');
      isValid = false;
    }

    return isValid;
  };