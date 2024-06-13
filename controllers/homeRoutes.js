const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/signup', function (req, res, next) {
    res.render('signup.handlebars', { name: 'dailyvibes', email: 'cass@gmail.com' });
});

router.get('/login', function (req, res, next) {
    res.render('login.handlebars', { name: 'dailyvibes', email: 'cass@gmail.com' });
});

router.get('/', function (req, res, next) {
    res.render('login.handlebars', { title: 'hello' });
});

router.get('/profile', function (req, res, next) {
    res.render('profile.handlebars', { title: 'dailyvibes' });
});

router.get('/posts', async function (req, res, next) {
    res.render('posts.handlebars', { title: 'Posts', Posts })
});

router.get('/settings', function (req, res, next) {
    res.render('settings.handlebars', { title: 'Update Settings' })
})

module.exports = router;
