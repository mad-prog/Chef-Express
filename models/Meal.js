const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { MEAL_CATEGORY } = require("../utils/constants");

const Meal = sequelize.define("Meal", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  ingredients: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  recipe: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.ENUM(Object.values(MEAL_CATEGORY)),
    defaultValue: MEAL_CATEGORY.DEFAULT,
  },
  image_path: {
    type: DataTypes.TEXT,
  },
});

module.exports = Meal;
