const Meal = require("../models/Meal");

exports.insertMeal = async (meal) => {
  return await Meal.create(meal);
};

exports.findAllMeals = async () => {
  return await Meal.findAll();
};

/*
exports.findAndCountAllMeals = async () => {
  return await Meal.findAndCountAll();
};
*/
