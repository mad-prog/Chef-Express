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

exports.createMeal = async (meal) => {
  const { ingredients, recipe } = meal;
  if (!ingredients || !recipe) throw new HttpError(400, ERRORS.INVALID_DATA);
  const validatedMeal = await insertMealSchema.validateAsync(meal);

  const ingredientsString = meal.ingredients.join(" ");

  validatedMeal.ingredients = ingredientsString;
  await mealRepository.insertMeal(validatedMeal);
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
  console.log(user);
  const email = user.email;
  console.log(email);

  const mealPlanArrayOfStrings = mealplan
    .map((meal, i) => {
      const { ingredients, recipe, category } = meal.toJSON();
      return `${i + 1} recipe:
    You're going to need the following ingredients for this ${category} recipe:
     ${ingredients}, 
     Follow this method:
     ${recipe}`;
    })
    .toString();

  const mealPlanMessage = "Thanks for requesting this meal plan! ";

  const emailMessage = mealPlanMessage.concat(mealPlanArrayOfStrings);
  const subject = "Meal Planner";
  console.log(subject);
  await this.sendMailWithPlan(email, emailMessage, subject);
  return mealplan;
};

exports.sendMailWithPlan = async (email, text, subject) => {
  if (!email || !subject || !text)
    throw new HttpError(400, ERRORS.INVALID_USER);

  const mailConfig = await loadConfig();
  const transport = nodemailer.createTransport(mailConfig);
  const message = {
    from: "test.node.madeleine@gmail.com",
    to: "madeleine_elliot@hotmail.com",
    //should be client email
    subject,
    text,
    replyTo: email,
  };
  transport.sendMail(message, (err, info) => {
    console.log(info, err);
  });
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

  const validatedMeal = await updateMealSchema.validateAsync(mealInfo);
  return await mealRepository.updateMeal(id, validatedMeal);
};
