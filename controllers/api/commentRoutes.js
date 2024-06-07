const router = require('express').Router()
const { Users, Posts, Comments } = require('../../models')

router.get('/:post_id', (req, res) => {
    Comments.findAll({
        where: {
            post_id: req.params.post_id
        }
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: "Could not fetch comment by specified id."
            })
        })
})

router.post('/:post_id', (req, res) => {
    const { comment_text } = req.body
    Comments.create({
        comment_text: comment_text,
        where: {
            post_id: req.params.post_id
        }
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: "Could not fetch comment by specified id."
            })
        })
})

router.delete('/:id', (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            return res.status(200).json({
                message: 'Comment successfully deleted!'
            })
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({
                message: 'Could not delete comment by specified id.'
            })
        })
})

module.exports = router