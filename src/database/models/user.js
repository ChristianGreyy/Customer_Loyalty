'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.ENUM('female', 'male'),
    point: DataTypes.DOUBLE,
    otp_code: DataTypes.STRING,
    is_code_used: DataTypes.BOOLEAN,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};