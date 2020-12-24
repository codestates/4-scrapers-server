'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scrap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scrap.belongsTo(models.category, {
        foreignKey: 'categoryId'
      });
      scrap.belongsTo(models.news, {
        foreignKey: 'newsId'
      });
      scrap.belongsTo(models.user, {
        foreignKey: 'userId'
      });
    }
  };
  scrap.init({
    userId: DataTypes.INTEGER,
    newsId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scrap',
  });
  return scrap;
};