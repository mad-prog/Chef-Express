const Joi = require("joi");
const { MEAL_RATINGS } = require("../utils/constants");

exports.insertCommentSchema = Joi.object({
  content: Joi.string().required(),
  rating: Joi.string().valid(...Object.values(MEAL_RATINGS)),
  UserId: Joi.string().required(),
  MealId: Joi.string().required(),
});

exports.updateCommentSchema = Joi.object({
  content: Joi.string(),
  rating: Joi.string(),
});
