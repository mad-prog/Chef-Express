const Meal = require("../models/Meal");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models/Meal");

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
  return await Meal.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            "(SELECT AVG(rating) FROM comments as comment WHERE comment.mealId = meal.id)"
          ),
          "avgRating",
        ],
      ],
    },
    ...populate,
    order: [[sequelize.literal("avgRating"), "DESC"]],
  });
};

/*
//string search
exports.findAllMealsWithNamedIngredient = async (ingredientsearchword) => {
  return await Meal.findAll({
    where: { ingredients: { [Op.substring]: ingredientsearchword } },
    ...populate,
  });
};
*/

//RegEx
exports.findAllMealsWithNamedIngredient = async (ingredientsearchword) => {
  return await Meal.findAll({
    where: {
      ingredients: {
        [Op.regexp]: `^[${ingredientsearchword.split("").join("|")}]`,
      },
    },
    ...populate,
  });
};

exports.findAllMealsWithCategory = async (searchCategory) => {
  return await Meal.findAll({
    limit: 5,
    where: { category: searchCategory },
    // order: ["category", "DESC"],
    attributes: {
      include: [
        [
          sequelize.literal(
            "(SELECT AVG(rating) FROM comments as comment WHERE comment.mealId = meal.id)"
          ),
          "avgRating",
        ],
      ],
    },
    ...populate,
    order: [[sequelize.literal("avgRating"), "DESC"]],
  });
};

exports.findMealById = async (id) => {
  const meal = await Meal.findByPk(id, populate);
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
