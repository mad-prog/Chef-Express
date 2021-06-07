const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { MEAL_RATINGS } = require("../utils/constants");

const Comment = sequelize.define("Comment", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.ENUM(Object.values(MEAL_RATINGS)),
    defaultValue: MEAL_RATINGS.FIVE,
  },
});

module.exports = Comment;
