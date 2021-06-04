const mealRepository = require("../repositories/mealRepository");

exports.createMeal = async (meal) => {
  await mealRepository.insertMeal(meal);
};

exports.getAllMeals = async () => {
  return await mealRepository.findAllMeals();
};
