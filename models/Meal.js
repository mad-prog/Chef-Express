const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

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
});

module.exports = Meal;
