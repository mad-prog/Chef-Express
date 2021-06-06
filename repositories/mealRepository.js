const Meal = require("../models/Meal");
const User = require("../models/User");
const Comment = require("../models/Comment");

const populate = {
  include: [
    {
      model: User,
      attributes: ["name"],
    },
    {
      model: Comment,
      attributes: ["content", "rating"],
      include: {
        model: User,
        attributes: ["name"],
      },
    },
  ],
};

exports.insertMeal = async (meal) => {
  return await Meal.create(meal);
};

exports.findAllMeals = async () => {
  console.log("test");
  return await Meal.findAll(populate);
};

exports.findMealById = async (id) => {
  const meal = await Meal.findByPk(id, populate);
  console.log(meal);
  return meal;
};

/*
exports.findAndCountAllMeals = async () => {
  return await Meal.findAndCountAll();
};
*/

exports.deleteMeal = async (id) => {
  const destroyedMeal = await Meal.destroy({ where: { id } });
  return destroyedMeal;
};

exports.updateMeal = async (id, mealInfo) => {
  return await Meal.update(mealInfo, { where: { id } });
};
