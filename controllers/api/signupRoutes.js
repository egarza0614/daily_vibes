const { User } = require('../../models');

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password, 
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      user: { 
        id: newUser.id,
        username: newUser.username,
        email: newUser.email 
      } 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An error occurred while creating user' });
  }
};

module.exports = router