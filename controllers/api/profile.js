const express = require('express');
const router = express.Router();
const { Posts, Users } = require('../../models');

router.get('/', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userPosts = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [{ model: Users, attributes: ['username'] }]
    });
    res.status(200).json(userPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a user's own post
router.delete('/:postId', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
        user_id: req.session.user_id
      }
    });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
