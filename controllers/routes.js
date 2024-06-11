const router = require('express').Router()
const userRoutes = require('./api/user')
const postRoutes = require('./api/posts')
const commentRoutes = require('./api/comments')
const authentication = require('./api/auth')


router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/authentication', authentication);


module.exports = router