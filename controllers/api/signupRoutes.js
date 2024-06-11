const express = require('express');
const router = express.Router();

router.get('/signup', function(req,res, next) {
res.render('signForm.handlebars', {name:'dailyvibes', email:'cass@gmail.com'});
});

module.exports = router;
