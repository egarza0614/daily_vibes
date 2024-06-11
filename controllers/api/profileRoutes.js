const express = require('express');
const router = express.Router();

router.get('/profile', function(req,res, next) {
res.render('profile.handlebars', {title:'dailyvibes'});
});

module.exports = router;
