const seedData = {
  users: [
    { username: 'johndoe', password: 'password123' },
    { username: 'janedoe', password: 'password456' },
  ],
  posts: [
    { title: 'First Post', content: 'This is the content of my first post' },
    { title: 'Second Post', content: 'This is the content of my second post' },
  ],
  comments: [
    { comment_text: 'Great post!' },
    { comment_text: 'Thanks for sharing' },
  ],
};

module.exports = seedData;
