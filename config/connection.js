const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    {
      host: 'localhost',
      database: process.env.DB_NAME ?? 'dailyvibes_db',
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'password',
      port: 5432,
      dialect: 'postgres',
       dialectOptions: {
      //  ssl: {
      //   require: false,
      //   rejectUnauthorized: false 
      //  }
      }
    }
  );

module.exports = sequelize;
