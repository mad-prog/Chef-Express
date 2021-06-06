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

exports.editMeal = async (user, id, mealInfo) => {
  const storedMeal = await mealRepository.findMealById(id);
  if (!storedMeal) throw new Error("No meal found");

  //only user who posted the meal and admin/mod can update
  if (
    user.id !== storedMeal.UserId &&
    user.role !== "admin" &&
    user.role !== "mod"
  )
    throw new Error("You aren't authorised to change this");

  const validatedMeal = await updateMealSchema.validateAsync(mealInfo);
  return await mealRepository.updateMeal(id, validatedMeal);
};
