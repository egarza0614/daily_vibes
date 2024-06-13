const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Users extends Model {
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'users',
  }
);

module.exports = Users;
