const router = require('express').Router()
const userRoutes = require('./api/userRoutes')
const postRoutes = require('./api/postRoutes')
const commentRoutes = require('./api/commentRoutes')
const authentication = require('./api/authRoutes')

router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes)
router.use('/api/authentication', authentication)

module.exports = router