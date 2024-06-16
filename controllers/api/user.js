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
router.post('/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords dont match!" })
    }
    if (password === confirmPassword) {

        Users.create({
            username: username,
            password: password
        })
            .then(() => {
                return res.status(200).json({
                    message: 'Account created successfully!'
                })
            })
            .catch((err) => {
                console.error(err)
                return res.status(400).json({ error: 'Account Already Exists' })
            })
    }
})

// password update
router.put('/updatePassword', async (req, res) => {
    console.log("Received PUT request to /users/updatePassword");
    console.log("Request Body:", req.body);
    console.log("User ID from session:", req.session.user_id); // Check if user_id is available

    try {
        const { newPassword } = req.body; // Get the new password from the request body
        const userId = req.session.user_id;

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Hash the new password
        // const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 salt rounds (you can adjust)

        // Update the password in the database
        await user.update({ password: newPassword });

        // Indicate success
        return res.status(200).json({ success: "Password updated successfully!" });
    } catch (err) {
        console.error('Error updating password:', err); // Log the error on the server
        return res.status(500).json({ error: "Unable to update password." });
    }
});

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

module.exports = router