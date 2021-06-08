const nodemailer = require("nodemailer");
const loadConfig = require("../config/nodemailer");
const mealRepository = require("../repositories/mealRepository");
const {
  insertMealSchema,
  updateMealSchema,
} = require("../validations/mealValidation");
const userRepository = require("../repositories/userRepository");
const ERRORS = require("../utils/constants");
const HttpError = require("../utils/httpError");
const { sendMailWithPlan } = require("../services/mailService");

exports.createMeal = async (meal) => {
  const { ingredients, recipe, title, category } = meal;
  if (!ingredients || !recipe || !title || !category)
    throw new HttpError(400, ERRORS.INVALID_DATA);

  try {
    await insertMealSchema.validateAsync(meal);
  } catch (error) {
    throw new HttpError(400, ERRORS.INVALID_DATA);
  }

  const ingredientsString = meal.ingredients.join(" ");
  meal.ingredients = ingredientsString;
  await mealRepository.insertMeal(meal);
};

exports.getAllMeals = async () => {
  return await mealRepository.findAllMeals();
};

exports.getAllMealsWithNamedIngredient = async (ingredientsearchword) => {
  const meals = await mealRepository.findAllMealsWithNamedIngredient(
    ingredientsearchword
  );
  if (!meals.length) throw new HttpError(404, ERRORS.INVALID_MEAL);
  return meals;
};

exports.getAllMealsWithCategory = async (categorySearchWord) => {
  const meals = await mealRepository.findAllMealsWithCategory(
    categorySearchWord
  );
  if (!meals.length) throw new HttpError(404, ERRORS.INVALID_MEAL);
  return meals;
};

exports.getMealById = async (id) => {
  return await mealRepository.findMealById(id);
};

exports.getRandomMealPlan = async (id) => {
  const mealplan = await mealRepository.findThreeMealsRandom();
  if (!mealplan.length) throw new HttpError(404, ERRORS.INVALID_MEAL);
  const user = await userRepository.findUserById(id);
  const email = user.email;

  const mealPlanArrayOfStrings = mealplan
    .map((meal, i) => {
      const { ingredients, recipe, category } = meal.toJSON();
      return `${i + 1})
    You're going to need the following ingredients for this ${category} recipe:
     ${ingredients}, 
     Follow this method:
     ${recipe} \n`;
    })
    .join(" ");

  const mealPlanMessage = `Thanks for requesting this meal plan from Chef-Express, the Happy API Meal! \n`;

  const emailMessage = mealPlanMessage.concat(mealPlanArrayOfStrings);
  const emailSubjectLine = "Chef-Express:Meal Planner";

  await sendMailWithPlan(email, emailMessage, emailSubjectLine);
  return mealplan;
};

exports.removeMeal = async (id) => {
  return await mealRepository.deleteMeal(id);
};

exports.editMeal = async (user, id, mealInfo) => {
  const storedMeal = await mealRepository.findMealById(id);
  if (!storedMeal) throw new HttpError(404, ERRORS.INVALID_MEAL);

  //only user who posted the meal and admin/mod can update
  if (
    user.id !== storedMeal.UserId &&
    user.role !== "admin" &&
    user.role !== "mod"
  )
    throw new HttpError(401, ERRORS.INVALID_AUTHORIZATION);
  try {
    await updateMealSchema.validateAsync(mealInfo);
  } catch (error) {
    throw new HttpError(400, ERRORS.INVALID_DATA);
  }
  return await mealRepository.updateMeal(id, mealInfo);
};
