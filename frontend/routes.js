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
module.exports = router;
