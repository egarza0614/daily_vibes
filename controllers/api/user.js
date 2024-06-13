const router = require('express').Router()
const { Users } = require('../../models')

// find all users
router.get('/', (req, res) => {
    Users.findAll({
        attributes: ['id', 'username', 'email', 'password']
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

router.put('/updatePassword', (req, res) => {
    const { password } = req.body;
    Users.update({
        password: password,
        user_id: req.session.user_id
    })
        .then(() => {
            return res.status(200).json({ success: "Password updated successfully!" })
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ error: "Unable to update password." })
        })
})


module.exports = router