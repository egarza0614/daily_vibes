const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Use the DATABASE_URL provided by Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // You don't need to specify host, database, or password here; it's all in the DATABASE_URL
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Only for development; use a valid cert in production
      },
    },
  });
} else {
  // Fallback to local development configuration
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);
}

module.exports = sequelize;
