const router = require('express').Router()
const { Users } = require('../../models')
const { Posts } = require('../../models');

// find all users
router.get('/', (req, res) => {
    Users.findAll({
        attributes: ['id', 'username', 'email', 'password', 'created_at']
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Cannot fetch users!'
            })
        })
})

router.get('/:username/posts', (req, res) => {
    Posts.findAll({
        include: [{
            model: Users,
            where: {
                username: req.params.username
            },
            attributes: ['id', 'username']
        }]
    })
        .then((result) => {
            console.log(result)
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ message: 'Could not fetch posts' })
        }
        )
})
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

// password update
router.put('/updatePassword', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body; 
        const userId = req.session.user_id;

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

        // Update the password in the database
        await user.update({ password: hashedPassword });

        return res.status(200).json({ success: "Password updated successfully!" });
    } catch (err) {
        console.error('Error updating password:', err); 
        return res.status(500).json({ error: "Unable to update password." });
    }
});

// bio, location, birthday update
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