'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Items.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Items',
  });
  return Order_Items;
};