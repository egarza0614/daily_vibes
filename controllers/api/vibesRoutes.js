const express = require('express');
const router = express.Router();

router.get('/vibes', function(req,res, next) {
res.render('signForm.handlebars', {title:'hello'});
});

module.exports = router;
