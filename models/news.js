'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      news.hasMany(models.scrap, {
        foreignKey: 'id'
      });
    }
  };
  news.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.STRING,
    datePublished: DataTypes.STRING,
    provider: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};