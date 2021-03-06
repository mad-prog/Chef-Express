const Joi = require("joi");
const { MEAL_CATEGORY } = require("../utils/constants");

exports.insertMealSchema = Joi.object({
  title: Joi.string().required(),
  ingredients: Joi.array().required(),
  recipe: Joi.string().required(),
  category: Joi.string().valid(...Object.values(MEAL_CATEGORY)),
  image_path: Joi.string().uri(),
  UserId: Joi.string().required(),
});

exports.updateMealSchema = Joi.object({
  title: Joi.string().max(150),
  ingredients: Joi.string(),
  recipe: Joi.string(),
  category: Joi.string(),
  image_path: Joi.string().uri(),
});
