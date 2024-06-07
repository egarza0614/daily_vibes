const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

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
  for (const post of seedData.posts) {
    const newPost = await Posts.create(post);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await newPost.setUser(randomUser);  // Associate the user
  }
  console.log(`Seeded ${seedData.posts.length} posts`);

  // Seed Comments
    // Associate comments with users and posts before bulk creation
    const commentsWithAssociations = seedData.comments.map(comments => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPost = seedData.posts[Math.floor(Math.random() * seedData.posts.length)];
      return { ...comments, user_id: randomUser.id, post_id: randomPost.id };
    });
    
    await Comments.bulkCreate(commentsWithAssociations);
    //console.log(`Seeded ${seedData.comments.length} comments`);
  
  process.exit(0); // Exit the process after seeding
};

seedDatabase();

module.exports