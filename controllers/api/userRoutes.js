const router = require('express').Router()
const { Users, Posts } = require('../../models')

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
    const { username, password } = req.body;
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
            res.status(400).json({ error: 'Account Already Exists' })
            return
        })
})

// create a login route using session