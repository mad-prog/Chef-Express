const Joi = require("joi");

exports.insertMealSchema = Joi.object({
  ingredients: Joi.string().required(),
  recipe: Joi.string().required(),
  UserId: Joi.string().required(),
});

exports.updateMealSchema = Joi.object({
  ingredients: Joi.string(),
  recipe: Joi.string(),
});
