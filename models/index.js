const Users = require('./users.js');
const Posts = require('./posts.js');
const Comments = require('./comments');

Users.hasMany(Posts);

Posts.belongsTo(Users);

module.exports = { Users, Posts, Comments };
