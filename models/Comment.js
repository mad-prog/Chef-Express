const { DataTypes } = require("sequelize");
const server = require("../config/server");
const { MEAL_RATINGS } = require("../utils/constants");

const Comment = server.define("Comment", {
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
    defaultValue: MEAL_RATINGS.OK,
  },
});

module.exports = Comment;
