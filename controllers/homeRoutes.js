const router = require('express').Router()
const userRoutes = require('./api/userRoutes')
const postRoutes = require('./api/postRoutes')
const commentRoutes = require('./api/commentRoutes')
const authentication = require('./api/authRoutes')
const signupRoutes =require('./api/signupRoutes')
const profileRoutes =require('./api/profileRoutes')
const vibeRoutes =require('./api/vibeRoutes')


router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/authentication', authentication);
router.use('/api/signupRoutes', signupRoutes);
router.use('/api/profileRoutes', profileRoutes);
router.use('/api/vibeRoutes',vibeRoutes);


module.exports = router