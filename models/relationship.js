const server = require("../config/server");
const User = require("./User");
const Meal = require("./Meal");
const Comment = require("./Comment");

const loadModels = () => {
  User.hasMany(Meal, {
    foreignKey: { allowNull: false },
  });

  User.hasMany(Comment, {
    foreignKey: { allowNull: false },
  });

  Meal.belongsTo(User);
  Meal.hasMany(Comment, {
    foreignKey: { allowNull: false },
  });

  Comment.belongsTo(User);
  Comment.belongsTo(Meal);

  server.sync().then(() => console.log("Let's start cooking, good lookin'"));
};
module.exports = loadModels;
