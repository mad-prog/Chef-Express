const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

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
    type: DataTypes.TINYINT,
  },
});

module.exports = Comment;
