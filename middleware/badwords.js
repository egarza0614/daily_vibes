const Filter = require('bad-words');
const {badWords}= require('./words.json');
console.log(badWords)
const filterBadWords = (req, res, next) => {
    if  (req.body.content) {
      const filter = new Filter({list:badWords});
      req.body.content = filter.clean(req.body.content);
    }
    next();
  };

module.exports =  filterBadWords;
