const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../../models');

// Login route - handles user login requests
router.post('/login', async (req, res) => {
    console.log("Server Login", req.body);
    const { username, password } = req.body;

    try {
        // Attempt to find the user in the database by username
        const foundUser = await Users.findOne({
            attributes: ['id', 'username', 'password', 'created_at'],
            where: { username: username }
        });

        // Check if user exists and verify password
        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Successful login - store user data in session
        req.session.user = foundUser;
        req.session.user_id = foundUser.id;
        req.session.authorized = true;
        req.session.save(() => { // Save the session before sending the response
            res.status(200).json({ success: 'Logged in' });
        });
    } catch (err) {
        // Handle potential errors during login
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' }); 
    }
});

module.exports = router; 
