const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      console.log(postData);
      const post = postData.get({ plain: true });
      res.render('post', post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;
