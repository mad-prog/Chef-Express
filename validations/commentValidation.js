const Joi = require("joi");

exports.insertCommentSchema = Joi.object({
  content: Joi.string().required(),
  rating: Joi.string().required(),
});

exports.updateCommentSchema = Joi.object({
  content: Joi.string(),
  rating: Joi.string(),
});
