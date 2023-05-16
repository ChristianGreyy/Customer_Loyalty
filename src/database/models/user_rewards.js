'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Rewards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Rewards.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Rewards',
  });
  return User_Rewards;
};