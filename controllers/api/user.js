const router = require('express').Router()
const { Users } = require('../../models')
const { Posts } = require('../../models');
const bcrypt = require('bcrypt');

// find all users
router.get('/', async (req, res) => {
    try {
      const users = await Users.findAll({
        attributes: ['id', 'username', 'created_at'], // Removed 'email' and 'password'
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Cannot fetch users!',
        details: err.message,
      });
    }
  });

// find users posts
router.get('/:username/posts', async (req, res) => {
    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            where: {
              username: req.params.username,
            },
            attributes: ['id', 'username'],
          },
        ],
      });
  
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
    
      return res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not fetch posts', details: err.message });
    }
  });
// find user by username
router.get('/:username', (req, res) => {
    Users.findAll({
        where: {
            username: req.params.username
        }
    })
        .then((result) => {
            if (result === null) {
                return res.status(404).json({
                    message: 'ERROR: Could not fetch userrname'
                })
            }
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Cannot fetch by username!'
            })
        })
})

// create account
router.post('/signup', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // Input Validation
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required." });
        }
        //if (password.length < 7) {
        //    return res.status(400).json({ error: "Passwords must be at least 8 characters long." });
        //}
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }
        // Check if username is already taken
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken." });
        }

        // Create new user
        const newUser = await Users.create({
            username,
            password, // This will be hashed automatically by the beforeCreate hook
        });

        // Start a session
        req.session.save(() => {
          req.session.user_id = newUser.id;
          req.session.username = newUser.username;
          req.session.loggedIn = true;

          res.json({ user: newUser, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error('Signup Error:', err);
        return res.status(500).json({ error: 'Failed to create an account.' }); // General error for now
    }
});

// update password
router.put('/updatePassword', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body; 
        const userId = req.session.user_id;

        try {
            const user = await Users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            // Compare the current password (hashed in database)
            const validPassword = await bcrypt.compare(currentPassword, user.password); 
            if (!validPassword) {
                return res.status(401).json({ error: "Incorrect current password." }); 
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 salt rounds (or adjust)
            await user.update({ password: hashedPassword }); // Update the password in the database
            return res.status(200).json({ success: "Password updated successfully!" });

        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({ error: 'An error occurred while fetching user data.' });
        }

    } catch (err) {
        console.error('Error updating password:', err); 
        return res.status(500).json({ error: "Unable to update password." });
    }
});

// update bio, location, birthday
router.put('/', (req, res) => {
    const { bio, location, birthday } = req.body;
    Users.update({
        bio: bio,
        location: location,
        birthday: birthday,
    },
        {
            where: {
                id: req.session.user_id
            }
        }
    )
        .then(() => {
            return res.status(200).json({ success: "bio updated successfully!" })
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ error: "Unable to update bio." })
        })
})

// update username
router.put('/username', async (req, res) => {
    console.log("Received PUT request to /users/username");
    console.log("Request Body:", req.body);
    console.log("User ID from session:", req.session.user_id);

    try {
        const { newUsername } = req.body;
        const userId = req.session.user_id;

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if the new username is already taken
        const existingUser = await Users.findOne({ where: { username: newUsername } });
        if (existingUser) {
            return res.status(409).json({ error: "Username already taken." });
        }

        await user.update({ username: newUsername });

        // Update the session with the new username
        req.session.username = newUsername;

        return res.status(200).json({ success: "Username updated successfully!" });
    } catch (err) {
        console.error('Error updating username:', err);
        return res.status(500).json({ error: "Unable to update username." });
    }
});

module.exports = router