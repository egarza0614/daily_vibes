// seeds/seedData.js
const seedData = {
  users: [
    { username: 'johnathan', password: 'password123' },
    { username: 'jane', password: 'password456' },
  ],
  posts: [
    {
      title: 'First Post',
      content: 'This is the content of my first post',
      user_id: 1 // Associate with johndoe (user_id 1)
    },
    {
      title: 'Second Post',
      content: 'This is the content of my second post',
      user_id: 2 // Associate with janedoe (user_id 2)
    },
  ],
  comments: [
    {
      comment_text: 'Great post!',
      user_id: 2, // janedoe commented
      post_id: 1 // on the first post
    },
    {
      comment_text: 'Thanks for sharing',
      user_id: 1, // johndoe commented
      post_id: 2 // on the second post
    },
  ],
};

module.exports = seedData;
