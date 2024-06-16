const express = require('express');
const router = express.Router();
const { Posts, Users, Comments } = require('../models');


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
    posts = posts.map(p => {
        return p.get({ plain: true })
    })
    for (const post of posts) {
       let comments = await Comments.findAll({
           where: { post_id: post.id },
           attributes: ['user_id', 'post_id', 'comment_text'],
        })
        comments = comments.map((c => c.get({ plain: true })))
        post.comments = comments
    }
    
    res.render('posts.handlebars', { posts, username: req.session?.user?.username,
        
     })
});


router.get('/settings', function (req, res, next) {
    if (!req.session.user_id) {
        res.render('login.handlebars', { title: 'hello' });
        return
    } else {
        res.render('settings.handlebars', { title: 'Update Settings' })
    }
})

router.get('/profile/:username', function (req, res, next) {
    const userPosts = Posts.findAll({
        include: [{
            model: Users,
            where: {
                username: req.params.username
            },
            attributes: ['id', 'username', 'created_at', 'bio', 'location', 'birthday']
        }]
    })
        .then((posts) => {
            posts = posts.map((post) => post.get({ plain: true }))
            console.log(posts)
            res.render('profile.handlebars', {
                posts,
                username: posts[0]?.user?.username,
                created_at: new Date(posts[0]?.user?.created_at).toLocaleString().split(', ')[0],
                bio: posts[0]?.user?.bio,
                location: posts[0]?.user?.location,
                birthday: posts[0]?.user?.birthday
            });

        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ message: 'Could not fetch posts' })
        }
        )
});

module.exports = router;
