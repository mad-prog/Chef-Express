const Meal = require("../models/Meal");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { Op, Sequelize } = require("sequelize");
const { MEAL_RATINGS } = require("../utils/constants");

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
  return await Meal.findAll({ ...populate });
};

exports.findAllMealsWithNamedIngredient = async (ingredientsearchword) => {
  return await Meal.findAll({
    where: { ingredients: { [Op.substring]: ingredientsearchword } },
    ...populate,
  });
};

exports.findAllMealsWithCategory = async (searchCategory) => {
  return await Meal.findAll({
    limit: 5,
    where: { category: searchCategory },
    // order: ["category", "DESC"],
    ...populate,
    //order: [[Sequelize.literal("'Comment.rating'"), "DESC"]],
    order: [
      Comment.associations.Meal,
      Meal.associations.Comment,
      "rating",
      "DESC",
    ],
  });
};

exports.findMealById = async (id) => {
  const meal = await Meal.findByPk(id, populate);
  console.log(meal);
  return meal;
};

exports.findMealRandom = async () => {
  const meal = await Meal.findOne(
    { order: Sequelize.literal("rand()") },
    populate
  );
  return meal;
};

exports.findThreeMealsRandom = async () => {
  const meal = await Meal.findAll(
    { order: Sequelize.literal("rand()"), limit: 3 },
    populate
  );
  return meal;
};

/*
pagination
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
