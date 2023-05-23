'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store_Ranks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store_Ranks.init({
    discount: DataTypes.DOUBLE,
    point: DataTypes.DOUBLE,
    max_point: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Store_Ranks',
  });
  return Store_Ranks;
};