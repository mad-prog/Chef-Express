const mealRepository = require("../repositories/mealRepository");
const {
  insertMealSchema,
  updateMealSchema,
} = require("../validations/mealValidation");

exports.createMeal = async (meal) => {
  const validatedMeal = await insertMealSchema.validateAsync(meal);
  await mealRepository.insertMeal(validatedMeal);
};

exports.getAllMeals = async () => {
  return await mealRepository.findAllMeals();
};

exports.getMealById = async (id) => {
  return await mealRepository.findMealById(id);
};

exports.removeMeal = async (id) => {
  return await mealRepository.deleteMeal(id);
};

exports.editMeal = async (id, mealInfo) => {
  const validatedMeal = await updateMealSchema.validateAsync(mealInfo);
  return await mealRepository.updateMeal(id, mealInfo);
};
