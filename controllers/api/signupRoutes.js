const express = require('express');
const router = express.Router();

router.get('/signup', function(req,res, next) {
res.render('signForm.handlebars', {name:'name', email:'email', passowrd:'password' });
});

module.exports = router;
