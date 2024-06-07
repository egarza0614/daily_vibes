const sequelize = require('../config/connection');
const { Users, Post, Comment } = require('../models');
const seedData = require('./seedData');


const seedDatabase = async () => {
  await sequelize.sync(); // Create tables

  // Seed Users
  const users = await Users.bulkCreate(seedData.users, {
    individualHooks: true, // Enable hooks for password hashing
    returning: true, // Return the created user objects
  });
  console.log(`Seeded ${users.length} users`);

  // Seed Posts
  for (const post of postData) {
    const newPost = await Post.create(post);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await newPost.setUser(randomUser);  // Associate the user
  }
  console.log(`Seeded ${postData.length} posts`);

  // Seed Comments
  // Associate comments with users and posts before bulk creation
  const commentsWithAssociations = seedData.comments.map(comment => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = postData[Math.floor(Math.random() * postData.length)];
    return { ...comment, user_id: randomUser.id, post_id: randomPost.id };
  });

  await Comment.bulkCreate(commentsWithAssociations);
  console.log(`Seeded ${seedData.comments.length} comments`);

  process.exit(0); // Exit the process after seeding
};

seedDatabase();

module.exports