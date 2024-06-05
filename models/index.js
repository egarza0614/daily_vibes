const Users = require('./users.js');
const Posts = require('./posts.js');


Users.hasMany(Posts);

Posts.belongsTo(Users);

module.exports = { Users, Posts};
