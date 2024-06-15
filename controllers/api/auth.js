const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  console.log("Server Login", req.body)
  const { username, password } = req.body;

  console.log("Username", username, "Password", password)
  try {
    const foundUser = await Users.findOne({
      attributes: ['id', 'username', 'password'],
      where: {
        username: username
      }
    });
    console.log("foundUser", foundUser)
    if (foundUser === null) {
      res.status(400).json({ message: 'Invalid Username' });
      return;
    }
    // const validPassword = await bcrypt.compare(password, foundUser.password);
    if (password !== foundUser.password) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    console.log(foundUser.id)

    // here the user id is being set
    req.session.user_id = foundUser.id
    req.session.username = foundUser.username
    req.session.authorized = true
    // res.redirect(`/${foundUser.username}/profile`);
    res.status(200).json({ success: 'Logged in' })

  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

module.exports = router
