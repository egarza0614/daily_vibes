const express = require('express');
const router = express.Router();
const { Posts, Users } = require('../models');


router.get('/signup', function (req, res, next) {
    res.render('signup.handlebars', { name: 'dailyvibes', email: 'cass@gmail.com' });
});

router.get('/login', function (req, res, next) {
    res.render('login.handlebars', { name: 'dailyvibes', email: 'cass@gmail.com' });
});

router.get('/', function (req, res, next) {
    res.render('login.handlebars', { title: 'hello' });
});


router.get('/posts', async function (req, res, next) {
    console.log("GETTING POSTS")
    let posts = await Posts.findAll({
        attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [{
            model: Users
        }]
    })
    console.log('first LOG----------------------')

    posts = posts.map(p => p.get({ plan: true }))
    console.log(posts[0].user)
    res.render('posts.handlebars', { posts, username: req.session?.user?.username })
});


router.get('/settings', function (req, res, next) {
    res.render('settings.handlebars', { title: 'Update Settings' })
})

router.get('/:username', function (req, res, next) {
    const userPosts = Posts.findAll({
        include: [{
            model: Users,
            where: {
                username: req.params.username
            },
            attributes: ['id', 'username', 'created_at']
        }]
    })
        .then((result) => {

            console.log(result.map((element) => element.dataValues.title).join())
            res.render('profile.handlebars', {
                username: result[0].dataValues.user.dataValues.username,
                created_at: new Date(result[0].dataValues.user.dataValues.created_at).toLocaleString().split(', ')[0],
                title: result.map((element) => element.dataValues.title).join()
            });

        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ message: 'Could not fetch posts' })
        }
        )
});

module.exports = router;
