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
    res.render('home.handlebars', { title: 'hello' });
});

router.get('/profile', function (req, res, next) {
    res.render('profile.handlebars', { title: 'dailyvibes' });
});

router.get('/posts', async function (req, res, next) {
    console.log("GETTING POSTS")
    let posts = await Posts.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
      })
    posts.forEach(p=> {
        console.log(p)
        console.log(p.dataValues)
    })
    posts = posts.map(p => {
        return {
            title: p.dataValues.title,
            content: p.dataValues.content
        }
    })

 
    res.render('posts.handlebars', { title: 'Your Feet', posts})
});

router.get('/settings', function (req, res, next) {
    res.render('settings.handlebars', { title: 'Update Settings' })
})

module.exports = router;
