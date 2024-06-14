const express = require('express');
const router = express.Router();
const { Posts } = require('../../models');



router.get('/', (req, res) => {
  console.log("POOOOOOOOOST!")
  console.log(req.session.user_id)
  if (!req.session.user_id) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  Posts.findAll({
    attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
  })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({
        message: 'Could not fetch posts'
      })
    })
})

router.get('/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id);
    console.log(postData);
    const post = postData.get({ plain: true });
    res.render('post', post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  console.log("test")
  const { title, content } = req.body

  console.log(req.body)

  Posts.create({
    title: title,
    content: content,
    user_id: req.session.user_id,
    where: {
      user_id: req.session.user_id
    }
  })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({
        message: 'Could not create post!'
      })
    })
})


router.delete('/:id', (req, res) => {
  Posts.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      return res.status(200).json({
        message: "Post deleted successfully!"
      })
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).json({
        message: "Could not delete post with specified id."
      })
    })
})

// c

module.exports = router;
