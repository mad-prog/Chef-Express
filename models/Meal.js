const { DataTypes } = require("sequelize");
const server = require("../config/server");

const Meal = server.define("Meal", {
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
  constraint,
});

module.exports = Meal;
