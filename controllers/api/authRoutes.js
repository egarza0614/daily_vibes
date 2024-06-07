const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Login (updated to use username)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
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

module.exports = router