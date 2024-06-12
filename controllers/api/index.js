const router = require('express').Router()
const userRoutes = require('./user')
const postRoutes = require('./posts')
const commentRoutes = require('./comments')
const authentication = require('./auth')


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/authentication', authentication);


module.exports = router