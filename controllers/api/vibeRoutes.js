const express = require('express');
const router = express.Router();

router.get('/vibe', function(req,res, next) {
res.render('vibe.handlebars', {username:'username', password:'password' });
});
module.exports = router;
