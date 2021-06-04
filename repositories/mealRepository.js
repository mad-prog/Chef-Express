const Meal = require("../models/Meal");

exports.insertMeal = async (meal) => {
  return await Meal.create(meal);
};

exports.findAllMeals = async () => {
  return await Meal.findAll();
};

exports.findMealById = async (id) => {
  return await Meal.findByPk(id);
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
  const meal = Meal.findByPk(id);
  return await Meal.update(mealInfo, { where: { id } });
};
