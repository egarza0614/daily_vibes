const express = require('express');
const router = express.Router();

router.get('/signup', function (req, res, next) {
    res.render('signup.handlebars', { name: 'dailyvibes', email: 'cass@gmail.com' });
});

router.get('/', function (req, res, next) {
    res.render('home.handlebars', { title: 'hello' });
});

router.get('/profile', function (req, res, next) {
    res.render('profile.handlebars', { title: 'dailyvibes' });
});

router.get('/posts', function (req, res, next) {
    res.render('posts.handlebars', { title: 'Your Feed' })
});

router.get('/settings', function (req, res, next) {
    res.render('settings.handlebars', { title: 'Update Settings' })
})

module.exports = router;
