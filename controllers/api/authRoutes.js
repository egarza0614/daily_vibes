const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { loginIdentifier, password } = req.body; 
    // Use a single field for email or username

    const user = await User.findOne({
      where: Sequelize.or(
        { email: loginIdentifier },
        { username: loginIdentifier }
      )
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect email/username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email/username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});